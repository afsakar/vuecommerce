<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import ProductItem from '@/views/index/category/components/ProductItem.vue';
import { useRoute } from 'vue-router';
import collect from 'collect.js';
import { categories } from '@/composables/category.js';

const router = useRoute();
const products = ref({});
const loading = ref(false);
const showFilters = ref(false);

const filters = ref({
    category: router.params.slug,
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    limit: 5
});

async function getProducts(category) {
    await axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
        products.value = { ...response.data };
    });
}

onMounted(async () => {
    loading.value = true;
    await getProducts(router.params.slug);
    loading.value = false;
});
</script>

<template>
    <section class="bg-base-100 py-4">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- breadcrumbs start -->
            <h2 class="text-3xl font-semibold mb-2">Men’s wear</h2>
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

    <!-- SECTION-CONTENT -->
    <section class="bg-base-200 py-12">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="flex flex-col md:flex-row -mx-4">
                <aside class="md:w-1/3 lg:w-1/4 px-4">
                    <!-- filter wrap -->
                    <button @click="showFilters = !showFilters" class="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-primary" href="#">
                        Filter by
                    </button>

                    <transition name="slide">
                        <div v-show="showFilters" class="md:hidden px-6 py-4 bg-base-300 rounded shadow-sm mb-5">
                            <h3 class="font-semibold mb-2">Category</h3>

                            <ul class="text-gray-500 space-y-1 h-48 overflow-auto">
                                <li>
                                    <a href="/" class="hover:text-primary">All</a>
                                </li>
                                <li v-for="category in categories.sortBy()" :key="category.value">
                                    <a :href="$router.resolve({ name: 'category', params: { slug: category.value } }).href" class="hover:text-primary" :class="{ 'font-semibold text-primary': category.value === filters.category }">{{
                                        category.label
                                    }}</a>
                                </li>
                            </ul>

                            <hr class="my-4" />

                            <h3 class="font-semibold mb-2">Filter by</h3>
                            <ul class="space-y-1">
                                <li>
                                    <label class="flex items-center">
                                        <input name="" type="checkbox" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Samsung </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="" type="checkbox" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Huawei </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Tesla model </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Best brand </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Other brands </span>
                                    </label>
                                </li>
                            </ul>

                            <hr class="my-4" />

                            <h3 class="font-semibold mb-2">Sort by</h3>
                            <ul class="space-y-1">
                                <li>
                                    <label class="flex items-center">
                                        <input name="myselection" type="radio" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Lightblue </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Orange </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Silver </span>
                                    </label>
                                </li>
                                <li>
                                    <label class="flex items-center">
                                        <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                        <span class="ml-2 text-base-content"> Darkblue </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </transition>

                    <div class="hidden md:block px-6 py-4 bg-base-300 rounded shadow-sm">
                        <h3 class="font-semibold mb-2">Category</h3>

                        <ul class="text-gray-500 space-y-1 h-48 overflow-auto">
                            <li>
                                <a href="/" class="hover:text-primary">All</a>
                            </li>
                            <li v-for="category in categories.sortBy()" :key="category.value">
                                <a :href="$router.resolve({ name: 'category', params: { slug: category.value } }).href" class="hover:text-primary" :class="{ 'font-semibold text-primary': category.value === filters.category }">{{ category.label }}</a>
                            </li>
                        </ul>

                        <hr class="my-4" />

                        <h3 class="font-semibold mb-2">Filter by</h3>
                        <ul class="space-y-1">
                            <li>
                                <label class="flex items-center">
                                    <input name="" type="checkbox" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Samsung </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="" type="checkbox" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Huawei </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Tesla model </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Best brand </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="" type="checkbox" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Other brands </span>
                                </label>
                            </li>
                        </ul>

                        <hr class="my-4" />

                        <h3 class="font-semibold mb-2">Sort by</h3>
                        <ul class="space-y-1">
                            <li>
                                <label class="flex items-center">
                                    <input name="myselection" type="radio" checked="" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Lightblue </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Orange </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Silver </span>
                                </label>
                            </li>
                            <li>
                                <label class="flex items-center">
                                    <input name="myselection" type="radio" class="h-4 w-4 checkbox checkbox-primary" />
                                    <span class="ml-2 text-base-content"> Darkblue </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <!-- filter wrap -->
                </aside>
                <!-- col.// -->
                <main class="md:w-2/3 lg:w-3/4 px-3">
                    <ProductItem v-for="product in products.products" :key="product.id" :product="product" />
                </main>
                <!-- col.// -->
            </div>
            <!-- grid.// -->
        </div>
        <!-- container .// -->
    </section>
    <!--  SECTION-CONTENT  //END -->
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
    overflow: hidden;
    max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>

<route lang="yaml">
name: category
path: /category/:slug
</route>
