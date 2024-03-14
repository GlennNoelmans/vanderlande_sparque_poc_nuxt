export const toggleActiveStructureAndFetchNewLevel = (tupleItem: any, activeArea: any, activeZone: any, activeAsset: any, filterStore: any, runtimeConfig: any) => {
    if (tupleItem.attributes.MarkCode.toUpperCase() == 'AREA') {
        if (activeArea == tupleItem.attributes.MarkNumber) {
            filterStore.setActiveArea("");
            filterStore.setActiveZone("");
            filterStore.setActiveAsset("");
            return;
        }
        else {
            filterStore.setActiveArea(tupleItem.attributes.MarkNumber);
        }
    } else if (tupleItem.attributes.MarkCode.toUpperCase() == 'ZONE') {
        if (activeZone == tupleItem.attributes.MarkNumber) {
            filterStore.setActiveZone("");
            filterStore.setActiveAsset("");
            return;
        }
        else {
            filterStore.setActiveZone(tupleItem.attributes.MarkNumber);
        }
    } else {
        if (activeAsset == tupleItem.attributes.MarkNumber) {
            filterStore.setActiveAsset("");
            return;
        }
        else {
            filterStore.setActiveAsset(tupleItem.attributes.MarkNumber);
        }
    }
    
    filterStore?.fetchStructure(runtimeConfig.public.SITE_ID, tupleItem.attributes.AssetID, tupleItem.attributes.systemDepthNumber);
    filterStore?.setFilteredAsset(tupleItem.attributes.MarkNumber);
    filterStore.setSelectedStore("base");
    setFilteredAssetLabel(tupleItem.attributes.MarkCode, filterStore);
};