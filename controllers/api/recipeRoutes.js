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

router.post("/", async (req, res) => {
  try {

    const ingredientDetails = req.body.ingredients;

    const newRecipe = await Recipe.create(
     
      {
        name: req.body.name,
        instructions: req.body.instructions,
        category_id: req.body.category_id,
        user_id: req.session.user_id,
      },
      {
        include: [Ingredients]
      }
    );

      if (ingredientDetails && ingredientDetails.length > 0) {
        const createdIngredients = await Ingredients.bulkCreate(
          ingredientDetails.map((ingredient) => ({
            ingredient: ingredient.name,
            measurement: ingredient.measure,
            unit: ingredient.unit,
            recipe_id: newRecipe.id,
          }))
        );
      
        await newRecipe.addIngredients(createdIngredients);
      }

 

    if (newRecipe) {
      return res.status(201).json(newRecipe);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const upRec = await Recipe.update(
      {
        name: req.body.name,
        instructions: req.body.instructions,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const upIng = await Ingredients.update(
      {
        ingredient: req.body.ingredient,
        measurement: req.body.measurement,
        unit: req.body.unit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (upRec && upIng) {
      return res.status(200).json([upRec, upIng, "hello"]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
