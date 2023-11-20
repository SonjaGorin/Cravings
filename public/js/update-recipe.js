const editRecipe = async (event) => {
    event.preventDefault();

    const recipeName = document.querySelector("#edit-recipe-name-input").value.trim();
    const categoryId = document.querySelector("#category-id").value.trim();
    const recipeInstructions = document.querySelector("#edit-post-content-input").value.trim();

    const recipeId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1];
      
    const response = await fetch(`/api/view/${recipeId}`, {
        method: "PUT",
        body: JSON.stringify({
            name: recipeName,
            category_id: categoryId,
            instructions: recipeInstructions,
            ingredients: ingredients(),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
      
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

const ingredients = () => {
    const result = [];
    [...document.querySelectorAll(".edit-ingredient")].forEach((ingr) => {
        const ingredient = ingr.querySelector(".edit-ingredient-name-value").value;
        const measurement = ingr.querySelector(".edit-ingredient-measurement-value").value;
        const unit = ingr.querySelector(".edit-measurement-unit-value").value;
        result.push({ingredient, measurement, unit});
    })
    return result
}

document
    .querySelector(".edit-recipe-form")
    .addEventListener("submit", editRecipe);

    