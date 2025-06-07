function displaySavedRecipes() {
    const savedContainer = document.getElementById("savedRecipesContainer");
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    if (savedRecipes.length === 0) {
        savedContainer.innerHTML = "<p>No saved recipes yet.</p>";
        return;
    }

    savedContainer.innerHTML = "";
    savedRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <button class="remove-btn">Remove</button>
        `;

        card.querySelector(".remove-btn").addEventListener("click", () => removeRecipe(recipe.name));
        savedContainer.appendChild(card);
    });
}

function removeRecipe(name) {
    let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipes = savedRecipes.filter(recipe => recipe.name !== name);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    displaySavedRecipes();
}

function clearSavedRecipes() {
    localStorage.removeItem("savedRecipes");
    displaySavedRecipes();
}

// Display saved recipes on page load
document.addEventListener("DOMContentLoaded", displaySavedRecipes);
