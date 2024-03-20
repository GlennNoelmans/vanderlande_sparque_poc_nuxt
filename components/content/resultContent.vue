<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { filteredAsset } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);
const { selectedStore } = storeToRefs(filterStore);
const { filteredAssetLabel } = storeToRefs(filterStore);
const { filteredMarkNumber } = storeToRefs(filterStore);
const { searchKeyword } = storeToRefs(productStore);
const { totalProducts } = storeToRefs(productStore);
</script>
<template>
    <div class="result-content">
        <h2 class="result-content__title">Results for: 
            <span class="result-content__title__result">
                <span v-if="selectedStore === 'store'">"{{ searchKeyword }}"</span>
                <span v-else>"{{ filteredMarkNumber }}"</span>
            </span>
        </h2>
        <h3 class="result-content__areas">
            <div v-if="selectedStore === 'store'">{{ totalProducts }} <span v-if="totalProducts > 1">Results</span><span v-else>Result</span></div>
            <div v-else>{{ assetsShown[1]?.total }} <span>{{ filteredAssetLabel }}</span><span v-if="assetsShown[1]?.total > 1 || assetsShown[1]?.total == 0">s</span></div> found
        </h3>
    </div>
</template>