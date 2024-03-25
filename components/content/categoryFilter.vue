<script setup>
import { useProductStore } from '@/stores/products';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const { productCategories } = storeToRefs(productStore);
const { productPage } = storeToRefs(productStore);
const { categoryFilter } = storeToRefs(productStore);

const onCategoryClick = (identifier, event) => {
  event.stopPropagation();
  productStore.setCurrentPage(1);
  productStore.setIsCategoryFilterActive(true);
  productStore.adjustCategoryChecked(identifier, productCategories.value, 'all');
  if (categoryFilter.value === "") {
    productStore.setIsCategoryFilterActive(false);
    productStore.fetchAllProducts(currentCustomer.value.id, 0);
  }
  else {
    productStore.fetchProductsFilteredByCategory(currentCustomer.value.id, "", categoryFilter.value, (productPage.value - 1) * 10);
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
      v-for="(topItem, topItemIndex) in productCategories"
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
