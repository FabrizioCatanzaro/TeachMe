document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const container = document.getElementById('container');
    const signUpForm = document.querySelector('.sign-up form');
    const signInForm = document.querySelector('.sign-in form');
    const toggleToSignUp = document.getElementById('toggleToSignUp');
    const toggleToSignIn = document.getElementById('toggleToSignIn');
    const togglePassword = document.querySelector('#togglePassword');
    const toggleRepeatPassword = document.querySelector('#toggleRepeatPassword');
    const togglePasswordLogin = document.querySelector('#togglePasswordLogin');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeat-password');
    const passwordLogin = document.querySelector('#password-login');

    // Funciones de toggle
    toggleToSignUp.addEventListener('click', function(event) {
        event.preventDefault();
        container.classList.add('active');
    });

    toggleToSignIn.addEventListener('click', function(event) {
        event.preventDefault();
        container.classList.remove('active');
    });

    // Función para alternar visibilidad de contraseña
    function togglePasswordVisibility(toggleElement, passwordElement) {
        toggleElement.addEventListener('click', function () {
            const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordElement.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    }

    togglePasswordVisibility(togglePassword, password);
    togglePasswordVisibility(toggleRepeatPassword, repeatPassword);
    togglePasswordVisibility(togglePasswordLogin, passwordLogin);

    // Funciones de validación
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function validateDate(date) {
        return !isNaN(Date.parse(date));
    }

    // Función para mostrar toast
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Función para validar input
    function validateInput(input, showToastMessage = false) {
        const value = input.value.trim();
        if (value !== '') {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }

        let errorMessage = '';

        switch(input.id) {
            case 'nombre':
            case 'apellido':
                if (value.length < 2) {
                    errorMessage = `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} debe tener al menos 2 caracteres`;
                }
                break;
            case 'email':
            case 'email-login':
                if (!validateEmail(value)) {
                    errorMessage = 'Email inválido';
                }
                break;
            case 'fecha-nacimiento':
                if (!validateDate(value)) {
                    errorMessage = 'Fecha inválida';
                }
                break;
            case 'password':
            case 'repeat-password':
            case 'password-login':
                if (!validatePassword(value)) {
                    errorMessage = 'La contraseña debe tener al menos 8 caracteres';
                }
                break;
        }

        if (errorMessage) {
            input.classList.add('invalid');
            if (showToastMessage) {
                showToast(errorMessage);
            }
        } else {
            input.classList.remove('invalid');
        }
    }

    // Función para validar formulario
    function validateForm(form) {
        let isValid = true;
        let errorMessages = [];

        form.querySelectorAll('input').forEach(input => {
            const value = input.value.trim();
            if (input.hasAttribute('required') && value === '') {
                errorMessages.push(`${input.id.charAt(0).toUpperCase() + input.id.slice(1)} es requerido`);
                isValid = false;
            } else {
                validateInput(input, true);
                if (input.classList.contains('invalid')) {
                    isValid = false;
                }
            }
        });

        if (form.querySelector('#password') && form.querySelector('#repeat-password')) {
            if (form.querySelector('#password').value !== form.querySelector('#repeat-password').value) {
                errorMessages.push('Las contraseñas no coinciden');
                isValid = false;
            }
        }

        errorMessages.forEach(showToast);

        return isValid;
    }

    // Event listeners para validación
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => validateInput(input, true));
        input.addEventListener('input', () => validateInput(input, false));
    });

    // Event listeners para envío de formularios
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showToast('Registro exitoso!');
            setTimeout(() => {
                location.href = "./inicio-estudiante.html"
            }, 1000);
            // enviar el formulario o realizar otras acciones
        }
    });

    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            showToast('Inicio de sesión exitoso!');
            setTimeout(() => {
                location.href = "./prof-inicio.html"
            }, 1000);
            // enviar el formulario o realizar otras acciones
        }
    });

    // Función para manejar labels
    function handleLabels() {
        document.querySelectorAll('.form-group input').forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }

    // Llamar a la función para manejar los labels
    handleLabels();
});