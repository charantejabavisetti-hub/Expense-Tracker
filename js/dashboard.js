// =========================
// USER DASHBOARD
// =========================

// Get current logged-in user
const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

// Check login
if (!currentUser) {
    window.location.href = "login.html";
}


// =========================
// DISPLAY USER NAME
// =========================

const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser && currentUser) {
    welcomeUser.textContent =
        "Welcome, " + currentUser.name;
}


// =========================
// LOGOUT
// =========================

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


// =========================
// ADD INCOME
// =========================

const incomeForm =
    document.getElementById("incomeForm");

if (incomeForm) {

    incomeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const currentUser =
                JSON.parse(
                    localStorage.getItem("currentUser")
                );

            if (!currentUser) {
                window.location.href = "login.html";
                return;
            }

            const amount =
                Number(
                    document.getElementById(
                        "incomeAmount"
                    ).value
                );

            const source =
                document.getElementById(
                    "incomeSource"
                ).value;

            const date =
                document.getElementById(
                    "incomeDate"
                ).value;

            const description =
                document.getElementById(
                    "incomeDescription"
                ).value.trim();

            const message =
                document.getElementById(
                    "incomeMessage"
                );

            let transactions =
                JSON.parse(
                    localStorage.getItem(
                        "transactions"
                    )
                ) || [];

            const income = {
                id: Date.now(),
                userEmail: currentUser.email,
                type: "income",
                amount: amount,
                category: source,
                date: date,
                description: description
            };

            transactions.push(income);

            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );

            message.textContent =
                "Income added successfully!";

            message.style.color = "green";

            incomeForm.reset();

            setTimeout(function() {
                window.location.href =
                    "user-dashboard.html";
            }, 1000);
        }
    );
}


// =========================
// UPDATE DASHBOARD TOTALS
// =========================

function updateDashboardTotals() {

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {
        return;
    }

    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    // Get only logged-in user's transactions
    const userTransactions =
        transactions.filter(function(transaction) {

            return transaction.userEmail ===
                   currentUser.email;

        });


    let totalIncome = 0;
    let totalExpenses = 0;


    // Calculate totals
    userTransactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            totalIncome +=
                Number(transaction.amount);

        }

        if (transaction.type === "expense") {

            totalExpenses +=
                Number(transaction.amount);

        }

    });


    // Calculate balance
    const balance =
        totalIncome - totalExpenses;


    // Display Total Income
    const totalIncomeElement =
        document.getElementById("totalIncome");

    if (totalIncomeElement) {

        totalIncomeElement.textContent =
            "₹" +
            totalIncome.toLocaleString("en-IN");

    }


    // Display Total Expenses
    const totalExpensesElement =
        document.getElementById("totalExpenses");

    if (totalExpensesElement) {

        totalExpensesElement.textContent =
            "₹" +
            totalExpenses.toLocaleString("en-IN");

    }


    // Display Balance
    const balanceElement =
        document.getElementById("balance");

    if (balanceElement) {

        balanceElement.textContent =
            "₹" +
            balance.toLocaleString("en-IN");

    }


    // =========================
    // RECENT TRANSACTIONS
    // =========================

    const noTransactions =
        document.getElementById("noTransactions");

    if (noTransactions) {

        if (userTransactions.length > 0) {

            noTransactions.textContent =
                "You have " +
                userTransactions.length +
                " transaction(s).";

        } else {

            noTransactions.textContent =
                "No transactions available.";

        }

    }

}


// =========================
// RUN DASHBOARD CALCULATION
// =========================

if (document.getElementById("totalIncome")) {

    updateDashboardTotals();

}
// =========================
// ADD EXPENSE
// =========================

const expenseForm =
    document.getElementById("expenseForm");

if (expenseForm) {

    expenseForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const currentUser =
                JSON.parse(
                    localStorage.getItem("currentUser")
                );

            if (!currentUser) {
                window.location.href = "login.html";
                return;
            }

            // Get form values
            const amount =
                Number(
                    document.getElementById(
                        "expenseAmount"
                    ).value
                );

            const category =
                document.getElementById(
                    "expenseCategory"
                ).value;

            const date =
                document.getElementById(
                    "expenseDate"
                ).value;

            const description =
                document.getElementById(
                    "expenseDescription"
                ).value.trim();

            const message =
                document.getElementById(
                    "expenseMessage"
                );


            // Get existing transactions
            let transactions =
                JSON.parse(
                    localStorage.getItem(
                        "transactions"
                    )
                ) || [];


            // Create expense
            const expense = {

                id: Date.now(),

                userEmail:
                    currentUser.email,

                type: "expense",

                amount: amount,

                category: category,

                date: date,

                description: description

            };


            // Add expense
            transactions.push(expense);


            // Save to Local Storage
            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );


            // Success message
            message.textContent =
                "Expense added successfully!";

            message.style.color = "green";


            // Reset form
            expenseForm.reset();


            // Go back to dashboard
            setTimeout(function() {

                window.location.href =
                    "user-dashboard.html";

            }, 1000);

        }
    );
}
// =========================
// DISPLAY TRANSACTIONS
// =========================

const transactionTableBody =
    document.getElementById("transactionTableBody");

if (transactionTableBody) {

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];

    if (!currentUser) {

        window.location.href = "login.html";

    } else {

        const userTransactions =
            transactions.filter(function(transaction) {

                return transaction.userEmail ===
                       currentUser.email;

            });


        if (userTransactions.length === 0) {

            document.getElementById(
                "noTransactions"
            ).textContent =
                "No transactions available.";

        } else {

            document.getElementById(
                "noTransactions"
            ).style.display = "none";


            userTransactions.forEach(
                function(transaction) {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `
                        <td>${transaction.date}</td>

                        <td>
                            ${transaction.type}
                        </td>

                        <td>
                            ${transaction.category}
                        </td>

                        <td>
                            ₹${Number(
                                transaction.amount
                            ).toLocaleString("en-IN")}
                        </td>

                        <td>
                            ${transaction.description || "-"}
                        </td>
                    `;


                    transactionTableBody.appendChild(row);

                }
            );

        }

    }

}
// ===============================
// BUDGET MODULE
// ===============================

const budgetForm = document.getElementById("budgetForm");

if (budgetForm) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "login.html";
    } else {

        const budgetKey =
            "budget_" + currentUser.email;

        // Load existing budget
        const savedBudget =
            Number(localStorage.getItem(budgetKey)) || 0;

        document.getElementById("monthlyBudget").textContent =
            "₹" + savedBudget.toLocaleString("en-IN");

        updateBudgetDetails(savedBudget, currentUser.email);


        // Set Budget
        budgetForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const amount =
                Number(document.getElementById("budgetAmount").value);

            if (amount <= 0) {
                document.getElementById("budgetMessage").textContent =
                    "Please enter a valid budget amount.";
                return;
            }

            localStorage.setItem(budgetKey, amount);

            document.getElementById("budgetMessage").textContent =
                "Budget set successfully!";

            document.getElementById("monthlyBudget").textContent =
                "₹" + amount.toLocaleString("en-IN");

            updateBudgetDetails(amount, currentUser.email);

            budgetForm.reset();
        });
    }
}


// Calculate Budget Details
function updateBudgetDetails(budget, userEmail) {

    const transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    const userTransactions =
        transactions.filter(function(transaction) {

            return transaction.userEmail === userEmail &&
                   transaction.type === "expense";

        });


    let totalExpenses = 0;

    userTransactions.forEach(function(transaction) {

        totalExpenses += Number(transaction.amount);

    });


    const remainingBudget =
        budget - totalExpenses;


    document.getElementById("budgetExpenses").textContent =
        "₹" + totalExpenses.toLocaleString("en-IN");

    document.getElementById("remainingBudget").textContent =
        "₹" + remainingBudget.toLocaleString("en-IN");


    const budgetStatus =
        document.getElementById("budgetStatus");


    if (budget === 0) {

        budgetStatus.textContent =
            "No budget set yet.";

    } else if (remainingBudget < 0) {

        budgetStatus.textContent =
            "⚠️ Budget exceeded by ₹" +
            Math.abs(remainingBudget).toLocaleString("en-IN");

    } else {

        budgetStatus.textContent =
            "✅ You have ₹" +
            remainingBudget.toLocaleString("en-IN") +
            " remaining.";

    }
}
// ===============================
// REPORTS MODULE
// ===============================

const categoryReport =
    document.getElementById("categoryReport");

if (categoryReport) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        window.location.href = "login.html";

    } else {

        const transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        const userTransactions =
            transactions.filter(function(transaction) {

                return transaction.userEmail === currentUser.email;

            });


        let totalIncome = 0;
        let totalExpenses = 0;

        const categories = {};


        userTransactions.forEach(function(transaction) {

            const amount = Number(transaction.amount);

            if (transaction.type === "income") {

                totalIncome += amount;

            } else if (transaction.type === "expense") {

                totalExpenses += amount;

                const category = transaction.category;

                if (!categories[category]) {
                    categories[category] = 0;
                }

                categories[category] += amount;
            }

        });


        const balance =
            totalIncome - totalExpenses;


        document.getElementById("reportIncome").textContent =
            "₹" + totalIncome.toLocaleString("en-IN");

        document.getElementById("reportExpenses").textContent =
            "₹" + totalExpenses.toLocaleString("en-IN");

        document.getElementById("reportBalance").textContent =
            "₹" + balance.toLocaleString("en-IN");


        if (Object.keys(categories).length === 0) {

            categoryReport.innerHTML =
                "<p>No expense data available.</p>";

        } else {

            categoryReport.innerHTML = "";

            for (const category in categories) {

                const row = document.createElement("div");

                row.className = "category-row";

                row.innerHTML = `
                    <strong>${category}</strong>
                    <span>₹${categories[category].toLocaleString("en-IN")}</span>
                `;

                categoryReport.appendChild(row);
            }
        }
    }
}