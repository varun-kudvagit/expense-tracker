// Get references
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const transactionHistory = document.getElementById('transaction-history');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

// Function to add income
function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income', '');
    updateSummary();
    clearIncomeInputs();
}

// Function to add expense
function addExpense() {
    const description = expenseDescription.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    const category = expenseCategory.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, 'Expense', category);
    updateSummary();
    clearExpenseInputs();
}

// Function to add a transaction
function addTransaction(description, amount, type, category) {
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category || '-'}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionHistory.appendChild(transactionRow);

    // Add delete event
    transactionRow.querySelector('.delete-btn').addEventListener('click', function () {
        transactionRow.remove();
        updateSummary();
    });
}

// Function to update summary
function updateSummary() {
    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    const transactions = transactionHistory.querySelectorAll('tr');

    transactions.forEach(function (transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const type = transaction.children[3].textContent;

        if (type === 'Income') {
            totalIncomeAmount += amount;
        } else {
            totalExpenseAmount += amount;
        }
    });

    totalIncome.textContent = totalIncomeAmount.toFixed(2);
    totalExpense.textContent = totalExpenseAmount.toFixed(2);
    balance.textContent = (totalIncomeAmount - totalExpenseAmount).toFixed(2);
}

// Function to clear input fields
function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
}

function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Housing';
}
function clearAll() {
    transactionHistory.innerHTML = ""; // Remove all transactions
    totalIncome.textContent = "0";
    totalExpense.textContent = "0";
    balance.textContent = "0";

    updateChart(0, 0); // Reset Pie Chart
}
