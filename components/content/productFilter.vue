<script setup>
import { useFilterStore } from '@/stores/filter';
import { Icon } from '@iconify/vue/dist/iconify.js';

const filterStore = useFilterStore();
const isActiveStructure = ref("0001.00.000.000");
const { assets } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();

const { error, data } = await useFetch(`https://rest.sparque.ai/1/vanderlande/api/VI-Search-Victoria/e/Hierarchy/p/siteID/${runtimeConfig.public.SITE_ID}/p/query/2/results,count?config=default`, {
    headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
});

const toggleActiveStructureAndFetchNewLevel = (tupleItem) => {
    isActiveStructure.value = tupleItem.attributes.MarkNumber;
    filterStore?.fetchStructure(runtimeConfig.public.SITE_ID, tupleItem.attributes.AssetID, tupleItem.attributes.systemDepthNumber);
    filterStore?.setFilteredAsset(tupleItem.attributes.MarkNumber);
    filterStore.setSelectedStore("base");
};

filterStore.fetchStructure(runtimeConfig.public.SITE_ID, "SYS53288810", "2")
</script>

<template>
    <div class="product-filter-container">
        <h2 class="filter-header">Filter by:</h2>
        <h2 class="filter-header">Structure:</h2>
        <div v-if="error">
            error: {{ error }}
        </div>
        <div v-for="(dataItem, dataIndex) in data" :key="dataIndex">
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

                        <div v-for="(dataItem, dataIndex) in assets" :key="dataIndex">
                            <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
                                <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
                                    <div class="product-filter"
                                        @click="toggleActiveStructureAndFetchNewLevel(tupleItem)"
                                        :class="{ 'product-filter__active': isActiveStructure === tupleItem.attributes.MarkNumber }">

                                        <template v-if="isActiveStructure == tupleItem.attributes.MarkNumber">
                                            <Icon icon="ri:arrow-down-s-line" class="product-filter__arrow"></Icon>
                                        </template>

                                        <template v-else>
                                            <Icon icon="ri:arrow-right-s-line" class="product-filter__arrow"></Icon>
                                        </template>
                                        <span class="product-filter__mark-number">{{ tupleItem.attributes.MarkNumber
                                            }}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>