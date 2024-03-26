<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useCustomerStore } from '@/stores/customer';
import { useFilterStore } from '~/stores/filter';

const customerStore = useCustomerStore();
const filterStore = useFilterStore();
const { currentCustomer } = storeToRefs(customerStore);
const { hierarchyPage } = storeToRefs(filterStore);
const { totalPages } = storeToRefs(filterStore);
const { filteredAsset } = storeToRefs(filterStore);
const { isLocationActiveInBase } = storeToRefs(filterStore);
const { isSparepartsActiveInBase } = storeToRefs(filterStore);


// const setCurrentPage = (page) => {
//     if (page < 1 || page > totalPages.value || page === '...') {
//         return;
//     }
//     filterStore?.setCurrentPage(page);
//     if (filteredAsset.value === null) {
//       filterStore?.fetchStructure(currentCustomer.value.id, 2, 1, (hierarchyPage?.value - 1) * 10);
//     }
//     else {
//       filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
//     }
// };

const setCurrentPage = (page) => {
  if (page < 1 || page > totalPages.value || page === '...') {
    return;
  }
  filterStore?.setCurrentPage(page);
  if (filteredAsset.value === null) {
    checkIfFiltersAreActive();
    if(!isLocationActiveInBase.value && !isSparepartsActiveInBase.value) {
      filterStore?.fetchStructure(currentCustomer.value.id, 2, 1, (hierarchyPage?.value - 1) * 10);
    }
  }
  else {
    checkIfFiltersAreActive();
    if(!isLocationActiveInBase.value && !isSparepartsActiveInBase.value) {
      filterStore?.fetchStructure(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID, filteredAsset?.value?.attributes?.systemDepthNumber, (hierarchyPage?.value - 1) * 10);
    }
  }
};

function checkIfFiltersAreActive() {
  if (isSparepartsActiveInBase.value && isLocationActiveInBase.value) {
        fetchStructureWithTypeFilter('Asset_Item');
    } else if (isLocationActiveInBase.value) {
        fetchStructureWithTypeFilter('Asset');
    } else if (isSparepartsActiveInBase.value) {
        fetchStructureWithTypeFilter('Item');
    }
}

function fetchStructureWithTypeFilter(typeFilter) {
    filterStore.fetchStructureWithTypeFilter(currentCustomer.value.id, filteredAsset?.value?.attributes?.AssetID || 2, typeFilter, (hierarchyPage?.value - 1) * 10);
}

const displayedPageNumbers = computed(() => {
  const pageCount = 5;
  const currentPage = hierarchyPage.value;
  const lastPage = totalPages.value;
  let startPage = Math.max(1, currentPage - Math.floor(pageCount / 2));
  let endPage = Math.min(lastPage, startPage + pageCount - 1);

  if (lastPage - endPage < Math.floor(pageCount / 2)) {
    startPage = Math.max(1, endPage - pageCount + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (startPage > 1) {
    if (startPage > 2) {
      pages.unshift('...');
    }
    pages.unshift(1);
  }
  if (endPage < lastPage) {
    if (endPage < lastPage - 1) {
      pages.push('...');
    }
    pages.push(lastPage);
  }

  return pages;
});

</script>

<template>
    <div class="product-pagination">
    <div class="arrow-container" @click="setCurrentPage(hierarchyPage - 1)" :class="{ 'arrow-container__disabled': hierarchyPage === 1 }">
      <Icon icon="ri:arrow-left-s-line" class="arrow-container__icon"></Icon>
    </div>
    <div class="pages-container">
        <span v-for="pageNumber in displayedPageNumbers" :key="pageNumber" class="pages-container__page-number" :class="{ 'pages-container__page-number__active': hierarchyPage === pageNumber }" @click="setCurrentPage(pageNumber)">{{ pageNumber }}</span>
    </div>
    <div class="arrow-container" @click="setCurrentPage(hierarchyPage + 1)" :class="{ 'arrow-container__disabled': hierarchyPage === totalPages }">
      <Icon icon="ri:arrow-right-s-line" class="arrow-container__icon"></Icon>
    </div>
  </div>
</template>