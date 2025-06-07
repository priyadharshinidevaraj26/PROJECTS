const busDatabase = [
    // Coimbatore to Chennai (Multiple Timings)
    { source: "Coimbatore", destination: "Chennai", type: "AC Sleeper", timing: "10:00 AM - 4:00 PM", cost: 1000 },
    { source: "Coimbatore", destination: "Chennai", type: "Non-AC", timing: "11:00 AM - 5:00 PM", cost: 900 },
    { source: "Coimbatore", destination: "Chennai", type: "Luxury AC", timing: "6:00 PM - 12:00 AM", cost: 1500 },
    
    // Coimbatore to Bangalore (Multiple Timings)
    { source: "Coimbatore", destination: "Bangalore", type: "AC Sleeper", timing: "7:00 AM - 12:00 PM", cost: 1000 },
    { source: "Coimbatore", destination: "Bangalore", type: "Non-AC", timing: "9:00 AM - 2:00 PM", cost: 950 },
    { source: "Coimbatore", destination: "Bangalore", type: "Luxury AC", timing: "6:00 PM - 11:00 PM", cost: 1600 },

    // Bangalore to Hyderabad (Multiple Timings)
    { source: "Bangalore", destination: "Hyderabad", type: "AC Sleeper", timing: "9:00 PM - 6:00 AM", cost: 1400 },
    { source: "Bangalore", destination: "Hyderabad", type: "Non-AC", timing: "8:00 AM - 5:00 PM", cost: 1100 },
    { source: "Bangalore", destination: "Hyderabad", type: "Luxury AC", timing: "7:30 PM - 4:30 AM", cost: 1600 },

    // Mumbai to Pune (Multiple Timings)
    { source: "Mumbai", destination: "Pune", type: "AC Seater", timing: "7:00 AM - 10:00 AM", cost: 700 },
    { source: "Mumbai", destination: "Pune", type: "Non-AC", timing: "12:00 PM - 3:00 PM", cost: 500 },
    { source: "Mumbai", destination: "Pune", type: "Sleeper", timing: "6:00 PM - 9:00 PM", cost: 850 },

    // Delhi to Jaipur (Multiple Timings)
    { source: "Delhi", destination: "Jaipur", type: "Sleeper", timing: "8:30 PM - 2:00 AM", cost: 1200 },
    { source: "Delhi", destination: "Jaipur", type: "Non-AC", timing: "5:00 AM - 10:30 AM", cost: 950 },
    { source: "Delhi", destination: "Jaipur", type: "Luxury AC", timing: "7:00 PM - 12:30 AM", cost: 1400 },

    // Chennai to Madurai (Multiple Timings)
    { source: "Chennai", destination: "Madurai", type: "AC Sleeper", timing: "4:00 PM - 10:00 PM", cost: 1000 },
    { source: "Chennai", destination: "Madurai", type: "Non-AC", timing: "6:00 AM - 12:30 PM", cost: 850 },
    { source: "Chennai", destination: "Madurai", type: "Luxury AC", timing: "10:00 PM - 4:30 AM", cost: 1300 },

    // Hyderabad to Vijayawada (Multiple Timings)
    { source: "Hyderabad", destination: "Vijayawada", type: "AC Sleeper", timing: "10:00 PM - 4:00 AM", cost: 1100 },
    { source: "Hyderabad", destination: "Vijayawada", type: "Non-AC", timing: "8:00 AM - 2:00 PM", cost: 900 },
    { source: "Hyderabad", destination: "Vijayawada", type: "Luxury AC", timing: "7:30 PM - 1:30 AM", cost: 1350 },

    // Kolkata to Bhubaneswar (Multiple Timings)
    { source: "Kolkata", destination: "Bhubaneswar", type: "Luxury AC", timing: "5:00 PM - 11:00 PM", cost: 1500 },
    { source: "Kolkata", destination: "Bhubaneswar", type: "AC Sleeper", timing: "6:30 AM - 12:30 PM", cost: 1300 },
    { source: "Kolkata", destination: "Bhubaneswar", type: "Non-AC", timing: "9:00 AM - 3:00 PM", cost: 1000 },

    // Ahmedabad to Surat (Multiple Timings)
    { source: "Ahmedabad", destination: "Surat", type: "AC Seater", timing: "6:00 AM - 9:30 AM", cost: 800 },
    { source: "Ahmedabad", destination: "Surat", type: "Sleeper", timing: "10:00 PM - 2:30 AM", cost: 1100 },
    { source: "Ahmedabad", destination: "Surat", type: "Non-AC", timing: "2:00 PM - 6:00 PM", cost: 900 },

    // Additional Routes
    { source: "Madurai", destination: "Coimbatore", type: "AC Sleeper", timing: "9:00 AM - 2:00 PM", cost: 1300 },
    { source: "Bangalore", destination: "Chennai", type: "AC Seater", timing: "7:00 PM - 12:00 AM", cost: 1100 },
    { source: "Delhi", destination: "Agra", type: "Luxury AC", timing: "6:00 AM - 10:00 AM", cost: 1150 },
    { source: "Pune", destination: "Nagpur", type: "Non-AC", timing: "1:00 PM - 7:00 PM", cost: 950 },
    { source: "Coimbatore", destination: "Ooty", type: "Non-AC Sleeper", timing: "3:00 PM - 6:00 PM", cost: 750 },
    { source: "Bhopal", destination: "Indore", type: "Luxury AC", timing: "4:00 PM - 8:00 PM", cost: 1350 },
    { source: "Jaipur", destination: "Jodhpur", type: "AC Seater", timing: "6:00 AM - 10:00 AM", cost: 1000 },
    { source: "Guwahati", destination: "Shillong", type: "AC Sleeper", timing: "9:00 AM - 1:00 PM", cost: 1450 },
    { source: "Chennai", destination: "Coimbatore", type: "Non-AC", timing: "2:00 PM - 8:00 PM", cost: 900 },
    { source: "Pondicherry", destination: "Bangalore", type: "Luxury AC", timing: "6:00 AM - 12:00 PM", cost: 1500 }
];

// Function to filter buses based on search criteria
function getAvailableBuses(source, destination) {
    return busDatabase.filter(bus => bus.source.toLowerCase() === source.toLowerCase() && bus.destination.toLowerCase() === destination.toLowerCase());
}
