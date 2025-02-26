let transactions = [];
let expenseChart;

// Function to add income or expense
function addTransaction(type) {
    let description = type === 'income' ? document.getElementById('income-description').value : document.getElementById('expense-description').value;
    let amount = type === 'income' ? document.getElementById('income-amount').value : document.getElementById('expense-amount').value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let transaction = { type, description, amount: parseFloat(amount) };
    transactions.push(transaction);
    updateTable();
    updateSummary();
    updateChart();

    // Clear input fields
    document.getElementById('income-amount').value = "";
    document.getElementById('expense-amount').value = "";
}

// Function to update the table
function updateTable() {
    let tableBody = document.getElementById("transaction-table");
    tableBody.innerHTML = "";

    transactions.forEach((transaction, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.type === 'income' ? "Income" : "Expense"}</td>
            <td>${transaction.description}</td>
            <td>Rs. ${transaction.amount.toFixed(2)}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update the summary
function updateSummary() {
    let totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    let totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    let balance = totalIncome - totalExpenses;

    document.getElementById("total-income").textContent = totalIncome.toFixed(2);
    document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Function to update the pie chart with 3D effect
function updateChart() {
    let totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    let totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

    let ctx = document.getElementById("expenseChart").getContext("2d");

    if (expenseChart) {
        expenseChart.destroy(); // Destroy previous chart to update
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Income", "Expenses"],
            datasets: [{
                data: [totalIncome, totalExpenses],
                backgroundColor: ["#4CAF50", "#FF5733"],
                hoverBackgroundColor: ["#388E3C", "#D84315"],
                borderWidth: 5,
                borderColor: "#222"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 16
                    },
                    formatter: (value, ctx) => {
                        let total = ctx.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        return ((value / total) * 100).toFixed(1) + "%"; // Show percentage
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTable();
    updateSummary();
    updateChart();
}

// Function to clear all transactions
function clearAll() {
    transactions = [];
    updateTable();
    updateSummary();
    updateChart();
}

// Function to print report
function printReport() {
    window.print();
}
