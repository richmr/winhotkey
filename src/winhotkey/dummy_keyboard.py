"""
This file is a dummy fill in for the actual keyboard module
Mainly because I develop mostly on Mac but keyboard generally only works right on Windows
So this provides feedback for functions being called, but does not actually work
"""
from time import sleep

class keyboard:

    @classmethod
    def add_hotkey(cls, key_to_add, fxn, args):
        print(f"Would have activated {key_to_add} with {args}")

    @classmethod
    def remove_hotkey(self, key_to_remove):
        print(f"Would disconnect {key_to_remove}")

    @classmethod
    def write(self, phrase):
        print(phrase)

    @classmethod
    def wait(self, key):
        print(f"Would wait until {key} pressed.  Will need Ctrl-C to quit")
        while True:
            sleep(0.05)

    @classmethod
    def send(self, key):
        print(f"Would send {key}")