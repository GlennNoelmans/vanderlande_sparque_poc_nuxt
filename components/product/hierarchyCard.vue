<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { randomizeItemImage } from '~/utils/ImageRandomizer';
import { toggleActiveStructureAndFetchNewLevel } from '~/utils/AssetStructureOrganizer';
import { useFilterStore } from '@/stores/filter';
import { useCustomerStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const filterStore = useFilterStore();
const { activeArea } = storeToRefs(filterStore);
const { activeZone } = storeToRefs(filterStore);
const { activeAsset } = storeToRefs(filterStore);

const props = defineProps(['dataItem']);
const { dataItem } = props;
const attributes = dataItem.tuple[0].attributes;
const description = Array.isArray(attributes.Description)
    ? attributes.Description[0]
    : attributes.Description;

const imageUrl = Array.isArray(attributes.Image)
    ? attributes.Image[0].ImageURL[0]
    : null;

var labelContent = "";
var imageName = "";
var maxImageCount = 0;
if (attributes.MarkCode == "AREA")  {
    labelContent = attributes.MarkCode;
    imageName = labelContent;
    maxImageCount = 6;
}
else if (attributes.MarkCode == "ZONE") {
    labelContent = attributes.MarkCode;
    imageName = labelContent;
    maxImageCount = 5;
}
else {
    labelContent = "ASSET"
    imageName = 'asset';
    maxImageCount = 9;
}

</script>
<template>
    <div class="hierarchy-card">
        <div class="product-card__image-container" @click="toggleActiveStructureAndFetchNewLevel(dataItem.tuple[0], activeArea, activeZone, activeAsset, filterStore, currentCustomer.id)">
                <img :src="randomizeItemImage(maxImageCount, imageName.toLowerCase())" alt="product" class="product-card__image">
                    <div class="product-card__label-container">
                        <div class="product-card__label-container__content">
                        {{ labelContent.toUpperCase() }}
                        </div>
                    </div>
                </img>
            </div>
        <p class="hierarchy-card__title" @click="toggleActiveStructureAndFetchNewLevel(dataItem.tuple[0], activeArea, activeZone, activeAsset, filterStore, currentCustomer.id)">
            {{ description }}
        </p>
        <div class="hierarchy-card__mark-number">Mark-number: {{ attributes.MarkNumber }}</div>
        <div class="hierarchy-card__mark-code">Mark-code: {{ attributes.MarkCode }}</div>
        <div class="hierarchy-card__footer">
            <NuxtLink :to="'/hierarchy/' + attributes.MarkNumber">
                <div class="hierarchy-card__footer__details-link">
                    <Icon icon="ri:arrow-right-s-line" class="hierarchy-card__footer__details-link__icon"></Icon>
                    <p>View location details</p>
                </div>
            </NuxtLink>
            <button class="hierarchy-card__footer__filter-button" @click="toggleActiveStructureAndFetchNewLevel(dataItem.tuple[0], activeArea, activeZone, activeAsset, filterStore, currentCustomer.id)">
                Filter
            </button>
        </div>
    </div>
</template>