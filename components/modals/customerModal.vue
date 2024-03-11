<script setup>
import customerData from '~/constants/customerData';
import { useCustomerStore } from '@/stores/customer';
import { Customer } from '~/models/Customer';

const customerStore = useCustomerStore();
const { currentCustomer } = storeToRefs(customerStore);
const runtimeConfig = useRuntimeConfig();
const defaultCustomer = customerData.find(customer => customer.id == runtimeConfig.public.SITE_ID) || null;
const selectedCustomer = ref(defaultCustomer);

customerStore.setCurrentCustomer(defaultCustomer);
const updateSelectedCustomer = () => {
    customerStore.setCurrentCustomer(selectedCustomer.value);
};
</script>

<template>
    <div class="customer-modal-container">
        <div class="container">
            <div class="customer-modal-inner-container">
                <div class="customer-modal">
                    <h2>Change user</h2>
                    <div class="customer-selection-container">
                        <select id="customerDropdown" v-model="selectedCustomer" @change="updateSelectedCustomer()"
                            class="customer-selection-container__dropdown-container">
                            <option v-for="customer in customerData" :key="customer.id" :value="customer">
                                {{ customer.id }} - {{ customer.name }}
                            </option>
                        </select>
                        <button class="customer-selection-container__button"> Select </button>
                    </div>

                    <div v-if="currentCustomer">
                        <h2>Selected Customer Details</h2>
                        <p>ID: {{ currentCustomer.id }}</p>
                        <p>Name: {{ currentCustomer.name }}</p>
                        <p>Country: {{ currentCustomer.countryCode }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>