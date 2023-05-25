<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useHead } from '@vueuse/head';
import isGuest from '@/middleware/isGuest.js';
import { useAuthStore } from '@/composables/authStore.js';
import { useCartStore } from '@/composables/cartStore.js';
import ProductCard from '@/components/site/ProductCard.vue';
import { formatPrice, reverseSlug } from '@/composables/utils.js';

const userStore = useAuthStore();

useHead({
    title: 'Cart'
});

const cartStore = useCartStore();
const showModal = ref(false);

const similarProducts = ref([]);
const random = Math.floor(Math.random() * 20) + 10;

onMounted(async () => {
    getSimilarProducts();
    isGuest();
});

async function getSimilarProducts() {
    await axios.get(`https://dummyjson.com/products?limit=4&skip=${random}`).then((response) => {
        similarProducts.value = response.data;
    });
}

function clearCart() {
    cartStore.clearCart();
    showModal.value = false;
}
</script>

<template>
    <section class="bg-base-200 py-4">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- breadcrumbs start -->
            <h2 class="text-4xl">Cart</h2>
            <ol class="inline-flex flex-wrap space-x-1 md:space-x-3 items-center">
                <li class="inline-flex items-center">
                    <a class="hover:text-primary" href="#">Home</a>
                    <i class="ml-3 text-gray-400 fa fa-chevron-right"></i>
                </li>
                <li class="inline-flex items-center">Cart</li>
            </ol>
            <!-- breadcrumbs end -->
        </div>
        <!-- container .// -->
    </section>
    <section class="py-10">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="flex flex-col md:flex-row gap-4">
                <main class="md:w-3/4">
                    <article class="bg-base-200 shadow-sm rounded mb-5 p-3 lg:p-5">
                        <!-- item-cart -->
                        <div v-if="cartStore.cartCount > 0">
                            <div class="flex flex-wrap lg:flex-row gap-5 mb-4 items-center last:border-0 border-b border-1 border-base-300 pb-2" v-for="item in cartStore.cartItems" :key="item.id">
                                <div class="w-full lg:w-2/5 xl:w-2/4">
                                    <figure class="flex items-center leading-5">
                                        <div>
                                            <div class="block w-16 h-16 rounded overflow-hidden">
                                                <img :src="item.thumbnail" :alt="item.title" class="object-cover inline-block w-auto h-20" />
                                            </div>
                                        </div>
                                        <figcaption class="ml-3">
                                            <p>
                                                <router-link :to="{ name: 'product', params: { id: item.id } }" class="hover:text-primary">{{ item.title }}</router-link>
                                            </p>
                                            <p class="mt-1 text-gray-400 capitalize">Category: {{ reverseSlug(item.category) }}</p>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div class="flex items-center justify-end gap-2">
                                    <div class="flex items-center justify-center">
                                        <button v-if="item.quantity === 1" class="btn btn-error btn-sm rounded-r-none" @click="cartStore.removeItem(item)">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                        <button @click="cartStore.decrementItemQuantity(item)" class="btn btn-primary btn-sm rounded-r-none" v-else>
                                            <i class="fa fa-minus"></i>
                                        </button>
                                        <input type="number" v-model="item.quantity" class="input rounded-none input-sm w-10 text-center appearance-none" @change="cartStore.updateItemQuantity(item, $event.target.value)" />
                                        <button @click="cartStore.incrementItemQuantity(item)" class="btn btn-primary btn-sm rounded-l-none">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center justify-end gap-2">
                                    <div class="leading-5">
                                        <p class="font-semibold not-italic">
                                            {{ formatPrice(item.price * item.quantity) }}
                                        </p>
                                        <small class="text-gray-400"> {{ formatPrice(item.price) }} / per item </small>
                                    </div>
                                </div>
                                <div class="flex-auto items-center">
                                    <div class="flex justify-end items-center gap-2">
                                        <a href="#" class="btn btn-sm btn-square btn-primary">
                                            <i class="fa fa-heart"></i>
                                        </a>
                                        <button class="btn btn-sm btn-square btn-error" @click="cartStore.removeItem(item)">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-center font-bold text-lg text-base-content/80">No items in cart</p>
                        </div>
                        <!-- item-cart end// -->

                        <h6 class="font-bold">Free Delivery within 1-2 weeks</h6>
                        <p class="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        </p>
                    </article>
                    <!-- card end.// -->
                </main>
                <aside class="md:w-1/4">
                    <article class="bg-base-200 shadow-sm rounded mb-5 p-3 lg:p-5">
                        <ul class="mb-5">
                            <li class="flex justify-between text-base-content mb-1">
                                <span>Total price:</span>
                                <span>{{ formatPrice(cartStore.cartTotal) }}</span>
                            </li>
                            <li class="flex justify-between text-base-content mb-1">
                                <span>TAX:</span>
                                <span>{{ formatPrice(cartStore.cartTotalTax) }}</span>
                            </li>
                            <li class="flex justify-between text-base-content mb-1">
                                <span>Discount:</span>
                                <span class="text-green-500">- {{ formatPrice(cartStore.cartTotalDiscount) }}</span>
                            </li>
                            <li class="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                                <span>Cart total:</span>
                                <span>{{ formatPrice(cartStore.cartTotalWithTaxDiscount) }}</span>
                            </li>
                        </ul>

                        <div class="space-y-3">
                            <button :disabled="cartStore.cartCount < 1" class="btn btn-success w-full">
                                <a :href="$router.resolve({ name: 'checkout' }).href">Checkout</a>
                            </button>

                            <router-link to="/" class="btn btn-secondary w-full"> Back to shop </router-link>

                            <label v-if="cartStore.cartCount" for="clear-modal" class="btn btn-sm btn-ghost w-full">Clear cart</label>
                        </div>
                    </article>
                    <!-- card end.// -->
                </aside>
                <!-- col.// -->
            </div>
            <!-- grid.// -->
        </div>
    </section>

    <!-- SECTION-RECOMMENDED -->
    <section class="pt-10 pb-20 bg-base-100">
        <div class="container max-w-screen-xl mx-auto px-4">
            <h2 class="text-2xl font-semibold mb-8">Recommended products</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <product-card v-for="item in similarProducts.products" :key="item.id" :product="item" />
            </div>
            <!-- grid .// -->
        </div>
    </section>
    <!--  SECTION-RECOMMENDED  //END -->

    <teleport to="body">
        <input v-model="showModal" type="checkbox" id="clear-modal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="bg-base-100 lg:p-5 lg:rounded-xl lg:max-w-sm modal-box">
                <h3 class="flex items-center justify-between font-bold text-lg">
                    <span>Clear cart</span>
                    <label for="clear-modal" class="btn btn-ghost btn-sm">
                        <i class="fa fa-times"></i>
                    </label>
                </h3>
                <p class="py-4">Are you sure you want to clear your cart? This action cannot be undone.</p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn btn-error" @click="clearCart">Clear</label>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
<route lang="json">
{
    "name": "cart",
    "meta": {
        "requiresAuth": true
    }
}
</route>
