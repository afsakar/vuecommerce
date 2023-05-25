<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { IconHeart, IconHeartFilled } from '@tabler/icons-vue';
import { useCartStore } from '@/composables/cartStore.js';
import { reverseSlug } from '@/composables/utils.js';

const product = ref({});
const router = useRoute();
const mainPicture = ref(null);
const similarProducts = ref([]);
const cartStore = useCartStore();

async function getProduct() {
    await axios.get(`https://dummyjson.com/products/${router.params.id}`).then((response) => {
        product.value = response.data;
    });
}

onMounted(async () => {
    await getProduct();
    await getSimilarProducts();
    mainPicture.value = product.value.thumbnail;
});

const changePicture = (picture) => {
    mainPicture.value = picture;
};

const random = Math.floor(Math.random() * 20) + 10;

async function getSimilarProducts() {
    await axios.get(`https://dummyjson.com/products?limit=4&skip=${random}`).then((response) => {
        similarProducts.value = response.data;
    });
}
</script>

<template>
    <div>
        <section class="bg-base-100 py-4">
            <div class="container max-w-screen-xl mx-auto px-4">
                <!-- breadcrumbs start -->
                <ol class="inline-flex flex-wrap space-x-1 md:space-x-3 items-center">
                    <li class="inline-flex items-center">
                        <a class="hover:text-primary" href="#">Home</a>
                        <i class="ml-3 text-gray-400 fa fa-chevron-right"></i>
                    </li>
                    <li class="inline-flex items-center" aria-current="page">
                        <a class="hover:text-primary" href="#"> Clothes </a>
                        <i class="ml-3 text-gray-400 fa fa-chevron-right"></i>
                    </li>
                    <li class="inline-flex items-center" aria-current="page">
                        <a class="hover:text-primary" href="#"> Men's wear </a>
                        <i class="ml-3 text-gray-400 fa fa-chevron-right"></i>
                    </li>
                    <li class="inline-flex items-center">Detail</li>
                </ol>
                <!-- breadcrumbs end -->
            </div>
            <!-- container .// -->
        </section>

        <section class="bg-base-200 py-10">
            <div class="container max-w-screen-xl mx-auto px-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <aside>
                        <!-- gallery -->
                        <div class="relative p-3 text-center rounded mb-5">
                            <img class="object-cover inline-block h-[400px] w-auto" :src="mainPicture" :alt="product.title" />
                        </div>
                        <div class="space-x-2 overflow-auto text-center whitespace-nowrap">
                            <button v-for="(image, index) in product.images" :key="index" class="inline-block p-1 rounded-md" @click="changePicture(image)">
                                <img class="w-14 h-14 object-cover" :src="image" :alt="product.title" />
                            </button>
                        </div>
                        <!-- gallery end.// -->
                    </aside>
                    <main>
                        <h2 class="font-semibold text-2xl mb-4 capitalize">
                            {{ product.title }}
                        </h2>

                        <div class="flex flex-wrap items-center just space-x-2 mb-2">
                            <div>
                                <div class="mr-2 rounded bg-warning text-black px-2.5 py-0.5 text-xs font-semibold flex items-center">
                                    <svg aria-hidden="true" class="h-4 w-4 text-yellow-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        ></path>
                                    </svg>
                                    <span class="ml-1 text-yellow-100">{{ product.rating }}</span>
                                </div>
                            </div>

                            <svg width="6px" height="6px" viewbox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                            </svg>

                            <span class="text-gray-400"> <i class="fa fa-shopping-bag mr-2"></i> 154 orders </span>

                            <svg width="6px" height="6px" viewbox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                            </svg>

                            <span class="text-green-500">Verified</span>
                        </div>

                        <p class="mb-4 font-semibold text-2xl">${{ product.price }}</p>

                        <ul class="mb-5">
                            <li class="mb-1">
                                <b class="font-medium w-36 inline-block">Brand:</b>
                                <span class="capitalize">{{ product.brand }}</span>
                            </li>
                            <li class="mb-1">
                                <b class="font-medium w-36 inline-block">Category:</b>
                                <a :href="`/category/${product.category}`" class="hover:text-primary">{{ reverseSlug(product.category) }}</a>
                            </li>
                            <li class="mb-1"><b class="font-medium w-36 inline-block">Delivery:</b><span>Russia, USA & Europe</span></li>
                            <li class="mb-1">
                                <b class="font-medium w-36 inline-block">Color:</b>
                                <span>Brown</span>
                            </li>
                        </ul>

                        <div class="grid grid-cols-1 lg:grid-cols-2 mb-5 gap-3">
                            <!-- select-custom -->
                            <div class="relative w-ful">
                                <select class="select w-full select-md">
                                    <option>Select size</option>
                                    <option>Extra large</option>
                                    <option>Medium size</option>
                                    <option>Normal size</option>
                                </select>
                            </div>
                            <!-- select-custom .//end  -->

                            <!-- select-custom -->
                            <div class="relative w-ful">
                                <select class="select w-full select-md">
                                    <option>Select color</option>
                                    <option>Lightblue</option>
                                    <option>Green</option>
                                    <option>Black</option>
                                </select>
                            </div>
                            <!-- select-custom .//end  -->
                        </div>
                        <!-- action buttons -->
                        <div class="flex flex-wrap gap-2">
                            <a class="btn btn-warning" href="#"> Buy now </a>
                            <button :disabled="product.stock < 1" class="btn btn-primary" @click="cartStore.addToCart(product)">
                                <i class="fa fa-shopping-cart mr-2"></i>
                                Add to cart
                            </button>
                            <button class="btn btn-error btn-outline btn-square">
                                <IconHeart />
                                <IconHeartFilled v-show="false" />
                            </button>
                        </div>
                        <!-- action buttons .//end -->
                    </main>
                </div>
                <!-- grid .// -->
            </div>
            <!-- container .// -->
        </section>

        <section class="bg-base-100 py-10">
            <div class="container max-w-screen-xl mx-auto px-4">
                <div class="flex flex-wrap -mx-2">
                    <div class="lg:w-3/4 px-2">
                        <article class="border border-base-100 shadow-sm rounded-md bg-base-200">
                            <nav class="tabs px-5 py-3">
                                <a href="#" class="tab tab-bordered tab-active">Description</a>
                                <a href="#" class="tab tab-bordered">Specification</a>
                                <a href="#" class="tab tab-bordered">Delivery</a>
                                <a href="#" class="tab tab-bordered">Payment info</a>
                                <a href="#" class="tab tab-bordered">Seller profile</a>
                            </nav>
                            <div class="p-5">
                                <p class="mb-3" v-html="product.description"></p>
                            </div>
                        </article>
                    </div>
                    <!-- col.// -->
                    <aside class="lg:w-1/4 px-2 w-full mt-2 md:mt-0">
                        <article class="border border-base-100 shadow-sm rounded-md bg-base-200 p-4">
                            <h3 class="mb-5 text-lg font-semibold">Similar products</h3>
                            <figure class="flex flex-row mb-4" v-for="item in similarProducts.products" :key="item.id">
                                <div>
                                    <a :href="$router.resolve({ name: 'product', params: { id: item.id } }).href" class="block w-20 h-20 rounded border border-base-100 overflow-hidden">
                                        <img :src="item.thumbnail" :alt="item.title" class="object-cover inline-block w-auto h-20" />
                                    </a>
                                </div>
                                <figcaption class="ml-3">
                                    <p>
                                        <a :href="$router.resolve({ name: 'product', params: { id: item.id } }).href" class="hover:text-primary">{{ item.title }}</a>
                                    </p>
                                    <p class="mt-1 font-semibold">${{ item.price }}</p>
                                </figcaption>
                            </figure>
                        </article>
                    </aside>
                    <!-- col.// -->
                </div>
                <!-- grid.// -->
            </div>
            <!-- container.// -->
        </section>
    </div>
</template>

<route lang="yaml">
name: product
path: /product/:id
</route>
