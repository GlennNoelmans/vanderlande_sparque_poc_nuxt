<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { searchKeyword } = storeToRefs(productStore);
const { searchedProducts } = storeToRefs(productStore);

</script>
<template>
    <div class="result-content-search">
        <h2 class="result-content__title">
            <span class="result-content__title__result">
                <div><span class="result-content__title__result__text">Results for:</span><span> "{{ searchKeyword }}"</span></div>
            </span>
        </h2>
        <h3 class="result-content__areas">
            {{ searchedProducts[1]?.total }} Results found
        </h3>
    </div>
</template>