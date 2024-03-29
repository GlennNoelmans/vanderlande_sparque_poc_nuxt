<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const productStore = useProductStore();
const { currentCustomer } = storeToRefs(customerStore);
const { productPage } = storeToRefs(productStore);
const { totalPages } = storeToRefs(productStore);
const { categoryFilter } = storeToRefs(productStore);
const { isCategoryFilterActive } = storeToRefs(productStore);
const { isLocationActiveInDirectory } = storeToRefs(productStore);
const { isSparepartsActiveInDirectory } = storeToRefs(productStore);

const setCurrentPage = (page) => {
    if (page < 1 || page > totalPages.value || page === '...') {
        return;
    }
    productStore.setCurrentPage(page);
    const offset = (productPage.value - 1) * 10; 

    if (isCategoryFilterActive.value) {
      checkIfLocationAndPartsFiltersAreActive();
      if(!isLocationActiveInDirectory.value && !isSparepartsActiveInDirectory.value) {
        productStore.fetchProductsFilteredByCategory(currentCustomer.value.id, '', categoryFilter.value, offset);
      }
    }
    else {
      checkIfLocationAndPartsFiltersAreActive();
      if(!isLocationActiveInDirectory.value && !isSparepartsActiveInDirectory.value) {
        productStore.fetchAllProducts(currentCustomer.value.id, offset);
      }
    }
};

function checkIfLocationAndPartsFiltersAreActive() {
  if (isSparepartsActiveInDirectory.value && isLocationActiveInDirectory.value) {
        fetchProductsWithTypeFilter('Asset_Item');
    } else if (isLocationActiveInDirectory.value) {
        fetchProductsWithTypeFilter('Asset');
    } else if (isSparepartsActiveInDirectory.value) {
        fetchProductsWithTypeFilter('Item');
    }
}

function fetchProductsWithTypeFilter(typeFilter) {
    if(isCategoryFilterActive.value) {
      productStore.fetchProductsFilteredByCategoryAndTypeFilter(currentCustomer.value.id, '', categoryFilter.value, typeFilter, (productPage.value - 1) * 10);
    } else {
      productStore.fetchAllProductsWithTypeFilter(currentCustomer.value.id, typeFilter, (productPage.value - 1) * 10);
    }
}

const displayedPageNumbers = computed(() => {
  const pageCount = 5;
  const currentPage = productPage.value;
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
    <div class="arrow-container" @click="setCurrentPage(productPage - 1)" :class="{ 'arrow-container__disabled': productPage === 1 }">
      <Icon icon="ri:arrow-left-s-line" class="arrow-container__icon"></Icon>
    </div>
    <div class="pages-container">
        <span v-for="pageNumber in displayedPageNumbers" :key="pageNumber" class="pages-container__page-number" :class="{ 'pages-container__page-number__active': productPage === pageNumber }" @click="setCurrentPage(pageNumber)">{{ pageNumber }}</span>
    </div>
    <div class="arrow-container" @click="setCurrentPage(productPage + 1)" :class="{ 'arrow-container__disabled': productPage === totalPages }">
      <Icon icon="ri:arrow-right-s-line" class="arrow-container__icon"></Icon>
    </div>
  </div>
</template>