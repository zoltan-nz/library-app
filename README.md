# Library App (Draft)

Ember.js 2.0 tutorial for absolute beginners. (Work in progress.)

#### Previous tutorials

* Bookstore API (Ruby on Rails): https://github.com/szines/bookstore-api
* Bookstore Client (Ember.js): https://github.com/szines/bookstore-client
* Contacts App Client (Ember.js): https://github.com/szines/contacts-app-client

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

```
    {
      "name": "library-app",
      "dependencies": {
        "ember": "2.0",
        ...
        "ember-data": "2.0",
        ...
      }
    }
```

Update version number of `"ember-data"` in `./package.json`:

```
    {
      "name": "library-app",
      ...
      "devDependencies": {
        ...
        "ember-data": "2.0",
        ...
      }
    }
```

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

```javascript
    //..
    if (environment === 'development') {
      // ENV.APP.LOG_RESOLVER = true;
      ENV.APP.LOG_ACTIVE_GENERATION = true;
      ENV.APP.LOG_TRANSITIONS = true;
      ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      ENV.APP.LOG_VIEW_LOOKUPS = true;
    }
    //..
```
Check your app and open the Console in Chrome. You will see a couple of extra information what Ember.js automatically doing.

### Add Sass and Bootstrap to your app

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

### Create a navigation partial

We will use bootstrap navigation bar to create a nice header section for our app.

Update your main template file. Delete the example content and add the following code to your `./app/templates/application.hbs`.

```html
    <div class="container">
      {{partial 'navbar'}}
      {{outlet}}
    </div>
```

Generate a `navbar.hbs` file with the following command in you terminal.

    ember generate template navbar

You can open `./app/templates/navbar.hbs` in your editor and add the following lines:

```html
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          {{#link-to 'index' class="navbar-brand"}}Library App{{/link-to}}
        </div>

        <div class="collapse navbar-collapse" id="main-navbar">
          <ul class="nav navbar-nav">
                {{#link-to 'index' tagName="li"}}<a href>Home</a>{{/link-to}}
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
```

Launch your application with `ember server`. You should see your new navigation bar in your browser.

You can update your `app.scss` file to add some extra padding to the top. The updated `./app/styles/app.scss` content:

```css
    @import "bootstrap";

    body {
      padding-top: 20px;
    }
```

### Create a new About page and add the link to the menu bar

Run the following command in your terminal

    ember generate route about

A new route and template created in your project.

Open your new `./app/templates/about.hbs` file in your editor, delete its content and add the following line:

    <h1>About Page</h1>

You can launch your app with `ember server` and navigate to http://localhost:4200/about page, you should see the created `About Page` header message. If you click on `Home` in your menu bar, your page will be empty. Let's fix that.

Create a new `index` template with the following command in your terminal:

    ember generate template index

Open in your editor the generated `./app/templates/index.hbs` file and add the following:

    <h1>Home Page</h1>

If you launch your app, you should see the above message on your home page, however we still doesn't have About link in our menu bar.

Open your `./app/templates/navbar.hbs` and add the following line to the `ul` section under `Home` link:

    {{#link-to 'about' tagName="li"}}<a href>About</a>{{/link-to}}

Your `ul` section in `navbar.hbs` should look like this:

```html
    <ul class="nav navbar-nav">
          {{#link-to 'index' tagName="li"}}<a href>Home</a>{{/link-to}}
          {{#link-to 'about' tagName="li"}}<a href>About</a>{{/link-to}}
    </ul>
```

If you check your app in the browser, you should see `Home` and `About` link in your menu bar, you can click on them and you will see how the page content and the url are changed. The `active` state of the link changes the style of the menu link automatically as well.

Homework: Create a `Contact` page.

### Coming Soon homepage with an email input box

Let's create a coming soon jumbotron on the home page with an email input box, where users can subscribe for a newsletter.

* Bootstrap's jumbotron: http://getbootstrap.com/components/#jumbotron
* Bootstrap's forms: http://getbootstrap.com/css/#forms

#### Only static html5 and style

Add a static jumbotron, an input box and a button to `index.hbs`.

```html
    <div class="jumbotron text-center">
        <h1>Coming Soon</h1>

        <br/><br/>

        <p>Don't miss our launch date, request an invitation now.</p>

        <div class="form-horizontal form-group form-group-lg row">
            <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
              <input type="email" class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus"/>
            </div>
            <div class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3">
                <button class="btn btn-primary btn-lg btn-block">Send invitation</button>
            </div>

        </div>

        <br/><br/>
    </div>
```

#### Requirements

We would like to cover the following requirements:

* "Invite me" button should be inactive when input box is empty
* "Invite me" button should be inactive when the content in the input box is not valid email address.
* Show a response message after clicking of "Invite me" button.
* Clear the input box when invitation sent.

#### isDisabled

We can add dynamic values to standard html properties using conditionals. We can use our controller to add or modify the value of a variable, what we use in our template. Check the following solution. We create a boolean variable, let's call it `isDisabled` will provide the state of `disabled` html attribute.

From the official guide:
> Each template has an associated controller: this is where the template finds the properties that it displays.
> You can display a property from your controller by wrapping the property name in curly braces.

Add `disabled` property with `{{if}}` helper. (Note: adding `disabled` style to the class will not disable the button properly when we will implement an `action` later.)

```html
    <button class="btn btn-primary btn-lg btn-block" disabled="{{if isDisabled 'disabled'}}">Send invitation</button>
```

> More about conditionals in templates:
> http://guides.emberjs.com/v2.0.0/templates/conditionals/

Create index controller

    ember g controller index

> Read more about Ember controllers here:
> http://guides.emberjs.com/v2.0.0/controllers/

Add `isDisabled` property to the controller. Default value is `true`.

```javascript
    //app/controllers/index.js
    import Ember from 'ember';

    export default Ember.Controller.extend({

      isDisabled: true

    });
```

You can check your app, the button will be disabled by default.

#### Computed Properties and Observers

Computed Properties and Observers are important features of Ember.js. Please read more about it in the official guide first.

> Computed Properties: http://guides.emberjs.com/v2.0.0/object-model/computed-properties/
> Observers: http://guides.emberjs.com/v2.0.0/object-model/observers/

Please note, we will use the traditional syntax in the following code, it means `.property()` and `.observes()` will be attached to the functions.

First, update your html code with input component syntax and add a `value` to our email input box.

Modify `<input>` line as follow in `index.hbs`:

```html
{{input type="email" value=emailAddress class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus"}}
```

As you can see, we use `emailAddress` variable, or better word, a "property" where we would like to store the value of the input box.

If you type something in the input box, it will update this variable in the controller as well.

You can use the following code in your controller to demonstrate the differences between computed properties and observers:

```
    emailAddress: '',

    actualEmailAddress: function() { 
      console.log(‘actualEmailAddress function is called: ', this.get('emailAddress'));
    }.property('emailAddress'),

    emailAddressChanged: function() { 
      console.log('observer is called', this.get('emailAddress')); 
    }.observes('emailAddress')
```

Observers will be called always when the value of the `emailAddress` changes, the computed property only when you use it. Use Ember Inspector, click on `/# Routes` section, find the `index` route, in the same line, under `Controller` column, you will see an `>$E` sign, click on it. Open the console in Chrome and you will see something like this: `Ember Inspector ($E):  Class {__nextSuper: undefined, __ember_meta__: Object, __ember1442491471913: "ember443"}`

If you type the following in the console: `$E.get('actualEmailAddress')`, you should see the above created `console.log` message, that "actualEmailAddress is called".

Please play with the above example and try to create your own observers and computed properties.

We can rewrite our `isDisabled` with computed property as well.

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isDisabled: function() {
    return this.get('emailAddress') === '';
  }.property('emailAddress')

});
```

But the above solution works only if the input box is not empty. It is not checking how valid the email address.

You can use the Ember.js 2.0 syntax as well.

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isDisabled: Ember.computed('emailAddress', function() {
    return this.get('emailAddress') === '';
  }

});
```

Or you can use the short version:

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isDisabled: Ember.computed.empty('emailAddress')

});
```
> More about `Ember.computed` short versions: http://emberjs.com/api/classes/Ember.computed.html

#### isValid

More elegant solution if we enable our "Invite me" button only that case when the content of input box contains valid email address.

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

});
```

We deleted the `isDisabled` property instead we will use `isValid`. Update your `index.hbs` `<button>` as below.

```html
<button class="btn btn-primary btn-lg btn-block" disabled="{{unless isValid 'disabled'}}">Send invitation</button>
```

#### Add our first Action

Update your `<button>` line again.

```html
<button class="btn btn-primary btn-lg btn-block" disabled="{{unless isValid 'disabled'}}" {{action 'sendInvitation'}}>Send invitation</button>
```

You can try out in your browser, that if you click on the button, you will get a nice error message, which explaines you has to implement this action in your controller. Let's do that.

```javascript
\\ app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

  actions: {
    sendInvitation: function() {
      alert('Send invitation to this address: ' + this.get('emailAddress'));
      this.set('responseMessage', "Thank you! We've just sent an email to the following address: " + this.get('emailAddress'));
      this.set('emailAddress', '');
    }
  }

});
```
If you click on the button, `sendInvitation` action will be called and show an alert box, after it will setup a responseMessage, finally delete the content of `emailAddress`.

```html
<!-- app/templates/index.hbs -->
<div class="jumbotron text-center">
    <h1>Coming Soon</h1>

    <br/><br/>

    <p>Don't miss our launch date, request an invitation now.</p>

    <div class="form-horizontal form-group form-group-lg row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
            {{input type="email" value=emailAddress class="form-control" placeholder="Please type your e-mail address." autofocus="autofocus"}}
        </div>
        <div class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3">
            <button class="btn btn-primary btn-lg btn-block" {{action 'sendInvitation'}} disabled="{{unless isValid 'disabled'}}">Send invitation</button>
        </div>

    </div>

    {{#if responseMessage}}
      <div class="alert alert-success">{{responseMessage}}</div>
    {{/if}}


    <br/><br/>

</div>
```
