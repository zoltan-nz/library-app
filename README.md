# Library App

Ember.js 2.0 tutorial for absolute beginners.

## Prerequisites

* node.js 0.12.0 or newer

Suggested way to install node.js: https://github.com/creationix/nvm

* Ember Inspector Chrome Extension

Install Ember Inspector Chrome extension in your Chrome Browser: [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en)

## Implementation log

### Install ember-cli

    npm install -g ember-cli

### Create the app

    ember new library-app

### Launch the app

    ember server

### Update Ember.js and Ember-Data to 2.0

Update version number of `"ember"` and `"ember-data"` in `./bower.json`:

    {
      "name": "library-app",
      "dependencies": {
        "ember": "2.0",
        //...
        "ember-data": "2.0",
        //...
      }
    }

Update version number of `"ember-data"` in `./package.json`:

    {
      "name": "library-app",
      //..
      "devDependencies": {
        //..
        "ember-data": "2.0",
        //..
      }
    }

Run `npm update` and `bower update` in your console:

    npm update
    bower update

If you see something similar when you run `bower update`

    Unable to find a suitable version for ember, please choose one:
        1) ember#>=1.4 <2 which resolved to 1.13.10 and is required by ember-cli-shims#0.0.3, ember-load-initializers#0.1.5
        2) ember#^2.0.0 which resolved to 2.0.2 and is required by ember-data#2.0.0
        3) ember#2.0 which resolved to 2.0.2 and is required by library-app
        4) ember#> 1.5.0-beta.3 which resolved to 2.0.2 and is required by ember-resolver#0.1.21

    Prefix the choice with ! to persist it to bower.json

Select the number with `ember#2.0 which resolved to 2.0.2 and is required by library-app`, in this case the answer is `!3` and hit enter. (`2.0.2` could be different, because there could be newer version later.)

Launch or relaunch your application with `ember server` or with `ember s` and check the verision number in browser console.

### Turn on a couple of debugging options

You can find a list of debugging options in `./config/environment.js` file. Remove the comment sign as follow:

    //..
    if (environment === 'development') {
      // ENV.APP.LOG_RESOLVER = true;
      ENV.APP.LOG_ACTIVE_GENERATION = true;
      ENV.APP.LOG_TRANSITIONS = true;
      ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      ENV.APP.LOG_VIEW_LOOKUPS = true;
    }
    //..

Check your app and open the Console in Chrome. You will see a couple of extra information what Ember.js automatically doing.

### Add Sass and Bootstrap sass version to your app

Exit your `ember server` with `Ctrl+C` in your terminal.

Run the following two command in your terminal.

    ember install ember-cli-sass
    ember install ember-cli-bootstrap-sassy

You will see, that your `./package.json` and `./bower.json` are extended with a couple of lines.

Rename your `app.css` to `app.scss` with the following terminal command or you can use your editor to rename the `./app/styles/app.css` file:

    mv app/styles/app.css app/styles/app.scss

Open `./app/styles/app.scss` file in your editor and add the following line:

    @import "bootstrap";

Relaunch your app with `ember server`. You should see in the browser, that 'Welcome to Ember' uses Bootstrap default font.
