<script setup>
import intus from 'intus';
import Shopier from 'shopier-api';
import { useHead } from '@vueuse/head';
import isGuest from '@/middleware/isGuest.js';
import Modal from '@/views/index/components/Modal.vue';
import CreditCard from './components/CreditCard.vue';
import { useCartStore } from '@/composables/cartStore.js';
import { useAuthStore } from '@/composables/authStore.js';
import { useAddressStore } from '@/composables/addressStore.js';
import { formatPrice, reverseSlug } from '@/composables/utils.js';
import AddressModal from '../profile/components/AddressModal.vue';
import { onMounted, ref, computed, watch, provide, reactive } from 'vue';
import { useNotificationStore } from '@/composables/notificationStore.js';
import { isNumeric, isMin, isRequired, isRequiredIf, isBoolean, isAccepted, isMax } from 'intus/rules';

useHead({
    title: 'Checkout'
});

onMounted(() => {
    isGuest();
    addressStore.addressList();
});

const shopier = new Shopier(import.meta.env.SHOPIER_KEY, import.meta.env.SHOPIER_SECRET);

const showModal = ref(false);
const showAddressModal = ref(false);
const cartStore = useCartStore();
const userStore = useAuthStore();
const addressStore = useAddressStore();
const notificationStore = useNotificationStore();
const selectedAddress = ref(null);
const shippingAddress = ref(null);
const billingAddress = ref({
    fullName: '',
    address: '',
    city: '',
    district: '',
    phone: '',
    postCode: ''
});

const card = ref({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
});

const cardUnmasked = ref({
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
});

const form = ref({
    shippingAddress: {
        fullName: '',
        address: '',
        city: '',
        district: '',
        postCode: '',
        phone: ''
    },
    billingAddress: {
        fullName: '',
        address: '',
        city: '',
        district: '',
        postCode: '',
        phone: ''
    },
    card: {
        name: '',
        number: cardUnmasked.value.unmasked,
        expiryMonth: '',
        expiryYear: '',
        cvc: ''
    },
    user: userStore.user?.uid,
    termAndConditions: true,
    useDifferentAddress: false,
    information: ''
});

function changeAddress(e) {
    if (e.target.checked) {
        const address = addressStore.addresses.find((address) => address.id === e.target.value);
        shippingAddress.value = address;
        form.value.shippingAddress = {
            fullName: address.fullName,
            address: address.address,
            city: address.city,
            district: address.district,
            postCode: address.postCode,
            phone: address.phone
        };
    }
}

watch(
    form,
    (val) => {
        if (!val.useDifferentAddress) {
            form.value.billingAddress = form.value.shippingAddress;
        } else {
            form.value.billingAddress = {
                fullName: '',
                address: '',
                city: '',
                district: '',
                postCode: ''
            };
        }
    },
    { deep: true }
);

const paymentPage = ref(null);
const errors = ref(null);
function submit() {
    intus.messages = {
        isRequiredIf: ':attribute field is required when "Use different address for billing" is checked.'
    };
    const validation = intus.validate(
        form.value,
        {
            useDifferentAddress: [isBoolean()],
            'shippingAddress.fullName': [isRequired(), isMin(8)],
            'shippingAddress.address': [isRequired(), isMin(8)],
            'shippingAddress.city': [isRequired(), isMin(3)],
            'shippingAddress.district': [isRequired(), isMin(3)],
            'shippingAddress.postCode': [isRequired(), isNumeric()],
            'shippingAddress.phone': [isRequired(), isNumeric()],
            'billingAddress.fullName': [isRequiredIf('useDifferentAddress', true), isMin(8)],
            'billingAddress.address': [isRequiredIf('useDifferentAddress', true), isMin(8)],
            'billingAddress.city': [isRequiredIf('useDifferentAddress', true), isMin(3)],
            'billingAddress.district': [isRequiredIf('useDifferentAddress', true), isMin(3)],
            'billingAddress.postCode': [isRequiredIf('useDifferentAddress', true), isNumeric()],
            'billingAddress.phone': [isRequiredIf('useDifferentAddress', true), isNumeric()],
            'card.name': [isRequired(), isMin(8)],
            'card.number': [isRequired(), isMax(19), isMin(19)],
            'card.expiryMonth': [isRequired(), isMax(2), isMin(2)],
            'card.expiryYear': [isRequired(), isMax(2), isMin(2)],
            'card.cvc': [isRequired(), isMax(3), isMin(3)],
            termAndConditions: [isAccepted()]
        },
        {
            useDifferentAddress: 'Use same address',
            shippingAddress: {
                fullName: 'Full name',
                address: 'Address',
                city: 'City',
                district: 'District',
                postCode: 'Post Code',
                phone: 'Phone'
            },
            billingAddress: {
                fullName: 'Full name',
                address: 'Address',
                city: 'City',
                district: 'District',
                postCode: 'Post Code',
                phone: 'Phone'
            },
            card: {
                name: 'Name on card',
                number: 'Card number',
                expiryMonth: 'Expiry month',
                expiryYear: 'Expiry year',
                cvc: 'CVC'
            },
            termAndConditions: 'Term and Conditions'
        }
    );

    const order = ref({
        shippingAddress: form.value.shippingAddress,
        billingAddress: form.value.billingAddress,
        card: form.value.card,
        cart: cartStore.cartItems,
        subTotal: cartStore.cartTotalWithTaxDiscount
    });

    errors.value = validation.errors();

    if (validation.passes()) {
        form.value.card.number = cardUnmasked.value.unmasked;

        const fullName = form.value.shippingAddress.fullName;

        const firstName = fullName.slice(0, fullName.lastIndexOf(' '));
        const lastName = fullName.split(' ').at(-1);

        shopier.setBuyer({
            id: Math.floor(Math.random() * 1000000000) + 1,
            product_name: 'Ornek Siparis',
            first_name: firstName,
            last_name: lastName,
            email: userStore.user?.email,
            phone: form.value.shippingAddress.phone
        });

        shopier.setOrderBilling({
            billing_address: form.value.billingAddress.address + ' ' + form.value.billingAddress.district,
            billing_city: form.value.billingAddress.city,
            billing_country: 'Türkiye',
            billing_postcode: form.value.billingAddress.postCode
        });

        shopier.setOrderShipping({
            shipping_address: form.value.shippingAddress.address + ' ' + form.value.shippingAddress.district,
            shipping_city: form.value.shippingAddress.city,
            shipping_country: 'Türkiye',
            shipping_postcode: form.value.shippingAddress.postCode
        });

        showModal.value = true;
        const payment = shopier.payment(1);
        paymentPage.value = payment;
        localStorage.setItem('order', JSON.stringify({ ...order.value, paymentPage: paymentPage.value }));

        console.log({
            id: Math.floor(Math.random() * 1000000000) + 1,
            product_name: 'Ornek Siparis',
            first_name: firstName,
            last_name: lastName,
            email: userStore.user?.email,
            phone: form.value.shippingAddress.phone
        });

        notificationStore.notification = {
            type: 'success',
            message: 'Order created successfully',
            show: true
        };
    }
}
</script>

<template>
    <!--  PAGE HEADER -->
    <section class="bg-base-200 py-4">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- breadcrumbs start -->
            <h2 class="text-4xl">Checkout</h2>
            <ol class="inline-flex flex-wrap space-x-1 md:space-x-3 items-center">
                <li class="inline-flex items-center">
                    <a class="hover:text-primary" href="#">Home</a>
                    <i class="ml-3 text-gray-400 fa fa-chevron-right"></i>
                </li>
                <li class="inline-flex items-center">Checkout</li>
            </ol>
            <!-- breadcrumbs end -->
        </div>
        <!-- container .// -->
    </section>
    <!--  PAGE HEADER .//END  -->

    <section class="py-10">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="alert bg-blue-200 text-blue-700 mb-4 rounded-lg">
                <div>We are using Shopier payment, you can order safely 🙂 <a href="https://www.shopier.com/" class="link" target="_blank">Learn more</a></div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 lg:gap-8">
                <main class="md:w-2/3">
                    <article class="bg-base-200 shadow-sm rounded-md p-4 lg:p-6 mb-5">
                        <div class="flex items-center justify-between mb-5">
                            <h2 class="text-xl font-semibold">Shipping information</h2>
                            <button class="btn btn-ghost btn-sm" @click="showAddressModal = true"><i class="ti ti-plus mr-2"></i> Add new address</button>
                        </div>

                        <form @submit.prevent="submit">
                            <div>
                                <!-- radio selection -->
                                <div class="grid sm:grid-cols-2 gap-3 mb-6">
                                    <label v-for="address in addressStore.addresses" :key="address.id" :for="address.id" class="relative">
                                        <input :id="address.id" v-model="selectedAddress" :value="address.id" type="radio" class="hidden peer" @change="changeAddress($event)" />
                                        <figure class="flex p-3 border border-base-300 bg-base-300 rounded-md cursor-pointer" :class="{ 'bg-primary/5 border-primary': address.id === selectedAddress }">
                                            <figcaption>
                                                <p>
                                                    <span class="block font-semibold text-lg">
                                                        {{ address.fullName }}<small> ({{ address.title }})</small>
                                                    </span>
                                                    <span class="block">{{ address.phone }}</span>
                                                    <span class="block">{{ address.address }}</span>
                                                    <span class="block">{{ address.city }}, {{ address.district }} {{ address.postCode }}</span>
                                                </p>
                                            </figcaption>
                                        </figure>
                                        <i class="ti ti-check peer absolute top-3 right-3 text-primary" :class="{ block: address.id === selectedAddress, hidden: address.id !== selectedAddress }"></i>
                                    </label>
                                    <label class="label">
                                        <span class="label-text-alt text-error">{{ errors ? (errors['shippingAddress.fullName'] ? 'Please select an address' : '') : '' }}</span>
                                    </label>
                                </div>
                                <!-- radio selection .//end -->

                                <label class="flex items-center w-max my-4">
                                    <input v-model="form.useDifferentAddress" type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                                    <span class="ml-2 inline-block">
                                        <p class="text-sm">Use different address for billing</p>
                                    </span>
                                </label>

                                <div v-show="form.useDifferentAddress">
                                    <hr class="border border-base-300 my-3" />
                                    <h2 class="text-xl font-semibold mb-5">Billing information</h2>
                                    <div>
                                        <div class="grid md:grid-cols-1">
                                            <div class="grid md:grid-cols-2 gap-x-3">
                                                <div class="mb-4 md:col-span-1">
                                                    <label class="block mb-1"> Full Name </label>
                                                    <input type="text" v-model="form.billingAddress.fullName" id="fullName" class="input w-full" placeholder="Full Name" />
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.fullName'] : '' }}</span>
                                                    </label>
                                                </div>
                                                <div class="mb-4 md:col-span-1">
                                                    <label class="block mb-1"> Phone </label>
                                                    <input type="text" v-model="form.billingAddress.phone" id="phone" class="input w-full" placeholder="Phone" />
                                                    <label class="label">
                                                        <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.phone'] : '' }}</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="mb-4 md:col-span-2">
                                                <label class="block mb-1"> Address </label>
                                                <textarea id="address" v-model="form.billingAddress.address" name="address" rows="3" class="textarea w-full" placeholder="Address"></textarea>
                                                <label class="label">
                                                    <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.address'] : '' }}</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div class="grid md:grid-cols-3 gap-x-3">
                                            <div class="mb-4 md:col-span-1">
                                                <label class="block mb-1"> City </label>
                                                <input type="text" v-model="form.billingAddress.city" id="city" class="input w-full" placeholder="City" />
                                                <label class="label">
                                                    <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.city'] : '' }}</span>
                                                </label>
                                            </div>

                                            <div class="mb-4 md:col-span-1">
                                                <label class="block mb-1"> District </label>
                                                <input type="text" v-model="form.billingAddress.district" id="district" autocomplete="district" class="input w-full" placeholder="Country" />
                                                <label class="label">
                                                    <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.district'] : '' }}</span>
                                                </label>
                                            </div>

                                            <div class="mb-4 md:col-span-1">
                                                <label class="block mb-1"> Post code </label>
                                                <input type="text" v-model="form.billingAddress.postCode" id="postCode" autocomplete="postCode" class="input w-full" placeholder="Post Code" />
                                                <label class="label">
                                                    <span class="label-text-alt text-error">{{ errors ? errors['billingAddress.postCode'] : '' }}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="border border-base-300 my-3" />

                            <div class="gap-4 grid grid-cols-1 md:grid-cols-2 align-middle mb-4">
                                <div class="w-full">
                                    <div class="grid md:grid-cols-1">
                                        <div class="mb-4 md:col-span-1">
                                            <input type="text" v-model="form.card.name" id="fullName" class="input w-full" placeholder="Card Owner" :class="{ 'input-error': errors && errors['card.name'] }" />
                                            <label class="label">
                                                <span class="label-text-alt text-error">{{ errors ? errors['card.name'] : '' }}</span>
                                            </label>
                                        </div>
                                        <div class="mb-4 md:col-span-1">
                                            <input
                                                type="text"
                                                v-maska="cardUnmasked"
                                                data-maska="#### #### #### ####"
                                                v-model="form.card.number"
                                                id="fullName"
                                                class="input w-full"
                                                placeholder="**** **** **** ****"
                                                :class="{ 'input-error': errors && errors['card.number'] }"
                                            />
                                        </div>
                                        <div class="mb-4 flex items-center justify-between gap-3">
                                            <input type="text" v-maska data-maska="##" v-model="form.card.expiryMonth" id="fullName" class="input w-full" placeholder="Month" :class="{ 'input-error': errors && errors['card.expiryMonth'] }" />
                                            <input type="text" v-maska data-maska="##" v-model="form.card.expiryYear" id="fullName" class="input w-full" placeholder="Year" :class="{ 'input-error': errors && errors['card.expiryYear'] }" />
                                        </div>
                                        <div class="mb-4 md:col-span-1">
                                            <input type="text" v-maska data-maska="###" v-model="form.card.cvc" id="fullName" class="input w-full" placeholder="CVC" :class="{ 'input-error': errors && errors['card.cvc'] }" />
                                        </div>
                                    </div>
                                </div>
                                <credit-card :card="form.card" />
                            </div>

                            <hr class="border border-base-300 my-3" />

                            <div>
                                <div class="mb-4">
                                    <textarea v-model="form.information" rows="1" class="textarea w-full" placeholder="Type your wishes"></textarea>
                                </div>
                                <label class="flex items-center w-max">
                                    <input v-model="form.termAndConditions" type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                                    <span class="ml-2 inline-block"> I agree with Terms and Conditions </span>
                                </label>
                                <label class="label">
                                    <span class="label-text-alt text-error">{{ errors?.termAndConditions }}</span>
                                </label>
                            </div>

                            <div class="flex justify-end space-x-2">
                                <a :href="$router.resolve({ name: 'cart' }).href" class="btn btn-secondary"> Back </a>
                                <button type="submit" class="btn btn-primary">Continue</button>
                            </div>
                        </form>
                    </article>
                    <!-- card.// -->
                </main>
                <aside class="md:w-1/3 w-full">
                    <article class="bg-base-200 p-3 rounded-lg">
                        <h2 class="text-lg font-semibold mb-3">Summary</h2>
                        <ul>
                            <li class="flex justify-between text-base-content mb-1">
                                <span>Total price:</span>
                                <span>{{ formatPrice(cartStore.cartTotal) }}</span>
                            </li>
                            <li class="flex justify-between text-base-content mb-1">
                                <span>TAX:</span>
                                <span>{{ formatPrice(cartStore.cartTotalTax) }}</span>
                            </li>
                            <li class="flex justify-between text-base-content mb-1">
                                <span>Discount:</span>
                                <span class="text-green-500">- {{ formatPrice(cartStore.cartTotalDiscount) }}</span>
                            </li>
                            <li class="text-lg font-bold border-t border-base-300 flex justify-between mt-3 pt-3">
                                <span>Cart total:</span>
                                <span>{{ formatPrice(cartStore.cartTotalWithTaxDiscount) }}</span>
                            </li>
                        </ul>

                        <hr class="my-4 border-base-300" />

                        <div class="flex gap-3">
                            <input class="input appearance-none input-bordered border rounded-md py-2 px-3 w-full" type="text" placeholder="Coupon code" />
                            <button type="button" class="btn btn-primary">Apply</button>
                        </div>

                        <hr class="my-4 border-base-300" />

                        <h2 class="text-lg font-semibold mb-3">Items in cart</h2>

                        <div class="max-h-96 overflow-y-auto space-y-3">
                            <figure class="flex items-center mb-4 leading-5" v-for="item in cartStore.cartItems" :key="item.id">
                                <div>
                                    <div class="relative">
                                        <a :href="$router.resolve({ name: 'product', params: { id: item.id } }).href" class="block w-16 h-16 rounded border border-base-300 overflow-hidden">
                                            <img :src="item.thumbnail" :alt="item.title" class="object-cover inline-block w-auto h-20" />
                                        </a>
                                        <span class="absolute -top-0 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center bg-secondary text-secondary-content rounded-full">
                                            {{ item.quantity }}
                                        </span>
                                    </div>
                                </div>
                                <figcaption class="ml-3">
                                    <p>
                                        <a :href="$router.resolve({ name: 'product', params: { id: item.id } }).href" class="text-base-content hover:text-primary font-semibold">{{ item.title }}</a>
                                        <small class="block">{{ reverseSlug(item.category) }}</small>
                                    </p>
                                    <p class="mt-1 text-base-content">Total: {{ formatPrice(item.price * item.quantity) }}</p>
                                </figcaption>
                            </figure>
                        </div>
                    </article>
                </aside>
                <!-- col.// -->
            </div>

            <!-- grid.// -->
        </div>
        <!-- container.// -->
    </section>
    <AddressModal v-model:showModal="showAddressModal" />
    <Modal v-model:show="showModal">
        <template #body>
            <iframe :src="paymentPage" class="w-full h-full" />
        </template>
    </Modal>
</template>

<route lang="yaml">
name: checkout
</route>
