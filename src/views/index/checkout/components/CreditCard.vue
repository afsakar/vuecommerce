<script setup>
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="h-56 relative rounded-xl shadow-2xl text-white w-full bg-gradient-to-tr from-slate-700 to-slate-500">
        <div class="w-full px-8 absolute top-8">
            <div class="flex justify-between">
                <div class="">
                    <h1 class="font-light">Name</h1>
                    <p class="font-medium tracking-widest uppercase" v-text="card.name ? card.name : 'Card Owner'"></p>
                </div>
                <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
            </div>
            <div class="pt-1">
                <h1 class="font-light">Card Number</h1>
                <p class="font-medium tracking-more-wider" v-text="card.number ? card.number : '**** **** **** ****'"></p>
            </div>
            <div class="pt-6 pr-6">
                <div class="flex justify-between">
                    <div class="">
                        <h1 class="font-light text-xs">Valid</h1>
                        <div class="flex items-center justify-center">
                            <p class="font-medium tracking-wider text-sm" v-text="card.expiryMonth ? card.expiryMonth : '**'"></p>
                            <span>/</span>
                            <p class="font-medium tracking-wider text-sm" v-text="card.expiryYear ? card.expiryYear : '**'"></p>
                        </div>
                    </div>

                    <div class="">
                        <h1 class="font-light text-xs">CVC</h1>
                        <p class="font-medium tracking-wider text-sm" v-text="card.cvc ? card.cvc : '***'"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
