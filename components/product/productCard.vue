<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';

const productStore = useProductStore();

//productStore.fetchAllProductsFromMock();

const props = defineProps(['dataItem']);
const { dataItem } = props;
const attributes = dataItem.tuple[0].attributes;
const description = Array.isArray(attributes.Description)
  ? attributes.Description[0]
  : attributes.Description;
const price = Array.isArray(attributes.Price)
  ? attributes.Price[0]
  : attributes.Price;

</script>
<template>
    <div class="product-card">
        <div class="product-card__image"></div>
        <p class="product-card__title">{{ description }}</p>
        <div class="product-card__part-number">Part number: {{ attributes.ItemSKU }}</div>
        <div class="product-card__delivery">Delivery in 4 days</div>
        <div class="product-card__price-container"><p class="product-card__price-container__amount">{{ price }}</p><span class="product-card__price-container__each"> / Each</span></div>
        <div class="product-card__footer">
            <div class="product-card__footer__details-link">
                <Icon icon="ri:arrow-right-s-line" class="product-card__footer__details-link__icon"></Icon>
                <p>View product details</p>
            </div>
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
</template>