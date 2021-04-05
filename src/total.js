Vue.component('total', { // Компонент общей стоимости корзины
  template: `<div class="total">
    <p class="total__text">Grand total of shopping cart<span class="colortext text-margin text-bold">\${{ total }}</span></p>
  </div>`,
  props: {
    total: Number,
  },
})