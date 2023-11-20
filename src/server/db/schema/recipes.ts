import { relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { ingredientsToRecipes } from "./ingredients";

export const recipes = pgTable("recipes", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  author: text("author").notNull(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  category: one(categories, {
    fields: [recipes.categoryId],
    references: [categories.id],
    relationName: "category_recipes",
  }),

  ingredientsToRecipes: many(ingredientsToRecipes),
}));
