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

function addTransaction(description, amount, category) {
    const transactionRow = document.createElement('tr');
    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td><button class="delete-btn"><i class="fas fa-trash"></i></button></td>`;
    document.getElementById('transaction-history').appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });

    updateSummary();
}

function updateSummary() {
    let totalIncomeValue = 0;
    let totalExpensesValue = 0;

    const transactions = document.getElementById('transaction-history').querySelectorAll('tr');

    transactions.forEach(transaction => {
        const amount = parseFloat(transaction.children[2].textContent);
        const category = transaction.children[1].textContent;

        if (category === 'Income') {
            totalIncomeValue += amount;
        } else {
            totalExpensesValue += amount;
        }
    });

    document.getElementById('total-income').textContent = totalIncomeValue.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpensesValue.toFixed(2);
    document.getElementById('balance').textContent = (totalIncomeValue - totalExpensesValue).toFixed(2);

    updatePieChart(totalIncomeValue, totalExpensesValue);
}

function printReport() {
    window.print();
}
