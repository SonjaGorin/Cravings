const router = require("express").Router();
const { Recipe, Category } = require("../../models");

router.get("/", async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: {
          model: Recipe,
          required: true
      }
      });
      res.status(200).json(categoryData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  