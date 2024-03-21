<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const productStore = useProductStore();
const { currentCustomer } = storeToRefs(customerStore);
const { productSearchPage } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { totalSearchedPages } = storeToRefs(productStore);
const { categorySearchFilter } = storeToRefs(productStore);
const { isSearchCategoryFilterActive } = storeToRefs(productStore);

const setCurrentPage = (page) => {
    if (page < 1 || page > totalSearchedPages.value || page === '...') {
        return;
    }
    productStore.setProductSearchPage(page);
    const offset = (productSearchPage.value - 1) * 10; 
    
    if (isSearchCategoryFilterActive.value) {
        productStore.fetchSearchedProductsFilteredByCategory(currentCustomer.value.id, searchKeyword.value, categorySearchFilter.value, (productSearchPage.value - 1) * 10);
    }
    else {
        productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, offset);
    }
};

const displayedPageNumbers = computed(() => {
  const pageCount = 5;
  const currentPage = productSearchPage.value;
  const lastPage = totalSearchedPages.value;
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
    <div class="arrow-container" @click="setCurrentPage(productSearchPage - 1)" :class="{ 'arrow-container__disabled': productSearchPage === 1 }">
      <Icon icon="ri:arrow-left-s-line" class="arrow-container__icon"></Icon>
    </div>
    <div class="pages-container">
        <span v-for="pageNumber in displayedPageNumbers" :key="pageNumber" class="pages-container__page-number" :class="{ 'pages-container__page-number__active': productSearchPage === pageNumber }" @click="setCurrentPage(pageNumber)">{{ pageNumber }}</span>
    </div>
    <div class="arrow-container" @click="setCurrentPage(productSearchPage + 1)" :class="{ 'arrow-container__disabled': productSearchPage === totalSearchedPages }">
      <Icon icon="ri:arrow-right-s-line" class="arrow-container__icon"></Icon>
    </div>
  </div>
</template>