<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { searchedProductsCategories } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { productSearchPage } = storeToRefs(productStore);
const { categorySearchFilter } = storeToRefs(productStore);

const onCategoryClick = (identifier, event) => {
  event.stopPropagation();
  productStore.setProductSearchPage(1);
  productStore.setIsSearchCategoryFilterActive(true);
  productStore.adjustCategoryChecked(identifier, searchedProductsCategories.value, 'search');
  let searchString = searchKeyword.value || "";
  if (categorySearchFilter.value === "") {
    productStore.setIsSearchCategoryFilterActive(false);
    productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, 0);
  }
  else {
    productStore.fetchSearchedProductsFilteredByCategory(currentCustomer.value.id, searchString, categorySearchFilter.value, (productSearchPage.value - 1) * 10);
  }
}

function getCategoryIdentifier(identifier) {
  const parts = identifier.split('+');
  return parts[parts.length - 1];
}
</script>

<template>
  <h2 class="filter-header">Categories:</h2>
  <div class="category-container">
    <!-- Top level -->
    <div
      v-for="(topItem, topItemIndex) in searchedProductsCategories"
      :key="topItemIndex"
      class="category-item-container"
    >
      <label class="checkbox-container category-item-container__title" @click="onCategoryClick(topItem.identifier, $event)">
        <span>{{ topItem.identifier }}</span>
        <span class="category-item__amount">({{ topItem.probability }})</span>
        <input type="checkbox" :input-value="topItem.checked" @click.stop :key="topItem.identifier">
        <span class="checkmark"></span>
      </label>

      <!-- Middle level -->
      <div
      v-for="(secondItem, secondItemIndex) in topItem.children"
      :key="secondItemIndex"
      class="category-item-container__second-layer"
      >
        <label class="checkbox-container category-item-container__second-layer__title" @click="onCategoryClick(secondItem.identifier, $event)">
          <span>{{ getCategoryIdentifier(secondItem.identifier) }}</span>
          <span class="category-item__amount">({{ secondItem.probability }})</span>
          <input type="checkbox" :input-value="secondItem.checked" :checked="topItem.checked" @click.stop :key="secondItem.identifier">
          <span class="checkmark"></span>
        </label>

        <!-- Lowest level -->
        <div
        v-for="(lastItem, lastItemIndex) in secondItem.children"
        :key="lastItemIndex"
        class="category-item-container__last-layer"
        >
          <label class="checkbox-container category-item-container__last-layer__title" @click="onCategoryClick(lastItem.identifier, $event)">
            <span>{{ getCategoryIdentifier(lastItem.identifier) }}</span>
            <span class="category-item__amount">({{ lastItem.probability }})</span>
            <input type="checkbox" :input-value="lastItem.checked" :checked="secondItem.checked" @click.stop :key="lastItem.identifier">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
