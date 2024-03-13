<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps(['dataItem']);
const { dataItem } = props;
const attributes = dataItem.tuple[0].attributes;
const description = Array.isArray(attributes.Description)
    ? attributes.Description[0]
    : attributes.Description;

const imageUrl = Array.isArray(attributes.Image)
    ? attributes.Image[0].ImageURL[0]
    : null;
</script>

<template>
    <div class="hierarchy-card">
        <img v-if="imageUrl" :src="imageUrl" class="hierarchy-card__image">
        <img src="https://drive.google.com/file/d/1LhFv9Q4EOMNhUEir_mACUUDscKRvx1DB/view?usp=sharing"
            crossorigin="anonymous" referrerpolicy="no-referrer">

        <iframe width="100" height="75" aria-label="About company" role="img" frameborder="0" sandbox src="data:text/html,<style>body{background:url('https://drive.google.com/file/d/1LhFv9Q4EOMNhUEir_mACUUDscKRvx1DB/view?usp=sharing
        ') center/cover no-repeat;padding:0;margin:0;overflow:hidden}</style>"></iframe>

        <div>{{ attributes }}</div>
        <p class="hierarchy-card__title">{{ description }}</p>
        <div class="hierarchy-card__mark-number">Mark-number: {{ attributes.MarkNumber }}</div>
        <div class="hierarchy-card__mark-code">Mark-code: {{ attributes.MarkCode }}</div>
        <div class="hierarchy-card__footer">
            <div class="hierarchy-card__footer__details-link">
                <Icon icon="ri:arrow-right-s-line" class="hierarchy-card__footer__details-link__icon"></Icon>
                <p>View location details</p>
            </div>
            <button class="hierarchy-card__footer__filter-button">
                Filter
            </button>
        </div>
    </div>
</template>