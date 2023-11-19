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

const ingredientsSectionEl = document.querySelector(".ingredients-section")

const addIngredient = () => {
    const newIngredients = document.createElement("div");

    const ingredientNameInputEl = document.createElement("input");
    ingredientNameInputEl.setAttribute("type", "text");
    ingredientNameInputEl.setAttribute("class", "add-ingredient-name-value");
    ingredientNameInputEl.setAttribute("name", "add-ingredient-name");
    ingredientNameInputEl.value = document.querySelector("#add-ingredient-name-input").value
    newIngredients.appendChild(ingredientNameInputEl);

    const ingredientMeasurementInputEl = document.createElement("input");
    ingredientMeasurementInputEl.setAttribute("type", "text");
    ingredientMeasurementInputEl.setAttribute("class", "add-ingredient-measurement-value");
    ingredientMeasurementInputEl.setAttribute("name", "add-ingredient-measurement");
    ingredientMeasurementInputEl.value = document.querySelector("#add-ingredient-measurement-input").value
    newIngredients.appendChild(ingredientMeasurementInputEl);

    const measurementUnitInputEl = document.createElement("input");
    measurementUnitInputEl.setAttribute("type", "text");
    measurementUnitInputEl.setAttribute("class", "add-measurement-unit-value");
    measurementUnitInputEl.setAttribute("name", "add-measurement-unit");
    measurementUnitInputEl.value = document.querySelector("#add-measurement-unit-input").value
    newIngredients.appendChild(measurementUnitInputEl);

    ingredientsSectionEl.appendChild(newIngredients);

    document.querySelector("#add-ingredient-name-input").value = "";
    document.querySelector("#add-ingredient-measurement-input").value = "";
    document.querySelector("#add-measurement-unit-input").value = "";
}

document
    .querySelector("#add-ingredient-button")
    .addEventListener("click", addIngredient);