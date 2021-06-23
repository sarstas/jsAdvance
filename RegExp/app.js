'use srtict';

const text =
    "One: 'Hi Mary.' Two: 'Oh, hi.' One: 'How are you doing?' Two: 'I'm doing alright.How about you ?' One: 'Not too bad. The weather is great isn't it ?' Two: 'Yes. It's absolutely beautiful today.' One: 'I wish it was like this more frequently.' Two: 'Me too.' One: 'So where are you going now?' Two: 'I'm going to meet a friend of mine at the department store' One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.'  One: 'What's the occasion ?' Two: 'It's their anniversary.' One: 'That's great.Well, you better get going.You don 't want to be late.' Two: 'I'll see you next time.'  One: 'Sure.' Bye."

// Задание №1
const regExp = /\'/g;
//console.log("Задание №1 !!!" + text.replace(regExp, '\"'));


//Задание №2
const regExp2 = /\B\'/g;
//console.log("Задание №2 !!!" + text.replace(regExp2, '\"'));

// Задание №3 мой варианант решения
const form = document.getElementById('form');
const userName = document.getElementById('username');
const mobile = document.getElementById('mobile');
const email = document.getElementById('email');
const feedback = document.getElementById('feedback');

form.addEventListener('submit',  e => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const userNameValue = userName.value.trim();
    const mobileValue = mobile.value.trim();
    const emailValue = email.value.trim();
    const feedbackValue = feedback.value.trim();

    if(userNameValue === '') {
        setErrorFor(userName, 'Username cannot de blank');  //add error class
    } else if(!isName(userNameValue)) {
        setErrorFor(userName, 'Username is not valid, input can only contain letters');
    } else {
        setSuccessFor(userName);                            //add success
    }

    if(mobileValue === '') {
        setErrorFor(mobile, 'Mobile cannot de blank');
    } else if (!isMobile(mobileValue)) {
        setErrorFor(mobile, 'Mobile is not valid');
        //setSuccessFor(mobile);
    } else {
        setSuccessFor(mobile);
    }

    if(emailValue === '') {                                  //check email
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;                         // add error message inside small
    formControl.className = 'form-control error';      // add error class
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return  /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(email);
}

function isMobile(mobile) {
    return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(mobile);
}

function isName(name) {             //only letters
    return /^[a-zA-Zа-яёА-ЯЁ]+$/.test(name);
}