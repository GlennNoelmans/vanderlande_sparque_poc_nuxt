<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { Icon } from '@iconify/vue/dist/iconify.js';
import searchCategoryFilter from './searchCategoryFilter.vue';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const productStore = useProductStore();


function fetchAllProducts() {
    productStore.fetchAllProducts(currentCustomer.value.id, 0);
    productStore.fetchAllProductCategories(currentCustomer.value.id, "", 0);
    productStore.setCurrentPage(1);
    productStore.setSearchKeyword('');
    productStore.setCategoryFilter('');
    productStore.setCategorySearchFilter('');
    productStore.setIsCategoryFilterActive(false);
    productStore.setIsLocationActiveInDirectory(false);
    productStore.setIsSparepartsActiveInDirectory(false);
    productStore.setIsLocationActiveInSearch(false);
    productStore.setIsSparepartsActiveInSearch(false);
}

</script>
<template>
    <div class="product-filter-container">
        <button class="detail-content__link">
            <NuxtLink to="/" @Click="fetchAllProducts">
                <Icon icon="ri:arrow-left-s-line"></Icon>
                Back to results
            </NuxtLink>
          </button>
        <h2 class="filter-header">Filter by:</h2>
        <div class="filter-component-container">
            <label class="checkbox-container" >In Your Selected Installed Base
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <div>
                <AssetFilterInSearch />
            </div>
        </div>
        <div>
            <searchCategoryFilter/>
        </div>
    </div>
</template>