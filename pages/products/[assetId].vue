<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useProductStore } from "~/stores/products";
import { useFilterStore } from "~/stores/filter";

const productStore = useProductStore();
const filterStore = useFilterStore();
const { currentProduct } = storeToRefs(productStore);
const { childComponents } = storeToRefs(productStore);
const { parentComponents } = storeToRefs(productStore);
const { selectedComponentHeader } = storeToRefs(filterStore);
const { assetId } = useRoute().params;

// productStore.getChildComponentsOfProduct(currentCustomer?.value?.id, assetId.toString());
// productStore.getParentComponentsOfProduct(currentCustomer?.value?.id, assetId.toString());
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
              <div class="product-gallery__image"><img :src="randomizeItemImage(22, 'item')" alt="product_in_base" class="product-main-image__image"></img></div>
              <div class="product-gallery__image"><img :src="randomizeItemImage(22, 'item')" alt="product_in_base" class="product-main-image__image"></img></div>
              <button class="product-gallery__next">
                <Icon icon="ri:arrow-down-s-line"></Icon>
              </button>
            </div>
            <div class="product-main-image">
                <img :src="randomizeItemImage(22, 'item')" alt="product_in_base" class="product-main-image__image"></img>
            </div>
            <div class="product-details-container">
              <h3 class="product-details-container__title">
                {{ currentProduct?.tuple[0]?.attributes?.Description }}
              </h3>
              <p class="product-details-container__part-number">
                Part number:
                <span>{{ currentProduct?.tuple[0]?.attributes?.ItemSKU }}</span>
              </p>
              <button class="detail-content__link">
                <NuxtLink to="/"
                  ><Icon icon="ri:arrow-right-s-line"></Icon>View product
                  locations & children</NuxtLink
                >
              </button>
              <div class="product-details-container__footer">
                <div class="product-card__price-container">
                  <p class="product-card__price-container__amount">
                    {{ currentProduct?.tuple[0]?.attributes?.Price }}
                  </p>
                  <span class="product-card__price-container__each">
                    / Each</span
                  >
                </div>
                <div>
                  <div class="amount-container">
                    <button class="amount-container__button-container">
                      <div
                        class="amount-container__button-container__icon-container"
                      >
                        <Icon
                          icon="el:minus"
                          class="product-filter__arrow"
                        ></Icon>
                      </div>
                    </button>
                    <span class="amount-container__number">1</span>
                    <button class="amount-container__button-container">
                      <div
                        class="amount-container__button-container__icon-container"
                      >
                        <Icon
                          icon="el:plus"
                          class="product-filter__arrow"
                        ></Icon>
                      </div>
                    </button>
                  </div>
                  <button class="product-card__footer__filter-button">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ProductComponentSelectionHeader />
          <div
            v-if="selectedComponentHeader === 'child'"
            class="child-components-container"
          >
          <div class="no-assets-found">
              <Icon icon="nonicons:not-found-16"></Icon>
              <span>There are no child components for this asset</span>
          </div>
          </div>
          <div v-else class="parent-components-container">
            <div v-for="(dataItem, dataIndex) in currentProduct?.tuple[0].attributes.AssetID" :key="dataIndex" class="parent-components-inner-container">
              <detailHierarchyCard :dataItem="dataItem"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
