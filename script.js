document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const expenseTable = document.getElementById("expenseTable");

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
    document.getElementById("clearAll").addEventListener("click", function () {
        expenseTable.innerHTML = "";
    });

    // Print Report
    document.getElementById("printReport").addEventListener("click", function () {
        window.print();
    });

    // Interactive Charts
    const ctx1 = document.getElementById("pieChart").getContext("2d");
    const ctx2 = document.getElementById("barChart").getContext("2d");

    const data = {
        labels: ["Rent", "Food", "Transport", "Entertainment", "Savings"],
        datasets: [{
            label: "Expense Distribution",
            data: [500, 200, 150, 100, 50],
            backgroundColor: ["red", "blue", "green", "purple", "orange"]
        }]
    };

    new Chart(ctx1, { type: "pie", data });
    new Chart(ctx2, { type: "bar", data });
});
