import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { recipes } from "./recipes";

export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow(),
  title: text("title").notNull(),
});

export const ingredientsToRecipes = pgTable("ingredients_to_recipes", {
  id: uuid("id").defaultRandom().primaryKey(),
  ingredientId: uuid("ingredient_id")
    .notNull()
    .defaultRandom()
    .references(() => ingredients.id),
  recipeId: text("recipe_id")
    .notNull()
    .references(() => recipes.id),
});

export const ingredientsToRecipesRelations = relations(
  ingredientsToRecipes,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [ingredientsToRecipes.recipeId],
      references: [recipes.id],
      relationName: "recipes_ingredients",
    }),
    ingredient: one(ingredients, {
      fields: [ingredientsToRecipes.ingredientId],
      references: [ingredients.id],
      relationName: "ingredients_recipes",
    }),
  }),
);

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  ingredientsToRecipes: many(ingredientsToRecipes, {
    relationName: "ingredients_to_recipes",
  }),
}));
