# Ember.js 2.10 Tutorial - Demo Application

Updated: 29 Nov 2016

This is the original repository of the Library App.
 
For detailed, step by step implementation click here: [Ember tutorial](http://yoember.com)

Live demo: [library-app.firebaseapp.com](https://library-app.firebaseapp.com/)

## How can you run this application locally?

I assume, you have Node.js on your computer. [Node.js installation](http://yoember.com/nodejs/the-best-way-to-install-node-js/)

* Please create an app on [Firebase](http://www.firebase.com) first. You can register there with one click and create a new app. You have to setup this app name in `config/environment.js`. (This will be your own cloud based database.)
 
* Clone this repository in your project folder
```
$ git clone git@github.com:zoltan-nz/library-app.git
```
* Change to the application directory
```
$ cd library-app
```
* Install node and bower packages
```
$ npm install && bower install
```
* Setup in `config/environment.js` Firebase settings. ([Setup firebase in your Ember project](http://yoember.com/#setup-a-server-on-firebase))

* Launch the application with Ember server.
```
$ ember server
```
* Open the application in your browser
```
$ open http://localhost:4200
```

[www.yoember.com](http://yoember.com)
