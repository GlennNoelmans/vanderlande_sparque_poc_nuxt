<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';
import { useCustomerStore } from '@/stores/customer';

const productStore = useProductStore();
const { currentProduct } = storeToRefs(productStore);
const { childComponents } = storeToRefs(productStore);
const { parentComponents } = storeToRefs(productStore);
const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const { assetId } = useRoute().params;

productStore.getChildComponentsOfProduct(currentCustomer?.value?.id, assetId.toString());
productStore.getParentComponentsOfProduct(currentCustomer?.value?.id, assetId.toString());
</script>
<template>
    <div>
        <div v-if="assetId">{{ assetId }}</div>
        <div>children</div>
      <p>{{ childComponents }}</p>
      <div>parents</div>
      <p>{{ parentComponents }}</p>
      <div class="detail-content-container">
        <div class="container">
          <div class="detail-content">
            <button class="detail-content__link"><NuxtLink to="/"><Icon icon="ri:arrow-left-s-line"></Icon>Back to results</NuxtLink></button>
            <div class="product-detail-container">
              <div class="product-gallery">
                <div class="product-gallery__image">
                  image
                </div>
                <div class="product-gallery__image">
                  image
                </div>
                <button class="product-gallery__next">
                  <Icon icon="ri:arrow-down-s-line"></Icon>
                </button>
              </div>
              <div class="product-main-image">
                
              </div>
              <div class="product-details-container">
                <h3 class="product-details-container__title">{{ currentProduct?.tuple[0]?.attributes?.Description }}</h3>
                <p class="product-details-container__part-number">Part number: <span>{{ currentProduct?.tuple[0]?.attributes?.ItemSKU }}</span></p>
                <button class="detail-content__link"><NuxtLink to="/"><Icon icon="ri:arrow-right-s-line"></Icon>View product locations & children</NuxtLink></button>
                <div class="product-details-container__footer">
                  <div class="product-card__price-container"><p class="product-card__price-container__amount">{{ currentProduct?.tuple[0]?.attributes?.Price }}</p><span class="product-card__price-container__each"> / Each</span></div>
                  <div>
                  <div class="amount-container">
                <button class="amount-container__button-container"><div class="amount-container__button-container__icon-container"><Icon icon="el:minus" class="product-filter__arrow"></Icon></div></button>
                <span class="amount-container__number">1</span>
                <button class="amount-container__button-container"><div class="amount-container__button-container__icon-container"><Icon icon="el:plus" class="product-filter__arrow"></Icon></div></button>
            </div>
            <button class="product-card__footer__filter-button">
                Add To Cart
            </button>
          </div>
                </div>
              </div>
            </div>
            <ProductComponentSelectionHeader />
            <div class="child-components-container">
              {{ currentProduct }}
              children
            </div>
            <div class="parent-components-container">
              parents
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
