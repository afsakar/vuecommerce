<script setup>
import Modal from '@/components/site/Modal.vue';
import { computed, onMounted, ref, inject } from 'vue';
import AddressModal from '../components/AddressModal.vue';
import { useAuthStore } from '@/composables/authStore.js';
import { useAddressStore } from '@/composables/addressStore.js';
import { useNotificationStore } from '@/composables/notificationStore.js';

const userStore = useAuthStore();
const addressStore = useAddressStore();
const notificationStore = useNotificationStore();
const showModal = ref(false);
const deleteModal = ref(false);
const selectedAddress = ref(null);

onMounted(() => {
    userStore.checkSession();
    addressStore.addressList();
});

function openDeleteModal(id) {
    deleteModal.value = true;
    selectedAddress.value = id;
}

function closeDeleteModal() {
    deleteModal.value = false;
    selectedAddress.value = null;
}

function deleteAddress() {
    addressStore.deleteAddress(selectedAddress.value);
    closeDeleteModal();
    notificationStore.notification = {
        message: 'Address deleted successfully',
        type: 'success',
        show: true
    };
}
</script>

<template>
    <figure class="flex items-start sm:items-center">
        <figcaption>
            <h5 class="font-semibold text-lg">{{ userStore.user?.displayName }}</h5>
            <p>
                Email: <a :href="'mailto:' + userStore.user?.email">{{ userStore.user?.email }}</a> | Phone:
                <a :href="'tel:' + userStore.user?.phone">{{ userStore.user?.phone }}</a>
            </p>
        </figcaption>
    </figure>

    <hr class="my-4 border-base-300" />

    <div class="grid grid-cols-1 md:grid-cols-2 mb-5 gap-4 space-y-2 md:space-y-0">
        <figure v-for="address in addressStore.addresses" :key="address.id" class="relative w-full flex items-center shadow-md border border-base-200 bg-gradient-to-bl from-base-100 to-base-200 p-4 rounded-lg">
            <div class="mr-3">
                <span class="flex items-center justify-center text-warning bg-base-100 w-12 h-12 rounded-full shadow">
                    <i class="fa fa-map-marker-alt"></i>
                </span>
            </div>
            <figcaption>
                <p>
                    <span class="block font-semibold text-lg">
                        {{ address.fullName }}<small> ({{ address.title }})</small>
                    </span>
                    <span class="block">{{ address.phone }}</span>
                    <span class="block">{{ address.address }}</span>
                    <span class="block">{{ address.city }}, {{ address.district }} {{ address.postCode }}</span>
                </p>
            </figcaption>
            <button class="btn btn-circle btn-xs btn-error shadow-md absolute top-3 right-3" @click="openDeleteModal(address.id)">
                <i class="text-xs fa fa-trash"></i>
            </button>
        </figure>
    </div>
    <button class="btn btn-primary" @click="showModal = true"><i class="mr-1 fa fa-plus"></i> Add new address</button>

    <hr class="my-4 border-base-300" />

    <h3 class="text-xl font-semibold mb-5">Current orders</h3>

    <!-- item-order 1 -->
    <article class="p-3 lg:p-5 mb-5 bg-base-300 rounded-md">
        <header class="lg:flex justify-between mb-4">
            <div class="mb-4 lg:mb-0">
                <p class="font-semibold">
                    <span>Order ID: 234 </span>
                    <span class="text-success"> • Confirmed </span>
                </p>
                <p>Dec 29, Mon, 2018</p>
            </div>
            <div class="space-x-2">
                <button class="btn btn-error btn-sm">Cancel order</button>
                <button class="btn btn-primary btn-sm">Track order</button>
            </div>
        </header>
        <div class="grid md:grid-cols-3 gap-2">
            <div>
                <p class="text-base-content font-semibold mb-1">Person</p>
                <ul class="text-base-content/80">
                    <li>Mike Johnatan</li>
                    <li>Phone: 371-295-9131</li>
                    <li>Email: info@mywebsite.com</li>
                </ul>
            </div>
            <div>
                <p class="text-base-content font-semibold mb-1">Delivery address</p>
                <ul class="text-base-content/80">
                    <li>4715 Madisen Throughway</li>
                    <li>That street 053</li>
                    <li>Palo Alto, California</li>
                </ul>
            </div>
            <div>
                <p class="text-base-content font-semibold mb-1">Payment</p>
                <ul class="text-base-content/80">
                    <li class="text-success">Visa card **** 4216</li>
                    <li>Shipping fee: $12.00</li>
                    <li>Total paid: $412.00</li>
                </ul>
            </div>
        </div>
        <!-- grid.// -->

        <hr class="my-4 border-base-300" />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <figure class="flex flex-row mb-4">
                <div>
                    <a href="#" class="block w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
                        <img src="/images/items/10.jpg" alt="Title" />
                    </a>
                </div>
                <figcaption class="ml-3">
                    <p>
                        <a href="#" class="text-base-content/80 hover:text-blue-600">Travel Bag Jeans Blue Color Modern</a>
                    </p>
                    <p class="mt-1 font-semibold">2x = $330.00</p>
                </figcaption>
            </figure>

            <figure class="flex flex-row mb-4">
                <div>
                    <a href="#" class="block w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
                        <img src="/images/items/11.jpg" alt="Title" />
                    </a>
                </div>
                <figcaption class="ml-3">
                    <p>
                        <a href="#" class="text-base-content/80 hover:text-blue-600">Travel Bag Jeans Blue Color Modern</a>
                    </p>
                    <p class="mt-1 font-semibold">1x = $120.90</p>
                </figcaption>
            </figure>

            <figure class="flex flex-row mb-4">
                <div>
                    <a href="#" class="block w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
                        <img src="/images/items/12.jpg" alt="Title" />
                    </a>
                </div>
                <figcaption class="ml-3">
                    <p>
                        <a href="#" class="text-base-content/80 hover:text-blue-600">Travel Bag Jeans Blue Color Modern</a>
                    </p>
                    <p class="mt-1 font-semibold">4x = $130.99</p>
                </figcaption>
            </figure>
        </div>
        <!-- grid.// -->
    </article>
    <!-- item-order 1 end//-->

    <!-- item-order 2 -->
    <article class="p-3 lg:p-5 mb-5 bg-base-300 rounded-md">
        <header class="lg:flex justify-between mb-4">
            <div class="mb-4 lg:mb-0">
                <p class="font-semibold">
                    <span>Order ID: 234 </span>
                    <span class="text-red-500"> • Pending </span>
                </p>
                <p>Dec 29, Mon, 2018</p>
            </div>
            <div class="space-x-2">
                <button class="btn btn-error btn-sm">Cancel order</button>
                <button class="btn btn-primary btn-sm">Track order</button>
            </div>
        </header>
        <div class="grid md:grid-cols-3 gap-2">
            <div>
                <p class="text-base-content font-semibold mb-1">Person</p>
                <ul class="text-base-content/80">
                    <li>Mike Johnatan</li>
                    <li>Phone: 371-295-9131</li>
                    <li>Email: info@mywebsite.com</li>
                </ul>
            </div>
            <div>
                <p class="text-base-content font-semibold mb-1">Delivery address</p>
                <ul class="text-base-content/80">
                    <li>4715 Madisen Throughway</li>
                    <li>That street 053</li>
                    <li>Palo Alto, California</li>
                </ul>
            </div>
            <div>
                <p class="text-base-content font-semibold mb-1">Payment</p>
                <ul class="text-base-content/80">
                    <li class="text-success">Visa card **** 4216</li>
                    <li>Shipping fee: $12.00</li>
                    <li>Total paid: $412.00</li>
                </ul>
            </div>
        </div>
        <!-- grid.// -->

        <hr class="my-4 border-base-300" />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            <figure class="flex flex-row mb-4">
                <div>
                    <a href="#" class="block w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
                        <img src="/images/items/1.jpg" alt="Title" />
                    </a>
                </div>
                <figcaption class="ml-3">
                    <p>
                        <a href="#" class="text-base-content/80 hover:text-blue-600">Travel Bag Jeans Blue Color Modern</a>
                    </p>
                    <p class="mt-1 font-semibold">2x = $30.50</p>
                </figcaption>
            </figure>

            <figure class="flex flex-row mb-4">
                <div>
                    <a href="#" class="block w-20 h-20 rounded-lg border border-gray-200 overflow-hidden">
                        <img src="/images/items/2.jpg" alt="Title" />
                    </a>
                </div>
                <figcaption class="ml-3">
                    <p>
                        <a href="#" class="text-base-content/80 hover:text-blue-600">Travel Bag Jeans Blue Color Modern</a>
                    </p>
                    <p class="mt-1 font-semibold">5x = $433.90</p>
                </figcaption>
            </figure>
        </div>
        <!-- grid.// -->
    </article>
    <!-- item-order 2 //end -->
    <AddressModal v-model:showModal="showModal" />
    <Modal v-model:show="deleteModal">
        <template #header>
            <h2 class="text-lg font-semibold">Delete item</h2>
        </template>
        <template #body>
            <p>Are you sure you want to delete this item?</p>
        </template>
        <template #footer>
            <button class="btn btn-error btn-sm" @click="deleteAddress()">Delete</button>
            <button class="btn btn-ghost btn-sm" @click="closeDeleteModal()">Cancel</button>
        </template>
    </Modal>
</template>
