Vue.component('search', {
  template: `<input id="header__search-area" v-model="search" v-on:input="searchHandler">`,
  data() {
    return {
      search: '',
    }
  },
  methods: {
    searchHandler() {
      this.$emit('search', this.search);
    }
  },
})