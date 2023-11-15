from fastapi import FastAPI, Query, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field 
import platform
if platform.system() == "Windows":
    import keyboard
else:
    from winhotkey.dummy_keyboard import keyboard # For testing on non-windows systems
from time import sleep
from typing import Annotated, List
import importlib

from winhotkey.keyboard_wrappers import sender

api_app = FastAPI()

static_path = None
with importlib.resources.path('winhotkey', 'web') as web_path:
    static_path = web_path/"static"

api_app.mount(f"/static", StaticFiles(directory=static_path), name="static")

class HotKey(BaseModel):
    index: int = Field(description="Order this hotkey should be displayed on the gui", default=-1)
    assigned_key:str = Field(description="'keyboard' compatible hot key description string", min_length=1)
    phrase:str = Field(description="Phrase to type when hot key is pressed", default="")

current_hotkeys = {}
type_delay = 2.0
def initializeSettings(
        hotkey_prefix,
        delay_in_seconds
    ):
    global current_hotkeys
    global type_delay
    possible_entries = [f"{i}" for i in range(1,10)]
    possible_entries.append("0")
    possible_entries = possible_entries[::-1]
    for index, num in enumerate(possible_entries):
        hkey = f"{hotkey_prefix}+{num}"
        current_hotkeys[hkey] = HotKey(index=index, assigned_key=hkey, phrase="")
    
    type_delay = delay_in_seconds

@api_app.get("/")
def home():
    """
    Redirect to the main page
    """
    tosend = """
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="refresh" content="1; url='./static/pages/home.html'" />
            </head>
            <body>
                <p>Redirecting to main menu</p>
            </body>
        </html>
    """
    return HTMLResponse(tosend)

@api_app.get("/hotkeys")
def get_hotkeys() -> List[HotKey]:
    """
    Returns list of current hotkeys in display order.
    """
    hkeys = list(current_hotkeys.values())
    hkeys = sorted(hkeys, key=lambda hkey: hkey.index)
    return hkeys

@api_app.post("/hotkeys")
def set_hotkey(hot_key: HotKey):
    """
    Will assign (or reassign) hot key
    """
    # Check for key already assigned
    phrase = current_hotkeys.get(hot_key.assigned_key, None)
    if phrase is not None:
        # unassign
        keyboard.remove_hotkey(hot_key.assigned_key)
        
    # Assign hotkey
    keyboard.add_hotkey(hot_key.assigned_key, sender, args=(hot_key.phrase, 0.5, ))
    current_hotkeys[hot_key.assigned_key] = hot_key.phrase
    return {}

@api_app.get("/type_phrase")
def type_phrase(assigned_key: str = Query(description="The assigned hot key to activate"), 
                delay:float = Query(default=type_delay, description="The time in seconds we will wait before we begin typing")
):
    """
    Will type the assigned key after the delay in seconds.  This is to allow you to put focus on the correct window if the hot keys are not working in that window.
    """
    hkey = current_hotkeys.get(assigned_key, None)
    if hkey is not None:
        if len(hkey.phrase) > 0:
            sender(phrase=hkey.phrase, delay=delay)
    
    return {}

