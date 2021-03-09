//* 2. Добавить для GoodsList метод, определяющий суммарную стоимость всех товаров.

class ApiMock {
  constructor() {

  }

  fetch() {
    return [
      {     
        id: 1,
        src: "img/feature-1.jpg",
        alt: "Men's wear",
        link: "#",
        title: "ellery x m'o capsule",
        desc: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: 52.53,
      },
      {
        id: 2,
        src: "img/feature-2.jpg",
        alt: "Ladies wear",
        link: "#",
        title: "ellery x m'o",
        desc: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda.",
        price: 30.00,
      },
      {
        id: 3,
        src: "img/feature-3.jpg",
        alt: "Men's wear",
        link: "#",
        title: "ellery capsule",
        desc: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with.",
        price: 45.10,
      },
    ];
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
      <svg class="feature__button-icon" width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" fill="white"/>
      </svg>
      <span class="feature__button-text">Add to Cart</span>
    </button>
    <a href="${this.link}" class="feature__link"><h4 class="feature__name">${this.title}</h4></a>
    <a href="${this.link}" class="feature__link">
      <p class="feature__desc">${this.desc}</p>
    </a>
    <p class="feature__price">$${this.price}</p>
    </li>`
  }
}

class GoodsList {
  constructor() {
    this.api = new ApiMock();
    this.$goodsList = document.querySelector('.features');
    this.goods = [];
    this.value = 0;
  }

  fetchGoods() {
    this.goods = this.api.fetch().map(({id, link, title, desc, price, src, alt}) => new GoodsItem(id, link, title, desc, price, src, alt));
  }

  render() {
    this.$goodsList.textContent = '';
    this.goods.forEach(item => {
        this.$goodsList.insertAdjacentHTML('beforeend', item.getHtml());
    })
  }

  goodsValue() { //метод, определяющий суммарную стоимость всех товаров
    this.goods.forEach(item => {this.value += item.price;});
    this.$goodsList.insertAdjacentHTML("afterEnd", `<div class="total"><p class="total__text">Total value<span class="colortext text-margin text-bold">$${this.value}</span></p></div>`);
  }
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
goodsList.goodsValue();

//* 1. Добавить пустые классы для корзины товаров и элемента корзины товаров. Продумать, какие методы понадобятся для работы с этими сущностями.

class CartItem extends GoodsItem {
  constructor(id, link, title, desc, price) {
    super(id, link, title, desc, price);

    this.count = 1; // кол-во товаров одного типа (можно потом сделать дропдаун и получать кол-во товаров от пользователя) 
    this.value = +(this.price * this.count); //стоимость товаров одного типа
  }

  getHtml() { // переопределяем HTML-код для товара в корзине (убираем фото, добавляем кол-во и стоимость, задаем стили)
    return `<li>
      <a href="${this.link}" class="cart__link">
        <p class="cart__item">${this.title}</p>
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
    this.api = new ApiMock();
    this.$cartList = document.querySelector('.cart__list');//список товаров в корзине
    this.$buyButton = document.querySelectorAll(".feature__button");//кнопки добавления товара в корзину
    this.cart = [];//массив товаров корзины
    this.total = 0;//общая стоимость товаров в корзине
  }

  buy() {//добавляем обработчики (onclick) для всех кнопок добавления товара в корзину

  }

  buyFunc() {//функция по клику на кнопку добавления товара в корзину (Add to cart)
    //находим товар (индекс товара) с нужным нам id
    //добавляем этот товар в корзину
    //убираем текст "Ваша корзина пуста", что-то типа: //document.querySelector(".cart__text").style.display="none";
  }

  cartTotal() {//метод, определяющий суммарную стоимость корзины
    this.cart.forEach(item => {this.total += item.value;});//пересчитываем общую стоимость товаров корзины
    this.$cartList.insertAdjacentHTML("afterEnd", `<div class="total"><p class="total__text">Grand total of shopping cart<span class="colortext text-margin text-bold">$${this.total}</span></p></div>`);//добавляем общую стоимость товаров
  }
}

const cartList = new CartList();

cartList.buy();
cartList.buyFunc();
cartList.cartTotal();

//* 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// Маленький (50 рублей, 20 калорий). ### Большой (100 рублей, 40 калорий). 
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// С сыром (+10 рублей, +20 калорий). ### С салатом (+20 рублей, +5 калорий). ### С картофелем (+15 рублей, +10 калорий). 
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.

class Burger {
  constructor(builder) {
      this.size = builder.size;
      this.stuffing = builder.stuffing;
      this.dressing = builder.dressing || false;
      this.mayo = builder.mayo || false;
      this.price = builder.price;
      this.calories = builder.calories;
  }
}

class BurgerBuilder {
  constructor(size) {
    this.size = size;
  }

  setStuffing (stuff) {
    this.stuffing = stuff;
    return this;
  }

  addDressing() {
      this.dressing = true;
      return this;
  }

  addMayo() {
      this.mayo = true;
      return this;
  }

  getPrice() {
    this.price = 0;
    if (this.size == 'big') {
      this.price += 100;
    } if (this.size == 'small') {
      this.price += 50;
    } if (this.stuffing == 'cheese') {
      this.price += 10;
    } if (this.stuffing == 'salad') {
      this.price += 20;
    } if (this.stuffing == 'potato') {
      this.price += 15;
    } if (this.dressing == true) {
      this.price += 15;
    } if (this.mayo == true) {
      this.price += 20;    
    }
    return this;
  }

  getCalories() {
    this.calories = 0;
    if (this.size == 'big') {
      this.calories += 40;
    } if (this.size == 'small') {
      this.calories += 20;
    } if (this.stuffing == 'cheese') {
      this.calories += 20;
    } if (this.stuffing == 'salad') {
      this.calories += 5;
    } if (this.stuffing == 'potato') {
      this.calories += 10;
    } if (this.mayo == true) {
      this.calories += 5;
    }
    return this;
  }

  getProduct() {
    if (this.stuffing !== 'cheese' && this.stuffing !== 'salad' && this.stuffing !== 'potato') {
      throw new Error(`${this.constructor.name} получил некорректное значение stuffing`)
    } else if (this.size !== 'big' && this.size !== 'small') {
      throw new Error(`${this.constructor.name} получил некорректное значение size`)
    }
    return new Burger(this);
  }
}

// Клиентский код. При необходимости можно его поместить в отдельный класс - Director
const burger = (new BurgerBuilder('big'))
  .setStuffing('cheese')
  .addDressing()
  .addMayo()
  .getPrice()
  .getCalories()
  .getProduct()

console.log(burger); //price 145, calories 65

const smallBurger = (new BurgerBuilder('small')) // делаем еще один бургер, но чтобы результат был другим
  .setStuffing('salad')
  .addDressing()
  .getPrice()
  .getCalories()
  .getProduct()

console.log(smallBurger); //price 85, calories 25

// Проверка обработки ошибки: некорректный размер бургера
/*const noBurger = (new BurgerBuilder(5))
  .setStuffing('potato')
  .addDressing()
  .addMayo()
  .getPrice()
  .getCalories()
  .getProduct()

console.log(noBurger);*/