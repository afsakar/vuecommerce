<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    category: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <a :href="$router.resolve({ name: 'category', params: { slug: props.category.value } }).href" class="group">
        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 group-hover:bg-blue-200">
            <!--<img width="32" height="32" :src="`images/icons/category-svg-blue/${props.category}.svg`" />-->
            <i class="text-2xl text-blue-600" :class="props.category.icon"></i>
        </div>
        <p class="text-center group-hover:text-blue-600 capitalize">{{ props.category.label }}</p>
    </a>
</template>
