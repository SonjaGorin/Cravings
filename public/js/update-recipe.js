const emptyIngredientNameInputEl = document.querySelector(".name-input");
const emptyMeasurementNameInputEl = document.querySelector(".measure-input");
const emptyRecipeNameInputEl = document.querySelector(".recipe-name");

const updateRecipeButtonEl = document.querySelector("#update-button");
const addIngredientButton = document.querySelector(".add-ingr-button");

const editRecipe = async (event) => {
    event.preventDefault();

    const recipeName = document.querySelector("#edit-recipe-name-input").value.trim();
    const categoryId = document.querySelector("#category-id").value.trim();
    const recipeInstructions = simplemde.value();

    const recipeId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1];
      
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        body: JSON.stringify({
            name: recipeName,
            category_id: categoryId,
            instructions: recipeInstructions,
            ingredients: ingredients('added-ingredient').concat(ingredients('existing-ingredient')),
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
      
    if (response.ok) {
        document.location.replace("/memberlist");
    } else {
        alert(response.statusText);
    }
}

const ingredientsSectionEl = document.querySelector(".ingredients-section")

const ingredients = (root) => {
    console.log(root);
    const result = [];
    [...document.querySelectorAll("." + root)].forEach((ingr) => {
        const ingredient = ingr.querySelector(".edit-ingredient-name-value").value;
        const measurement = ingr.querySelector(".edit-ingredient-measurement-value").value;
        const unit = ingr.querySelector(".edit-measurement-unit-value").value;
        result.push({ingredient, measurement, unit});
    })
    console.log(result);
    return result
}

const unitOptionsEl = document.querySelector("#add-measurement-unit-input")

const addIngredient = () => {
    const newIngredients = document.createElement("div");
    newIngredients.setAttribute("class", "added-ingredient row mb-1")

    const ingredientDiv = document.createElement("div");
    ingredientDiv.setAttribute("class", "col-md-6")

    const measurementDiv = document.createElement("div");
    measurementDiv.setAttribute("class", "col-md-3")

    const deleteIngrButtonDiv = document.createElement("div");
    deleteIngrButtonDiv.setAttribute("class", "col-md-1");
    deleteIngrButtonDiv.setAttribute("onclick", "removeIngredient(event)");

    const unitDiv = document.createElement("div");
    unitDiv.setAttribute("class", "col-md-2")

    const ingredientNameInputEl = document.createElement("input");
    ingredientNameInputEl.setAttribute("type", "text");
    ingredientNameInputEl.setAttribute("class", "edit-ingredient-name-value form-control");
    ingredientNameInputEl.setAttribute("name", "edit-ingredient-name");
    ingredientNameInputEl.value = document.querySelector("#add-ingredient-name-input").value
    ingredientDiv.appendChild(ingredientNameInputEl)
    newIngredients.appendChild(ingredientDiv);

    const ingredientMeasurementInputEl = document.createElement("input");
    ingredientMeasurementInputEl.setAttribute("type", "text");
    ingredientMeasurementInputEl.setAttribute("class", "edit-ingredient-measurement-value form-control");
    ingredientMeasurementInputEl.setAttribute("name", "edit-ingredient-measurement");
    ingredientMeasurementInputEl.value = document.querySelector("#add-ingredient-measurement-input").value
    measurementDiv.appendChild(ingredientMeasurementInputEl)
    newIngredients.appendChild(measurementDiv);

    const measurementUnitInputEl = unitOptionsEl.cloneNode(true);
    measurementUnitInputEl.selectedIndex = unitOptionsEl.selectedIndex;
    measurementUnitInputEl.removeAttribute("id")
    measurementUnitInputEl.setAttribute("class", "edit-measurement-unit-value form-control form-select");
    unitDiv.appendChild(measurementUnitInputEl)
    newIngredients.appendChild(unitDiv);

    const deleteIngredientButtonEl = document.createElement("button");
    deleteIngredientButtonEl.setAttribute("class", "btn wide-button");
    deleteIngredientButtonEl.setAttribute("type", "button");
    deleteIngredientButtonEl.setAttribute("style", "background-color: black;");

    const iconButtonEl = document.createElement("i");
    iconButtonEl.setAttribute("class", "bi bi-dash-square-dotted");
    iconButtonEl.setAttribute("style", "color: white");

    deleteIngredientButtonEl.appendChild(iconButtonEl);
    deleteIngrButtonDiv.appendChild(deleteIngredientButtonEl);
    newIngredients.appendChild(deleteIngrButtonDiv);

    ingredientsSectionEl.appendChild(newIngredients);

    document.querySelector("#add-ingredient-name-input").value = "";
    document.querySelector("#add-ingredient-measurement-input").value = "";
    document.querySelector("#add-measurement-unit-input").value = "";
    
    updateRecipeButtonEl.disabled = false;
    addIngredientButton.disabled = true;
}

const disableUpdateButton = () => {
    if (emptyMeasurementNameInputEl.value === "" && emptyIngredientNameInputEl.value === "" && emptyRecipeNameInputEl.value !== "") {
        updateRecipeButtonEl.disabled = false;
    } else {
        updateRecipeButtonEl.disabled = true;
    }
}

const disableIngredientButton = () => {
    if (emptyMeasurementNameInputEl.value === "" || emptyIngredientNameInputEl.value === "") {
        addIngredientButton.disabled = true;
    } else {
        addIngredientButton.disabled = false;
    }
}

function removeIngredient(event) {
    event.currentTarget.parentElement.remove();
}

emptyIngredientNameInputEl.addEventListener("input", disableUpdateButton);
emptyMeasurementNameInputEl.addEventListener("input", disableUpdateButton);
emptyRecipeNameInputEl.addEventListener("input", disableUpdateButton);

emptyIngredientNameInputEl.addEventListener("input", disableIngredientButton);
emptyMeasurementNameInputEl.addEventListener("input", disableIngredientButton);


document
    .querySelector("#add-ingredient-button")
    .addEventListener("click", addIngredient);

document
    .querySelector("#update-button")
    .addEventListener("click", editRecipe);

    