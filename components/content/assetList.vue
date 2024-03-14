<script setup>
import { useFilterStore } from "@/stores/filter";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { setFilteredAssetLabel } from '~/utils/AssetLabelSetter';

const filterStore = useFilterStore();
const { assets } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();
const { activeAsset } = storeToRefs(filterStore);

const toggleActiveStructureAndFetchNewLevel = (tupleItem) => {
    if (activeAsset.value == tupleItem.attributes.MarkNumber) {
        filterStore.setActiveAsset("");
        return;
    }
    filterStore.setActiveAsset(tupleItem.attributes.MarkNumber);
    filterStore?.fetchStructure(
    runtimeConfig.public.SITE_ID,
    tupleItem.attributes.AssetID,
    tupleItem.attributes.systemDepthNumber
  );
  filterStore?.setFilteredAsset(tupleItem.attributes.MarkNumber);
  filterStore.setSelectedStore("base");
  setFilteredAssetLabel(tupleItem.attributes.MarkCode, filterStore);
};

</script>
<template>
  <div v-for="(dataItem, dataIndex) in assets" :key="dataIndex">
    <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
      <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
        <div
          class="product-filter"
          @click="toggleActiveStructureAndFetchNewLevel(tupleItem)"
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
</template>
