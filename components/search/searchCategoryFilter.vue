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

const onCategoryClick = (categoryFilter, event) => {
  event.stopPropagation();
  productStore.setProductSearchPage(1);
  productStore.setIsSearchCategoryFilterActive(true);
  productStore.setCategorySearchFilter(categoryFilter);
  let searchString = searchKeyword.value || "";
  if (categorySearchFilter.value === "") {
    productStore.setIsSearchCategoryFilterActive(false);
    productStore.searchProducts(currentCustomer.value.id, searchKeyword.value, 0);
  }
  else {
    productStore.fetchSearchedProductsFilteredByCategory(currentCustomer.value.id, searchString, categorySearchFilter.value, (productSearchPage.value - 1) * 10);
  }
}

const isCategoryChecked = (identifier) => {
  const targetString = 'Electrical component%2bField component';
const array = ['', 'Electrical component'];

// Check if any element from the array is part of the target string
const isPartOfTargetString = array.some(item => targetString.includes(item));

if (isPartOfTargetString) {
  console.log(`One of the elements from the array is part of the target string`);
} else {
  console.log(`None of the elements from the array is part of the target string`);
}

  const filterArray = categorySearchFilter.value.split(',');
  console.log('filterArray');
  console.log(filterArray);
  return array.some((item) => {
    console.log(item);
    console.log('item');
    return identifier.includes(item);});
  //return filterArray.some((filter) => identifier.includes(filter.trim()));
}

function getCategoryIdentifier(identifier) {
  const parts = identifier.split('+');
  return parts[parts.length - 1];
}

function replacePlusWithEncoded(str) {
    return str.replace(/\+/g, '%2b');
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
      <label class="checkbox-container" @click="onCategoryClick(topItem.identifier, $event)">
        <span>{{ topItem.identifier }}</span>
        <span class="category-item__amount">({{ topItem.probability }})</span>
        <input type="checkbox" :checked="isCategoryChecked(topItem.identifier)" @click.stop>
        <span class="checkmark"></span>
      </label>

      <!-- Middle level -->
      <div
      v-for="(secondItem, secondItemIndex) in topItem.children"
      :key="secondItemIndex"
      class="category-item-container__second-layer"
      >
      <label class="checkbox-container" @click="onCategoryClick(replacePlusWithEncoded(secondItem.identifier), $event)">
        <span>{{ getCategoryIdentifier(secondItem.identifier) }}</span>
        <span class="category-item__amount">({{ secondItem.probability }})</span>
        <input type="checkbox" :checked="isCategoryChecked(replacePlusWithEncoded(secondItem.identifier))" @click.stop>
        <span class="checkmark"></span>
      </label>
      </div>
    </div>
  </div>
</template>
