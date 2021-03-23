//* 1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine (или search) и привязать к нему содержимое поля ввода. На кнопку «Искать» (или поле ввода) добавить обработчик клика, вызывающий метод FilterGoods (или searchHandler).
//* 2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
//* 3. *Добавлять в .goods-list (у меня это .featured) заглушку с текстом «Нет данных» в случае, если список товаров пуст.

const API_URL = './goods.json';

const vue = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    search: '',
    isVisibleCart: false,
  },
  methods: {
    searchHandler() { // поиск товаров в строке поиска
      if(this.search === '') {
        this.filteredGoods = this.goods;
      }
      const regexp = new RegExp(this.search, 'gi');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    },

    visibleCartHandler() { // кнопка открытия/закрытия корзины
        this.isVisibleCart = !this.isVisibleCart;
    },

    addCartHandler(e) { // добавление товара в корзину
      const good = this.filteredGoods.find((item) => item.id == e.target.id); // находим товар с нужным нам id
      this.cart.push(good);
      this.good.count = 1;
      this.good.value = +(this.good.price * this.good.count);
    },

    removeCartHandler(e) { // удаление товара из корзины
      const index = this.cart.findIndex((item) => item.id == e.target.closest('.cart__cross-button').id); //находим индекс товара в корзине с нужным нам id
      this.cart.splice(index, 1);
    },

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
            success(JSON.parse(xhr.responseText));
          } else if (xhr.status > 400) {
            error('Произошла ошибка');
          }
        }
      }
  
      xhr.open('GET', API_URL, true);
      xhr.send();
    },
  
    fetchPromise() {
      return new Promise((resolve, reject) => {
        this.fetch(reject, resolve)
      })
    }
  },
  mounted() {
    this.fetchPromise()
      .then(data => {
        this.goods = data;
        this.filteredGoods = data;
      })
      .catch(err => {
        console.log(err); 
      });
  },
});