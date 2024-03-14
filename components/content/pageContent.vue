<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '~/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const runtimeConfig = useRuntimeConfig();
const initialCustomerId = runtimeConfig.public.SITE_ID;
const { initialDataLoaded } = storeToRefs(productStore);

if (!initialDataLoaded.value) {
    await Promise.all([
        filterStore.fetchStructure(initialCustomerId, 2, 1),
        productStore.fetchAllProducts(initialCustomerId, 0),
        productStore.fetchAllProductCategories(initialCustomerId, "", 0),
    ]);
    productStore.setInitialDataLoaded(true);
}; 

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