const router = require("express").Router();
const { Recipe, Category } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Category,
          attribute: "id",
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
