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
require('dotenv').config();

const connection = require("../config/newdb");
const Chalk = require('chalk');
const messages = require("../utils/formatter")
const dic = require("./queries"); // Collection of SQL queries 

/**
 * This function will validate the database exists or not. This saves 1 step to manually create the
 * database prior to running the application. Notice that we are registering the number of tables in the env
 * but we need to consider sequelize sessions table 
 * @param {string} value - database to validate
 * @returns 
 */
exports.validateDB = async function (value) {
     const cnn = await connection.connectmysql(process.env.DB_NAME); // Get connection to database

     const [rows, fields] = await cnn.execute(dic.sql.validatetables + `"${value}"`);

     if (rows[0].TablesCount !== parseInt(process.env.DB_COUNT) + 1) {

          messages.msg(Chalk.bgRed(dic.messages.createdatabase), null, null, 80);
          return { created: true, data: false };

     } else {
          messages.msg(Chalk.bgGreen(`DATABASE ${value} ALREADY EXISTS!`));
          return { created: true, data: true };
     };

}