import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { recipes } from "./recipes";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").defaultNow(),
  title: text("title").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  recipes: many(recipes, {
    relationName: "category_recipes"
  }),
}));
