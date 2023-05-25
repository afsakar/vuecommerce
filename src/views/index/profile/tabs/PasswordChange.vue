<script setup>
import intus from 'intus';
import { ref, inject } from 'vue';
import { useAuthStore } from '@/composables/authStore';
import { isMin, isRequired, isSame } from 'intus/rules';
import { useNotificationStore } from '@/composables/notificationStore.js';

const userStore = useAuthStore();

const errors = ref(null);
const notificationStore = useNotificationStore();

const form = ref({
    password: null,
    password_confirm: null
});

function reset() {
    form.value.password = null;
    form.value.password_confirm = null;
    errors.value = null;
}

function submit() {
    const validation = intus.validate(
        form.value,
        {
            password: [isRequired(), isMin(8)],
            password_confirm: [isRequired(), isMin(8), isSame('password')]
        },
        {
            password: 'Password',
            password_confirm: 'Password confirmation'
        }
    );

    errors.value = validation.errors();

    if (validation.passes()) {
        userStore.updatePassword(form.value.password).then(() => {
            reset();
            notificationStore.notification = {
                message: 'Password changed successfully',
                type: 'success',
                show: true
            };
        });
    }
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-base-content">Password</h2>
                <p class="mt-1 text-sm leading-6">Use a strong password to keep your account secure.</p>

                <div class="mt-10 grid grid-cols-1 max-w-lg gap-4">
                    <div class="">
                        <label for="password" class="block text-sm font-medium leading-6 text-base-content">Password</label>
                        <div class="mt-2">
                            <input type="password" v-model="form.password" id="password" class="input w-full" />
                        </div>
                        <label class="label">
                            <span class="label-text-alt text-error">{{ errors?.password }}</span>
                        </label>
                    </div>

                    <div class="">
                        <label for="password_confirm" class="block text-sm font-medium leading-6 text-base-content">Password Confirm</label>
                        <div class="mt-2">
                            <input type="password" v-model="form.password_confirm" id="password_confirm" class="input w-full" />
                        </div>
                        <label class="label">
                            <span class="label-text-alt text-error">{{ errors?.password_confirm }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-2">
            <button type="button" class="btn btn-sm btn-secondary" @click="reset">Reset</button>
            <button type="submit" class="btn btn-sm btn-primary">Save</button>
        </div>
    </form>
</template>
