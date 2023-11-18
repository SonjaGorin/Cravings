/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Sonja Gorin, Jacob Martin, Gustavo Miller
 * Licensed under MIT
 * 
 * Group Project #2 MVC/Express.js
 * Cravings
 * 
 * Date : 11/14/2023 5:50:29 PM
 *******************************************************************/
const Users = require("./User");
const Category = require("./Category");
const Recipe = require("./Recipe");
const Ingredients = require("./Ingredients");

Recipe.belongsTo(Category, {
     foreignKey: "category_id"
});

Recipe.belongsTo(Users, {
     foreignKey: "category_id"
});

module.exports = { Users, Category, Recipe };
