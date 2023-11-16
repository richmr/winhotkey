import platform
if platform.system() == "Windows":
    import keyboard
else:
    from winhotkey.dummy_keyboard import keyboard # For testing on non-windows systems
from time import sleep

shift_list = '~!@#$%^&*()_+{}|:"<>?QWERTYUIOPLKJHGFDSAZXCVBNM'

def sender(phrase, delay=3.0):
    """
    Will type the phrase by breaking phrase into indiv characters and using keyboard.send()
    """
    sleep(delay)
    for c in phrase:
        if c in shift_list:
            # Since using .send() I have to detect characters that are on the "shift" side of the key and send the shift with it
            # Assumes caps lock is off
            c = "shift+" + c.lower()
        keyboard.send(c)