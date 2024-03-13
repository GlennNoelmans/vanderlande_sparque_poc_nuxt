export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as any,
    currentProduct: [] as any,
    productPage: 1 as number,
    isSearchActive: false as boolean,
    searchKeyword: null as string | null,
  }),
  getters: {},
  actions: {
    clearProducts() {
      this.products = [];
    },
    setCurrentProduct(product: any) {
      this.currentProduct = product;
    },
    setCurrentPage(page: number) {
      this.productPage = page;
    },
    setIsSearchActive(isActive: boolean) {
      this.isSearchActive = isActive;
    },
    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword;
    },
    async fetchAllProducts(
      site_id: number,
      offset: number | string,
    ) {
      this.clearProducts();
      const runtimeConfig = useRuntimeConfig();
      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/AllProducts/p/siteID/${site_id}/results,count?config=default&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.products = data;
        
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async searchProducts(
      site_id: number,
      keyword: string,
      offset: string,
    ) {
      this.clearProducts();
      const runtimeConfig = useRuntimeConfig();

      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Search/p/siteID/${site_id}/p/keyword/${keyword}/results,count?config=default&count=10&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.products = data;
        
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
  },
});
