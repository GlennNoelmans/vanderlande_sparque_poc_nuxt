<script setup>
import { useFilterStore } from '@/stores/filter';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const { hierarchyPage } = storeToRefs(filterStore);
const { filteredAsset } = storeToRefs(filterStore);
const { isSparepartsActiveInBase } = storeToRefs(filterStore);
const { isLocationActiveInBase } = storeToRefs(filterStore);

const toggleFiltersActiveInBase = () => {
    if (isSparepartsActiveInBase.value && isLocationActiveInBase.value) {
        fetchStructureWithTypeFilter('Asset_Item');
    } else if (isLocationActiveInBase.value) {
        fetchStructureWithTypeFilter('Asset');
    } else if (isSparepartsActiveInBase.value) {
        fetchStructureWithTypeFilter('Item');
    } else {
        fetchStructureWithDefaults();
    }
}

const toggleIsSparepartsActiveInBase = () => {
    filterStore.setIsSparepartsActiveInBase();
    filterStore.setCurrentPage(1);
    toggleFiltersActiveInBase();
}

const toggleIsLocationActiveInBase = () => {
    filterStore.setIsLocationActiveInBase();
    filterStore.setCurrentPage(1);
    toggleFiltersActiveInBase();
}

function fetchStructureWithDefaults() {
    filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID || 2, filteredAsset?.value?.attributes?.systemDepthNumber || 1, (hierarchyPage?.value - 1) * 10);
}

function fetchStructureWithTypeFilter(typeFilter) {
    filterStore.fetchStructureWithTypeFilter(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID || 2, typeFilter, 0);
}

</script>
<template>
    <label class="checkbox-container">Spareparts
        <input type="checkbox" :checked="isSparepartsActiveInBase" @change="toggleIsSparepartsActiveInBase">
        <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Location
        <input type="checkbox" :checked="isLocationActiveInBase" @change="toggleIsLocationActiveInBase">
        <span class="checkmark"></span>
    </label>
</template>