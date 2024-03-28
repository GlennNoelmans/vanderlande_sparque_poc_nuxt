export const useFilterStore = defineStore("filter", {
  state: () => ({
    areas: [] as any,
    zones: [] as any,
    assets: [] as any,
    activeArea: "" as string,
    activeZone: "" as string,
    activeAsset: null as null | string,
    assetsShown: [] as any,
    selectedStore: "base",
    selectedComponentHeader: "location",
    isSparepartsActiveInBase: false as boolean,
    isLocationActiveInBase: false as boolean,
    filteredAsset: null as any,
    filteredAssetLabel: "Area" as string,
    filteredMarkNumber: "0000.00.000.000" as string,
    hierarchyPage: 1 as number,
    hierarchyAreaPage: 1 as number,
    hierarchyZonePage: 1 as number,
    hierarchyAssetPage: 1 as number,
    isHierarchyLoaded: false as Boolean,
  }),
  getters: {
    totalProducts(state): number {
      return state?.assetsShown[1]?.total;
    },
    totalPages(): number {
      return Math.ceil(this.totalProducts / 10);
    },
  },
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
    setActiveArea(area: string) {
      this.activeArea = area;
    },
    setActiveZone(zone: string) {
      this.activeZone = zone;
    },
    setActiveAsset(asset: string) {
      this.activeAsset = asset;
    },
    setFilteredAsset(tupleItem: any) {
      this.filteredAsset = tupleItem;
    },
    setFilteredAssetLabel(label: string) {
      this.filteredAssetLabel = label;
    },
    setFilteredMarkNumber(markNumber: string) {
      this.filteredMarkNumber = markNumber;
    },
    clearAssetsShown() {
      this.assetsShown = [];
    },
    setCurrentPage(page: number) {
      this.hierarchyPage = page;
    },
    setAreaPage(page: number) {
      this.hierarchyAreaPage = page;
    },
    setZonePage(page: number) {
      this.hierarchyZonePage = page;
    },
    setAssetPage(page: number) {
      this.hierarchyAssetPage = page;
    },
    setIsSparepartsActiveInBase() {
      this.isSparepartsActiveInBase = !this.isSparepartsActiveInBase;
    },
    setIsLocationActiveInBase() {
      this.isLocationActiveInBase = !this.isLocationActiveInBase;
    },
    async fetchStructure(
      site_id: number,
      keyword: number | string,
      depthLevel: string,
      offset: number,
    ) {
      this.isHierarchyLoaded = true;
      this.clearAssetsShown();
      const runtimeConfig = useRuntimeConfig();
      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Hierarchy/p/siteID/${site_id}/p/query/${keyword}/results,count?config=default&offset=${offset}`
        );
        this.assetsShown = data;
        this.isHierarchyLoaded = false;
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
    async fetchStructureWithTypeFilter(
      site_id: number,
      keyword: number | string,
      filter: string,
      offset: number,
    ) {
      this.isHierarchyLoaded = true;
      this.clearAssetsShown();
      const runtimeConfig = useRuntimeConfig();
      try {
        const data = await $fetch(
          `https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Hierarchy/p/siteID/${site_id}/p/query/${keyword}/e/TypeFilter/p/filter/${filter}/results,count?config=default&offset=${offset}`
        );
        this.assetsShown = data;
        this.isHierarchyLoaded = false;
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    },
  },
});
