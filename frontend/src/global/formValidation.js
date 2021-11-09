const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[ěščřžýáíéóúůďťňĎŇŤŠČŘŽÝÁÍÉÚŮĚÓa-zA-z]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const emailValidation = (email) => {
    if(!email.trim()){
        return 'Email not filled!';
    }

    if(!emailRegex.test(String(email).toLowerCase())){
        return 'Email has not correct format!';
    }

    return '';
};

export const comparePasswordsValidation = (password, reEnterPassword) => {
    return password.localeCompare(reEnterPassword) === 0 ? '' : 'Passwords are not same!';
};

export const registerPasswordValidation = (password) => {
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

export const nameValidation = (name) => {
    const trimName = name.trim();
    if(!trimName){
        return 'Name not filled!';
    }
    if(trimName.length < 2){
        return 'Name must be at least 2 characters long!';
    }
    if(!nameRegex.test(String(trimName).toLowerCase())){
        return 'Name has not correct format!';
    }
    return '';
}

export const loginPasswordValidation = (password) => {
    const trimPassword = password.trim();
    if(!trimPassword){
        return 'Password not filled!';
    }

    return '';
}