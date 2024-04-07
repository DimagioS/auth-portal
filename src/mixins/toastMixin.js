export default {
  methods: {
    showToast(severity, summary, detail, life = 3000) {
      this.$toast.add({ severity, summary, detail, life });
    }
  }
};