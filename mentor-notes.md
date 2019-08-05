## Why this workshop exists

- Teach people how to set up `express-handlebars` (in walkthrough)
- Teach people some handlebars syntax (in challenges 1-4)
- Show how handlebars can make for rapid page creation! (challenge 5)

## Steps for delivery

1. Walk through to set up express handlebars, up to the stage on branch `after-walkthrough`
  - This is just going through the slightly fiddly part of giving directories and showing exactly what this means, should be quite short.
  - The steps in the readme are pretty thorough, I recommend still doing it as a code along, and just explaining what each line is doing as you go.
2. Students should do challenges alone.
  - For challenges 1-4 the guidance of links and readme should help a lot! Just make sure they are doing the right thing. Shouldn't take too long to get to challenge 4, then 4 and 5 will take a while.
  - In **challenge 1** the links for the the helpers are just talking about the `handlebars` not `express-handlebars` watch out for potential confusion (see below)
  - **challenge 2** should be quite quick, basically a c+p from 1
  - **challenge 3** make sure they are registering partials correctly, should basically just tell them if they can't work it out quite quickly.
  - **challenge 4** check the solution, but there is probably a lot of other ways this could be done - is a bit more complex than the example helper, hence the guided hints
  - For **challege 5** students **should not** make new templates - they should be manipulating the data **before** passing it into the templates.


  ## Potential confusion

  When googling it's hard to find specific help for configuring `express-handlebars` as opposed to just help with `handlebars` - eg in `exphbs` we don't need to do the whole registering partials or helpers specifically, as it gives us a simple way of doing it.
  

