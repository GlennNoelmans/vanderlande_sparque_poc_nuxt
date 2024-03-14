export function setFilteredAssetLabel(markCode: string, filterStore: any) {
    if (markCode.toLowerCase() == 'area') {
        filterStore.setFilteredAssetLabel("Zone");
    }
    else if (markCode.toLowerCase() == 'zone') {
        filterStore.setFilteredAssetLabel("Asset");
    }
    else {
        filterStore.setFilteredAssetLabel("Result");
    }
}