document.getElementById("searchBtn").addEventListener("click", function () {
    const searchQuery = document.getElementById("searchBox").value.toLowerCase();
    const selectedCountry = document.getElementById("countryFilter").value;

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery);
        const matchesCountry = selectedCountry === "all" || recipe.country === selectedCountry;
        return matchesSearch && matchesCountry;
    });

    displayRecipes(filteredRecipes);
});

// Show all recipes when "All" button is clicked
document.getElementById("allBtn").addEventListener("click", function () {
    document.getElementById("searchBox").value = "";
    document.getElementById("countryFilter").value = "all";
    displayRecipes(getRecipes());
});
