<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';
import { Icon } from '@iconify/vue/dist/iconify.js';
import zoneList from './zoneList.vue';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const productStore = useProductStore();
const { areas } = storeToRefs(filterStore);
const { activeArea } = storeToRefs(filterStore);
const { activeZone } = storeToRefs(filterStore);
const { activeAsset } = storeToRefs(filterStore);
const { selectedStore } = storeToRefs(filterStore);
const { filteredMarkNumber } = storeToRefs(filterStore);
const { hierarchyPage } = storeToRefs(filterStore);
const { totalPages } = storeToRefs(filterStore);
const { filteredAsset } = storeToRefs(filterStore);
const { totalProducts } = storeToRefs(productStore);

const fetchTopStructure = () => {
    filterStore?.setCurrentPage(1);
    filterStore?.fetchStructure(currentCustomer.value.id, 2, 1, 0);
    filterStore?.setFilteredMarkNumber("0000.00.000.000");
    filterStore?.setFilteredAsset(null);
    filterStore.setActiveArea("");
    filterStore.setActiveZone("");
    filterStore.setActiveAsset("");
};

const fetchPreviousStructuresOnSameLevel = () => {
  if (hierarchyPage.value === 1) {
    return;
  }
  filterStore.setCurrentPage(hierarchyPage.value - 1);
  filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
}

const fetchNextStructuresOnSameLevel = () => {
  if (hierarchyPage.value === totalPages) {
    return;
  }
  filterStore.setCurrentPage(hierarchyPage.value + 1);
  filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
}

const toggleActiveHeader = () => {
    if (selectedStore.value === 'base') {
        filterStore.setSelectedStore('store');
        return;
    }
    filterStore.setSelectedStore('base');
};
</script>
<template>
    <div class="product-filter-container">
        <h2 class="filter-header">Filter by:</h2>
        <div class="filter-component-container">
            <label class="checkbox-container" >In Your Selected Installed Base
                <input type="checkbox" :checked="selectedStore === 'base'" @change="toggleActiveHeader">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox-container">Spareparts 
                <span v-if="selectedStore === 'store'" class="checkbox-container__part-amount">({{ totalProducts }})</span>
                <span v-else class="checkbox-container__part-amount">(0)</span>
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox-container">Location
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
        </div>
        <div v-if="selectedStore == 'base'">
            <h2 class="filter-header">Structure:</h2>
            <div @click="fetchTopStructure" class="top-level" :class="{ 'top-level__active': filteredMarkNumber === '0000.00.000.000'}">0000.00.000.000</div>
            <div v-for="(dataItem, dataIndex) in areas" :key="dataIndex">
                <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
                    <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
                        <div class="product-filter" @click="toggleActiveStructureAndFetchNewLevel(tupleItem, activeArea, activeZone, activeAsset, filterStore, currentCustomer?.id)"
                            :class="{ 'product-filter__active': activeArea === tupleItem.attributes.MarkNumber }">
                            <template v-if="activeArea == tupleItem.attributes.MarkNumber">
                                <Icon icon="ri:arrow-down-s-line" class="product-filter__arrow"></Icon>
                            </template>
                            <template v-else>
                                <Icon icon="ri:arrow-right-s-line" class="product-filter__arrow"></Icon>
                            </template>
                            <span class="product-filter__mark-number">{{ tupleItem.attributes.MarkNumber }}</span>
                        </div>
                        <div v-if="activeArea == tupleItem.attributes.MarkNumber" class="product-filter__assets-container">
                            <zoneList />                            
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="hierarchyPage < totalPages" class="filter-action-btn" @click="fetchNextStructuresOnSameLevel">Show next</div>
        </div>
        <div v-else>
            <CategoryFilter />
        </div>
    </div>
</template>