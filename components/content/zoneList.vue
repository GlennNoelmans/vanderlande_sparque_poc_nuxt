<script setup>
import { useFilterStore } from "@/stores/filter";
import { useCustomerStore } from '@/stores/customer';
import { Icon } from "@iconify/vue/dist/iconify.js";
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const { zones } = storeToRefs(filterStore);
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

function isProduct(assetUrl) {
    const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);
    if (assetClass == 'Item') {
        return true;
    }
    return false;
}

</script>
<template>
  <div v-if="filteredAsset.attributes.MarkCode === 'AREA'">
    <div v-if="hierarchyPage > 1" class="filter-action-btn" @click="fetchPreviousStructuresOnSameLevel">
      <Icon icon="ri:arrow-left-s-line" class="product-filter__arrow"></Icon>
      <span>Show previous</span>
    </div>
  </div>
  <div v-for="(dataItem, dataIndex) in zones" :key="dataIndex">
    <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
      <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
        <div v-if="!isProduct(tupleItem.class[0])"
          class="product-filter"
          @click="toggleActiveStructureAndFetchNewLevel(tupleItem, activeArea, activeZone, activeAsset, filterStore, currentCustomer.id)"
          :class="{
            'product-filter__active':
            activeZone === tupleItem.attributes.MarkNumber,
          }"
        >
          <template v-if="activeZone == tupleItem.attributes.MarkNumber">
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
        <div
          v-if="activeZone == tupleItem.attributes.MarkNumber"
          class="product-filter__assets-container"
        >
          <div v-if="isProduct(tupleItem.class[0])"></div>
          <assetList v-else/>
        </div>
      </div>
    </div>
  </div>
  <div v-if="filteredAsset.attributes.MarkCode === 'AREA'">
    <div v-if="hierarchyPage < totalPages" class="filter-action-btn" @click="fetchNextStructuresOnSameLevel">
      <span>Show next</span>
      <Icon icon="ri:arrow-right-s-line" class="product-filter__arrow"></Icon>
    </div>
  </div>
</template>
