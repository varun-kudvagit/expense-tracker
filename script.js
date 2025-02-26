let transactions = [];
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;
let chart;

// Function to add a transaction
function addTransaction(type) {
    let desc = type === "income" ? document.getElementById("income-desc").value : document.getElementById("expense-desc").value;
    let amount = type === "income" ? document.getElementById("income-amount").value : document.getElementById("expense-amount").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    amount = parseFloat(amount);
    transactions.push({ type, desc, amount });

    updateTotals();
    updateTable();
    updateChart();
}

// Function to update totals
function updateTotals() {
    totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    balance = totalIncome - totalExpense;

    document.getElementById("total-income").innerText = totalIncome;
    document.getElementById("total-expense").innerText = totalExpense;
    document.getElementById("balance").innerText = balance;
}

// Function to update the table
function updateTable() {
    let tableBody = document.getElementById("transaction-table");
    tableBody.innerHTML = "";

    transactions.forEach((t, index) => {
        let row = `<tr>
            <td>${t.type === "income" ? "Income" : "Expense"}</td>
            <td>${t.desc}</td>
            <td>${t.amount}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTotals();
    updateTable();
    updateChart();
}

// Function to update the Pie Chart
function updateChart() {
    let ctx = document.getElementById("expense-chart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ["green", "red"]
            }]
        }
    });
}
