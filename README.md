# How to use handlebars with express using express-handlebars package

## Contents

- [Learning Objectives](#learning-objectives)
- [How to set up express-handlebars](#set-up)
- [Challenges](#Challenges)
  - [Challenge 1 - Helpers](#challenge-1---helpers)
  - [Challenge 2 - Another View](#challenge-2)
  - [Challenge 3 - Partials](#challenge-3---partials)
  - [Challenge 4 - Custom Helpers](#challenge-4---custom-helpers)
  - [Challenge 5 - More endpoints!](#challenge-5---using-the-templates)

### Learning Objectives

- [x] How to set up express handlebars
- [x] How to write Handlebar templates (using partials, helpers, and custom helpers)
- [x] How to use templates to quickly make lots of pages (by passing in different data to the same template)

### Set-Up
#### How to Set Up handlebars in express using `express-handlebars`
1. Install using the command `npm i express-handlebars` in the root of this repo.
1. In `app.js`, require express-handlebars:

   ```js
   const exphbs = require("express-handlebars");
   ```

2. We now need to tell express the location of the `views` folder and the views engine that we want to use:

   ```js
   app.set("views", path.join(__dirname, "views"));
   app.set("view engine", "hbs");
   ```

3. We use `app.engine` to tell express to use the view engine (express-handlebars) to render hbs files. We are also configuring express-handlebars by giving the various directories that the engine will search for, and the default layout.
   ```js
   app.engine(
   	"hbs",
   	exphbs({
   		extname: "hbs",
   		layoutsDir: path.join(__dirname, "views", "layouts"),
   		defaultLayout: "main"
   	})
   );
   ```
4. We now need to make the relevant folders. Create a `views` directory within src. This is what you set in the `app.js` file as the directory to hold the hbs files.
5. In `./src/views` create a `layouts` directory.
6. In `layouts` make a file called `main.hbs`, and copy in the following code:
```hbs
<!DOCTYPE html>
<html>
 <head>
  <title>Country statistics</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link href="//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <!-- //web font -->
</head>
 <body>
  {{{body}}}
</body>
 </html> 
```
From `express-handlebars` docs: 
>The main layout is the HTML page wrapper which can be reused for the different views of the app. `{{{body}}}` is used as a placeholder for where the main content should be rendered.
7. We now need to make a view. In the view folder create a file called `home.hbs` and copy in the following code:
```hbs
<header>
  <h1 class="">{{title}}</h1>
  <p>Hello {{username}}!</p>
</header>
<a href="./populations">Population</a>
<a href="./capitals">Capitals</a> 
```
When we use `express-handlebars` to render the home view, it will put the above code in place of `{{{body}}}` in the layout code. The values for {{title}} and {{username}} it will take from the `context` we pass it when we try to render this.
8. Now we go back to `app.js` and render the `home` view at `/` route.
9. Replace the callback in the home (`/`) route of `app.js` to render our newly created route - you can pass in your own `context`:
```js
app.get('/', (req, res) => {
  res.render("home", {
    title: 'Countries',
    username: "Mavis",
  })
})
```
What happens here is that we tell `express` to use it's `render` message with the response. We have already told it what `render` enginge to use (`handlebars`) and set up it's options in steps 2 & 3.

When we call render, we pass in the first argument as the view we want to render - i.e. the name of the file, in this case, `home`. The second argument is an object of the `context` which is just the variables we want to render in our view.

### Challenges:  
<small>
 Answers on `after-challenge-x` branch
</small>

#### Challenge 1 - Helpers
Handlebars has some built in helpers. [Click on this link and read about helpers](https://www.sitepoint.com/a-beginners-guide-to-handlebars/#helpers)

- On the `/populations` route, tell express to render a new view "populations". 
- The new view (which will be a new file called `populations.hbs` inside the views folder), should look the same as the home view, but instead of the links, it should render a list, with a list item for each country
- The list item should be a string saying the country name and it’s population
- If the population is null, don’t display a list item for that country.
- You should use the handlebars built in **if** and **each** helpers.


#### Challenge 2 

- On the `/capitals` route, tell express to render a new view "capitals". 
- This new view should look the same as the populations view but with a slight change.
- The list item should be a string saying the country name and it’s capital city.


#### Challenge 3 - Partials
Handlebars has a thing called partials, which help make sure you are not repeating code. 
They are small snippets of HTML you can use across different views.
They are called in the views as `{{> partialName}}`.
When we set up `express-handlebars` we need to tell it where to look for our partials - look [here to find out how to do that](https://github.com/ericf/express-handlebars#partialsdirviewspartials)

- Inside the `views` folder, make a folder called `partials`
- Inside `partials` make a `header.hbs` file and put the header code from your views into it.
- In the same way we set up the `layoutsDir` in our `app.engine` set up, tell `express-handlebars` where it should be looking for out partials.
- Inside each of your views, use the `header` partial instead of the html code.
- Change the partial, and you should see it change on all the views :tada:

#### Challenge 4 - Custom Helpers
You can create your own helpers to perform complex logics using the expression system that Handlebars provides. 
The syntax is: `{{{customHelper arg1 ar2 ...}}}`
We can tell `express-handlebars` about our helpers by using a `helpers` key in our `app.engine` set up, where we pass it an object of the helpers:

Register helper:
```js

const graduated = (lastSchoolYear) => {
  if(lastSchoolYear < 2019) {
      return "graduated";
   } else {
      return "not graduated";
   }
}

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    helpers: {
      graduated: graduated
    }
  })
)

```

Using helpers:
```hbs
<p>{{name}} has {{graduated lastSchoolYear}}.</p>
```

Then if this view is passed the context: `{name: Mavis, lastSchoolYear: 2011}`, this will render:
```html
<p> Mavis has graduated.</p>
```

Your challenge now is to make a new route, view, and link on the home view, with the following criteria:
  - When a user clicks the links it takes them to a view with a list of the countries.
  - If the country has a population larger than 1 million, it should display, in red text, ‘X has a large population’
  - Else, it should display, in blue text, `X has a small population`
  - All the other views/routes should stay the same (i.e. you will need to use a new view)
  - You will need to make a helper to check, and use an if statement in HBS. Instead of returning a string as in the example above, the helper could return `true` or `false` to be used in an if statement...
  - I suggest adding a class depending on the if statement, and makeing the class in the `styles.css` file.


#### Challenge 5 - Using the templates

Now let's use all of these templates some more! 

**Without adding anymore handlebars templates or HBS could,** you should add links that take you to new endpoints.
These endpoints should be: 
  - `big`: render the same as `populations` but only render countries with population larger than 1 million.
  - `small`: render the same as `populations` but only render countries with population smaller than 1 million.
  - `sorted`: render the same as `populations` but render the countries in order of population largest to smallest.

**You should just be passing in different, manipulated data to the templates we already have.** If you want to, you can style the links a bit (and even make the link a partial!):
  

If you finish, add some styling!
