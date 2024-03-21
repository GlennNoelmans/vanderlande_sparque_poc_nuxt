<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { Icon } from '@iconify/vue/dist/iconify.js';
import searchCategoryFilter from './searchCategoryFilter.vue';

const filterStore = useFilterStore();
const productStore = useProductStore();

</script>
<template>
    <div class="product-filter-container">
        <button class="detail-content__link">
            <NuxtLink to="/">
                <Icon icon="ri:arrow-left-s-line"></Icon>
                Back to results
            </NuxtLink>
          </button>
        <h2 class="filter-header">Filter by:</h2>
        <div class="filter-component-container">
            <label class="checkbox-container" >In Your Selected Installed Base
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox-container">Spareparts 
                <span class="checkbox-container__part-amount">(0)</span>
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <label class="checkbox-container">Location
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
        </div>
        <div>
            <searchCategoryFilter/>
        </div>
    </div>
</template>