<script setup>
import { useFilterStore } from "@/stores/filter";
import { useCustomerStore } from '@/stores/customer';
import { Icon } from "@iconify/vue/dist/iconify.js";
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const { assets } = storeToRefs(filterStore);
const { activeArea } = storeToRefs(filterStore);
const { activeZone } = storeToRefs(filterStore);
const { activeAsset } = storeToRefs(filterStore);
const { hierarchyPage } = storeToRefs(filterStore);
const { totalPages } = storeToRefs(filterStore);
const { filteredAsset } = storeToRefs(filterStore);


const fetchPreviousStructuresOnSameLevel = () => {
  if (hierarchyPage.value === 1) {
    return;
  }
  filterStore.setCurrentPage(hierarchyPage.value - 1);
  filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
}

const fetchNextStructuresOnSameLevel = () => {
  if (hierarchyPage.value === totalPages) {
    return;
  }
  filterStore.setCurrentPage(hierarchyPage.value + 1);
  filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
}
</script>
<template>
  <div v-if="hierarchyPage > 1" class="filter-action-btn" @click="fetchPreviousStructuresOnSameLevel">Show previous</div>
  <div v-for="(dataItem, dataIndex) in assets" :key="dataIndex">
    <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
      <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
        <div
          class="product-filter"
          @click="toggleActiveStructureAndFetchNewLevel(tupleItem, activeArea, activeZone, activeAsset, filterStore, currentCustomer.id)"
          :class="{
            'product-filter__active':
              activeAsset === tupleItem.attributes.MarkNumber,
          }"
        >
          <template v-if="activeAsset == tupleItem.attributes.MarkNumber">
            <Icon
              icon="ri:arrow-down-s-line"
              class="product-filter__arrow"
            ></Icon>
          </template>

          <template v-else>
            <Icon
              icon="ri:arrow-right-s-line"
              class="product-filter__arrow"
            ></Icon>
          </template>
          <span class="product-filter__mark-number">{{
            tupleItem.attributes.MarkNumber
          }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="hierarchyPage < totalPages" class="filter-action-btn" @click="fetchNextStructuresOnSameLevel">Show next</div>
</template>
