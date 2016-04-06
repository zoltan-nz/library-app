# Ember.js 2.4 Tutorial - Demo Application

Updated: 29 Feb 2016

This is the original repository of the Library App.
 
For detailed, step by step implementation click here: [Ember.js 2 tutorial](http://yoember.com)

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
* Setup in `config/environment.js` file your Firebase app name. This will be your own database server.
```
// config/environment.js
firebase: 'https://YOUR-FIREBASE-APP-NAME-COMES-HERE.firebaseio.com/',
```
* Launch the application with Ember server.
```
$ ember server
```
* Open the application in your browser
```
$ open http://localhost:4200
```

### Managing Books

Simple list and edit the title

Template (books.hbs):

```
<h1>Books</h1>

<table class="table table-bordered table-striped">
  <thead>
  <tr>
    <th class="vtop">Author</th>
    <th>
      Title
      <br><small class="small not-bold">(Click on the title for editing)</small>
    </th>
    <th class="vtop">Release Year</th>
    <th class="vtop">Library</th>
  </tr>
  </thead>
  <tbody>
  {{#each model as |book|}}
    <tr>

      <td>
        {{book.author.name}}
      </td>

      <td>
        {{#if book.isEditing}}
          <form {{action 'saveBook' book on='submit'}} class="form-inline">
            <div class="input-group">
              {{input value=book.title class='form-control'}}
              <div class="input-group-btn">
                <button type="submit" class="btn btn-success" disabled={{book.isNotValid}}>Save</button>
                <button class="btn btn-danger" {{action 'cancelBookEdit' book}}>Cancel</button>
              </div>
            </div>
          </form>
        {{else}}
          <span {{action 'editBook' book}}>{{book.title}}</span>
        {{/if}}
      </td>

      <td>{{book.releaseYear}}</td>
      <td>{{book.library.name}}</td>
    </tr>
  {{/each}}
  </tbody>
</table>
```

Route (books.js):

```
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('book');
  },

  actions: {

    editBook(book) {
      book.set('isEditing', true);
    },

    cancelBookEdit(book) {
      book.set('isEditing', false);
      book.rollbackAttributes();
    },

    saveBook(book) {
      if (book.get('isNotValid')) {
        return;
      }

      book.set('isEditing', false);
      book.save();
    }
  }
});
```

#### Change Author with Select box

We need all Authors, download them in model hook with Ember.RSVP.hash.

In setup controller we separate these models.

    model() {
      return Ember.RSVP.hash({
        books: this.store.findAll('book'),
        authors: this.store.findAll('author')
      });
    },
  
    setupController(controller, model) {
      const books = model.books;
      const authors = model.authors;
  
      this._super(controller, books);
  
      controller.set('authors', authors);
    },

Create `editAuthor` and `cancelAuthorEdit` action:
 

    editAuthor(book) {
      book.set('isAuthorEditing', true);
    },
    
    cancelAuthorEdit(book) {
      book.set('isAuthorEditing', false);
      book.rollbackAttributes();
    }
    
Template:

      <td>
        {{#if book.isAuthorEditing}}
          Editing: {{book.author.name}}
          <button class="btn btn-danger" {{action 'cancelAuthorEdit' book}}>Cancel</button>
        {{else}}
          <span {{action 'editAuthor' book}}>{{book.author.name}}</span>
        {{/if}}
      </td>

We cannot use a simple input box in this case. Need a select box.

For our select box, we need a helper.

    $ ember g helper is-equal
    

