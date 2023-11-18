const router = require("express").Router();
const { Recipe, Category, Users } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Category,
          attribute: "id",
        },
        {
          model: Users,
          attribute: "id",
        },
      ],
    });
    res.status(200).json(recipeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
