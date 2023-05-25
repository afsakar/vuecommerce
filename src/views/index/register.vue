<script setup>
import { onMounted, ref } from 'vue';
import intus from 'intus';
import { useAuthStore } from '@/composables/authStore.js';
import { isNumeric, isMin, isRequired, isEmail, isMax, isSame } from 'intus/rules';

const userStore = useAuthStore();

const form = ref({
    displayName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
});

const errors = ref(null);

function submit() {
    const validation = intus.validate(
        form.value,
        {
            displayName: [isRequired(), isMin(8)],
            email: [isRequired(), isEmail()],
            phone: [isRequired(), isMin(10), isNumeric(), isMax(10)],
            password: [isRequired(), isMin(8)],
            passwordConfirm: [isRequired(), isMin(8), isSame('password')]
        },
        {
            displayName: 'Full name',
            email: 'Email',
            phone: 'Phone',
            password: 'Password',
            passwordConfirm: 'Password confirmation'
        }
    );

    errors.value = { ...validation.errors(), ...userStore.error };

    if (validation.passes()) {
        userStore.register(form.value);
    }
}
</script>

<template>
    <!--  COMPONENT: SIGN IN -->
    <div class="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-base-200 shadow-lg lg:max-w-md max-w-sm">
        <form @submit.prevent="submit">
            <h2 class="mb-5 text-2xl font-semibold">Sign up</h2>

            <div class="mb-4">
                <label class="block mb-1"> Full name </label>
                <input v-model="form.displayName" class="border input input-bordered w-full rounded-md" type="text" placeholder="Full name" />
                <label class="label">
                    <span class="label-text-alt text-error">{{ errors?.displayName }}</span>
                </label>
            </div>
            <!-- grid -->

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-4">
                    <label class="block mb-1"> Phone </label>
                    <input v-model="form.phone" class="border input input-bordered w-full rounded-md" type="text" placeholder="Phone" />
                    <label class="label">
                        <span class="label-text-alt text-error">{{ errors?.phone }}</span>
                    </label>
                </div>

                <div class="mb-4">
                    <label class="block mb-1"> Email </label>
                    <input v-model="form.email" class="border input input-bordered w-full rounded-md" type="text" placeholder="Email" />
                    <label class="label">
                        <span class="label-text-alt text-error">{{ errors?.email }}</span>
                    </label>
                </div>
            </div>

            <div class="mb-4">
                <label class="block mb-1"> Password </label>
                <input v-model="form.password" class="border input input-bordered w-full rounded-md" type="password" placeholder="Password" />
                <label class="label">
                    <span class="label-text-alt text-error">{{ errors?.password }}</span>
                </label>
            </div>

            <div class="mb-4">
                <label class="block mb-1"> Password Confirmation </label>
                <input v-model="form.passwordConfirm" class="border input input-bordered w-full rounded-md" type="password" placeholder="Password Confirmation" />
                <label class="label">
                    <span class="label-text-alt text-error">{{ errors?.passwordConfirm }}</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary w-full">Register</button>

            <label class="flex items-center w-max my-4">
                <input checked name="" type="checkbox" class="checkbox checkbox-primary" />
                <span class="ml-2 inline-block"> I agree with Terms and Conditions </span>
            </label>

            <hr />

            <p class="text-center mt-5">Already have an account? <router-link :to="{ name: 'login' }" class="text-primary">Sign in</router-link></p>
        </form>
    </div>
    <!--  COMPONENT: SIGN IN //END -->
</template>

<route lang="yaml">
name: register
</route>
