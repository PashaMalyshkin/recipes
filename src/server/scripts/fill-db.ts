import { INGREDIENTS } from "../../constants/ingredients";
import { db } from "../db/schema/index";
import { ingredients } from "../db/schema/ingredients";

const fillDb = async () => {
  await db.insert(ingredients).values(INGREDIENTS);
};

void fillDb();
