import { Customer } from '~/models/Customer';

export const useCustomerStore = defineStore("customer", {
    state: () => ({
      currentCustomer: [] as any,
      showModal: false,
    }),
    getters: {},
    actions: {
      setCurrentCustomer(selectedCustomer: Customer) {
        this.currentCustomer = selectedCustomer;
      },
      toggleShowModal(isModalShown: boolean) {
        this.showModal = isModalShown;
      },
    },
  });
  