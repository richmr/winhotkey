# SPDX-FileCopyrightText: 2023-present richmr <richmr@users.noreply.github.com>
#
# SPDX-License-Identifier: MIT
import typer
import keyboard
#from winhotkey.dummy_keyboard import keyboard # For testing on mac
from typing_extensions import Annotated
import platform
from uvicorn.config import Config
from time import sleep

from winhotkey.__about__ import __version__
from winhotkey.ThreadedUvicorn import ThreadedUvicorn

cli_app = typer.Typer()

def typePhrase(phrase:str):
    """
    Will type the phrase by breaking phrase into indiv characters and using keyboard.send()
    """
    sleep(1)
    for c in phrase:
        keyboard.send(c)

@cli_app.command()
def cli(hotkey_prefix: Annotated[str, typer.Option(help="'keyboard' compatible hot key prefix'")] = "shift+ctrl+alt",
        reverse_hotkey_order: Annotated[bool, typer.Option(help="Start with 1 and go to 0 or 0 and go to 1.  I actually prefer 0 to 1")] = True,
        hide_input: Annotated[bool, typer.Option(help="In case your 'phrases' are sensitive, you will not see what you enter")] = True):
    """
    Allows you store up to 10 'phrases' for instant recall by typing 'Control+Alt+[1-0]'\n
    Just hit enter to stop storing 'phrases'\n
    """
    possible_entries = [f"{i}" for i in range(1,10)]
    possible_entries.append("0")
    if reverse_hotkey_order:
        possible_entries = possible_entries[::-1]
    keys_to_add = {}
    for entry in possible_entries:
        key = f'{hotkey_prefix}+{entry}'
        phrase = typer.prompt(f"Please enter phrase for '{key}'", hide_input=hide_input, default="Press Enter when done")
        if phrase == "Press Enter when done":
            break
        keys_to_add[key] = phrase

    for (n, (key_to_add, phrase)) in enumerate(keys_to_add.items()):
        # Convert the phrase to string of characters separated by comma
        # keyboard.add_hotkey(key_to_add, keyboard.write, args=(phrase,))
        keyboard.add_hotkey(key_to_add, typePhrase, args=(phrase,))
    
    print("Press SHIFT+CTRL+ALT+ESC to exit.  Leave this window open!")

    # Blocks until you press esc.
    keyboard.wait('shift+ctrl+alt+esc')

#@cli_app.command()
def web(hotkey_prefix: Annotated[str, typer.Option(help="'keyboard' compatible hot key prefix'")] = "shift+ctrl+alt",
        type_delay: Annotated[float, typer.Option(help="Set the delay time in seconds when using the delayed typing feature")] = 2.0):
    """
    Starts a web interface to configure winhotkey
    """
    from winhotkey.web import initializeSettings
    initializeSettings(hotkey_prefix, type_delay)

    config = Config("winhotkey.web:api_app", host="127.0.0.1", port=17455, reload=True)
    server = ThreadedUvicorn(config)
    server.start()
    print("Press SHIFT+CTRL+ALT+ESC to exit.  Leave this window open!")
    keyboard.wait('shift+ctrl+alt+esc')
    server.stop()

def winhotkey():
    # if not platform.system() == "Windows":
    #     print("This will only work on windows, sorry")
    #     return
    cli_app()

