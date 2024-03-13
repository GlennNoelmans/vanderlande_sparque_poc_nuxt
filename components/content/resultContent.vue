<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { filteredAsset } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);
const { selectedStore } = storeToRefs(filterStore);
const { searchKeyword } = storeToRefs(productStore);
const { totalProducts } = storeToRefs(productStore);
</script>
<template>
    <div class="result-content">
        <h2 class="result-content__title">Results for: 
            <span class="result-content__title__result">
                <span v-if="selectedStore === 'store'">{{ searchKeyword }}</span>
                <span v-else>{{ filteredAsset }}</span>
            </span>
        </h2>
        <h3 class="result-content__areas">
            <div v-if="selectedStore === 'store'">{{ totalProducts }} <span v-if="totalProducts > 1">Products</span><span v-else>Product</span></div>
            <div v-else>{{ assetsShown[0]?.items?.length }} <span v-if="assetsShown[0]?.items?.length > 1">Areas</span><span v-else>Area</span></div> found
        </h3>
    </div>
</template>