//* 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.

const $goodsList = document.querySelector('.features'); //сюда добавим список товаров
const $cartList = document.querySelector('.cart__list'); //сюда добавим корзину
const $cartTotal = document.querySelector('.total'); //сюда добавим стоимость корзины
const $cartCounter = document.querySelector('.header__cart-circle'); //сюда добавим счетчик позиций корзины

class Api {
  constructor() {
    this.url = './goods.json'
  }

  fetch(error, success) {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(xhr.responseText);
        } else if (xhr.status > 400) {
          error('Произошла ошибка');
        }
      }
    }

    xhr.open('GET', this.url, true);
    xhr.send();
  }

  fetchPromise() {
    return new Promise((resolve, reject) => {
      this.fetch(reject, resolve)
    })
  }
    
  fromJSON(data) {
    return new Promise((resolve) => {
      resolve(JSON.parse(data));
    })
  }
}

//* 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

class Header {
  constructor() {
    this.$container = document.querySelector('header');
    this.$search = this.$container.querySelector('#header__search-area');
    this.$cartButton = this.$container.querySelector('.header__cart-button');
  }

  searchHandler(callback) { // поиск товаров
    this.$search.addEventListener('input', callback);
  }

  cartButtonHandler(callback) { //метод открытия корзины (получения списка товаров корзины)
    this.$cartButton.addEventListener('click', callback);
  }
}

class GoodsItem {
  constructor(id, link, title, desc, price, src, alt) {
    this.id = id;
    this.src = src;
    this.alt = alt;
    this.link = link;
    this.title = title;
    this.desc = desc;
    this.price = price;
  }

  getHtml() {
    return `<li class="feature">
    <img class="feature__img" src="${this.src}" alt="${this.alt}">
    <button class="feature__button" id="${this.id}">
      <svg class="feature__button-icon" id="${this.id}" width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" fill="white"/>
      </svg>
      <span class="feature__button-text" id="${this.id}">Add to Cart</span>
    </button>
    <a href="${this.link}" class="feature__link"><h4 class="feature__name">${this.title}</h4></a>
    <a href="${this.link}" class="feature__link">
      <p class="feature__desc">${this.desc}</p>
    </a>
    <p class="feature__price">$${this.price}</p>
    </li>`
  }
}

class CartItem extends GoodsItem {
  constructor(id, link, title, desc, price) {
    super(id, link, title, desc, price);

    this.count = 1; // кол-во товаров одного типа (можно потом сделать дропдаун и получать кол-во товаров от пользователя) 
    this.value = +(this.price * this.count); //стоимость товаров одного типа
  }

  getHtml() { // переопределяем HTML-код для товара в корзине (убираем фото, добавляем кол-во и стоимость, задаем стили)
    return `<li class="cart__item">
      <button class="cart__cross-button" id="${this.id}">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.4158 6.00409L11.7158 1.71409C11.9041 1.52579 12.0099 1.27039 12.0099 1.00409C12.0099 0.73779 11.9041 0.482395 11.7158 0.294092C11.5275 0.105788 11.2721 0 11.0058 0C10.7395 0 10.4841 0.105788 10.2958 0.294092L6.0058 4.59409L1.7158 0.294092C1.52749 0.105788 1.2721 -1.9841e-09 1.0058 0C0.739497 1.9841e-09 0.484102 0.105788 0.295798 0.294092C0.107495 0.482395 0.0017066 0.73779 0.0017066 1.00409C0.0017066 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.0058 7.41409L10.2958 11.7141C10.3888 11.8078 10.4994 11.8822 10.6212 11.933C10.7431 11.9838 10.8738 12.0099 11.0058 12.0099C11.1378 12.0099 11.2685 11.9838 11.3904 11.933C11.5122 11.8822 11.6228 11.8078 11.7158 11.7141C11.8095 11.6211 11.8839 11.5105 11.9347 11.3887C11.9855 11.2668 12.0116 11.1361 12.0116 11.0041C12.0116 10.8721 11.9855 10.7414 11.9347 10.6195C11.8839 10.4977 11.8095 10.3871 11.7158 10.2941L7.4158 6.00409Z" fill="#6F6E6E"/>
        </svg>
      </button>
      <a href="${this.link}" class="cart__link">
        <p class="cart__title">${this.title}</p>
      </a>
      <a href="${this.link}" class="cart__link">
        <p class="cart__desc">${this.desc}</p>
      </a>
      <p class="cart__desc">Price:<span class="colortext text-margin">$${this.price}</span>
      <span class="cart__desc text-margin">Count:</span><span class="colortext text-margin">${this.count}</span>
      <span class="cart__desc text-margin">Value:</span><span class="colortext text-margin text-bold">$${this.value}</span></p> 
    </li>`
  }
}

class CartList {
  constructor() {
    this.goods = [];
    this.$crossButton = []; // кнопки удаления товаров из корзины
    this.total = 0; //общая стоимость товаров в корзине
    this.counter = 0; //счетчик позиций в корзине
  }

  openCart() { // открытие корзины
    document.querySelector(".cart").style.display="block";
  }

  add(good) {
    this.goods.push(good);
  }

  render() {
    $cartList.textContent = '';
    this.goods.forEach((item) => {
      $cartList.insertAdjacentHTML('beforeend', item.getHtml());
    })
  }

  getCartTotalPrice() { //метод, определяющий суммарную стоимость корзины
    this.total = 0;
    this.goods.forEach(item => {this.total += item.value;});
    $cartTotal.innerHTML = `<p class="total__text">Grand total of shopping cart<span class="colortext text-margin text-bold">$${this.total}</span></p>`; //добавляем сумму корзины на сайт
    return this.total; 
  }

  getCartCounter() { //метод, определяющий счетчик позиций в корзине
    this.counter = 0;
    this.counter = this.goods.length;
    $cartCounter.innerText = this.counter; //добавляем счетчик на сайт
    return this.counter; 
  }

  crossButtonHandler(callback) {//добавляем обработчики (onclick) для всех кнопок удаления товаров из корзины
    this.$crossButton = document.querySelectorAll('.cart__cross-button');
    for (var i = 0; i < this.$crossButton.length; i++) {
      this.$crossButton[i].addEventListener('click', callback);
    }
  }
  
  deleteFromCart(e) { // метод удаления товара из корзины
    let j = cartList.goods.findIndex(function(entry){return entry.id == e.target.id;}); //находим индекс товара в корзине с нужным нам id
    cartList.goods.splice(j, 1);
    cartList.render();//отображаем товары корзины на сайте
    cartList.getCartTotalPrice();
    cartList.getCartCounter(); //счетчик позиций в корзине
    cartList.crossButtonHandler(cartList.deleteFromCart); //снова навешиваем обработчики на кнопки удаления товаров (т.к. рендер создает корзину без обработчиков)
  }
}

const cartList = new CartList();

class GoodsList {
  constructor() {
    this.api = new Api();
    this.header = new Header();
    this.$buyButton = []; // кнопки добавления товаров в корзину
    this.goods = []; 
    this.filteredGoods = [];
    //без промисов
    //this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this));

    this.header.searchHandler((ev) => {
      this.search(ev.target.value);
    })

    this.api.fetchPromise()
    .then((response) => { return this.api.fromJSON(response) })
    .then((data) => { return this.onFetchSuccess(data) })
    .catch((err) => { return this.onFetchError(err) });
  }

  search(str) { // поиск товаров в строке поиска
    if(str === '') {
      this.filteredGoods = this.goods;
    }
    const regexp = new RegExp(str, 'gi');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    this.render();
    this.buttonHandler(this.addToCart);
  }

  onFetchSuccess(data) {
    this.goods = data.map(({id, link, title, desc, price, src, alt}) => new GoodsItem(id, link, title, desc, price, src, alt));
    this.filteredGoods = this.goods;
    this.render();
    this.buttonHandler(this.addToCart);
  }
  //без промисов
  /*onFetchError() {
    this.$goodsList.insertAdjacentHTML('beforeend', '<h3>Произошла ошибка</h3>');
  }*/

  onFetchError(err) {
    $goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
  }

  render() {
    $goodsList.textContent = '';
    this.filteredGoods.forEach((item) => {
      $goodsList.insertAdjacentHTML('beforeend', item.getHtml());
    })
  }

  buttonHandler(callback) {//добавляем обработчики (onclick) для всех кнопок добавления товара в корзину
    this.$buyButton = document.querySelectorAll('.feature__button');
    for (var i = 0; i < this.$buyButton.length; i++) {
      this.$buyButton[i].addEventListener('click', callback);
    }
  }
  
  addToCart(e) { // метод добавления товара в корзину
    let j = goodsList.filteredGoods.findIndex(function(entry){return entry.id == e.target.id;}); //находим индекс товара с нужным нам id
    let cartId = goodsList.filteredGoods[j].id; 
    let cartLink = goodsList.filteredGoods[j].link;
    let cartTitle = goodsList.filteredGoods[j].title;
    let cartDesc = goodsList.filteredGoods[j].desc;
    let cartPrice = goodsList.filteredGoods[j].price;
    let cartItem = new CartItem(cartId, cartLink, cartTitle, cartDesc, cartPrice); //создаем товар корзины
    cartList.add(cartItem);//добавляем товар в массив товаров корзины
    cartList.render();//отображаем товары корзины на сайте
    cartList.getCartTotalPrice(); //стоимость корзины
    cartList.getCartCounter(); //счетчик позиций в корзине
    cartList.crossButtonHandler(cartList.deleteFromCart); //навешиваем обработчики на кнопки удаления товаров
  }
}

const goodsList = new GoodsList();
goodsList.header.cartButtonHandler(cartList.openCart);