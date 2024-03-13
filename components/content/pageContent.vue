<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '~/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const runtimeConfig = useRuntimeConfig();
const { productPage } = storeToRefs(productStore);
filterStore.fetchStructure(runtimeConfig.public.SITE_ID, 2, 1);
filterStore.fetchStructure(runtimeConfig.public.SITE_ID, "SYS53288810", "2");
productStore.fetchAllProducts(runtimeConfig.public.SITE_ID, 0);
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