document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const successMessage = document.getElementById("successMessage");

    // Validation patterns
    const patterns = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    };

    // Show error message
    const showError = (input, message) => {
        const errorElement = input.parentElement.querySelector(".error-message");
        errorElement.textContent = message;
        errorElement.classList.remove("hidden");
        input.classList.add("border-red-500");
        input.classList.remove("border-gray-300");
    };

    // Hide error message
    const hideError = (input) => {
        const errorElement = input.parentElement.querySelector(".error-message");
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");
    };

    // Validate full name
    const validateFullName = (input) => {
        const value = input.value.trim();
        if (value.length < 2) {
            showError(input, "Full name must be at least 2 characters long");
            return false;
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
            showError(input, "Please enter a valid name");
            return false;
        }
        hideError(input);
        return true;
    };

    // Validate email
    const validateEmail = (input) => {
        const value = input.value.trim();
        if (!patterns.email.test(value)) {
            showError(input, "Please enter a valid email address");
            return false;
        }
        hideError(input);
        return true;
    };

    // Validate password strength
    const validatePassword = (input) => {
        const value = input.value;
        if (value.length < 8) {
            showError(input, "Password must be at least 8 characters long");
            return false;
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showError(input, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
            return false;
        }
        hideError(input);
        return true;
    };

    // Validate confirm password
    const validateConfirmPassword = (input) => {
        const password = document.getElementById("password").value;
        if (input.value !== password) {
            showError(input, "Passwords do not match");
            return false;
        }
        hideError(input);
        return true;
    };

    // Validate phone number (optional)
    const validatePhone = (input) => {
        const value = input.value.trim();
        if (value && !patterns.phone.test(value)) {
            showError(input, "Please enter a valid phone number");
            return false;
        }
        hideError(input);
        return true;
    };

    // Add real-time validation
    document.getElementById("fullName").addEventListener("input", (e) => validateFullName(e.target));
    document.getElementById("email").addEventListener("input", (e) => validateEmail(e.target));
    document.getElementById("password").addEventListener("input", (e) => validatePassword(e.target));
    document.getElementById("confirmPassword").addEventListener("input", (e) => validateConfirmPassword(e.target));
    document.getElementById("phone").addEventListener("input", (e) => validatePhone(e.target));

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate all fields
        const isFullNameValid = validateFullName(document.getElementById("fullName"));
        const isEmailValid = validateEmail(document.getElementById("email"));
        const isPasswordValid = validatePassword(document.getElementById("password"));
        const isConfirmPasswordValid = validateConfirmPassword(document.getElementById("confirmPassword"));
        const isPhoneValid = validatePhone(document.getElementById("phone"));

        // If all fields are valid, proceed with form submission
        if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid) {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Show success message
                successMessage.classList.remove("hidden");
                form.reset();

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.add("hidden");
                }, 3000);

                // TODO: Implement actual API integration
                // const response = await fetch("/api/register", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         fullName: document.getElementById("fullName").value,
                //         email: document.getElementById("email").value,
                //         password: document.getElementById("password").value,
                //         phone: document.getElementById("phone").value
                //     })
                // });
                // const data = await response.json();
                // Handle response accordingly
            } catch (error) {
                console.error("Registration error:", error);
                const errorDiv = document.createElement("div");
                errorDiv.className = "text-center p-4 bg-red-100 text-red-700 rounded-lg mt-4";
                errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>An error occurred. Please try again.`;
                form.appendChild(errorDiv);
                setTimeout(() => errorDiv.remove(), 3000);
            }
        }
    });
});
