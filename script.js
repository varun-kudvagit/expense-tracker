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
        }
    });

    function updatePieChart(income, expenses) {
        expenseChart.data.datasets[0].data = [income, expenses];
        expenseChart.update();
    }

    function updateSummary() {
        let totalIncome = 0, totalExpenses = 0;
        document.querySelectorAll("#transaction-history tr").forEach(row => {
            const amount = parseFloat(row.children[2].textContent);
            const category = row.children[1].textContent;
            category === 'Income' ? totalIncome += amount : totalExpenses += amount;
        });

        document.getElementById('total-income').textContent = totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('balance').textContent = (totalIncome - totalExpenses).toFixed(2);
        updatePieChart(totalIncome, totalExpenses);
    }

    document.getElementById("add-income-btn").addEventListener("click", updateSummary);
    document.getElementById("add-expense-btn").addEventListener("click", updateSummary);
    document.getElementById("print-btn").addEventListener("click", () => window.print());
    document.getElementById("clear-btn").addEventListener("click", () => {
        document.getElementById('transaction-history').innerHTML = '';
        updateSummary();
    });
});
