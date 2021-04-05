import componentSearch from './search.js';
import goodsItem from './goods-item.js';
import cartItem from './cart-item.js';
import componentTotal from './total.js';
import componentError from './error.js';

export default {
  components: {
    'search': componentSearch,
    'goods-item': goodsItem,
    'cart-item': cartItem,
    'total': componentTotal,
    'error': componentError
  }
}

const vue = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cart: [],
    search: '',
    err: '',
    total: 0,
    isVisibleCart: false,
    isError: false,
  },
  methods: {
    searchHandler(search) { // поиск товаров в строке поиска
      if(search === '') {
        this.filteredGoods = this.goods;
      }
      const regexp = new RegExp(search, 'gi');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    },

    visibleCartHandler() { // метод открытия/закрытия корзины
      this.isVisibleCart = !this.isVisibleCart;
    },

    addCartHandler(e) { // добавление товара в корзину
      const good = this.filteredGoods.find((item) => item.id == e.target.closest('.feature__button').id); // находим товар с нужным нам id
      good.count = 1; // в будущем можно добавить дропдаун и пользователь будет указывать количество товаров
      good.value = ((good.price*100) * good.count)/100;
      this.total = Math.round(this.total*100 + good.value*100)/100;

      fetch('/cart', { // добавление товара в корзину
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      });

      fetch('/statsAdd', { // добавление статистики
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      });

      this.cart.push(good);
    },

    removeCartHandler(e) { // удаление товара из корзины
      const good = this.cart.find((item) => item.id == e.target.closest('.cart__cross-button').id); // находим товар с нужным нам id (для определения value)
      const index = this.cart.findIndex((item) => item.id == e.target.closest('.cart__cross-button').id); //находим индекс товара в корзине с нужным нам id (для удаления товара)
      this.total = Math.round(this.total*100 - good.value*100)/100;

      fetch('/cart', { // удаление товара из корзины
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      });

      fetch('/statsDelete', { // добавление статистики (об удалении товара)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      });

      this.cart.splice(index, 1);
    },

    fetch(error, success) { // получение списка товаров из базы
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
            error('An error has occurred.');
          }
        }
      }
  
      xhr.open('GET', `/data` , true);
      xhr.send();
    },

    fetchPromise() {
      return new Promise((resolve, reject) => {
        this.fetch(reject, resolve)
      })
    }
  },
  mounted() {
    this.fetchPromise() // получаем список товаров из базы при загрузке страницы
      .then(data => {
        this.goods = data;
        this.filteredGoods = data;
      })
      .catch(err => {
        this.isError = !this.isError;
        this.err = err;
      });

      fetch('/cart') // получаем список товаров ранее созданной корзины
      .then(response => response.json())
      .then(data => {
        this.cart = data;
        this.total = this.cart.reduce(function(acc, curr){return acc + curr.value}, 0); // расчет стоимости корзины при перезагрузке страницы
      })
      .catch(err => {
        console.log(err);
      })
  },
});