Vue.component('error', {
  template: `<p>{{ err }}</p>`,
  props: {
    err: String,
    isError: Boolean,
  },
})