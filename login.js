document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("LoginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!validateEmail(emailInput.value)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (passwordInput.value.trim() === "") {
                alert("Please enter your password.");
                return;
            }

            alert("Login successful");
            window.location.href = "recipe.html";
        });

        //add touch event listener for mobile devices
        loginForm.addEventListener("touchstart", function (event) {
            event.preventDefault();
            loginForm.submit();
        });
    }

        togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        //toggle the eye-icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    //debug touch events
    document.body.addEventListener('touchstart', function(event) {
        console.log('Touch event detected');
    });

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
});
