# Ember.js Octane Tutorial - Demo Application

[![CI Build Status][ci-badge]][ci-badge-url]
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4ac6ea9d92ad4ae6b7befa2d2c399def)](https://www.codacy.com/gh/zoltan-nz/library-app/dashboard)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/4ac6ea9d92ad4ae6b7befa2d2c399def)](https://www.codacy.com/gh/zoltan-nz/library-app/dashboard)
[![Coveralls Coverage Status][coveralls-badge]][coveralls-badge-url]

[ci-badge]: https://github.com/zoltan-nz/library-app/workflows/CI/badge.svg
[ci-badge-url]: https://github.com/zoltan-nz/library-app/actions?query=workflow:CI
[codacy-badge]: https://api.codacy.com/project/badge/Grade/3cc355a9c33d4f82b8c4ec6505b0636e
[codacy-badge-url]: https://app.codacy.com/app/zdebre/library-app
[coveralls-badge]: https://coveralls.io/repos/github/zoltan-nz/library-app/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/zoltan-nz/library-app?branch=master

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
