<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
</script>

<template>
    <div class="product-pagination">
        <div class="arrow-container">
            <Icon icon="ri:arrow-left-s-line" class="arrow-container__icon"></Icon>
        </div>
        <div class="pages-container">
            <span class="pages-container__page-number">1</span>
        </div>
        <div class="arrow-container">
            <Icon icon="ri:arrow-right-s-line" class="arrow-container__icon"></Icon>
        </div>
    </div>
</template>