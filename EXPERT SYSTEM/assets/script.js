const recipes = [
    { name: "Butter Chicken", country: "India", ingredients: ["Chicken", "Butter", "Tomato", "Spices"], image: "images/butterchicken.jpg", video: "video/chicken.mp4" },
    { name: "Paneer Tikka", country: "India", ingredients: ["Paneer", "Yogurt", "Spices"], image: "images/pannertikka.jpg", video: "https://www.youtube.com/embed/example2" },
    { name: "Coq au Vin", country: "France", ingredients: ["Chicken", "Wine", "Mushrooms"], image: "images/coqauvin.jpg", video: "https://www.youtube.com/embed/example8" },
    { name: "Sweet and Sour Chicken", country: "China", ingredients: ["Chicken", "Bell Pepper", "Pineapple", "Vinegar"], image: "images/sweetsore.jpg", video: "video/sweet.mp4" },
    { name: "Gulab Jamun", country: "India", ingredients: ["Milk Powder", "Sugar", "Ghee"], image: "images/gulab_jamun.jpg", video: "https://www.youtube.com/embed/example5" },
    { name: "Croissant", country: "France", ingredients: ["Flour", "Butter", "Yeast"], image: "images/croissant.jpg", video: "video/croissant.mp4" },
    { name: "Sushi", country: "Japan", ingredients: ["Rice", "Fish", "Seaweed"], image: "images/sushi.jpg", video: "video/sushi.mp4" },
    { name: "Ramen", country: "Japan", ingredients: ["Noodles", "Pork", "Broth"], image: "images/ramen.jpg", video: "https://www.youtube.com/embed/example12" },
    { name: "Fish and Chips", country: "UK", ingredients: ["Fish", "Potato", "Oil"], image: "images/fishandchips.jpg", video: "video/fish.mp4" },
    { name: "Shepherd’s Pie", country: "UK", ingredients: ["Minced Meat", "Potato", "Vegetables"], image: "images/shepherd.jpg", video: "https://www.youtube.com/embed/example17" },
    { name: "Dumplings", country: "China", ingredients: ["Dough", "Pork", "Cabbage"], image: "images/dumpling.jpg", video: "https://www.youtube.com/embed/example22" }
];

// Function to display recipes on the page
function displayRecipes(recipeList) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (recipeList.length === 0) {
        document.getElementById("noResultsMessage").style.display = "block";
        return;
    } else {
        document.getElementById("noResultsMessage").style.display = "none";
    }

    recipeList.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" onerror="this.onerror=null; this.src='images/default.jpg';">
            <h3>${recipe.name}</h3>
            <p><strong>Country:</strong> ${recipe.country}</p>
            <button class="view-details" data-index="${index}">View Details</button>
        `;
        resultsDiv.appendChild(card);
    });

    // Add event listeners to "View Details" buttons
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            const recipeIndex = this.getAttribute("data-index");
            showRecipeDetails(recipes[recipeIndex]);
        });
    });
}

// Function to show recipe details
function showRecipeDetails(recipe) {
    const detailsDiv = document.getElementById("recipeDetails");
    detailsDiv.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Country:</strong> ${recipe.country}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <img src="${recipe.image}" alt="${recipe.name}" onerror="this.onerror=null; this.src='images/default.jpg';">
        <h3>Recipe Video:</h3>
        ${recipe.video.includes("youtube.com") ? 
            `<iframe width="300" height="200" src="${recipe.video}" frameborder="0" allowfullscreen></iframe>` :
            `<video width="300" height="200" controls><source src="${recipe.video}" type="video/mp4"></video>`
        }
        <br>
        <button onclick="goBack()">Back</button>
    `;
    document.getElementById("results").style.display = "none";
    detailsDiv.style.display = "block";
}

// Function to go back to the recipe list
function goBack() {
    document.getElementById("recipeDetails").style.display = "none";
    document.getElementById("results").style.display = "flex";
}

// Load recipes on page load
document.addEventListener("DOMContentLoaded", () => displayRecipes(recipes));
