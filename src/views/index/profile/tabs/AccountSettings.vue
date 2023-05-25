<script setup>
import intus from 'intus';
import { computed, onMounted, ref, inject } from 'vue';
import { useAuthStore } from '@/composables/authStore.js';
import { isNumeric, isMin, isRequired, isEmail } from 'intus/rules';
import { useNotificationStore } from '@/composables/notificationStore.js';

const notificationStore = useNotificationStore();
const user = computed(() => JSON.parse(localStorage.getItem('authStore')));

onMounted(() => {
    userStore.checkSession();
});

const userStore = useAuthStore();

const form = ref({
    displayName: user.value.userData.displayName || null,
    email: user.value.userData.email,
    phone: user.value.userData.phone || null
});

const errors = ref(null);

function submit() {
    const validation = intus.validate(
        form.value,
        {
            displayName: [isRequired(), isMin(3)],
            email: [isRequired(), isEmail()],
            phone: [isRequired(), isNumeric()]
        },
        {
            displayName: 'Display Name',
            email: 'Email',
            phone: 'Phone'
        }
    );

    errors.value = validation.errors();

    if (validation.passes()) {
        userStore.updateAccount(form.value).then(() => {
            if (userStore.error) {
                errors.value = { ...userStore.error };
            } else {
                notificationStore.notification = {
                    message: 'Profile updated successfully',
                    type: 'success',
                    show: true
                };
            }
        });
    }
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-base-content">Profile</h2>
                <p class="mt-1 text-sm leading-6">This information will be displayed publicly so be careful what you share.</p>

                <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="">
                        <label for="email" class="block text-sm font-medium leading-6 text-base-content">Email address</label>
                        <div class="mt-2">
                            <input type="text" v-model="user.userData.email" id="email" class="input w-full" placeholder="Email address" readonly />
                        </div>
                        <label class="label">
                            <span class="label-text-alt text-error">{{ errors?.email }}</span>
                        </label>
                    </div>

                    <div class="">
                        <label for="displayName" class="block text-sm font-medium leading-6 text-base-content">Display name</label>
                        <div class="mt-2">
                            <input type="text" v-model="form.displayName" id="displayName" autocomplete="displayName" class="input w-full" placeholder="Display name" />
                        </div>
                        <label class="label">
                            <span class="label-text-alt text-error">{{ errors?.displayName }}</span>
                        </label>
                    </div>
                    <div class="">
                        <label for="phone" class="block text-sm font-medium leading-6 text-base-content">Phone</label>
                        <div class="mt-2">
                            <input type="text" v-model="form.phone" id="phone" autocomplete="phone" class="input w-full" placeholder="Phone" />
                        </div>
                        <label class="label">
                            <span class="label-text-alt text-error">{{ errors?.phone }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-2">
            <button type="submit" class="btn btn-sm btn-primary">Save</button>
        </div>
    </form>
</template>
