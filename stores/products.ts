export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as any,
  }),
  getters: {},
  actions: {
    async fetchAllProductsFromMock() {
      try {
        const data = await $fetch(
          `https://f4ce62b4-324d-4b36-8354-3a75d2278bff.mock.pstmn.io/allProducts`
        );
        console.log(data);
        this.products = data;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
  },
});
