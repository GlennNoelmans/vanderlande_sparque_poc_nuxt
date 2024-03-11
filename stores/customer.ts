import { Customer } from '~/models/Customer';

export const useCustomerStore = defineStore("customer", {
    state: () => ({
      currentCustomer: [] as any,
    }),
    getters: {},
    actions: {
      setCurrentCustomer(selectedCustomer: Customer) {
        this.currentCustomer = selectedCustomer;
      },
    },
  });
  