export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as any,
    productCategories: [] as any,
    currentProduct: [] as any,
    childComponents: [] as any,
    parentComponents: [] as any,
    productPage: 1 as number,
    isSearchActive: false as boolean,
    searchKeyword: null as null | string,
    categoryFilter: null as null | string,
    initialDataLoaded: false as boolean,
    isProductLoading: false as boolean,
  }),
  getters: {
    totalProducts(state): number {
      return state?.products[1]?.total;
    },
    totalPages(): number {
      return Math.ceil(this.totalProducts / 10);
    },
  },
  actions: {
    clearProducts() {
      this.products = [];
    },
    clearCurrentProduct() {
      this.currentProduct = [];
    },
    clearProductCategories() {
      this.productCategories = [];
    },
    clearChildComponents() {
      this.childComponents = [];
    },
    clearParentComponents() {
      this.parentComponents = [];
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
    setCategoryFilter(filter: string) {
      this.categoryFilter = filter;
    },
    setInitialDataLoaded(isLoaded: boolean) {
      this.initialDataLoaded = isLoaded;
    },
    async fetchAllProducts(
      site_id: number,
      offset: number | string,
    ) {
      this.isProductLoading = true;
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
        this.isProductLoading = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
    async fetchAllProductCategories(
      site_id: number,
      keyword: string,
    ) {
      this.clearProductCategories();
      const runtimeConfig = useRuntimeConfig();
      try {
        
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Search/p/siteID/${site_id}/p/keyword/${keyword}/e/Categories/results,count?config=default&count=1000`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.productCategories = data;
        
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async fetchProductsFilteredByCategory(
      site_id: number,
      keyword: string,
      filter: string,
      offset: string,
    ) {
      this.isProductLoading = true;
      this.clearProducts();
      const runtimeConfig = useRuntimeConfig();
      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Search/p/siteID/${site_id}/p/keyword/${keyword}/e/Categories/p/filter/${filter}/results,count?config=default&count=10&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.products = data;
        this.isProductLoading = false;
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
      this.isProductLoading = true;
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
        this.isProductLoading = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async searchProductByMarkNumber(
      site_id: number,
      markNumber: string,
      offset: string,
    ) {
      this.clearCurrentProduct();
      this.isProductLoading = true;
      const runtimeConfig = useRuntimeConfig();
      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Search/p/siteID/${site_id}/p/keyword/${markNumber}/results,count?config=default&count=10&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.currentProduct = data;
        this.isProductLoading = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async getChildComponentsOfProduct(
      site_id: number,
      keyword: string | number,
    ) {
      this.clearChildComponents();
      const runtimeConfig = useRuntimeConfig();

      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/GetChildren/p/siteID/${site_id}/p/query/${keyword}/results,count?config=default&count=100`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.childComponents = data;
        
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async getParentComponentsOfProduct(
      site_id: number,
      keyword: string,
    ) {
      this.clearParentComponents();
      const runtimeConfig = useRuntimeConfig();

      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/GetParents/p/siteID/${site_id}/p/query/${keyword}/results,count?config=default&count=100`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        this.parentComponents = data;
        
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
  },
});
