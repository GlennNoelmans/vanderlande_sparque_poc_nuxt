<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { productCategories } = storeToRefs(productStore);
const { searchKeyword } = storeToRefs(productStore);
const { productPage } = storeToRefs(productStore);

const onCategoryClick = (categoryFilter) => {
  productStore.setCurrentPage(1);
  productStore.setCategoryFilter(categoryFilter);
  let searchString = searchKeyword.value;
  if ( searchString === null) {
    searchString = "";
  }
  productStore.fetchProductsFilteredByCategory(currentCustomer.value.id, searchString, categoryFilter, (productPage.value - 1) * 10);
}

function splitIdentifier(identifier) {
  const parts = identifier.split('+');
  return parts[parts.length - 1];
}
</script>

<template>
  <h2 class="filter-header">Categories:</h2>
  <div class="category-container">
    <div
      v-for="(item, itemIndex) in productCategories[0]?.items"
      :key="itemIndex"
      class="category-item-container" @click="onCategoryClick(item.tuple[0].attributes.identifier[0])"
    >
      <div v-if="item.tuple[0].attributes.Root[0] === '1'" class="category-item-container">
        <label class="checkbox-container">
        <span class="category-item__title">{{ item.tuple[0].attributes.identifier[0] }}</span>
        <span class="category-item__amount">({{ item.probability }})</span>
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
          <div class="category-container">
            <div
              v-for="(itemSecondary, itemIndex) in productCategories[0]?.items"
              :key="itemIndex"
              class="category" @click="onCategoryClick(itemSecondary.tuple[0].attributes.identifier[0])"
            >
            <div v-if="itemSecondary.tuple[0].attributes.Root[0] === '0'" class="category-item-container">
              <div v-if="itemSecondary.tuple[0].attributes.identifier[0].includes(item.tuple[0].attributes.identifier[0])" class="category-sub-level">
              <label class="checkbox-container">
              <span class="category-item__title">{{ splitIdentifier(itemSecondary.tuple[0].attributes.identifier[0]) }}</span>
              <span class="category-item__amount">({{ itemSecondary.probability }})</span>
                <input type="checkbox">
                <span class="checkmark"></span>
              </label>
            </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>
