export const useFilterStore = defineStore("filter", {
  state: () => ({
    areas: [] as any,
    zones: [] as any,
    assets: [] as any,
    assetsShown: [] as any,
    products: [],
    selectedStore: "store",
    selectedComponentHeader: "child",
    filteredAsset: "" as string,
    hierarchyPage: 1 as number | string,
  }),
  getters: {},
  actions: {
    setSelectedStore(store: string) {
      this.selectedStore = store;
    },
    setSelectedComponentHeader(selectedHeader: string) {
      this.selectedComponentHeader = selectedHeader;
    },
    setAreas(data: any) {
      this.areas = data;
    },
    setFilteredAsset(markNumber: string) {
      this.filteredAsset = markNumber;
    },
    clearAssetsShown() {
      this.assetsShown = [];
    },

    async fetchStructure(
      site_id: number,
      keyword: number | string,
      depthLevel: string
    ) {
      this.clearAssetsShown();
      const runtimeConfig = useRuntimeConfig();

      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Hierarchy/p/siteID/${site_id}/p/query/${keyword}/results,count?config=default`,
          {
            headers: {
              Authorization: `Bearer ${runtimeConfig.public.BEARER_TOKEN}`,
            },
          }
        );
        
        this.assetsShown = data;
        var depthLevelNumber = parseInt(depthLevel, 10);
        switch (depthLevelNumber + 1) {
          case 2:
            this.areas = data;
            break;
          case 3:
            this.zones = data;
            break;
          case 4:
            this.assets = data;
            break;
          default:
            break;
        }
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
  },
});
