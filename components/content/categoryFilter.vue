<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { productCategories } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { productPage } = storeToRefs(productStore);

function onCategoryClick (categoryFilter) {
  productStore.setCurrentPage(1);
  productStore.setCategoryFilter(categoryFilter);
  productStore.fetchProductsFilteredByCategory(currentCustomer.value.id, searchKeyword.value, categoryFilter, (productPage.value - 1) * 10);
}
</script>
<template>
  <h2 class="filter-header">Categories:</h2>
  {{ productCategories }}
  <div class="category-container">
    <div
      v-for="(item, itemIndex) in productCategories[0]?.items"
      :key="itemIndex"
      class="category-item" @click="onCategoryClick(item.tuple[0])"
    >
      <span class="category-item__title">{{ item.tuple[0] }}</span>
      <span class="category-item__amount">({{ item.probability }})</span>
    </div>
  </div>
</template>