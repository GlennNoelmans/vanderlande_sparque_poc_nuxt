<script setup>
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();
const { selectedComponentHeader } = storeToRefs(filterStore);

const toggleActiveHeader = (selectedHeader) => {
    filterStore.setSelectedComponentHeader(selectedHeader);
};
</script>
<template>
    <div class="product-base-selection-header">
        <div class="product-base-selection-header__base" :class="{ 'product-base-selection-header__active': selectedComponentHeader === 'location'}" @click="toggleActiveHeader('location')">Located in/Part of</div>
        <div class="product-base-selection-header__directory" :class="{ 'product-base-selection-header__active': selectedComponentHeader === 'child'}" @click="toggleActiveHeader('child')">Child Components</div>
    </div>
</template>