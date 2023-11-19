const deleteRecipe = async (event) => {
    event.preventDefault();

    const recipeId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1];
      
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
    });
      
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector(".delete-post-button")
    .addEventListener("click", deleteRecipe);