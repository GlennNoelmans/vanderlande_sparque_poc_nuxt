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
const { isProductLoaded } = storeToRefs(productStore);
const { isHierarchyLoaded } = storeToRefs(filterStore);

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
        <resultContent />
        <productBaseSelectionHeader />
        <div v-if="selectedStore === 'store'">
            <div v-if="isProductLoaded" class="loading-container">
                <Icon icon="eos-icons:loading" class="loading-container__icon"></Icon>
            </div>
            <div class="product-card-container">
                <div v-for="(dataItem, dataIndex) in products[0]?.items" :key="dataIndex" class="product-card-inner-container">
                    <productCard :dataItem="dataItem"/>
                </div>
            </div>
            <productPagination/>
        </div>
        <div v-if="selectedStore === 'base'" >
            <div v-if="isHierarchyLoaded" class="loading-container">
                <Icon icon="eos-icons:loading" class="loading-container__icon"></Icon>
            </div>
            <div class="hierarchy-card-container">
                <div class="hierarchy-card-container">
                    <div v-for="(dataItem, dataIndex) in assetsShown[0]?.items " :key="dataIndex" class="hierarchy-card-inner-container">   
                        <HierarchyCard v-if="!isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
                        <productCard v-else :dataItem="dataItem" /> 
                    </div>
                </div>
            </div>
            <hierarchyPagination/>
        </div>
    </div>
</template>