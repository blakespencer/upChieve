const vueApp = new Vue({
  el: '#vapp',
  data: {
    display: 'Hello World',
    results: [],
  },
  async mounted() {
    const res = await axios.get('/api/colleges');
    console.log('res', res.data);
    const vm = this;
    vm.results = res.data.results;
  },
});
