# SPDX-FileCopyrightText: 2023-present richmr <richmr@users.noreply.github.com>
#
# SPDX-License-Identifier: MIT
import typer
import keyboard
from typing_extensions import Annotated
import platform

from winhotkey.__about__ import __version__

cli_app = typer.Typer()

@cli_app.command()
def run(hotkey_prefix: Annotated[str, typer.Option(help="'keyboard' compatible hot key prefix'")] = "ctrl+alt",
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
        keyboard.add_hotkey(key_to_add, lambda: keyboard.write(phrase)) 
    
    print("Press ESC to exit.  Leave this window open!")

    # Blocks until you press esc.
    keyboard.wait('esc')

def winhotkey():
    if not platform.system() == "Windows":
        print("This will only work on windows, sorry")
        return
    cli_app()

