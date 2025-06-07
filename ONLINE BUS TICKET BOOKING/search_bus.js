function searchBuses() {
    let source = document.getElementById("source").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let busResults = document.getElementById("busResults");

    if (!source || !destination) {
        alert("Please enter both source and destination!");
        return;
    }

    let availableBuses = getAvailableBuses(source, destination);

    busResults.innerHTML = ""; // Clear previous results

    if (availableBuses.length === 0) {
        busResults.innerHTML = "<p class='text-danger text-center mt-3'>No buses available for this route.</p>";
        return;
    }

    availableBuses.forEach((bus, index) => {
        let busCard = document.createElement("div");
        busCard.classList.add("card", "p-3", "mb-2");

        busCard.innerHTML = `
            <p><strong>Bus Type:</strong> ${bus.type}</p>
            <p><strong>Timing:</strong> ${bus.timing}</p>
            <p><strong>Cost:</strong> ₹${bus.cost}</p>
            <button class="btn btn-success" onclick="bookBus(${index})">Book</button>
        `;

        busResults.appendChild(busCard);
    });
}

function bookBus(index) {
    let selectedBus = busDatabase[index];
    localStorage.setItem("selectedBus", JSON.stringify(selectedBus));
    window.location.href = "seat_selection.html";
}
