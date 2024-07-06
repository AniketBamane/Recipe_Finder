document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("LoginForm");
    const usernameOrEmailInput = document.getElementById("usernameOrEmail");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const togglePassword = document.getElementById("togglePassword");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Clear previous error messages
            errorMessage.textContent = "";

            // Validate inputs
            if (!validateUsernameOrEmail(usernameOrEmailInput.value)) {
                errorMessage.textContent = "Please enter a valid username or email address.";
                return;
            }
            if (passwordInput.value.trim() === "") {
                errorMessage.textContent = "Please enter your password.";
                return;
            }

            const formData = new FormData(loginForm);

            fetch("login-endpoint", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // show success message
                        window.location.href = "dashboard.html";
                    } else {
                        // show error message
                        errorMessage.textContent = data.message || "Login failed. Please try again.";
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    errorMessage.textContent = "An error occurred. Please try again.";
                });
        });
    }

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        //toggle the eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    function validateUsernameOrEmail(input) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/; 
        return emailRegex.test(input) || usernameRegex.test(input);
    }
});
