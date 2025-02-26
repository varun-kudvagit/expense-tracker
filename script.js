document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load Dark Mode Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Clear all transactions
    document.getElementById("clearAll")?.addEventListener("click", function () {
        document.getElementById("expenseTable").innerHTML = "";
    });

    // Print Report
    document.getElementById("printReport")?.addEventListener("click", function () {
        window.print();
    });
});
