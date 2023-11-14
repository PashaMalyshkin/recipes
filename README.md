We will build app to track your favourite recipes.

When you first go to app - you need to see list of last added 5 recipes.

You should be able to go to separate page, where you can whole list of recipes (paginated), and be able to filter and sort them and search recipe by name or description.

Each recipe should have its own page with its full information. On single page you should see 3 related products.

You need to have add recipe modal to create recipe. The field you will have in create recipe modal:

Name - text input
Slug - text input (only lowercase letters without spaces) this-is-example-of-right-input should be generated automatically using name field. Should be unique in db
Category - select
Short description - textarea
Full description - textarea
List of ingredients (you can select from list of ingredients or create new ingredient) - combobox
Author - text input
Stack to use in project:

Next 14
TRPC
Drizzle
Postgres
Tailwind
Shadcn + Radix for styling
React hook forms for forms and validations
Zustand