<script setup>
import axios from 'axios';
import { useHead } from '@vueuse/head';
import { computed, onMounted, ref } from 'vue';
import { categories } from '@/composables/category.js';
import ProductCard from '@/components/site/ProductCard.vue';
import CategoryIcon from '@/components/site/CategoryIcon.vue';
import CardSkeleton from '@/components/site/CardSkeleton.vue';
import { useAddressStore } from '@/composables/addressStore';

const addressStore = useAddressStore();

useHead({
    title: 'Homepage'
});

const filters = ref({
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    limit: 20
});

const products = ref({});
const skip = ref(0);
const loading = ref(false);
const randomProduct = ref({});

async function getProducts() {
    await axios.get(`https://dummyjson.com/products?limit=${filters.value.limit}`).then((response) => {
        products.value = response.data;
    });
}

const checkMoreItem = computed(() => {
    return products.value.products?.length < products.value?.total;
});

onMounted(async () => {
    loading.value = true;
    await getProducts(`?limit=${filters.value.limit}`);
    await getRandomProduct();
    loading.value = false;
});

async function loadMore() {
    loading.value = true;
    skip.value += 20;
    await axios
        .get(`https://dummyjson.com/products?skip=${skip.value}&limit=${filters.value.limit}`)
        .then((response) => {
            products.value.products = products.value.products.concat(response.data.products);
        })
        .then(() => {
            loading.value = false;
        });
}

async function getRandomProduct() {
    const randomId = Math.floor(Math.random() * 100) + 1;
    return await axios.get(`https://dummyjson.com/products/${randomId}`).then((response) => {
        return (randomProduct.value = response.data);
    });
}
</script>

<template>
    <!--  MAIN SECTION  -->
    <section class="pt-5">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="grid md:grid-cols-1 gap-5">
                <div class="hero object-cover h-[400px] rounded-lg" :style="{ backgroundImage: 'url(' + randomProduct.thumbnail + ')' }">
                    <div class="hero-overlay bg-opacity-60 rounded-lg"></div>
                    <div class="hero-content text-center text-neutral-content">
                        <div class="max-w-md">
                            <h1 class="mb-5 text-4xl font-bold capitalize">{{ randomProduct.title }}</h1>
                            <p class="mb-5">
                                {{ randomProduct.description }}
                            </p>
                            <router-link :to="'/product/' + randomProduct.id" class="btn btn-primary">
                                <span class="btn-text">Shop Now</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- container //end -->
    </section>
    <!--  MAIN SECTION //END -->

    <!-- SECTION-ICONMENU -->
    <section class="pt-10">
        <div class="container max-w-screen-xl mx-auto px-4">
            <nav class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-x-3 gap-y-6">
                <category-icon v-for="category in categories" :key="category" :category="category" />
            </nav>
        </div>
        <!-- container //end -->
    </section>
    <!-- SECTION-ICONMENU //END -->
    
    <!-- SECTION-CONTENT -->
    <section class="py-10">
        <div class="container max-w-screen-xl mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8">New products</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- Loading skeleton -->
                <card-skeleton v-if="loading" v-for="item in 4" :key="item" />
                <product-card v-else v-for="item in products.products" :key="item.id" :product="item" />
            </div>
            <!-- grid .// -->
        </div>
    </section>
    <!--  SECTION-CONTENT  //END -->

    <div class="flex items-center justify-center py-10">
        <button v-if="checkMoreItem" :class="{ loading: loading }" class="btn btn-primary btn-sm" @click="loadMore">Load more</button>
        <span v-else class="font-semibold text-gray-400">No more products</span>
    </div>
</template>

<style scoped></style>

<route lang="yaml">
name: home
</route>
