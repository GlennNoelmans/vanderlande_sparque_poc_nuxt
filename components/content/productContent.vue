<script setup>
import resultContent from './resultContent.vue';
import productBaseSelectionHeader from './productBaseSelectionHeader.vue';
import productCard from '../product/productCard.vue';
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { Icon } from "@iconify/vue/dist/iconify.js";

const filterStore = useFilterStore();
const productStore = useProductStore();
const { selectedStore } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);
const { products } = storeToRefs(productStore);
const { isProductLoading } = storeToRefs(productStore);
const { isHierarchyLoaded } = storeToRefs(filterStore);

function isProductCard(assetUrl) {
    const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);
    if (assetClass == 'Item') {
        return true;
    }
    return false;
}

//getData 
</script>
<template>
    <div class="product-content-container">
        <resultContent />
        <productBaseSelectionHeader />
        <div v-if="selectedStore === 'store'">
            <div v-if="isProductLoading" class="loading-container">
                <Icon icon="eos-icons:loading" class="loading-container__icon"></Icon>
            </div>
            <div v-if="products[0]?.items?.length === 0" class="no-assets-found">
                <Icon icon="nonicons:not-found-16"></Icon>
                <span>No results found</span>
            </div>
            <div class="product-card-container">
                <div v-for="(dataItem, dataIndex) in products[0]?.items" :key="dataIndex" class="product-card-inner-container">
                    <productCard v-if="isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
                </div>
            </div>
            <div v-if="products[0]?.items?.length !== 0">
                <div v-if="products[0]?.items?.length !== undefined">
                    <productPagination v-if="!isProductLoading"/>
                </div>
            </div>
        </div>
        <div v-if="selectedStore === 'base'" >
            <div v-if="isHierarchyLoaded" class="loading-container">
                <Icon icon="eos-icons:loading" class="loading-container__icon"></Icon>
            </div>
            <div v-if="assetsShown[0]?.items?.length === 0" class="no-assets-found">
                <Icon icon="nonicons:not-found-16"></Icon>
                <span>No results found</span>
            </div>
            <div class="hierarchy-card-container">
                <div class="hierarchy-card-container">
                    <div v-for="(dataItem, dataIndex) in assetsShown[0]?.items " :key="dataIndex" class="hierarchy-card-inner-container">   
                        <HierarchyCard v-if="!isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
                        <productInBaseCard v-else :dataItem="dataItem" /> 
                    </div>
                </div>
            </div>
            <hierarchyPagination/>
        </div>
    </div>
</template>