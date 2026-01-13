// Dropdown functionality
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');

dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

dropdownContent.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownBtn.textContent = e.target.textContent + ' ▼';
        dropdownContent.classList.remove('show');
    });
});

window.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown-btn')) {
        dropdownContent.classList.remove('show');
    }
});

// Modal functionality
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');
const closeBtn = document.querySelector('.close');

modalBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Form validation
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const ageInput = document.getElementById('age');
const successMessage = document.getElementById('successMessage');

function validateName(name) {
    if (name.length < 3) {
        return 'Name must be at least 3 characters';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email';
    }
    return '';
}

function validatePassword(password) {
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    return '';
}

function validateAge(age) {
    if (age < 18 || age > 100) {
        return 'Age must be between 18 and 100';
    }
    return '';
}

function showError(inputId, message) {
    document.getElementById(inputId + 'Error').textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);
    const ageError = validateAge(ageInput.value);
    
    if (nameError) showError('name', nameError);
    if (emailError) showError('email', emailError);
    if (passwordError) showError('password', passwordError);
    if (ageError) showError('age', ageError);
    
    if (!nameError && !emailError && !passwordError && !ageError) {
        successMessage.textContent = 'Form submitted successfully!';
        successMessage.classList.add('show');
        form.reset();
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});