// Smooth Scroll for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetPage = this.getAttribute("href");
            window.location.href = targetPage;
        });
    });
});

// Ensure Social Media Links Open in New Tab
document.querySelectorAll(".social-links a").forEach(icon => {
    icon.setAttribute("target", "_blank");
});

    // Skills Click Functionality (Displays Proficiency)
    const skills = {
        "HTML": "100%",
        "CSS": "90%",
        "JavaScript": "80%",
        "React": "75%",
        "Node.js": "70%"
    };

    const buttons = document.querySelectorAll(".skill-button");
    const resultDiv = document.getElementById("skill-info");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const skillName = this.innerText;
            const proficiency = skills[skillName] || "Unknown";
            resultDiv.innerHTML = `<h2>${skillName}: ${proficiency} proficiency</h2>`;
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contact-form");
        const successMessage = document.getElementById("success-message");
    
        if (!form) {
            console.error("Form element not found!");
            return;
        }
    
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevents page refresh
    
            // Show success message
            successMessage.textContent = "Message sent successfully!";
            successMessage.style.display = "block";
    
            // Clear form fields
            form.reset();
    
            // Hide message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);
        });
    });
    
    