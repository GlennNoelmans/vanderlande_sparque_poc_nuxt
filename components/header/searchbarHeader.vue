<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
</script>

<template>
    <div class="search-header">
            <div class="search-header-container">
                <h1 class="search-header-container__title">Fenego & Sparque.AI - POC</h1>
                <div class="search-container">
                    <input type="text" class="search-container__input"
                        placeholder="Search by product name, item number or mark-number...">
                    <button class="search-container__button">
                        <div class="search-container__button__inner-container">
                            <Icon icon="fa:search" class="search-container__icon"></Icon>
                        </div>
                    </button>
                </div>
                <div class="location-container">
                    <div class="location-inner-container">
                        <Icon icon="fa6-solid:location-dot" class="location-inner-container__icon"></Icon>
                        <div class="address-container">
                            <p class="address-container__factory-name">Vanderlande X-factory Ve...</p>
                            <p class="address-container__street-name">Rooseveltlaan 1</p>
                        </div>
                    </div>
                    <div class="edit-location-container">
                        <Icon icon="subway:pencil" class="edit-location-container__icon"></Icon>
                        <p class="edit-location-container__title">Change</p>
                    </div>
                </div>
            </div>
        </div>
</template>