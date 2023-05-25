<script setup>
import { useCartStore } from '@/composables/cartStore.js';
import { formatPrice } from '@/composables/utils.js';

const cartStore = useCartStore();

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <!-- COMPONENT: PRODUCT ITEM -->
    <article class="overflow-hidden bg-base-100 shadow-sm rounded mb-5">
        <div class="flex flex-col md:flex-row">
            <div class="relative md:w-1/4">
                <img class="w-full object-cover h-60" :src="props.product.thumbnail" alt="Product name text" />
                <span class="absolute top-0 right-0 m-2 rounded-full bg-success text-white px-2 text-center text-sm font-medium z-10"> Free shipping </span>
            </div>
            <!-- col.// -->
            <div class="md:w-2/4">
                <div class="p-4">
                    <div class="flex flex-wrap items-center space-x-2 mb-2">
                        <router-link class="text-lg hover:text-primary font-semibold" :to="{ name: 'product', params: { id: props.product.id } }">{{ props.product.title }}</router-link>
                        <div>
                            <div class="mr-2 rounded bg-warning text-black px-2.5 py-0.5 text-xs font-semibold flex items-center">
                                <svg aria-hidden="true" class="h-4 w-4 text-yellow-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    ></path>
                                </svg>
                                <span class="ml-1 text-yellow-100">{{ props.product.rating }}</span>
                            </div>
                        </div>
                        <div class="mt-3 md:block hidden">
                            <p class="text-base-content mb-2">
                                {{ props.product.description }}
                            </p>
                            <p class="space-y-2 space-x-2">
                                <span class="badge badge-lg badge-secondary hover:badge-primary transition-colors duration-300"> Leather </span>
                                <span class="badge badge-lg badge-secondary hover:badge-primary transition-colors duration-300"> Pink Color </span>
                                <span class="badge badge-lg badge-secondary hover:badge-primary transition-colors duration-300"> Retina Screen </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- col.// -->
            <div class="md:w-1/4 lg:border-l border-base-300 px-4">
                <div class="md:p-5 p-0 flex flex-col md:flex-row">
                    <p class="flex items-center justify-start gap-2">
                        <span class="text-xl font-semibold">${{ formatPrice(props.product.price) }}</span>
                        <del class="line-through text-sm text-error">$230.00</del>
                    </p>
                </div>
                <div class="my-3 flex md:flex-row justify-start gap-3">
                    <button @click="cartStore.addToCart(product)" class="btn btn-primary">
                        <span>Add to cart</span>
                    </button>
                    <a href="#" class="btn btn-square btn-error">
                        <i class="fa fa-heart"></i>
                    </a>
                </div>
            </div>
            <!-- col.// -->
        </div>
        <!-- flex.// -->
    </article>
    <!-- COMPONENT: PRODUCT ITEM //END -->
</template>
