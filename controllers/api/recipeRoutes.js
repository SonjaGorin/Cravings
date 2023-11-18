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



router.delete('/:id', async (req, res) => {

  try {
    const delId = await Recipe.destroy({
      where: {
        id: req.params.id
      }
    });

    if (delId) {
      
      return res.status(200).json({delId});
    } else {
      
      return res.status(404).json(err);
    }
  } catch (err) {
    
    res.status(500).json(err);
  }
});


module.exports = router;
