import keyboard

def sendit(text):
    keyboard.write(text)


keyboard.add_hotkey('ctrl+shift+0', print, args=('triggered', 'hotkey'))

# Press PAGE UP then PAGE DOWN to type "foobar".
# keyboard.add_hotkey('ctrl+alt+9', lambda: keyboard.write('foobar'))
keyboard.add_hotkey('ctrl+windows+9', keyboard.write, args=('foobar',))
# keyboard.add_hotkey('ctrl+alt+9', sendit, args=('foobar',))

print("Press esc")

# Blocks until you press esc.
keyboard.wait('esc')