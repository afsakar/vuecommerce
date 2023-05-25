<script setup>
const props = defineProps({
    address: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <figure class="relative w-full flex items-center shadow-md border border-base-200 bg-gradient-to-tr from-base-200 to-base-300 p-4 rounded-md">
        <div class="mr-3">
            <span class="flex items-center justify-center text-warning bg-base-100 w-12 h-12 rounded-full shadow">
                <i class="fa fa-map-marker-alt"></i>
            </span>
        </div>
        <figcaption>
            <p>
                <span class="block font-semibold text-lg">
                    {{ props.address.fullName }}<small> ({{ props.address.title }})</small>
                </span>
                <span class="block">{{ props.address.address }}</span>
                <span class="block">{{ props.address.city }}, {{ props.address.country }} {{ props.address.postCode }}</span>
            </p>
        </figcaption>
    </figure>
</template>
