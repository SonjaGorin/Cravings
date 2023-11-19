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

router.get("/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
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
  const up =  await Recipe.update(
   
    {
      name: req.body.name,
      instructions: req.body.instructions
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
