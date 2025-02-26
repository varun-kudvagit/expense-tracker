document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    let expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right', // Aligning the legend
                    labels: {
                        font: {
                            size: 14
                        },
                        padding: 15
                    }
                }
            }
        }
    });

    function updatePieChart(income, expenses) {
        expenseChart.data.datasets[0].data = [income, expenses];
        expenseChart.update();
    }

    function addTransaction(type, description, amount) {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const transactionRow = document.createElement('tr');
        transactionRow.innerHTML = `
            <td>${type}</td>
            <td>${description}</td>
            <td>${amount.toFixed(2)}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        document.getElementById('transaction-history').appendChild(transactionRow);
        transactionRow.querySelector('.delete-btn').addEventListener('click', function () {
            transactionRow.remove();
            updateSummary();
        });

        updateSummary();
    }

    function updateSummary() {
        let totalIncome = 0, totalExpenses = 0;
        document.querySelectorAll("#transaction-history tr").forEach(row => {
            const amount = parseFloat(row.children[2].textContent);
            row.children[0].textContent === 'Income' ? totalIncome += amount : totalExpenses += amount;
        });

        document.getElementById('total-income').textContent = totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('balance').textContent = (totalIncome - totalExpenses).toFixed(2);
        updatePieChart(totalIncome, totalExpenses);
    }

    document.getElementById("add-income-btn").addEventListener("click", function () {
        addTransaction("Income", document.getElementById('income-description').value, parseFloat(document.getElementById('income-amount').value));
    });

    document.getElementById("add-expense-btn").addEventListener("click", function () {
        addTransaction("Expense", document.getElementById('expense-description').value, parseFloat(document.getElementById('expense-amount').value));
    });

    document.getElementById("print-btn").addEventListener("click", () => window.print());
    document.getElementById("clear-btn").addEventListener("click", () => {
        document.getElementById('transaction-history').innerHTML = '';
        updateSummary();
    });
});
