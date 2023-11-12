# winhotkey

A simple windows hotkey program to allow storage and playback of up to 10 critically used.. um..  phrases
The phrases are not visible when you provide them to the program nor are they saved to disk anywhere.  This makes it suitable for.. phrases.. that you want to keep secret
The phrases are virtually typed on command, which may help with websites or pop-up windows that don't allow you to paste from the clipboard.

-----

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

Not available for PyPI install yet, but clone this repo, enter the repo directory and:

```console
pip install -e .
```

This will install the executable script in your path and allow you to get updates by pulling from the repository

## Usage

Run "winhotkey.exe" from an open terminal window.  You'll be asked to enter the phrases you want to repeat.  Just hit "Enter" when done.
The terminal window will need to stay open.  Winhotkey does not run as a service or in the background.

It's entirely possible other programs you have running will block the hot key hooks.  

## License

`winhotkey` is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.
