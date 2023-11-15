import keyboard
from time import sleep

shift_list = '~!@#$%^&*()_+{}|:"<>?QWERTYUIOPLKJHGFDSAZXCVBNM'

def sender(phrase, delay=3.0):
    sleep(delay)
    for c in phrase:
        if c in shift_list:
            c = "shift+" + c.lower()
        print(f"sending {c}")
        keyboard.send(c)



