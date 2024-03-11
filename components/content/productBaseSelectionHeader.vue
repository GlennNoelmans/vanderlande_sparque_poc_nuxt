<script setup>
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();
const { selectedStore } = storeToRefs(filterStore);

const toggleActiveHeader = (selectedHeader) => {
    filterStore.setSelectedStore(selectedHeader);
};
</script>
<template>
    <div class="product-base-selection-header">
        <div class="product-base-selection-header__base" :class="{ 'product-base-selection-header__active': selectedStore === 'base'}" @click="toggleActiveHeader('base')">In Your Installed Base</div>
        <div class="product-base-selection-header__directory" :class="{ 'product-base-selection-header__active': selectedStore === 'store'}" @click="toggleActiveHeader('store')">In Your Directory</div>
    </div>
</template>