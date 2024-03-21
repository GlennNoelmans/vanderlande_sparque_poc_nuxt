<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { Icon } from "@iconify/vue/dist/iconify.js";
import searchResultContent from './searchResultContent.vue';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { selectedStore } = storeToRefs(filterStore);
const { searchedProducts } = storeToRefs(productStore);
const { isProductLoading } = storeToRefs(productStore);

function isProductCard(assetUrl) {
    const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);
    if (assetClass == 'Item') {
        return true;
    }
    return false;
}

</script>
<template>
    <div class="product-content-container">
        <searchResultContent/>
        <div>
            <div v-if="isProductLoading" class="loading-container">
                <Icon icon="eos-icons:loading" class="loading-container__icon"></Icon>
            </div>
            <div v-if="searchedProducts[0]?.items?.length === 0" class="no-assets-found">
                <Icon icon="nonicons:not-found-16"></Icon>
                <span>No results found</span>
            </div>
            <div class="product-card-container">
                <div v-for="(dataItem, dataIndex) in searchedProducts[0]?.items" :key="dataIndex" class="product-card-inner-container">
                    <productCard v-if="isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
                    <HierarchyCard v-else :dataItem="dataItem"/>
                </div>
            </div>
            <div v-if="searchedProducts[0]?.items?.length !== 0">
                <div v-if="searchedProducts[0]?.items?.length !== undefined">
                <SearchPagination v-if="!isProductLoading"/>
                </div>
            </div>
        </div>
    </div>
</template>