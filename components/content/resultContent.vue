<script setup>
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();
const { filteredAsset } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);

</script>
<template>
    <div class="result-content">
        <h2 class="result-content__title">Results for: <span class="result-content__title__mark-number">{{ filteredAsset }}</span></h2>
        <h3 class="result-content__areas">{{ assetsShown[0]?.items?.length }} 
            <span v-if="assetsShown[0]?.items?.length > 1">Areas</span><span v-else>Area</span> found
        </h3>
    </div>
</template>