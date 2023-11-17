import { db } from "../db/schema/index";
import { RECIPES } from "../../constants/recipes";
import { recipes } from "../db/schema/recipes";

const fillDb = async () => {
  // await db.insert(recipes).values(RECIPES);
};

void fillDb();
