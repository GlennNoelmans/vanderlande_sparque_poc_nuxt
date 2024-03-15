<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { randomizeItemImage } from '~/utils/ImageRandomizer';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

const props = defineProps(['dataItem']);
const { dataItem } = props;
// const attributes = dataItem.tuple[0].attributes;
// const description = Array.isArray(attributes.Description)
//     ? attributes.Description[0]
//     : attributes.Description;

// const imageUrl = Array.isArray(attributes.Image)
//     ? attributes.Image[0].ImageURL[0]
//     : null;

var labelContent = "";
var imageName = "";
var maxImageCount = 0;
if (dataItem.MarkCode == "AREA")  {
    labelContent = attributes.MarkCode;
    imageName = labelContent;
    maxImageCount = 6;
}
else if (dataItem.MarkCode == "ZONE") {
    labelContent = attributes.MarkCode;
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
            {{ dataItem.Description[0] }}
        </p>
        <div class="hierarchy-card__mark-number">Mark-number: {{ dataItem.MarkNumber[0] }}</div>
        <div class="hierarchy-card__mark-code">Mark-code: {{ dataItem.MarkCode[0] }}</div>
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