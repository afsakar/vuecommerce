<script setup>
import {onMounted, ref, h} from 'vue';
import {NDataTable, NButton} from 'naive-ui';
import {useCategoryStore} from '@/composables/categoryStore';

const categoryStore = useCategoryStore();
const tableRef = ref(null);

onMounted(() => {
  categoryStore.categoryList(100);
});

const columns = [
  {
    title: 'Title',
    key: 'label',
    width: 200,
    sorter: 'default',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'Value',
    key: 'value',
    width: 200,
    sorter: 'default',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'Action',
    key: 'actions',
    width: 100,
    render(row) {
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => alert(row.id)
          },
          {default: () => 'Get Title'}
      );
    }
  }
];
</script>

<template>
  <Header title="Categories" icon="tag">
    <template #actions>
      <button class="btn btn-primary btn-sm">Add New</button>
    </template>
  </Header>

  <n-data-table striped ref="tableRef" class="overflow-x-auto" :columns="columns" :data="categoryStore.categories"
                :pagination="{ pageSize: 5 }" :bordered="false"/>
</template>

<style scoped></style>

<route lang="yaml">
name: categories
</route>
