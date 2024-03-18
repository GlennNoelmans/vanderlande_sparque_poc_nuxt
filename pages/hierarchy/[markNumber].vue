<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useProductStore } from "~/stores/products";
import { useFilterStore } from "~/stores/filter";
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const filterStore = useFilterStore();
const { currentProduct } = storeToRefs(productStore);
const { childComponents } = storeToRefs(productStore);
const { parentComponents } = storeToRefs(productStore);
const { selectedComponentHeader } = storeToRefs(filterStore);
const runtimeConfig = useRuntimeConfig();
const { markNumber } = useRoute().params;

function isProductCard(assetUrl) {
    const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);
    console.log(assetUrl);
    console.log(assetClass);
    if (assetClass == 'Item') {
        return true;
    }
    return false;
}

onMounted(async () => {
  try {
    await Promise.all([
      productStore.searchProductByMarkNumber(runtimeConfig.public.SITE_ID, markNumber, 0)
    ]);

    const assetId = currentProduct.value[0]?.items[0]?.tuple[0]?.attributes?.AssetID;
    if (assetId) {
      await Promise.all([
        productStore.getChildComponentsOfProduct(currentCustomer.value?.id, assetId),
        productStore.getParentComponentsOfProduct(currentCustomer.value?.id, assetId)
      ]);
    } else {
      console.error('Asset ID is undefined');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>
<template>
  <div>
    <div class="detail-content-container">
      <div class="container">
        <div class="detail-content">
          <button class="detail-content__link">
            <NuxtLink to="/"
              ><Icon icon="ri:arrow-left-s-line"></Icon>Back to
              results</NuxtLink
            >
          </button>
          <div class="product-detail-container">
            <div class="product-gallery">
              <div class="product-gallery__image">image</div>
              <div class="product-gallery__image">image</div>
              <button class="product-gallery__next">
                <Icon icon="ri:arrow-down-s-line"></Icon>
              </button>
            </div>
            <div class="product-main-image"></div>
            <div class="product-details-container">
              <h3 class="product-details-container__title">
                {{ currentProduct[0]?.items[0]?.tuple[0]?.attributes?.Description }}
              </h3>
              <p class="product-details-container__part-number">
                Mark-number:
                <span>{{ currentProduct[0]?.items[0]?.tuple[0]?.attributes?.MarkNumber }}</span>
              </p>
              <p class="product-details-container__mark-code">
                Mark-code:
                <span>{{ currentProduct[0]?.items[0]?.tuple[0]?.attributes?.MarkCode }}</span>
              </p>
              <button class="detail-content__link">
                <NuxtLink to="/"
                  ><Icon icon="ri:arrow-right-s-line"></Icon>View product
                  locations & children</NuxtLink
                >
              </button>
            </div>
          </div>
          <ProductComponentSelectionHeader />
          <div
            v-if="selectedComponentHeader === 'child'"
            class="child-components-container"
          >
            <div v-if="childComponents[0]?.items?.length === 0" class="no-assets-found">
                <Icon icon="nonicons:not-found-16"></Icon>
                <span>There are no child components for this asset</span>
            </div>
            <div v-for="(dataItem, dataIndex) in childComponents[0]?.items" :key="dataIndex" class="child-components-inner-container">
              <DetailProductCard v-if="isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
              <DetailHierarchyCardWithFunctionality v-else :dataItem="dataItem"/>
            </div>
          </div>
          <div v-else class="parent-components-container">
            <div v-if="parentComponents[0]?.items?.length === 0" class="no-assets-found">
              <Icon icon="nonicons:not-found-16"></Icon>
              <span>There are no locations for this asset</span>
            </div>
            <div v-for="(dataItem, dataIndex) in parentComponents[0]?.items" :key="dataIndex" class="parent-components-inner-container">
              
              <DetailHierarchyCardWithFunctionality :dataItem="dataItem"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>