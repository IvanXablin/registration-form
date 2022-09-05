const form = document.querySelector('.reg-form__content');


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('fisrt-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const birthday = document.getElementById('birthday').value;

    const errorName = validateName(firstName, lastName);
    const errorEmail = validateEmail(email);
    const errorPass = validatePassword(newPassword, confirmPassword);
    const errorDate = validateDate(birthday);

    if (errorName || errorEmail || errorPass || errorDate) {
        alert('Заполните правильно форму!');
    }
    else {
        alert('Вы успешно зарегистрированы!');
    }
});

function validateName(firstName, lastName) {

    const firstNameInput = document.querySelector('.first-name__input');
    const lastNameInput = document.querySelector('.last-name__input');
   
    const regex = /^[а-яА-ЯёЁa-zA-Z]+$/;

    let isError = false;

    if (firstName.match(regex) === null) {
        displayError(firstNameInput, 'Имя должно содержать только буквы и не <br> должно содержать пробелов!');
        isError = true;    
    } 
    else {
        removeError(firstNameInput);
    }
    
    if (lastName.match(regex) === null) {
        displayError(lastNameInput, 'Фамилия должна содержать только буквы и не <br> должна содержать пробелов!');
        isError = true;
    }
    else {
        removeError(lastNameInput);
    }
    
    if (firstName.length > 30) {
        displayError(firstNameInput, 'Имя не может превышать больше 30 символов!');
        isError = true;
    }

    if (lastName.length > 30) {
        displayError(lastNameInput, 'Фамилия не может превышать больше 30 символов!');
        isError = true;
    }

    if (isError)  {
        return true;
    }

    return false;
}

function validateEmail(email) {

    const emailInput = document.querySelector('.email__input');
    const regex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

    if (email.match(regex) === null) {
        displayError(emailInput, 'Некорректный Email!');
        return true;
    }
    else {
        removeError(emailInput);
    }
    
    return false;
}

function validatePassword(newPassword, confirmPassword) {

    const newPasswordInput = document.querySelector('.new-password__input');
    const confirmPasswordInput = document.querySelector('.confirm-password__input');

    const regex = /(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.*[a-z])(?=.*[A-Z])/;
   
    let isError = false;

    if (newPassword.match(regex) === null || newPassword.length < 8) {
        displayError(newPasswordInput, 'Пароль должен содержать, минимум 8 символов, <br> минимум одну цифру, по одной заглавной <br> и строчную буквы и один спец-символ!');
        isError = true;
    } 
    else {
        removeError(newPasswordInput);
    }

    if (newPassword !== confirmPassword) {
        displayError(confirmPasswordInput, 'Пароли не совпадают!');
        isError = true;
    } 
    else {
        removeError(confirmPasswordInput);
    }

    if (isError)  {
        return true;
    }

    return false;
}

function validateDate(birthday) {

    const birthdayInput = document.querySelector('.birthday__input');

    const dateBirthday = new Date(birthday).getTime();
    const dateNow = Date.now();
    const yearBirth = new Date(dateNow - dateBirthday);

    if ((yearBirth.getFullYear() - 1970 < 18) || (yearBirth.toString() === 'Invalid Date')) {
        displayError(birthdayInput, 'Для регистрации, необходим возраст не менее 18 лет!');
        return true;
    } 
    else {
        removeError(birthdayInput);
    }

    return false;
}

function displayError(input, textError) {
    removeError(input);
    const error = document.createElement('p');
    error.className = 'error';
    error.innerHTML = textError;
    input.append(error);
}

function removeError(input) {
    const error = input.querySelector('.error');

    if (error) {
        error.remove();
    }
}
