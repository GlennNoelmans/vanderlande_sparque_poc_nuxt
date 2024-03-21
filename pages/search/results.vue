<script setup>
import productSearchContent from '~/components/search/productSearchContent.vue';
import productSearchFilter from '~/components/search/productSearchFilter.vue';


</script>
<template>
    <div>
        <div class="horizontal-divider"></div>
        <div class="page-content-container">
            <div class="container">
                <div class="page-content">
                    <productSearchFilter/>
                    <div class="vertical-line-divider"></div>
                    <productSearchContent/>
                </div>
            </div>
        </div>
    </div>
</template>