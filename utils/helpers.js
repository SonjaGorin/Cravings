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
const dateFormatted = (date) => {
     var when = new Date(date);
     var year = when.getFullYear(), month = when.getMonth(), day = when.getDate();

     return `${day}/${month}/${year}`;
};

const compareequal = (v1, v2) => {
     return v1 === v2 ? true : false;
}

module.exports = { dateFormatted, compareequal };