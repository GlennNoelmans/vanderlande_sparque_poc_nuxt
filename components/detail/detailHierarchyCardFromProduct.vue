<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { randomizeItemImage } from '~/utils/ImageRandomizer';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

const props = defineProps(['dataItem']);
const { dataItem } = props;

</script>
<template>
    <div class="hierarchy-card">
        <div class="product-card__image-container">
                <img :src="randomizeItemImage(22, 'item')" alt="product" class="product-card__image">
                    <div class="product-card__label-container">
                        <div class="product-card__label-container__content">
                        ASSET
                        </div>
                    </div>
                </img> 
            </div>
        <p class="hierarchy-card__title">
            {{ dataItem?.Description[0] }}
        </p>
        <div class="hierarchy-card__mark-number">Mark-number: {{ dataItem?.MarkNumber[0] }}</div>
        <div class="hierarchy-card__mark-code">Mark-code: {{ dataItem?.MarkCode[0] }}</div>
        <div class="hierarchy-card__footer">
            <NuxtLink :to="'/hierarchy/' + dataItem?.MarkNumber[0]">
            <div class="hierarchy-card__footer__details-link">
                <Icon icon="ri:arrow-right-s-line" class="hierarchy-card__footer__details-link__icon"></Icon>
                <p>View location details</p>
            </div>
            </NuxtLink>
        </div>
    </div>
</template>