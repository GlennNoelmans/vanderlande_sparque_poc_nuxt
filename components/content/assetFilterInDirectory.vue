<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { productPage } = storeToRefs(productStore);
const { categoryFilter } = storeToRefs(productStore);
const { isCategoryFilterActive } = storeToRefs(productStore);
const { isSparepartsActiveInDirectory } = storeToRefs(productStore);
const { isLocationActiveInDirectory } = storeToRefs(productStore);

const toggleFiltersActiveInDirectory = () => {
    if (isSparepartsActiveInDirectory.value && isLocationActiveInDirectory.value) {
        fetchStructureWithTypeFilter('Asset_Item');
    } else if (isLocationActiveInDirectory.value) {
        fetchStructureWithTypeFilter('Asset');
    } else if (isSparepartsActiveInDirectory.value) {
        fetchStructureWithTypeFilter('Item');
    } else {
        fetchStructureWithDefaults();
    }
}

const toggleIsSparepartsActiveInDirectory = () => {
    productStore.setIsSparepartsActiveInDirectory();
    productStore.setCurrentPage(1);
    toggleFiltersActiveInDirectory();
}

const toggleIsLocationActiveInDirectory = () => {
    productStore.setIsLocationActiveInDirectory();
    productStore.setCurrentPage(1);
    toggleFiltersActiveInDirectory();
}

function fetchStructureWithDefaults() {
    if (isCategoryFilterActive.value) {
        productStore.fetchProductsFilteredByCategory(currentCustomer.value.id, "", categoryFilter.value, 0);
    } else {
        productStore.fetchAllProducts(currentCustomer.value.id, 0);
    }
}

function fetchStructureWithTypeFilter(typeFilter) {
    if (isCategoryFilterActive.value) {
        productStore.fetchProductsFilteredByCategoryAndTypeFilter(currentCustomer.value.id, "", categoryFilter.value, typeFilter, 0);
    } else {
        productStore.fetchAllProductsWithTypeFilter(currentCustomer.value.id, typeFilter, 0);
    }
}

</script>
<template>
    <label class="checkbox-container">Spareparts
        <input type="checkbox" :checked="isSparepartsActiveInDirectory" @change="toggleIsSparepartsActiveInDirectory">
        <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Location
        <input type="checkbox" :checked="isLocationActiveInDirectory" @change="toggleIsLocationActiveInDirectory">
        <span class="checkmark"></span>
    </label>
</template>