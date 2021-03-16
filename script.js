//* 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.

const text = document.querySelectorAll('.text');
const regexp = /'/gi;
text.forEach (item => item.innerText = item.innerText.replace(regexp, '"'));


//* 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

const goodText = document.querySelectorAll('.good-text');
const goodRegexp = /^'|'$/gi;
goodText.forEach (item => item.innerText = item.innerText.replace(goodRegexp, '"'));
const spaceBeforeRegexp = /\s'/gi;
goodText.forEach (item => item.innerText = item.innerText.replace(spaceBeforeRegexp, ' "'));
const spaceAfterRegexp = /'\s/gi;
goodText.forEach (item => item.innerText = item.innerText.replace(spaceAfterRegexp, '" '));
const symbolAfterRegexp = /'(\W)/gi;
goodText.forEach (item => item.innerText = item.innerText.replace(symbolAfterRegexp, '"$1'));

//* 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

const form = document.querySelector('form');
const userName = document.querySelector('.name');
const userNameError = document.querySelector('.name__error');
const userTel = document.querySelector('.tel');
const userTelError = document.querySelector('.tel__error');
const userEmail = document.querySelector('.email');
const userEmailError = document.querySelector('.email__error');

const regexName = /^([a-z\s]+|[а-яё\s]+)$/i; //валидация имени
const regexTel = /\+7\((\d){3}\)(\d){3}-(\d){4}/; //валидация номера телефона
const regexEmail = /^(\w+\.?-?\w*@\w+\.(ru|com))$/i; //валидация емейла

form.addEventListener('submit', () => {
  if(regexName.test(userName.value) && regexTel.test(userTel.value) && regexEmail.test(userEmail.value)) {
    alert('Ваше сообщение отправлено');
  }
  if (!regexName.test(userName.value)) {
    userName.style.border='1px solid #DA0101';
    userNameError.style.display='block';
  } else {
    userName.style.border='1px solid #A4A4A4';
    userNameError.style.display='none';
  }
  if (!regexTel.test(userTel.value)) {
    userTel.style.border='1px solid #DA0101';
    userTelError.style.display='block';
  } else {
    userTel.style.border='1px solid #A4A4A4';
    userTelError.style.display='none';
  }
  if (!regexEmail.test(userEmail.value)) {
    userEmail.style.border='1px solid #DA0101';
    userEmailError.style.display='block';
  } else {
    userEmail.style.border='1px solid #A4A4A4';
    userEmailError.style.display='none';
  }
});