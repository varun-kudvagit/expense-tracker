document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById("pieChart").getContext("2d");
    const ctx2 = document.getElementById("barChart").getContext("2d");

    // Sample Data
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
