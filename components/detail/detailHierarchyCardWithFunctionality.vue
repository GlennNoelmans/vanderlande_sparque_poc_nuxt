<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { randomizeItemImage } from '~/utils/ImageRandomizer';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

const props = defineProps(['dataItem']);
const { dataItem } = props;

var labelContent = "";
var imageName = "";
var maxImageCount = 0;
if (dataItem?.tuple[0]?.attributes?.MarkCode == "AREA")  {
    labelContent = dataItem?.tuple[0]?.attributes?.MarkCode;
    imageName = labelContent;
    maxImageCount = 6;
}
else if (dataItem?.tuple[0]?.attributes?.MarkCode == "ZONE") {
    labelContent = dataItem?.tuple[0]?.attributes?.MarkCode;
    imageName = labelContent;
    maxImageCount = 5;
}
else {
    labelContent = "ASSET"
    imageName = 'item';
    maxImageCount = 22;
}

</script>
<template>
    <div class="hierarchy-card">
        <div class="product-card__image-container">
                <img :src="randomizeItemImage(maxImageCount, imageName.toLowerCase())" alt="product" class="product-card__image">
                    <div class="product-card__label-container">
                        <div class="product-card__label-container__content">
                        {{ labelContent.toUpperCase() }}
                        </div>
                    </div>
                </img> 
            </div>
        <p class="hierarchy-card__title">
            {{ dataItem?.tuple[0]?.attributes?.Description }} 
        </p>
        <div class="hierarchy-card__mark-number">Mark-number: {{ dataItem?.tuple[0]?.attributes?.MarkNumber }}</div>
        <div class="hierarchy-card__mark-code">Mark-code: {{ dataItem?.tuple[0]?.attributes?.MarkCode }}</div>
        <div class="hierarchy-card__footer">
            <NuxtLink :to="'/hierarchy/' + dataItem?.tuple[0]?.attributes?.MarkNumber">
            <div class="hierarchy-card__footer__details-link">
                <Icon icon="ri:arrow-right-s-line" class="hierarchy-card__footer__details-link__icon"></Icon>
                <p>View location details</p>
            </div>
            </NuxtLink>
        </div>
    </div>
</template>