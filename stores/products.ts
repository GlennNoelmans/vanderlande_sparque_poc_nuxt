export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as any,
    productCategories: [] as any,
    currentProduct: [] as any,
    childComponents: [] as any,
    parentComponents: [] as any,
    searchedProducts: [] as any,
    searchedProductsCategories: [] as any,
    productPage: 1 as number,
    productSearchPage: 1 as number,
    assetImage: "" as string,
    isSearchActive: false as boolean,
    searchKeyword: null as null | string,
    categoryFilter: "" as null | string,
    categorySearchFilter: "" as string,
    isCategoryFilterActive: false as boolean,
    isSearchCategoryFilterActive: false as boolean,
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
    totalSearchedProducts(state): number {
      return state?.searchedProducts[1]?.total;
    },
    totalSearchedPages(): number {
      return Math.ceil(this.totalSearchedProducts / 10);
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
    setProductSearchPage(page: number) {
      this.productSearchPage = page;
    },
    setIsSearchActive(isActive: boolean) {
      this.isSearchActive = isActive;
    },
    setIsCategoryFilterActive(isActive: boolean) {
      this.isCategoryFilterActive = isActive;
    },
    setIsSearchCategoryFilterActive(isActive: boolean) {
      this.isSearchCategoryFilterActive = isActive;
    },
    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword;
    },
    setCategoryFilter(filter: string) {
      this.categoryFilter = this.categoryFilter + "," + filter;
    },
    setCategorySearchFilter(filter: string) {
      const filters = this.categorySearchFilter.split(",");
      const index = filters.indexOf(filter);
      if (index === -1) {
        filters.push(filter);
      } else {
        filters.splice(index, 1);
      }
      this.categorySearchFilter = filters.join(",");
    },
    setInitialDataLoaded(isLoaded: boolean) {
      this.initialDataLoaded = isLoaded;
    },
    setAssetImage(image: string) {
      this.assetImage = image;
    },
    clearSearchedProducts() {
      this.searchedProducts = [];
    },
    clearSearchedProductsCategories() {
      this.searchedProductsCategories = [];
    },
    clearCategorySearchFilter() {
      this.categorySearchFilter = "";
    },
    async fetchAllProducts(site_id: number, offset: number | string) {
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
    async fetchAllProductCategories(site_id: number, keyword: string) {
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
      offset: string
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

    async searchProducts(site_id: number, keyword: string, offset: string) {
      this.isProductLoading = true;
      this.clearSearchedProducts();
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
        this.searchedProducts = data;
        this.isProductLoading = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
    async fetchAllSearchedProductCategories(site_id: number, keyword: string) {
      this.clearSearchedProductsCategories();
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
        const reworkedCategoryData = reworkCategoryData(data);
        this.searchedProductsCategories = reworkedCategoryData;
        console.log(reworkedCategoryData);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
    async fetchSearchedProductsFilteredByCategory(
      site_id: number,
      keyword: string,
      filter: string,
      offset: string
    ) {
      this.isProductLoading = true;
      this.clearSearchedProducts();
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
        this.searchedProducts = data;
        this.isProductLoading = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },

    async searchCurrentProductByMarkNumber(
      site_id: number,
      markNumber: string,
      offset: string
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
      keyword: string | number
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

    async getParentComponentsOfProduct(site_id: number, keyword: string) {
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

function reworkCategoryData(data: any) {
  const reworkedData = [];

  for (const item of data[0].items) {
    const item_id = item.tuple[0].id;
    const item_identifier = item.tuple[0].attributes.identifier[0];
    const item_root = parseInt(item.tuple[0].attributes.Root[0]);
    const item_probability = item.probability;

    if (item_root === 1) {
      reworkedData.push({
        id: item_id,
        identifier: item_identifier,
        probability: item_probability,
        children: processTuple(data[0].items, 0, data, item_identifier),
      });
    }
  }

  return reworkedData;
}

function processTuple(
  tupleData: any,
  level: any,
  data: any,
  parentIdentifier: string
) {
  const children = [];
  for (const item of tupleData) {
    const item_id = item.tuple[0].id;
    const item_identifier = item.tuple[0].attributes.identifier[0];
    const item_root = parseInt(item.tuple[0].attributes.Root[0]);
    const item_probability = item.probability;

    if (item_root === level && item_identifier.includes(parentIdentifier)) {
      children.push({
        id: item_id,
        identifier: item_identifier,
        probability: item_probability,
        children: [],
      });
    }
  }

  for (const child of children as any) {
    const parentIdentifierForChildren = child.identifier;
    child.children = processTuple(
      data[0].items.filter(
        (item: any) => parseInt(item.tuple[0].attributes.Root[0]) === level - 1
      ),
      level - 1,
      data,
      parentIdentifierForChildren
    );
  }

  return children;
}
