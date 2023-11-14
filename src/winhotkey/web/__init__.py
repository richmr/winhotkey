from fastapi import FastAPI, Query, HTTPException, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
#import keyboard
from winhotkey.dummy_keyboard import keyboard # For testing on mac
from time import sleep
from typing import Annotated

api_app = FastAPI()
api_app.mount(f"/static", StaticFiles(directory="static"), name="static")

possible_entries = [f"{i}" for i in range(1,10)]
possible_entries.append("0")
possible_entries = possible_entries[::-1]
current_hotkeys = {f"ctrl+alt+{num}":None for num in possible_entries}

@api_app.get("/hotkeys")
def get_hotkeys():
    """
    Returns the current assigned hotkeys
    """
    return current_hotkeys

class HotKey(BaseModel):
    assigned_key:str = Field(description="'keyboard' compatible hot key description string", min_length=1)
    phrase:str = Field(description="Phrase to type when hot key is pressed", min_length=1)

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
    keyboard.add_hotkey(hot_key.assigned_key, keyboard.write, args=hot_key.phrase)
    current_hotkeys[hot_key.assigned_key] = hot_key.phrase
    return {}

@api_app.get("/type_phrase")
def type_phrase(assigned_key: str = Query(description="The assigned hot key to activate"), 
                delay:float = Query(default=2.0, description="The time in seconds we will wait before we begin typing")
):
    """
    Will type the assigned key after the delay in seconds.  This is to allow you to put focus on the correct window if the hot keys are not working in that window.
    """
    phrase = current_hotkeys.get(assigned_key, None)
    if phrase is not None:
        sleep(delay)
        keyboard.write(phrase)
    
    return {}




