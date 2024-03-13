<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '~/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const runtimeConfig = useRuntimeConfig();
const { initialDataLoaded } = storeToRefs(productStore);


const fetchData = async () => {
    if (!initialDataLoaded.value) {
        await Promise.all([
            filterStore.fetchStructure(runtimeConfig.public.SITE_ID, 2, 1),
            productStore.fetchAllProducts(runtimeConfig.public.SITE_ID, 0)
        ]);
        productStore.setInitialDataLoaded(true);
    }; 
};

useAsyncData(fetchData);
</script>
<template>
    <div>
        <div class="horizontal-divider"></div>
        <customerModal />
        <div class="page-content-container">
            <div class="container">
                <div class="page-content">
                    <productFilter />
                    <div class="vertical-line-divider"></div>
                    <productContent />
                </div>
            </div>
        </div>
    </div>
</template>