<script setup>
import { computed, ref } from 'vue';
import Toast from '@/components/site/Toast.vue';
import DarkToggle from '@/components/site/DarkToggle.vue';
import ScrollTop from '@/components/site/ScrollTop.vue';
import Navbar from '@/components/site/Navbar.vue';
import { useAuthStore } from '@/composables/authStore.js';
import { useNotificationStore } from '@/composables/notificationStore.js';

const notificationStore = useNotificationStore();

const userStore = useAuthStore();

const showNavbar = ref(false);

const sendEmailVerification = () => {
    try {
        userStore.sendEmailVerification();
        notificationStore.notification = {
            message: 'Email sent successfully, please check your inbox and spam folder.',
            type: 'success',
            show: true
        };
    } catch (error) {
        notificationStore.notification = {
            message: error.message,
            type: 'error',
            show: true
        };
    }
};
</script>

<template>
    <div v-show="userStore.userData && !userStore.userData.emailVerified" class="fixed bottom-0 right-0 z-50 w-full bg-warning/90 text-warning-content h-14 flex items-center justify-center">
        <span>Please verify your email.</span>
        <button @click="sendEmailVerification" class="btn btn-sm btn-ghost btn-warning/90 ml-2">Resend email</button>
    </div>
    <navbar />

    <router-view />

    <toast />

    <!-- SECTION-NEWSLETTER -->
    <section class="bg-base-200 border-t border-base-300 py-6 text-base-content">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="flex items-center flex-col lg:flex-row space-y-7 lg:space-y-0">
                <!-- heading info start -->
                <div class="flex items-center mr-10">
                    <div class="flex mr-5 items-center justify-center rounded w-11 h-11 bg-base-100 shadow-sm">
                        <i class="fa fa-envelope fa-lg text-primary"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-lg">Subscribe</p>
                        <p class="text-sm text-gray-600">Get notified on offers</p>
                    </div>
                </div>
                <!-- heading info end -->

                <!-- email start-->
                <form class="flex w-80 relative">
                    <input type="text" placeholder="username@site.com" class="input input-bordered w-full pr-16" />
                    <button class="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                </form>
                <!-- email end-->

                <!-- socials start -->
                <nav class="flex lg:ml-auto space-x-2">
                    <a class="btn btn-square btn-primary btn-md" href="#">
                        <span class="sr-only">YouTube</span>
                        <i class="fab fa-youtube"></i>
                    </a>
                    <a class="btn btn-square btn-primary btn-md" href="#">
                        <span class="sr-only">Facebook</span>
                        <i class="fab fa-facebook-square"></i>
                    </a>
                    <a class="btn btn-square btn-primary btn-md" href="#">
                        <span class="sr-only">Twitter</span>
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="btn btn-square btn-primary btn-md" href="#">
                        <span class="sr-only">Instagram</span>
                        <i class="fab fa-instagram"></i>
                    </a>
                </nav>
                <!-- socials end -->
            </div>
        </div>
        <!-- container .// -->
    </section>
    <!-- SECTION-NEWSLETTER //END -->

    <scroll-top />

    <footer class="bg-primary">
        <!-- section footer top -->

        <section class="py-10 text-white">
            <div class="container max-w-screen-xl mx-auto px-4">
                <div class="flex flex-wrap">
                    <aside class="w-full md:w-1/3 lg:w-1/4 mb-5">
                        <img src="/images/logo-white.png" height="38" alt="Company name" />
                        <p class="my-4">
                            Company name. <br />
                            © 2018- 2021 Templatemount. <br />
                            All rights reserved.
                        </p>
                    </aside>
                    <!-- col .// -->
                    <aside class="w-1/2 sm:w-auto flex-auto mb-5">
                        <h3 class="font-semibold">Store</h3>
                        <ul class="mt-2 space-y-1">
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Join us </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Find store </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Categories </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Partnership </a>
                            </li>
                        </ul>
                    </aside>
                    <!-- col .// -->
                    <aside class="w-1/2 sm:w-auto flex-auto mb-5">
                        <h3 class="font-semibold">About</h3>
                        <ul class="mt-2 space-y-1">
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> About us </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Our history </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Our team </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Offices </a>
                            </li>
                        </ul>
                    </aside>
                    <!-- col .// -->
                    <aside class="w-1/2 sm:w-auto flex-auto mb-5">
                        <h3 class="font-semibold">Help</h3>
                        <ul class="mt-2 space-y-1">
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Contact us </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Submit ticket </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> FAQs </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Refunds </a>
                            </li>
                        </ul>
                    </aside>
                    <!-- col .// -->
                    <aside class="w-1/2 sm:w-auto flex-auto mb-5">
                        <h3 class="font-semibold">Links</h3>
                        <ul class="mt-2 space-y-1">
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Our terms </a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Privacy setting</a>
                            </li>
                            <li>
                                <a href="#" class="opacity-70 hover:opacity-100"> Sign up </a>
                            </li>
                        </ul>
                    </aside>
                    <!-- col .// -->
                    <aside class="w-1/2 sm:w-auto lg:w-40 mb-5">
                        <h3 class="font-semibold">Apps</h3>
                        <a href="#" class="mt-3 inline-block">
                            <img class="h-10" src="/images/misc/btn-appstore.png" height="38" />
                        </a>
                        <a href="#" class="inline-block">
                            <img class="h-10" src="/images/misc/btn-market.png" height="38" />
                        </a>
                    </aside>
                    <!-- col .// -->
                </div>
                <!-- grid .// -->
            </div>
            <!-- container .// -->
        </section>
        <!-- section footer top end -->

        <!-- section footer bottom  -->
        <section class="py-6 bg-primary">
            <div class="container max-w-screen-xl mx-auto px-4">
                <div class="lg:flex justify-between">
                    <div class="mb-3">
                        <img src="/images/misc/payments.png" height="24" class="h-6" alt="Payment methods" />
                    </div>
                    <!-- col .// -->
                    <div class="space-x-6">
                        <nav class="text-sm space-x-4">
                            <a href="#" class="opacity-70 hover:opacity-100"> Support </a>
                            <a href="#" class="opacity-70 hover:opacity-100"> Privacy &amp; Cookies </a>
                            <a href="#" class="opacity-70 hover:opacity-100"> Accessibility </a>
                        </nav>
                    </div>
                    <!-- col .// -->
                </div>
                <!-- grid .// -->
            </div>
            <!-- container .// -->
        </section>
        <!-- section footer bottom  end -->
    </footer>
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
