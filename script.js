document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    // Initialize Pie Chart
    let expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expenses"],
            datasets: [
                {
                    data: [0, 0],
                    backgroundColor: ["#28a745", "#dc3545"],
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        font: {
                            size: window.innerWidth < 768 ? 14 : 16, // Adjust font size for mobile
                        },
                        boxWidth: 20,
                        padding: 15,
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // Function to update the Pie Chart
    function updatePieChart(income, expenses) {
        expenseChart.data.datasets[0].data = [income, expenses];
        expenseChart.update();
    }

    // Function to add a transaction
    function addTransaction(type, description, amount) {
        if (!description || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid description and amount.");
            return;
        }

        const transactionRow = document.createElement("tr");
        transactionRow.innerHTML = `
            <td>${type}</td>
            <td>${description}</td>
            <td>${amount.toFixed(2)}</td>
            <td>
                <button class="delete-btn" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Delete</button>
            </td>
        `;

        document.getElementById("transaction-history").appendChild(transactionRow);

        transactionRow.querySelector(".delete-btn").addEventListener("click", function () {
            transactionRow.remove();
            updateSummary();
        });

        updateSummary();
    }

    // Function to update summary
    function updateSummary() {
        let totalIncome = 0,
            totalExpenses = 0;
        document.querySelectorAll("#transaction-history tr").forEach((row) => {
            const amount = parseFloat(row.children[2].textContent);
            row.children[0].textContent === "Income" ? (totalIncome += amount) : (totalExpenses += amount);
        });

        document.getElementById("total-income").textContent = totalIncome.toFixed(2);
        document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
        document.getElementById("balance").textContent = (totalIncome - totalExpenses).toFixed(2);
        updatePieChart(totalIncome, totalExpenses);
    }

    // Function to ensure all buttons work properly
    function initializeEventListeners() {
        document.getElementById("add-income-btn").addEventListener("click", function () {
            addTransaction("Income", document.getElementById("income-description").value, parseFloat(document.getElementById("income-amount").value));
        });

        document.getElementById("add-expense-btn").addEventListener("click", function () {
            addTransaction("Expense", document.getElementById("expense-description").value, parseFloat(document.getElementById("expense-amount").value));
        });

        document.getElementById("print-btn").addEventListener("click", () => window.print());

        document.getElementById("clear-btn").addEventListener("click", () => {
            document.getElementById("transaction-history").innerHTML = "";
            updateSummary();
        });
    }

    // Ensure event listeners are always applied properly
    initializeEventListeners();
});
