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
    <div>
        <div class="card group relative flex w-full self-center flex-col overflow-hidden rounded-lg bg-base-200 shadow-md max-h-96">
            <!-- <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img :src="`images/items/${props.product}.jpg`" class="mx-auto mix-blend-multiply w-auto" height="240" alt="Product title here" />
                <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
            </a> -->
            <router-link class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" :to="{ name: 'product', params: { id: props.product.id } }">
                <img :src="`${props.product.images[0]}`" class="peer absolute top-0 right-0 h-full w-full object-cover" height="240" alt="Product title here" loading="lazy" />

                <img
                    v-if="props.product.images[1]"
                    :src="`${props.product.images[1]}`"
                    class="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                    height="240"
                    alt="Product title here"
                    loading="lazy"
                />

                <svg
                    v-if="props.product.images[1]"
                    class="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                >
                    <path
                        fill="currentColor"
                        d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                    />
                </svg>
                <span class="absolute top-0 right-0 m-2 rounded-full bg-success text-white px-2 text-center text-sm font-medium z-10"> New </span>
                <span class="absolute top-0 left-0 m-2 rounded-full bg-secondary px-2 text-center text-sm font-medium text-white">39% OFF</span>
            </router-link>
            <div class="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 class="text-sm font-semibold">{{ props.product.title }}</h5>
                </a>
                <div class="mt-2 mb-5 flex items-center justify-between gap-4">
                    <p>
                        <span class="text-3xl font-bold">${{ formatPrice(props.product.price) }}</span>
                        <span class="text-sm text-error line-through ml-2">$699</span>
                    </p>
                    <div>
                        <div class="mr-2 ml-3 rounded bg-warning text-black px-2.5 py-0.5 text-xs font-semibold flex items-center">
                            <svg aria-hidden="true" class="h-4 w-4 text-yellow-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                ></path>
                            </svg>
                            <span class="ml-1 text-yellow-100">{{ props.product.rating }}</span>
                        </div>
                    </div>
                </div>
                <button @click="cartStore.addToCart(product)" class="btn w-full btn-primary" :disabled="product.stock < 1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to cart</span>
                </button>
            </div>
        </div>
    </div>
</template>
