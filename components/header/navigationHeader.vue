<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useCustomerStore } from '@/stores/customer';
import { useProductStore } from '~/stores/products';
import { useFilterStore } from '~/stores/filter';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const productStore = useProductStore();
const filterStore = useFilterStore();
const home = () => {
    filterStore.fetchStructure(currentCustomer.value.id, 2, 1, 0);
    productStore.fetchAllProducts(currentCustomer.value.id, 0);
    productStore.fetchAllProductCategories(currentCustomer.value.id, "", 0);
    filterStore?.setFilteredMarkNumber("0000.00.000.000");
    productStore.setCurrentPage(1);
    filterStore.setCurrentPage(1);
    filterStore?.setFilteredAsset(null);
    filterStore.setActiveArea("");
    filterStore.setActiveZone("");
    filterStore.setActiveAsset("");
}
</script>

<template>
    <div class="nav-header">
        <div class="container">
            <div class="language-container">
                <div class="language-inner-container">
                    <p class="language-inner-container__site-name">Vanderlande.com</p>
                    <div class="language-inner-container__language-selector">
                        <Icon icon="fluent:globe-24-filled" class="language-inner-container__language-selector__icon"></Icon>
                        <p class="language-inner-container__language-selector__language">EN</p>
                        <Icon icon="ant-design:caret-down-outlined"
                            class="language-inner-container__language-selector__arrow"></Icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="nav-container">
                <div class="nav-left-container">
                    <NuxtLink to="/" @click="home"><img src="/vanderlande.png" alt="vanderlande_icon" class="nav-logo"></NuxtLink>
                    <ul class="nav-menu">
                        <li class="nav-menu__link">Home</li>
                        <li class="nav-menu__link">
                            <p>Services</p>
                            <Icon icon="ant-design:caret-down-outlined" class="nav-menu__link__arrow"></Icon>
                        </li>
                        <li class="nav-menu__link">Contact us</li>
                    </ul>
                </div>
                <div class="nav-right-container">
                    <div class="account-cart-container">
                        <div class="account-container">
                            <div class="order">
                                <Icon icon="material-symbols-light:order-approve-outline" class="order__icon"></Icon>
                                <p class="order__title">Quick Order</p>
                            </div>
                            <div class="account">
                                <Icon icon="iconoir:user" class="account__icon"></Icon>
                                <p class="account__user">Victoria Bieghs (External)</p>
                                <Icon icon="ant-design:caret-down-outlined" class="account__arrow"></Icon>
                            </div>
                        </div>
                        <div class="cart-container">
                            <div class="cart">
                                <Icon icon="bi:cart2" class="cart__icon"></Icon>
                                <div class="cart__amount">1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>