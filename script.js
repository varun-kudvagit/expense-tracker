const incomeDescriptionInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('amount-input');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseAmountInput = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

function addIncome() {
    const description = incomeDescriptionInput.value.trim();
    const amount = parseFloat(incomeAmountInput.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income');
    incomeDescriptionInput.value = '';
    incomeAmountInput.value = '';
}

function addExpense() {
    const description = expenseDescriptionInput.value.trim();
    const category = expenseCategoryInput.value;
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, category);
    expenseDescriptionInput.value = '';
    expenseAmountInput.value = '';
}

function addTransaction(description, amount, category) {
    const transactionRow = document.createElement('tr');
    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td><button class="delete-btn"><i class="fas fa-trash"></i></button></td>`;
    transactionHistory.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });

    updateSummary();
}

function updateSummary() {
    let totalIncomeValue = 0;
    let totalExpensesValue = 0;

    const transactions = transactionHistory.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const category = transaction.children[1].textContent;

        if (category === 'Income') {
            totalIncomeValue += amount;
        } else {
            totalExpensesValue += amount;
        }
    });

    totalIncome.textContent = totalIncomeValue.toFixed(2);
    totalExpenses.textContent = totalExpensesValue.toFixed(2);
    const currentBalance = totalIncomeValue - totalExpensesValue;
    balance.textContent = currentBalance.toFixed(2);
}

function clearAll() {
    transactionHistory.innerHTML = '';
    totalIncome.textContent = '0';
    totalExpenses.textContent = '0';
    balance.textContent = '0';
}