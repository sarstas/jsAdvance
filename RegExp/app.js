'use srtict';

const text =
    "One: 'Hi Mary.' Two: 'Oh, hi.' One: 'How are you doing?' Two: 'I'm doing alright.How about you ?' One: 'Not too bad. The weather is great isn't it ?' Two: 'Yes. It's absolutely beautiful today.' One: 'I wish it was like this more frequently.' Two: 'Me too.' One: 'So where are you going now?' Two: 'I'm going to meet a friend of mine at the department store' One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.'  One: 'What's the occasion ?' Two: 'It's their anniversary.' One: 'That's great.Well, you better get going.You don 't want to be late.' Two: 'I'll see you next time.'  One: 'Sure.' Bye."

// Задание №1
const regExp = /\'/g;
//console.log("Задание №1 !!!" + text.replace(regExp, '\"'));


//Задание №2
const regExp2 = /\B\'/g;
//console.log("Задание №2 !!!" + text.replace(regExp2, '\"'));

// =========================Задание №3 мой варианант решения==========================================
// const form = document.getElementById('form');
// const userName = document.getElementById('username');
// const mobile = document.getElementById('mobile');
// const email = document.getElementById('email');
// const feedback = document.getElementById('feedback');
//
// form.addEventListener('submit',  e => {
//     e.preventDefault();
//
//     checkInputs();
// })
//
// function checkInputs() {
//     const userNameValue = userName.value.trim();
//     const mobileValue = mobile.value.trim();
//     const emailValue = email.value.trim();
//     const feedbackValue = feedback.value.trim();
//
//     if(userNameValue === '') {
//         setErrorFor(userName, 'Username cannot de blank');  //add error class
//     } else if(!isName(userNameValue)) {
//         setErrorFor(userName, 'Username is not valid, input can only contain letters');
//     } else {
//         setSuccessFor(userName);                            //add success
//     }
//
//     if(mobileValue === '') {
//         setErrorFor(mobile, 'Mobile cannot de blank');
//     } else if (!isMobile(mobileValue)) {
//         setErrorFor(mobile, 'Mobile is not valid');
//         //setSuccessFor(mobile);
//     } else {
//         setSuccessFor(mobile);
//     }
//
//     if(emailValue === '') {                                  //check email
//         setErrorFor(email, 'Email cannot be blank');
//     } else if (!isEmail(emailValue)) {
//         setErrorFor(email, 'Email is not valid');
//     } else {
//         setSuccessFor(email);
//     }
// }
//
// function setErrorFor(input, message) {
//     const formControl = input.parentElement;
//     const small = formControl.querySelector('small');
//     small.innerText = message;                         // add error message inside small
//     formControl.className = 'form-control error';      // add error class
// }
//
// function setSuccessFor(input){
//     const formControl = input.parentElement;
//     formControl.className = 'form-control success';
// }
//
// function isEmail(email) {
//     return  /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(email);
// }
//
// function isMobile(mobile) {
//     return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(mobile);
// }
//
// function isName(name) {             //only letters
//     return /^[a-zA-Zа-яёА-ЯЁ]+$/.test(name);
// }



// ================================================================= нормальный вариант ========================================================================

class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };

        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    validate(regexp, value) {
        regexp.test(value)
    }

    _validateForm() {
        let errors = [... document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length){
            this.valid = true;
        }
    }

    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}
