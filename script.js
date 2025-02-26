document.addEventListener("DOMContentLoaded", function () {
    const transactionHistory = document.getElementById("transaction-history");
    const totalIncome = document.getElementById("total-income");
    const totalExpense = document.getElementById("total-expenses");
    const balance = document.getElementById("balance");

    let transactions = [];
    let expenseChart;

    function addTransaction(description, amount, type, category = "-") {
        if (!description || isNaN(amount) || amount <= 0) {
            alert("Invalid input! Please enter valid values.");
            return;
        }

        transactions.push({ description, amount, type, category });
        updateTable();
        updateSummary();
    }

    function updateTable() {
        transactionHistory.innerHTML = "";
        transactions.forEach((transaction, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${transaction.type}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            transactionHistory.appendChild(row);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                transactions.splice(index, 1);
                updateTable();
                updateSummary();
            });
        });
    }

    function updateSummary() {
        let income = transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
        let expenses = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);

        totalIncome.textContent = income.toFixed(2);
        totalExpense.textContent = expenses.toFixed(2);
        balance.textContent = (income - expenses).toFixed(2);

        updateChart(income, expenses);
    }

    function updateChart(income, expenses) {
        if (expenseChart) {
            expenseChart.destroy();
        }
        const ctx = document.getElementById("expenseChart").getContext("2d");
        expenseChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Income", "Expenses"],
                datasets: [
                    {
                        data: [income, expenses],
                        backgroundColor: ["#6495ED", "#ADD8E6"],
                    },
                ],
            },
        });
    }

    function clearAll() {
        transactions = [];
        updateTable();
        updateSummary();
    }

    function printReport() {
        window.print();
    }

    // Attach event listeners to buttons
    document.querySelector("button[onclick='addIncome()']").addEventListener("click", function () {
        const description = document.getElementById("income-description").value;
        const amount = parseFloat(document.getElementById("income-amount").value);
        addTransaction(description, amount, "Income");
        document.getElementById("income-description").value = "";
        document.getElementById("income-amount").value = "";
    });

    document.querySelector("button[onclick='addExpense()']").addEventListener("click", function () {
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        addTransaction(description, amount, "Expense", category);
        document.getElementById("expense-description").value = "";
        document.getElementById("expense-amount").value = "";
    });

    document.querySelector("button[onclick='clearAll()']").addEventListener("click", clearAll);
    document.querySelector("button[onclick='printReport()']").addEventListener("click", printReport);
});
