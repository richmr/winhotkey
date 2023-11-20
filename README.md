# winhotkey

A simple windows hotkey program to allow storage and playback of up to 10 critical.. um..  phrases

The phrases are never saved anywhere and are only kept in memory.  This makes it suitable for rapidly typing phrases you need to keep secret.

The phrases are "typed" on a virtual keyboard and are not copy-pasted.  This can help with entering phrases on systems that do not allow pasting.

Please note: this is not a password manager (there is no persistent storage of phrases).  But you can put your passwords in here for rapid repeating.

-----

**Table of Contents**

- [Why](#why) 
- [Installation](#installation)
- [Usage](#usage)
- [Notes](#notes)
- [License](#license)


## Why

Why did I make this?  What problem was I trying to solve?

Like many of you I use a password manager full of barely memorizable and barely typable passwords.  But this password manager has two problems.  The first is it has a short timeout.  If I want to keep accessing, say, my domain admin password I need to re-login over and over to get it.  I work around this by pasting the password in a notepad document that I never save.  Don't look at me like that, you know you do it too.  When I close the notepad, the password is not saved (assuming I disabled the new autosave feature on Notepad in Windows 11).  

The second problem is I work with PHI/PII in a heavily virtualized environment.  One control we implemented was preventing the use of copy and paste on our remote desktop sessions.  Since the password manager uses the clipboard to copy the passwords, they cannot be pasted into these RDP sessions.  This means me, and my team, have to type these randomly generated passwords in.  This can be very annoying if we need to go to many different servers or services.

Winhotkey solves both of these problems.  I put my needed passwords in it when I start my day and can access them on demand by hitting the assigned hotkey.  Since Winhotkey actually simulates typing the phrase, it will type into copy-paste restricted input fields.  The passwords are never saved to disk and are lost as soon as you stop the process.  Winhotkey even has a "Delay Type" function to help you type into console screens that eat your key presses and are copy-paste restricted.  I'm looking at you VMWare VMRC.

I hope it helps you out.

## Installation

**Reminder: Winhotkey only works on windows.  It will run on other operating systems but only in a test mode.**

```console
pip install winhotkey
```

This will install the executable script in your path.  If this is the first time you've installed a command-line tool via pip you may see some warning about the location of the executable not being in your PATH.  Add the indicated location to your PATH variable.  

## Usage

Start up the GUI:

![Open a terminal and run "winhotkey web".  Then go to indicated URL](https://github.com/richmr/winhotkey/blob/b3611ce718b7da1268e5f9a894eac19c3fcdc713/src/winhotkey/documentation/starting_gui.gif)

Add some phrases:

![Simply type in the phrase input boxes and hit ENTER or TAB](https://github.com/richmr/winhotkey/blob/b3611ce718b7da1268e5f9a894eac19c3fcdc713/src/winhotkey/documentation/setting_hotkeys.gif)

You can also change the assigned keys. Keys must match those used by the [keyboard](https://pypi.org/project/keyboard/) module.  Clicking "Set Hotkey" will enable the new keys.

Now there are several ways to use the tools:

![You can use the hotkeys at any time to type the phrase.  You can use 'Copy' and then paste in the traditional manner.  Delay Type can be used if you hotkeys and copy paste are not working.](https://github.com/richmr/winhotkey/blob/b3611ce718b7da1268e5f9a894eac19c3fcdc713/src/winhotkey/documentation/full_demo.gif)

You can also use the original CLI verson if interested.  But it has way less features and you can't change keys once its running.:

![Using the CLI verson](https://github.com/richmr/winhotkey/blob/b3611ce718b7da1268e5f9a894eac19c3fcdc713/src/winhotkey/documentation/cli_demo.gif)

## Notes

### Limitations
Greatest limitation is it only works on Windows.  The security models on OS X and linux prevent it from working well.  It will start up in a test mode and simulate responses if you run on anything but Windows.

I believe it is possible to run this in linux if "sudo" it.  Making that choice is up to you.  The OS check will stil fail, so if you want to run it on linux, you will need to edit the CLI code.

It's entirely possible other programs you have running will block the hot key hooks, which is why the "Delay Type" option exists as described above.

### Security
Is it secure?  Its as secure as putting your passwords in an unsaved text document.  If someone sees your screen, they will see the passwords.  The GUI is only accessible from localhost and passwords are never saved to disk.  All I can say is: "I'm going to use it"

## License

`winhotkey` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
