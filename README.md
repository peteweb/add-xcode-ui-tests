# Add XCode UI Tests to an existing XCode project #

If you use NativeScript, Appcelerator Titanium or any other 'cross compile' platform solution, you'll already know that some things are fantastically easy for you to do (such as write one set of logic for multiple platforms), but others (such as writing reliable automated tests) can be a minefield.

In most cases for iOS development with these solutions, XCode projects are built 'on the fly', meaning at your project file today won't be the same as your project file tomorrow.

This can make things like adding in native iOS UI Tests, a complete nightmare.

So what we really need, is a way to make this better. What if we could parse our XCode project after compile, and add in some swift tests that we maintained elsewhere?

Well - now we can.

### What is this repository for? ###

* Adding in .swift iOS tests to dynamically created XCode projects
* Promoting the awesome benefits of UI Testing
* Making life easier

### How do I get set up? ###

* Write some .swift UI Tests for your existing project ([here's a bit of an intro](https://developer.apple.com/videos/play/wwdc2015/406/))
* Extract these tests out into a separate file folder / location (see the basetests folder for an example)
* Change the values of the config.json file to directories that are readable/writable (all of which are required and must be absolute or relative to the location you execute the next command)
* Run `node app.js`
* Open up the finished XCode project inside your chosen destination directory
* Test all the things

### Contributors ###

* [Pete Lancaster](http://petedoeswebthings.com/)
* [Gary George](http://georgewebdesign.co.uk/)

### Who do I talk to? ###

* [Pete](http://twitter.com/peteweb) on Twitter

### EPIC DISCLAIMER ###

This is very much a work in progress, and essentially - a proof of concept. If you use this, and it mares your project up - that's your bad - and you should be backing up your files more. Use with caution, and put your head between your legs if required.

Tested only with XCode 7.2.1 - believed to work with 7.3.*.