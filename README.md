Github Emoji fuzzy finder
=========================

A Chrome extension that searches through the descriptions of emojis made by
@muan in [this search engine](https://github.com/muan/emoji/).

Check it out!
![The functionality](github-emojis.gif)

Installation
------------

[Install it from the webstore](https://chrome.google.com/webstore/detail/github-emjois/imlkehkfogifndhomephmkbmgpfgeglh).

or

1. Clone this repo.
2. Load its directory in Google Chrome as a unpacked extension.
3. Go to any github comment box, type $ and some text to search through the
   emoji description database.
4. ?????
5. Profit.

Hacking on this
===============

Clone the repo with submodules

`git clone --recursive git@github.com:koddsson/github-emojis-chrome.git`

Change into the `github-emojis` submodule and install bower requirements.

`cd github-emojis-chrome/github-emojis && bower install`

Now you can load the extension in Chrome and hack on it to add a feature or
fix a bug. If you do any changes to the submodule make sure that you submit
that to the `github-emojis` project as a separate PR.
