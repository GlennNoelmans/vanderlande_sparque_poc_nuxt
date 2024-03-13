<script setup>
import customerData from '~/constants/customerData';
import { useCustomerStore } from '@/stores/customer';
import { useFilterStore } from '@/stores/filter';
import { Customer } from '~/models/Customer';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useProductStore } from '~/stores/products';

const customerStore = useCustomerStore();
const filterStore = useFilterStore();
const productStore = useProductStore();
const { currentCustomer } = storeToRefs(customerStore);
const { showModal } = storeToRefs(customerStore);
const runtimeConfig = useRuntimeConfig();
const defaultCustomer = customerData.find(customer => customer.id == runtimeConfig.public.SITE_ID) || null;
const selectedCustomer = ref(defaultCustomer);

customerStore.setCurrentCustomer(defaultCustomer);
const updateSelectedCustomer = () => {
    customerStore.setCurrentCustomer(selectedCustomer.value);
};

const selectCustomer = () => {
    productStore.setCurrentPage(1);
    productStore.setSearchKeyword(null);
    filterStore.fetchStructure(currentCustomer.value.id, 2, 1);
    productStore.fetchAllProducts(currentCustomer.value.id, 0);
    runtimeConfig.public.SITE_ID = currentCustomer.value.id;
    customerStore.toggleShowModal(false);
};

const closeCustomerModal = () => {
    customerStore.toggleShowModal(false);
};
</script>
<template>
    <div class="customer-modal-container" v-if="showModal">
        <div class="container">
            <div class="customer-modal-inner-container">
                <div class="customer-modal">
                    <h2 class="customer-modal__header">Change user </h2>
                    <button class="customer-modal__close" @click="closeCustomerModal()"><Icon icon="ic:sharp-close" class="hierarchy-card__footer__details-link__icon"></Icon></button>
                    <div class="customer-selection-container">
                        <select id="customerDropdown" v-model="selectedCustomer" @change="updateSelectedCustomer()"
                            class="customer-selection-container__dropdown-container">
                            <option v-for="customer in customerData" :key="customer.id" :value="customer">
                                {{ customer.id }} - {{ customer.name }}
                            </option>
                        </select>
                        <button class="customer-selection-container__button"  @click="selectCustomer()"> Select <Icon icon="ri:arrow-right-s-line" class="customer-selection-container__button__arrow"></Icon></button>
                    </div>

                    <div v-if="currentCustomer">
                        <h2 class="customer-modal__header">Selected Customer Details</h2>
                        <p>ID: {{ currentCustomer.id }}</p>
                        <p>Name: {{ currentCustomer.name }}</p>
                        <p>Country: {{ currentCustomer.countryCode }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>