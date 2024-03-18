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
                            spareparts
                        </div>
                    </div>
                </img> 
            </div>
        <p class="hierarchy-card__title">
            {{ dataItem?.tuple[0].attributes.Description }} 
        </p>
        <div class="hierarchy-card__mark-number">Part-number: {{ dataItem?.tuple[0]?.attributes?.ItemSKU }}</div>
        <div class="hierarchy-card__mark-code">Price: {{ dataItem?.tuple[0]?.attributes?.Price }}</div>
        <div class="hierarchy-card__footer">
            <NuxtLink :to="'/products-in-base/' + dataItem?.tuple[0]?.attributes?.ItemSKU">
            <div class="hierarchy-card__footer__details-link">
                <Icon icon="ri:arrow-right-s-line" class="hierarchy-card__footer__details-link__icon"></Icon>
                <p>View location details</p>
            </div>
            </NuxtLink>
        </div>
    </div>
</template>