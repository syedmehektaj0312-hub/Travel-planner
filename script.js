const tripForm = document.getElementById("tripForm");
const tripList = document.getElementById("tripList");

let trips = JSON.parse(localStorage.getItem("trips")) || [];

// Display trips when page loads
displayTrips();

// Save Trip
tripForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const budget = document.getElementById("budget").value;
    const notes = document.getElementById("notes").value;

    const trip = {
        id: Date.now(),
        destination,
        startDate,
        endDate,
        budget,
        notes
    };

    trips.push(trip);

    saveTrips();
    displayTrips();

    tripForm.reset();

    alert("🎉 Trip Saved Successfully!");
});

// Save to Local Storage
function saveTrips() {
    localStorage.setItem("trips", JSON.stringify(trips));
}

// Display Trips
function displayTrips() {

    tripList.innerHTML = "";

    if (trips.length === 0) {
        tripList.innerHTML = `
        <p style="text-align:center;">
            No trips planned yet.
        </p>`;
        return;
    }

    trips.forEach((trip) => {

        const card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = `
            <h3>📍 ${trip.destination}</h3>

            <p><strong>Start:</strong> ${trip.startDate}</p>

            <p><strong>End:</strong> ${trip.endDate}</p>

            <p><strong>Budget:</strong> ₹${trip.budget}</p>

            <p><strong>Notes:</strong> ${trip.notes}</p>

            <button onclick="deleteTrip(${trip.id})">
                Delete
            </button>
        `;

        tripList.appendChild(card);

    });

}

// Delete Trip
function deleteTrip(id) {

    const confirmDelete = confirm("Delete this trip?");

    if (confirmDelete) {

        trips = trips.filter((trip) => trip.id !== id);

        saveTrips();

        displayTrips();
    }

}