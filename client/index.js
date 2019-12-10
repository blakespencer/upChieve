const vueApp = new Vue({
  el: '#vapp',
  data: {
    display: 'Hello World',
    results: [],
    selected: '',
    page: 0,
  },
  async mounted() {
    const vm = this;
    const res = await axios.get(`/api/colleges?page=${vm.page}`);
    vm.results = res.data;
  },
  methods: {
    onChange(event) {
      const vm = this;
      const results = vm.results;
      if (event.target.value === 'alphabet') {
        const sorted = this.sortAlpha(results);
        vm.results = sorted;
      } else {
        vm.results = this.sortSize(results);
      }
    },
    sortAlpha(results) {
      const sorted = results.sort((a, b) => {
        if (a['school.name'] > b['school.name']) {
          return 1;
        }
        if (b['school.name'] > a['school.name']) {
          return -1;
        }
        return 0;
      });
      return sorted;
    },
    sortSize(results) {
      const sorted = results.sort(
        (a, b) => b['latest.student.size'] - a['latest.student.size']
      );
      return sorted;
    },
    async changePage(isInc) {
      const vm = this;
      try {
        if (isInc) {
          const page = vm.page + 1;
          const newResults = await axios.get(`/api/colleges?page=${page}`);
          vm.results = newResults.data;
          vm.selected = '';
          vm.page++;
        } else if (vm.page > 0) {
          const page = vm.page - 1;
          const newResults = await axios.get(`/api/colleges?page=${page}`);
          vm.results = newResults.data;
          vm.selected = '';
          vm.page--;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
});
