const newRecipeFormHandler = async (event) => {
    event.preventDefault();
  
    const recipeName = document.querySelector("#add-recipe-name-input").value;
    const preparationInstructions = document.querySelector("#add-post-content-input").value;
  
    const response = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
            name: recipeName,
            instructions: preparationInstructions
        }),
        headers: {"Content-Type": "application/json"}
    });
  
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
  };
  
document
    .querySelector(".add-recipe-form")
    .addEventListener("submit", newRecipeFormHandler);

const renderIngredientsFields = () => {
    const ingredientNameInputEl = document.createElement("input");
    ingredientNameInputEl.setAttribute("type", "text");
    ingredientNameInputEl.setAttribute("id", "add-ingredient-name-input");
    ingredientNameInputEl.setAttribute("name", "add-ingredient-name");

    const ingredientMeasurementInputEl = document.createElement("input");
    ingredientMeasurementInputEl.setAttribute("type", "text");
    ingredientMeasurementInputEl.setAttribute("id", "add-ingredient-measurement-input");
    ingredientMeasurementInputEl.setAttribute("name", "add-ingredient-measurement");

    const measurementUnitInputEl = document.createElement("input");
    measurementUnitInputEl.setAttribute("type", "text");
    measurementUnitInputEl.setAttribute("id", "add-measurement-unit-input");
    measurementUnitInputEl.setAttribute("name", "add-measurement-unit");

}