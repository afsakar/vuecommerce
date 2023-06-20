<script setup>
const props = defineProps({
    title: String,
    icon: String
});
</script>

<template>
    <div class="flex items-center justify-between gap-3 mb-5">
        <div class="flex items-center justify-start gap-3">
            <i v-if="props.icon" :class="`ti ti-${props.icon} text-2xl`"></i>
            <span v-if="props.title" class="text-2xl font-bold">{{ props.title }}</span>
        </div>
        <div>
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<style></style>
