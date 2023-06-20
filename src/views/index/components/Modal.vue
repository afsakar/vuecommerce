<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:show']);

function closeModal() {
    emit('update:show', false);
}
</script>

<template>
    <teleport to="body">
        <input v-model="props.show" type="checkbox" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
            <div class="bg-base-100 lg:p-5 lg:rounded-xl lg:max-w-sm modal-box">
                <h3 class="flex items-center justify-between font-bold text-lg">
                    <slot name="header" />
                    <label @click="closeModal" class="btn btn-ghost btn-sm">
                        <i class="fa fa-times"></i>
                    </label>
                </h3>
                <slot name="body" />

                <div class="modal-action">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </teleport>
</template>
