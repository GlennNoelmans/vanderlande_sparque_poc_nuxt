<script setup>
import resultContent from './resultContent.vue';
import productBaseSelectionHeader from './productBaseSelectionHeader.vue';
import productCard from '../product/productCard.vue';
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { selectedStore } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);
const { products } = storeToRefs(productStore);
</script>
<template>
    <div class="product-content-container">
        <resultContent />
        <productBaseSelectionHeader />
        <div v-if="selectedStore === 'store'">
            <div class="product-card-container">
                <productCard :dataItem="dataItem" v-for="(dataItem, dataIndex) in products[0]?.items" :key="dataIndex"/>
            </div>
            <productPagination/>
        </div>
        <div v-if="selectedStore === 'base'" >
            <div class="hierarchy-card-container">
                <!-- if Area or Zone then show hierarchyCard -->
                <HierarchyCard v-if="assetsShown" :dataItem="dataItem" v-for="(dataItem, dataIndex) in assetsShown[0]?.items " :key="dataIndex"/>
                <!-- if Item then show productCard -->
                <productCard :dataItem="dataItem" v-for="(dataItem, dataIndex) in assetsShown[0]?.items" :key="dataIndex"/>
            </div>
            <productPagination/>
        </div>
    </div>
</template>