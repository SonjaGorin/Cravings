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
const logout = async () => {
     const response = await fetch('api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
     });

     if (response.ok) {
          document.location.replace('/login');
     } else {
          alert(response.statusText);
     }
};

document.querySelector('#logout').addEventListener('click', logout);
