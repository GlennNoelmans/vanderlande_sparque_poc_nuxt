<script setup>
import resultContent from './resultContent.vue';
import productBaseSelectionHeader from './productBaseSelectionHeader.vue';
import productCard from '../product/productCard.vue';
import { useFilterStore } from '@/stores/filter';
import { useProductStore } from '@/stores/products';

const filterStore = useFilterStore();
const productStore = useProductStore();
const { selectedStore } = storeToRefs(filterStore);
const { assetsShown } = storeToRefs(filterStore);
const { products } = storeToRefs(productStore);
// const assetUrl = dataItem.tuple[0].class[0];
// const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);

function isProductCard(assetUrl) {
    const assetClass = assetUrl.substring(assetUrl.lastIndexOf('/') + 1);
    if (assetClass == 'Item') {
        return true;
    }
    return false;
}
</script>
<template>
    <div class="product-content-container">
        <resultContent />
        <productBaseSelectionHeader />
        <div v-if="selectedStore === 'store'">
            <div class="product-card-container">
                <div v-for="(dataItem, dataIndex) in products[0]?.items" :key="dataIndex" class="product-card-inner-container">
                    <productCard :dataItem="dataItem"/>
                </div>
            </div>
            <productPagination/>
        </div>
        <div v-if="selectedStore === 'base'" >
            <div class="hierarchy-card-container">
                <div class="hierarchy-card-container">
                    <div v-for="(dataItem, dataIndex) in assetsShown[0]?.items " :key="dataIndex" class="hierarchy-card-inner-container">   
                        <HierarchyCard v-if="!isProductCard(dataItem.tuple[0].class[0])" :dataItem="dataItem"/>
                        <productCard v-else :dataItem="dataItem" /> 
                    </div>
                </div>
                <!-- if Area or Zone then show hierarchyCard -->
                <!-- if Item then show productCard -->

                <!-- <productCard :dataItem="dataItem" v-for="(dataItem, dataIndex) in assetsShown[0]?.items" :key="dataIndex"/> -->
            </div>
            <productPagination/>
        </div>
    </div>
</template>