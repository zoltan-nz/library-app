# Ember.js 2.0 Tutorial - Bulding a complex web application

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

## Lesson 1

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

### Turn on a couple of debugging option

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

### Homework

Create a `Contact` page. Extend the navigation bar with "Contact" menu.

## Lesson 2

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
                <button class="btn btn-primary btn-lg btn-block">Request invitation</button>
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
    <button class="btn btn-primary btn-lg btn-block" disabled="{{if isDisabled 'disabled'}}">Request invitation</button>
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
<button class="btn btn-primary btn-lg btn-block" disabled="{{unless isValid 'disabled'}}">Request invitation</button>
```

#### Add our first Action

Update your `<button>` line again.

```html
<button class="btn btn-primary btn-lg btn-block" disabled="{{unless isValid 'disabled'}}" {{action 'saveInvitation'}}>Request invitation</button>
```

You can try out in your browser, that if you click on the button, you will get a nice error message, which explaines you has to implement this action in your controller. Let's do that.

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

  actions: {
    saveInvitation: function() {
      alert('Saving of the following email address is in progress: ' + this.get('emailAddress'));
      this.set('responseMessage', "Thank you! We've just saved your email address: " + this.get('emailAddress'));
      this.set('emailAddress', '');
    }
  }

});
```
If you click on the button, `saveInvitation` action will be called and show an alert box, after it will setup a responseMessage, finally delete the content of `emailAddress`.

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
            <button class="btn btn-primary btn-lg btn-block" {{action 'sendInvitation'}} disabled="{{unless isValid 'disabled'}}">Request invitation</button>
        </div>

    </div>

    {{#if responseMessage}}
      <div class="alert alert-success">{{responseMessage}}</div>
    {{/if}}


    <br/><br/>

</div>
```

### Homework

You already have an amazing `Contact` page, where we would like to add a contact form. In this contact form would be two fields. One field for email address and one field for text message. And there would be a “Send message” button. This button should be active only if email address field not empty and valid and there is some message in the text box. After clicking on that “Send message” button should appear an Alert with the email address and the message. When you close the alert message, the form should be cleared and a message should appear in the page in green box, that we got your message and get in touch soon.

Hint: you already have a `contact.hbs` but you need a controller where you manage these logics.

Bonus point if you can add validation to `textarea`. One option, the textarea shouldn't be empty, other option, the length of the message at least 5 character long.

    {{textarea class="form-control" placeholder="Your message. (At least 5 characters.)" rows=“7" value=message}}

Short version of computed property for greater than or equal:

    Ember.computed.gte('yourProperty', number)

(Please note, it is `computed.gte` and not `computed.get`.)

If you have two computed property, and both has to be true you can use a third computed property with `and`.

    Ember.computed.and('firstComputedProperty', 'secondComputedProperty')

You can get a string computed property length with `.length`. If your computed property is `message`, the length of that message is `message.length`.

In terms of feedback on a form, this is a really cool solution on bootstrap. http://getbootstrap.com/css/#with-optional-icons

## Lesson 3

### Our first Ember.js Model

We ask email addresses on the home page, but we don't save them at the moment in the database. It is time to implement this feature in our website.

> Please read the detailed introduction on Ember.js website about Ember.js Models: http://guides.emberjs.com/v2.0.0/models/

Let's create our first model where we save email addresses for invitation. Type the following command in your command line.

    ember g model invitation email:string

Hope you read about `store` in the official Guide. Let's use it.

Update your `app/controllers/index.js` controller action. Instead of showing a useless alert message, we try to save our data.

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({

  headerMessage: 'Coming Soon',
  responseMessage: '',
  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

  actions: {
    saveInvitation: function() {
      var email = this.get('emailAddress');

      var newInvitation = this.store.createRecord('invitation', {email: email});
      newInvitation.save();

      this.set('responseMessage', "Thank you! We've just saved your email address: " + this.get('emailAddress'));
      this.set('emailAddress', '');
    }
  }
});
```

Check your browser, open the browser's console. Try to save an invitation email address on home page. You will see an error message in the console.

Ember.js tried to send that data to a server, but we don't have a server yet. Let's build one.

### Setup a server on Firebase

Firebase is a server and API service. Very easy to use. http://www.firebase.com

1. Create an account.
2. Read the guide and help section, especially the instructions about EmberFire: https://www.firebase.com/docs/web/libraries/ember/guide.html
3. Follow the instructions. First, run the following command in your terminal: `ember install emberfire`
4. Go back to Firebase and create an app there. Remember the name of your app.
5. Update your config file in your Ember.js app. In `config/environment.js` should have a `firebase` property. Update the url with your Firebase app url what you have just created on Firebase website.

```javascript
// config/environment.js

var ENV = {
        modulePrefix: 'library-app',
        environment: environment,
        contentSecurityPolicy: {
            'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com"
        },
        firebase: 'https://WRITE_HERE_YOUR_APP_NAME.firebaseio.com/',
        baseURL: '/',
        locationType: 'auto',
```

Try out Request Invitation button again, check the browser's console messages and open the Firebase website, and check your app dashboard. You will see, that the email address, what you just saved on your home page, is sent to Firebase and it is saved on the server.

Well done!

### Promise and the `this` context in javascript

Promise is a unique asynchronous feature in javascript. Basically an object, which hasn't completed yet, but is expected in the future. You can read more about it on Mozilla website: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise

In our code, we use a Promise: `.save()`

The `save` method on Ember Data Model is a `Promise`. It promises us that it is trying to save our data. It could be successfull or maybe return with error.

We can catch the result of a `Promise` with a chained `.then()`. In our example:

    newInvitation.save().then(function(response) {
      console.log('Email address is saved.')
    })

If the saving process is successfull, 'fulfilled', then we will get back a response from the server, what we can catch in our function parameter.

We have to move our lines wich showing our success message inside this new function, because we would like to show that message only, if the data is really saved.

If you would simply just copy paste, you will realize the code will not work as expected.

    newInvitation.save().then(function(response) {
      this.set('responseMessage', "Thank you! We've just saved your email address: " + this.get('emailAddress'));
      this.set('emailAddress', '');
    })

In javascript the `this` points always to the object which is wrapping around. In the above example, the `this` will be undefined, because we are in a function after the Promise. Please learn more about it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

We have to save the controller context in a local variable, what we can use inside our `then`.

Please update your controller.

```javascript
// app/controllers/index.js

import Ember from 'ember';

export default Ember.Controller.extend({

    headerMessage: 'Coming Soon',
    responseMessage: '',
    emailAddress: '',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),

    actions: {
        saveInvitation: function() {
            var _that = this;
            var email = this.get('emailAddress');

            var newInvitation = this.store.createRecord('invitation', {
                email: email
            });
            newInvitation.save().then(function(response) {
                _that.set('responseMessage', "Thank you! We saved your email address with the following id: " + response.get('id'));
                _that.set('emailAddress', '');
            });
        }
    }
});
```

We save the `this` controller context in a `_that` local variable. We use this local variable inside our function after Promise. The above example uses `response` and shows the `id` of the generated database record.

Great, our home home page is ready.

### Create an Admin page

We would like to list the saved email addresses.

Let's create a new route and page what we can reach with the following url: `http://localhost:4200/admin/invitations`

    ember g route admin/invitations

Add this new page to the `navbar.hbs` with a dropdown.

```html
<!-- app/templates/navbar.hbs -->
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
            {{#link-to 'about' tagName="li"}}<a href>About</a>{{/link-to}}
            {{#link-to 'contact' tagName="li"}}<a href>Contact</a>{{/link-to}}
      </ul>

      <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin<span class="caret"></span></a>
              <ul class="dropdown-menu">
                  {{#link-to 'admin.invitations' tagName="li"}}<a href>Invitations</a>{{/link-to}}
              </ul>
          </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
```

Add a table to `app/templates/admin/invitations.hbs`

```html
<!-- app/templates/admin/invitations.hbs -->

<h1>Invitations</h1>

<table class="table table-bordered table-striped">
    <thead>
      <tr>
          <th>ID</th>
          <th>E-mail</th>
      </tr>
    </thead>
    <tbody>
    {{#each model as |invitation|}}
        <tr>
            <th>{{invitation.id}}</th>
            <td>{{invitation.email}}</td>
        </tr>
    {{/each}}

    </tbody>
</table>
```

We use `{{#each}}{{/each}}` handlebar block to generate a list. The `model` variable will contain the array what we download from the server. Ember.js automatically populate responses from the server if we download it in the next step using our route file.

Let's download our data from the server using route and Ember Data.

> Please read more about Routes Model: http://guides.emberjs.com/v2.0.0/routing/specifying-a-routes-model/

Add the following code to your `app/routes/admin/invitations.js` file:

```javascript
// app/routes/admin/invitations.js
import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('invitation');
  }

});
```

Launch your app and check your table in Admin.

### CRUD interface for libraries

We will create a new section in our app, where we can add new library or list the created libraries.

Firstly we create our `library` model.

    ember g model library name:string address:string phone:string

Secondly we create our new route. At the moment we do it without ember-cli, only manually adding the following lines to our `router.js`:

```javascript
// app/router.js

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('contact');

  this.route('admin', function() {
    this.route('invitations');
  });
  this.route('libraries', function() {
    this.route('new');
  });
});

export default Router;
```

Now we create 3 new templates. Our main `libraries.hbs`, a `libraries/index.hbs` for list and a `libraries/new.hbs` for new form.

    ember g template libraries
    ember g template libraries/index
    ember g template libraries/new

Update your `navbar.hbs` main navigation section as following.

```html
<!-- app/templates/navbar.hbs -->

      <ul class="nav navbar-nav">
            {{#link-to 'index' tagName="li"}}<a href>Home</a>{{/link-to}}
            {{#link-to 'libraries' tagName="li"}}<a href>Libraries</a>{{/link-to}}
            {{#link-to 'about' tagName="li"}}<a href>About</a>{{/link-to}}
            {{#link-to 'contact' tagName="li"}}<a href>Contact</a>{{/link-to}}
      </ul>

```

Add a submenu to `libraries.hbs`

```html
<!-- app/templates/libraries.hbs -->
<h1>Libraries</h1>

<div class="well">
    <ul class="nav nav-pills">
      {{#link-to 'libraries.index' tagName="li"}}<a href>List all</a>{{/link-to}}
      {{#link-to 'libraries.new' tagName="li"}}<a href>Add new</a>{{/link-to}}
    </ul>
</div>

{{outlet}}
```

Check your app, you should see a new menu point and there could be two submenu.

Other two templates have the following content.

```html
<!-- app/templates/libraries/index.hbs -->
<h2>List</h2>

{{#each model as |library|}}
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{library.name}}</h3>
        </div>
        <div class="panel-body">
            <p>Address: {{library.address}}</p>
            <p>Phone: {{library.phone}}</p>
        </div>
    </div>
{{/each}}
```

We generate a list from our model which will be downloaded in the route. We are using `panel` style from bootstrap here.

```html
<!-- app/templates/libraries/new.hbs -->
<h2>Add a new local Library</h2>

<div class="form-horizontal">
    <div class="form-group">
        <label class="col-sm-2 control-label">Name</label>
        <div class="col-sm-10">
            {{input type="text" value=model.name class="form-control" placeholder="The name of the Library"}}
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Address</label>
        <div class="col-sm-10">
            {{input type="text" value=model.address class="form-control" placeholder="The address of the Library"}}
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Phone</label>
        <div class="col-sm-10">
            {{input type="text" value=model.phone class="form-control" placeholder="The phone number of the Library"}}
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default" {{action 'saveLibrary' model}}>Add to library list</button>
        </div>
    </div>
</div>
```

We use `model` as our value store. You will see soon, that our model will be created in the route. The action will call `saveLibrary` function and we pass the `model` parameter to that function.

In your `app/routes` folder create `libraries` folder and add two js files: `index.js` and `new.js`

```javascript
// app/routes/libraries/index.js
import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('library');
  }

})
```

We download here all the library from the server.


```javascript
// app/routes/libraries/new.js
import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.createRecord('library');
  },

  actions: {
    saveLibrary: function (newLibrary) {
      var _that = this;

      newLibrary.save().then(function (response) {
        _that.transitionTo('libraries');
      })
    },

    willTransition: function (transition) {
      var model = this.controller.get('model');
      if (model.get('isNew')) {
        model.destroyRecord();
      }
    }
  }
});
```

In the above Route we create a new record and it will be the `model`. It automatically appears in the controller and in the template. In the `saveLibrary` action we accept a param and we save that model, after we send the application back to Libraries home page with `transitionTo`.

There is a special action or event, called `willTransition`, which is an Ember.js action, will be called when you leave that page. It will remove the model if we don't save in the database.

### Homework

Improve further your Contact Page.

1. Create a `contact` model with `email` and with `message` field.
2. Save that model in the server when someone click on "Send" button on Contact form. Update your contact.js controller.
3. Create an Admin page under `http://localhost:4200/admin/contacts`
4. List all saved messages in a table.
