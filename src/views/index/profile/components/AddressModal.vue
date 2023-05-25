<script setup>
import intus from 'intus';
import { onMounted, inject, ref } from 'vue';
import { useAuthStore } from '@/composables/authStore.js';
import { isNumeric, isMin, isRequired } from 'intus/rules';
import { useAddressStore } from '@/composables/addressStore.js';
import { useNotificationStore } from '@/composables/notificationStore.js';

const userStore = useAuthStore();
const addressStore = useAddressStore();
const notificationStore = useNotificationStore();

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:showModal']);

onMounted(async () => {
    userStore.checkSession();
});

const form = ref({
    fullName: '',
    address: '',
    city: '',
    district: '',
    postCode: '',
    title: '',
    phone: '',
    user: userStore.user?.uid
});

const errors = ref(null);

function submit() {
    const validation = intus.validate(
        form.value,
        {
            fullName: [isRequired(), isMin(8)],
            address: [isRequired(), isMin(8)],
            city: [isRequired(), isMin(3)],
            district: [isRequired(), isMin(3)],
            postCode: [isRequired(), isNumeric()],
            title: [isRequired(), isMin(3)],
            phone: [isRequired(), isNumeric()]
        },
        {
            fullName: 'Full Name',
            address: 'Address',
            city: 'City',
            district: 'District',
            postCode: 'Post Code',
            title: 'Title',
            phone: 'Phone'
        }
    );

    errors.value = validation.errors();

    if (validation.passes()) {
        addressStore.addAddress(form.value);
        closeModal();
        notificationStore.notification = {
            message: 'Address created successfully',
            type: 'success',
            show: true
        };
    }
}

function closeModal() {
    emit('update:showModal', false);

    errors.value = null;
    form.value = {
        fullName: '',
        address: '',
        city: '',
        district: '',
        postCode: '',
        phone: '',
        title: '',
        user: userStore.user?.uid
    };
}
</script>

<template>
    <teleport to="body">
        <input v-model="props.showModal" type="checkbox" id="clear-modal" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="bg-base-200 border border-base-300 lg:p-5 lg:rounded-xl lg:max-w-lg modal-box">
                <h3 class="flex items-center justify-between font-bold text-lg">
                    <span>Add Address</span>
                    <label @click="closeModal" class="btn btn-ghost btn-sm">
                        <i class="fa fa-times"></i>
                    </label>
                </h3>
                <form @submit.prevent="submit">
                    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="col-span-full">
                            <label for="title" class="block text-sm font-medium leading-6 text-base-content">Title</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.title" id="title" class="input w-full" placeholder="Title" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.title }}</span>
                            </label>
                        </div>
                        <div class="">
                            <label for="fullName" class="block text-sm font-medium leading-6 text-base-content">Full name</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.fullName" id="fullName" class="input w-full" placeholder="Full name" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.fullName }}</span>
                            </label>
                        </div>
                        <div class="">
                            <label for="phone" class="block text-sm font-medium leading-6 text-base-content">Phone</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.phone" id="phone" class="input w-full" placeholder="Phone" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.phone }}</span>
                            </label>
                        </div>
                        <div class="col-span-full">
                            <label for="address" class="block text-sm font-medium leading-6 text-base-content">Address</label>
                            <div class="mt-2">
                                <textarea id="address" v-model="form.address" name="address" rows="3" class="textarea w-full" placeholder="Address"></textarea>
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.address }}</span>
                            </label>
                        </div>
                        <div class="">
                            <label for="city" class="block text-sm font-medium leading-6 text-base-content">City</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.city" id="city" class="input w-full" placeholder="City" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.city }}</span>
                            </label>
                        </div>
                        <div class="">
                            <label for="district" class="block text-sm font-medium leading-6 text-base-content">District</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.district" id="district" autocomplete="district" class="input w-full" placeholder="Country" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.district }}</span>
                            </label>
                        </div>
                        <div class="col-span-full">
                            <label for="postCode" class="block text-sm font-medium leading-6 text-base-content">Post Code</label>
                            <div class="mt-2">
                                <input type="text" v-model="form.postCode" id="postCode" autocomplete="postCode" class="input w-full" placeholder="Post Code" />
                            </div>
                            <label class="label">
                                <span class="label-text-alt text-error">{{ errors?.postCode }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="modal-action">
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </teleport>
</template>
