<script setup>
import { computed, onMounted, ref } from 'vue';
import { formatPrice } from '@/composables/utils.js';
import { useCartStore } from '@/composables/cartStore.js';
import { useAuthStore } from '@/composables/authStore.js';
import DarkToggle from '@/components/site/DarkToggle.vue';

const showNavbar = ref(false);

const cartStore = useCartStore();
const userStore = useAuthStore();

onMounted(() => {
    userStore.checkSession();
});

const user = computed(() => {
    return userStore.userData;
});

const logout = () => {
    userStore.logout();
};
</script>

<template>
    <!--  COMPONENT: HEADER -->
    <header class="py-3 border-b border-base-200 bg-base-100">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="flex flex-wrap items-center">
                <!-- Brand -->
                <div class="flex-shrink-0 mr-5">
                    <router-link :to="{ name: 'home' }"> <img src="/images/logo.svg" height="38" alt="Brand" /> </router-link>
                </div>
                <!-- Brand .//end -->

                <!-- Search -->
                <div class="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4">
                    <input class="flex-grow input input-bordered rounded-md mr-2 py-2 px-3" type="text" placeholder="Search" />
                    <button type="button" class="btn btn-md btn-primary">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <!-- Search .//end -->

                <!-- Actions -->
                <div class="flex items-center space-x-2 ml-auto">
                    <dark-toggle />

                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-square btn-md">
                            <div class="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span class="badge badge-sm indicator-item">{{ cartStore.cartCount }}</span>
                            </div>
                        </label>
                        <div tabindex="0" class="bg-base-200 card card-compact dropdown-content md:w-80 mt-3 p-1 shadow w-64">
                            <div class="card-body">
                                <div class="max-h-40 overflow-y-auto space-y-3 px-3">
                                    <div v-if="cartStore.cartCount" class="flex items-center justify-between mb-1" v-for="item in cartStore.cartItems" :key="item.id">
                                        <div class="flex items-center justify-between gap-2">
                                            <img :src="item.thumbnail" class="w-6 h-6 rounded-md" />
                                            <a :href="$router.resolve({ name: 'product', params: { id: item.id } }).href">{{ item.title }}</a>
                                            <small>({{ item.quantity }})</small>
                                        </div>
                                        <div class="flex items-center justify-between gap-3">
                                            <span>{{ formatPrice(item.price) }}</span>
                                            <button @click="cartStore.removeFromCart(item)" class="text-error">
                                                <i class="fa fa-times font-thin"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div v-else class="text-center">
                                        <span class="text-gray-500">No items in cart</span>
                                    </div>
                                </div>
                                <div v-if="cartStore.cartCount" class="space-y-3">
                                    <div class="flex justify-end mt-2">
                                        <span class="text-lg font-bold">Total: {{ formatPrice(cartStore.cartTotalWithTaxDiscount) }}</span>
                                    </div>
                                    <div class="card-actions">
                                        <a :href="$router.resolve({ name: 'cart' }).href" class="btn btn-primary btn-block">View cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button v-if="!user" type="button" class="btn btn-md btn-ghost">
                        <router-link :to="{ name: 'login' }" class="ml-1">
                            <i class="ti ti-login lg:hidden inline text-xl"></i>
                            <span class="hidden lg:inline">Sign in</span>
                        </router-link>
                    </button>
                    <div v-else class="flex-none gap-2">
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-square">
                                <i class="ti ti-user fa-lg" />
                            </label>
                            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 space-y-1">
                                <li>
                                    <a :href="$router.resolve({ name: 'profile' }).href" class="justify-between"> Profile </a>
                                </li>
                                <li><button type="button" @click="userStore.logout">Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Actions .//end -->

                <!-- mobile-only -->
                <div class="lg:hidden ml-2">
                    <button @click="showNavbar = !showNavbar" type="button" class="btn btn-ghost btn-square btn-md">
                        <span class="sr-only">Open menu</span>
                        <i v-if="showNavbar" class="ti ti-x fa-lg"></i>
                        <i v-else class="fa fa-bars fa-lg"></i>
                    </button>
                </div>
                <!-- mobile-only //end  -->
            </div>
            <!-- flex grid //end -->
        </div>
        <!-- container //end -->
    </header>
    <nav class="border-b bg-base-300 border-base-200">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- Bottom -->
            <transition name="slide">
                <div v-show="showNavbar" class="flex flex-col lg:hidden items-center py-1">
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>Category</span> </a>
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>About</span> </a>
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>Services</span> </a>
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>Projects</span> </a>
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>Offers</span> </a>
                    <a class="btn btn-ghost btn-md btn-wide" href="#"> <span>Others</span> </a>
                </div>
            </transition>
            <!-- Bottom -->
            <div class="hidden lg:flex flex-1 items-center justify-center py-3">
                <a class="btn btn-ghost btn-sm" href="#"> Category </a>
                <a class="btn btn-ghost btn-sm" href="#"> About </a>
                <a class="btn btn-ghost btn-sm" href="#"> Services </a>
                <a class="btn btn-ghost btn-sm" href="#"> Projects </a>
                <a class="btn btn-ghost btn-sm" href="#"> Offers </a>
                <a class="btn btn-ghost btn-sm" href="#"> Others </a>
            </div>
            <!-- Bottom //end -->
        </div>
        <!-- container //end -->
    </nav>
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
