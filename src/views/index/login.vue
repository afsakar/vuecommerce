<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/composables/authStore.js';
import { useRouter } from 'vue-router';
import isLogin from '@/middleware/isLogin.js';

const router = useRouter();
const userStore = useAuthStore();

const form = ref({
    email: '',
    password: ''
});

const login = () => {
    userStore.login(form.value.email, form.value.password);
};

onMounted(async () => {
    isLogin();
});
</script>

<template>
    <!--  COMPONENT: SIGN IN -->
    <div class="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-base-200 shadow-lg lg:max-w-md max-w-sm">
        <form @submit.prevent="login">
            <h2 class="mb-5 text-2xl font-semibold">Sign in</h2>

            <div class="mb-4">
                <label class="block mb-1"> Email </label>
                <input v-model="form.email" class="appearance-none border input input-bordered w-full rounded-md" type="text" placeholder="Type here" />
            </div>

            <div class="mb-4">
                <label class="block mb-1"> Password </label>
                <input v-model="form.password" class="appearance-none border input input-bordered w-full rounded-md" type="password" placeholder="Type here" />
            </div>

            <label class="flex items-center w-max mb-5">
                <input checked name="" type="checkbox" class="checkbox checkbox-primary" />
                <span class="ml-2 inline-block"> Remember me </span>
            </label>

            <button type="submit" class="btn btn-primary w-full" href="#">Sign in</button>

            <!-- Inline style for decoration -->
            <div class="text-center my-2">
                <span class="px-3">or</span>
            </div>

            <div class="space-y-3">
                <a href="#" class="btn bg-base-100 w-full border-0">
                    <img src="images/icons/social/google.svg" class="mr-3" width="20" height="20" />
                    <span>Continue with Google</span>
                </a>

                <a href="#" class="btn bg-base-100 w-full border-0">
                    <img src="images/icons/social/facebook.svg" class="mr-3" width="20" height="20" />
                    <span>Continue with Facebook</span>
                </a>
            </div>

            <p class="text-center mt-5">Don’t have an account? <router-link :to="{ name: 'register' }" class="text-primary">Sign up</router-link></p>
        </form>
    </div>
    <!--  COMPONENT: SIGN IN //END -->
</template>

<route lang="yaml">
name: login
</route>
