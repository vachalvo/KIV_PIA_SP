// Email validation regex by RFC-822
const emailRegex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
const nameRegex = /^[a-zA-z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const validateLoginPassword = (password) => {
    const trimPassword = password.trim();
    if(!trimPassword){
        return 'Password not filled!';
    }

    return '';
}

const validateEmail = (email) => {
    if(!email.trim()){
        return 'Email not filled!';
    }

    if(!emailRegex.test(String(email).toLowerCase())){
        return 'Email has not correct format!';
    }

    return '';
};

const validatePasswordsParity = (password, reEnterPassword) => {
    return password.localeCompare(reEnterPassword) === 0 ? '' : 'Passwords are not same!';
};

const validateRegistrationPassword = (password) => {
    // TODO - create correct password validation
    return '';

    const trimPassword = password.trim();
    if(!trimPassword){
        return 'Password not filled!';
    }

    if(trimPassword.length < 5){
        return 'Password must be at least 5 characters long!';
    }

    if(!passwordRegex.test(String(trimPassword))){
        return 'Password must contains at least one upper case letter, lower case letter or number!';
    }

    return '';
};

const validateName = (name) => {
    const trimName = name.trim();
    if(!trimName){
        return 'Name not filled!';
    }
    if(trimName.length < 2){
        return 'Name must be at least 2 characters long!';
    }
    if(!nameRegex.test(String(trimName).toLowerCase())){
        return 'Name has not correct format! (only a-Z, eg. John, Lucia, ...)';
    }
    return '';
}

export default {
    validateName,
    validateEmail,
    validateLoginPassword,
    validateRegistrationPassword,
    validatePasswordsParity
};