# Ember.js Octane Tutorial - Demo Application

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3cc355a9c33d4f82b8c4ec6505b0636e)](https://app.codacy.com/app/zdebre/library-app?utm_source=github.com&utm_medium=referral&utm_content=zoltan-nz/library-app&utm_campaign=Badge_Grade_Settings)
[![tests](https://travis-ci.org/zoltan-nz/library-app.svg?branch=master)](https://travis-ci.org/zoltan-nz/library-app?branch=master)
[![coverage](https://coveralls.io/repos/github/zoltan-nz/library-app/badge.svg?branch=master)](https://coveralls.io/github/zoltan-nz/library-app?branch=master)

This is the original repository of the Library App.

For detailed, step by step implementation click here: [Ember tutorial](http://yoember.com)

Live demo: [library-app.firebaseapp.com](https://library-app.firebaseapp.com/)

## How can you run this application locally?

I assume, you have Node.js on your computer. [Node.js installation](http://yoember.com/nodejs/the-best-way-to-install-node-js/)

- Please create an app on [Firebase](http://www.firebase.com) first. You can register there with one click and create a new app. You have to setup this app name in `config/environment.js`. (This will be your own cloud based database.)

- Clone this repository in your project folder

```
$ git clone git@github.com:zoltan-nz/library-app.git
```

- Change to the application directory

```
$ cd library-app
```

- Install node packages

```
$ npm install
```

- Copy `.env-sample` file and save as `.env`. Update the `API_KEY` and `PROJECT_ID`.

* Launch the application with Ember server.

```
$ ember server
```

- Open the application in your browser

```
$ open http://localhost:4200
```

[www.yoember.com - The Ember.js Tutorial](http://yoember.com)
