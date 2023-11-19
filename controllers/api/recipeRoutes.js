const router = require("express").Router();
const { Recipe, Category, Users, Ingredients } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Category,
          attributes: ["id"],
        },
        {
          model: Users,
          attribute: ["id"],
        },
      ],
    });
    if (recipeData) {
      res.status(200).json(recipeData);
    } else {
      return res.status(404).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delId = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (delId) {
      return res.status(200).json({ delId });
    } else {
      return res.status(404).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
  const up =  await Recipe.update({
    include: [{
        model : Ingredients,
        attributes: ["ingredient", "measurement", "unit"]
    }]
  },
    {
      name: req.body.name,
      instructions: req.body.instructions,
      ingredient: req.body.ingredient,
      measurement: req.body.measurement,
      unit: req.body.unit

    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  if (up) {
    return res.status(200).json(up)
  }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
