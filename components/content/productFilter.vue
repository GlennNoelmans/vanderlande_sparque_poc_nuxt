<script setup>
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';
import { Icon } from '@iconify/vue/dist/iconify.js';
import zoneList from './zoneList.vue';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';

const filterStore = useFilterStore();
const { areas } = storeToRefs(filterStore);
const { activeArea } = storeToRefs(filterStore);
const { activeZone } = storeToRefs(filterStore);
const { activeAsset } = storeToRefs(filterStore);
const { selectedStore } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();

</script>
<template>
    <div class="product-filter-container">
        <h2 class="filter-header">Filter by:</h2>
        <div v-if="selectedStore == 'base'">
            <h2 class="filter-header">Structure:</h2>
            <Icon v-if="!areas" icon="eos-icons:bubble-loading" class="product-filter__arrow"></Icon>
            <div v-for="(dataItem, dataIndex) in areas" :key="dataIndex">
                <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
                    <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
                        <div class="product-filter" @click="toggleActiveStructureAndFetchNewLevel(tupleItem, activeArea, activeZone, activeAsset, filterStore, runtimeConfig)"
                            :class="{ 'product-filter__active': activeArea === tupleItem.attributes.MarkNumber }">
                            <template v-if="activeArea == tupleItem.attributes.MarkNumber">
                                <Icon icon="ri:arrow-down-s-line" class="product-filter__arrow"></Icon>
                            </template>
                            <template v-else>
                                <Icon icon="ri:arrow-right-s-line" class="product-filter__arrow"></Icon>
                            </template>
                            <span class="product-filter__mark-number">{{ tupleItem.attributes.MarkNumber }}</span>
                        </div>
                        <div v-if="activeArea == tupleItem.attributes.MarkNumber" class="product-filter__assets-container">
                            <zoneList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <CategoryFilter />
        </div>
    </div>
</template>