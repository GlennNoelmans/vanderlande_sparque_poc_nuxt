<script setup>
import { useFilterStore } from "@/stores/filter";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';

const filterStore = useFilterStore();
const { assets } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();
const { activeArea } = storeToRefs(filterStore);
const { activeZone } = storeToRefs(filterStore);
const { activeAsset } = storeToRefs(filterStore);

</script>
<template>
  <div v-for="(dataItem, dataIndex) in assets" :key="dataIndex">
    <div v-for="(item, itemIndex) in dataItem.items" :key="itemIndex">
      <div v-for="(tupleItem, tupleIndex) in item.tuple" :key="tupleIndex">
        <div
          class="product-filter"
          @click="toggleActiveStructureAndFetchNewLevel(tupleItem, activeArea, activeZone, activeAsset, filterStore, runtimeConfig)"
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
