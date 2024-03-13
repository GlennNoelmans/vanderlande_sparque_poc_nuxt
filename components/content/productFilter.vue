<script setup>
import { useFilterStore } from '@/stores/filter';
import { useCustomerStore } from '@/stores/customer';
import { Icon } from '@iconify/vue/dist/iconify.js';
import zoneList from './zoneList.vue';

const filterStore = useFilterStore();
const customerStore = useCustomerStore();
const isActiveStructure = ref("");
const { areas } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();
const { currentCustomer } = storeToRefs(customerStore);

const toggleActiveStructureAndFetchNewLevel = (tupleItem) => {
    if (isActiveStructure.value == tupleItem.attributes.MarkNumber) {
        isActiveStructure.value = "";
        return;
    }
    isActiveStructure.value = tupleItem.attributes.MarkNumber;
    filterStore?.fetchStructure(runtimeConfig.public.SITE_ID, tupleItem.attributes.AssetID, tupleItem.attributes.systemDepthNumber);
    filterStore?.setFilteredAsset(tupleItem.attributes.MarkNumber);
    filterStore.setSelectedStore("base");
};
</script>

<template>
    <div class="product-filter-container">
        <h2 class="filter-header">Filter by:</h2>
        <h2 class="filter-header">Structure:</h2>
        <Icon v-if="!areas" icon="eos-icons:bubble-loading" class="product-filter__arrow"></Icon>
        <div v-for="(dataItem, dataIndex) in areas" :key="dataIndex">
            <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
                <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
                    <div class="product-filter" @click="toggleActiveStructureAndFetchNewLevel(tupleItem)"
                        :class="{ 'product-filter__active': isActiveStructure === tupleItem.attributes.MarkNumber }">
                        <template v-if="isActiveStructure == tupleItem.attributes.MarkNumber">
                            <Icon icon="ri:arrow-down-s-line" class="product-filter__arrow"></Icon>
                        </template>

                        <template v-else>
                            <Icon icon="ri:arrow-right-s-line" class="product-filter__arrow"></Icon>
                        </template>
                        <span class="product-filter__mark-number">{{ tupleItem.attributes.MarkNumber }}</span>
                    </div>

                    <div v-if="isActiveStructure == tupleItem.attributes.MarkNumber" class="product-filter__assets-container">
                        <zoneList />
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>