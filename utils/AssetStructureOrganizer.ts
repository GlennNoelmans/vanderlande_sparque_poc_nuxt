export const toggleActiveStructureAndFetchNewLevel = (tupleItem: any, activeArea: any, activeZone: any, activeAsset: any, filterStore: any, customerId: number | string) => {
    if (tupleItem.attributes.systemDepthNumber == 2) {    
        if (activeArea == tupleItem.attributes.MarkNumber) {
            filterStore.setActiveArea("");
            filterStore.setActiveZone("");
            filterStore.setActiveAsset("");
            return;
        }
        else {
            filterStore.setActiveArea(tupleItem.attributes.MarkNumber);
        }
    } else if (tupleItem.attributes.systemDepthNumber == 3) {
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
    
    filterStore?.fetchStructure(customerId, tupleItem.attributes.AssetID, tupleItem.attributes.systemDepthNumber, 0);
    filterStore?.setFilteredAsset(tupleItem);
    filterStore?.setFilteredMarkNumber(tupleItem.attributes.MarkNumber);
    filterStore?.setSelectedStore("base");
    filterStore?.setCurrentPage(1);
    setFilteredAssetLabel(tupleItem.attributes.MarkCode, filterStore);
};