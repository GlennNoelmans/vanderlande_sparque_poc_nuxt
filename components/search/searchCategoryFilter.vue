<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { searchedProductsCategories } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { productPage } = storeToRefs(productStore);
const { categorySearchFilter } = storeToRefs(productStore);

const onCategoryClick = (categoryFilter) => {
  productStore.setProductSearchPage(1);
  productStore.setIsSearchCategoryFilterActive(true);
  productStore.setCategorySearchFilter(categoryFilter);
  let searchString = searchKeyword.value || "";
  if (categorySearchFilter.value === "") {
    productStore.setIsSearchCategoryFilterActive(false);
    productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, 0);
  }
  else {
    productStore.fetchSearchedProductsFilteredByCategory(currentCustomer.value.id, searchString, categorySearchFilter.value, (productPage.value - 1) * 10);
  }
}

</script>

<template>
  <h2 class="filter-header">Categories:</h2>
  <div class="category-container">
    <div
      v-for="(item, itemIndex) in searchedProductsCategories"
      :key="itemIndex"
      class="category-item-container" @click="onCategoryClick(item.identifier)"
    >
      <label class="checkbox-container" >
        <span>{{ item.identifier }}</span>
        <span class="category-item__amount">({{ item.probability }})</span>
        <input type="checkbox" @click.stop>
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>
