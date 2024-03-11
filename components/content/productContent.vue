<script setup>
import resultContent from './resultContent.vue';
import productBaseSelectionHeader from './productBaseSelectionHeader.vue';
import productCard from '../product/productCard.vue';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();
const { selectedStore } = storeToRefs(filterStore);
const { assets } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();

const { error, data } = await useFetch(`https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/AllProducts/p/siteID/${runtimeConfig.public.SITE_ID}/results,count?config=default`, {
    headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
});

</script>
<template>
    <div class="product-content-container">
        <resultContent />
        <productBaseSelectionHeader />
        <div v-if="selectedStore === 'store'" class="product-card-container" >
            <productCard :dataItem="dataItem" v-for="(dataItem, dataIndex) in data[0].items" :key="dataIndex"/>
        </div>
        <div v-if="selectedStore === 'base'" class="hierarchy-card-container" >
            <HierarchyCard v-if="assets" :dataItem="dataItem" v-for="(dataItem, dataIndex) in assets[0]?.items " :key="dataIndex"/>
        </div>
        <productPagination/>
    </div>
</template>