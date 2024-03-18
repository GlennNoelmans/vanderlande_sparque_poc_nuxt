import { Customer } from '~/models/Customer';

export const useCustomerStore = defineStore("customer", {
    state: () => ({
      currentCustomer: { "id": 2403540, "name": "Amazon BFL2 Shafter", "countryCode": "US" } as any,
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
  