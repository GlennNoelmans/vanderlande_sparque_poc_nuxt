<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useCustomerStore } from '@/stores/customer';
import { useProductStore } from '~/stores/products';
import { useFilterStore } from '~/stores/filter';

const customerStore = useCustomerStore();
const productStore = useProductStore();
const filterStore = useFilterStore();
const { currentCustomer } = storeToRefs(customerStore);
const { searchKeyword } = storeToRefs(productStore);
//const searchKeyword = ref('');
const router = useRouter();

const openCustomerModal = () => {
    customerStore.toggleShowModal(true);
};

const search = () => {
    productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, 0);
    productStore.fetchAllSearchedProductCategories(currentCustomer.value.id, searchKeyword.value),
        productStore.setProductSearchPage(1);
    productStore.clearCategorySearchFilter();
    productStore.setIsSearchActive(true);
    productStore.setIsSearchCategoryFilterActive(false);

    router.push({path: '/search/results'});
}

const home = () => {
    filterStore.fetchStructure(currentCustomer.value.id, 2, 1, 0);
    productStore.fetchAllProducts(currentCustomer.value.id, 0);
    productStore.fetchAllProductCategories(currentCustomer.value.id, "", 0);
    filterStore?.setFilteredMarkNumber("0000.00.000.000");
    productStore.setCurrentPage(1);
    filterStore.setCurrentPage(1);
    filterStore?.setFilteredAsset(null);
    filterStore.setActiveArea("");
    filterStore.setActiveZone("");
    filterStore.setActiveAsset("");
}

</script>

<template>
    <div class="search-header">
        <div class="search-header-container">
            <h1 class="search-header-container__title" @click="home">
                <NuxtLink to="/">Fenego & Sparque.AI - POC</NuxtLink>
            </h1>
            <div class="search-container">
                <input v-model="searchKeyword" type="text" class="search-container__input"
                    placeholder="Search by product name, item number or mark-number..." @keydown.enter="search">
                <button @click="search" class="search-container__button">
                    <div class="search-container__button__inner-container">
                        <Icon icon="fa:search" class="search-container__icon"></Icon>
                    </div>
                </button>
            </div>
            <div class="location-container">
                <div class="location-inner-container">
                    <Icon icon="fa6-solid:location-dot" class="location-inner-container__icon"></Icon>
                    <div class="address-container">
                        <p class="address-container__factory-name">Vanderlande X-factory Ve...</p>
                        <p class="address-container__street-name">Rooseveltlaan 1</p>
                    </div>
                </div>
                <div class="edit-location-container" @click="openCustomerModal()">
                    <Icon icon="subway:pencil" class="edit-location-container__icon"></Icon>
                    <p class="edit-location-container__title">Change</p>
                </div>
            </div>
        </div>
    </div>
</template>