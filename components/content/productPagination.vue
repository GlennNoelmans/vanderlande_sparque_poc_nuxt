<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const productStore = useProductStore();
const { currentCustomer } = storeToRefs(customerStore);
const { productPage } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);

const setCurrentPage = (page) => {
    if (page === 0) {
        return;
    }
    productStore.setCurrentPage(page);
    if (searchKeyword.value !== null) {
        productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, (productPage.value - 1) * 10);
    }
    else {
        productStore.fetchAllProducts(currentCustomer.value.id, (productPage.value - 1) * 10);
    }
};
</script>

<template>
    <div class="product-pagination">
        <div class="arrow-container" @click="setCurrentPage(productPage - 1)">
            <Icon icon="ri:arrow-left-s-line" class="arrow-container__icon"></Icon>
        </div>
        <div class="pages-container">
            <span class="pages-container__page-number">{{ productPage }}</span>
        </div>
        <div class="arrow-container" @click="setCurrentPage(productPage + 1)">
            <Icon icon="ri:arrow-right-s-line" class="arrow-container__icon"></Icon>
        </div>
    </div>
</template>