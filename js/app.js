// =========================
// SIGNUP
// =========================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        const message =
            document.getElementById("signupMessage");


        // Check password

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color = "red";

            return;
        }


        // Get existing users

        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Check existing email

        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            message.style.color = "red";

            return;
        }


        // Create new user

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: "user"

        };


        // Add user

        users.push(newUser);


        // Save users

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        // Success message

        message.textContent =
            "Account created successfully!";

        message.style.color = "green";


        // Clear form

        signupForm.reset();


        // Redirect after 1 second

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);

    });

}
// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        // Get registered users

        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Find matching user

        const user = users.find(function(user) {

            return user.email === email &&
                   user.password === password;

        });


        // If user not found

        if (!user) {

            message.textContent =
                "Invalid email or password.";

            message.style.color = "red";

            return;
        }


        // Save logged-in user

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Success message

        message.textContent =
            "Login successful!";

        message.style.color = "green";


        // Redirect based on role

        setTimeout(function() {

            if (user.role === "admin") {

                window.location.href =
                    "admin-dashboard.html";

            } else {

                window.location.href =
                    "user-dashboard.html";

            }

        }, 1000);

    });

}
// ===============================
// DEFAULT ADMIN ACCOUNT
// ===============================

const users =
    JSON.parse(localStorage.getItem("users")) || [];

const adminExists =
    users.some(function(user) {
        return user.role === "admin";
    });

if (!adminExists) {

    users.push({
        name: "Ravi Kumar",
        email: "admin@expensetracker.com",
        password: "admin123",
        role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
}