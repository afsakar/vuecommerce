<script setup>
  import { NButton, NResult } from "naive-ui";
  import { IconArrowLeft } from "@tabler/icons-vue";
</script>

<template>
  <n-result status="404" title="404 Not Found" description="You know life is always ridiculous.">
    <template #footer>
      <n-button type="default" @click="() => $router.back(-1)">
        <template #icon>
          <IconArrowLeft />
        </template>
        <span>Go back</span>
      </n-button>
    </template>
  </n-result>
</template>
