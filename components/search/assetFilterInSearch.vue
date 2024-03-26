<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { productSearchPage } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { categorySearchFilter } = storeToRefs(productStore);
const { isSearchCategoryFilterActive } = storeToRefs(productStore);
const { isSparepartsActiveInSearch } = storeToRefs(productStore);
const { isLocationActiveInSearch } = storeToRefs(productStore);

const toggleFiltersActiveInSearch = () => {
    if (isSparepartsActiveInSearch.value && isLocationActiveInSearch.value) {
        fetchStructureWithTypeFilter('Asset_Item');
    } else if (isLocationActiveInSearch.value) {
        fetchStructureWithTypeFilter('Asset');
    } else if (isSparepartsActiveInSearch.value) {
        fetchStructureWithTypeFilter('Item');
    } else {
        fetchStructureWithDefaults();
    }
}

const toggleIsSparepartsActiveInSearch = () => {
    productStore.setIsSparepartsActiveInSearch();
    productStore.setProductSearchPage(1);
    toggleFiltersActiveInSearch();
}

const toggleIsLocationActiveInSearch = () => {
    productStore.setIsLocationActiveInSearch();
    productStore.setProductSearchPage(1);
    toggleFiltersActiveInSearch();
}

function fetchStructureWithDefaults() {
    if (isSearchCategoryFilterActive.value) {
        productStore.fetchSearchedProductsFilteredByCategory(currentCustomer.value.id, searchKeyword.value, categorySearchFilter.value, 0);
    } else {
        productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, 0);
    }
}

function fetchStructureWithTypeFilter(typeFilter) {
    if (isSearchCategoryFilterActive.value) {
        productStore.fetchSearchedProductsFilteredByCategoryAndTypeFilter(currentCustomer.value.id, searchKeyword.value, categorySearchFilter.value, typeFilter, 0);
    } else {
        productStore.searchProductsWithTypeFilter(currentCustomer.value.id, searchKeyword.value, typeFilter, 0);
    }
}

</script>
<template>
    <label class="checkbox-container">Spareparts
        <input type="checkbox" :checked="isSparepartsActiveInSearch" @change="toggleIsSparepartsActiveInSearch">
        <span class="checkmark"></span>
    </label>
    <label class="checkbox-container">Location
        <input type="checkbox" :checked="isLocationActiveInSearch" @change="toggleIsLocationActiveInSearch">
        <span class="checkmark"></span>
    </label>
</template>