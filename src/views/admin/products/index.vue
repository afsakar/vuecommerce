<script setup>
import { onMounted, ref, h } from 'vue';
import { NDataTable, NButton } from 'naive-ui';
import products from '@/products.json';
import { db } from '@/plugins/firebase';
import { useProductStore } from '@/composables/productStore';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

const productStore = useProductStore();
const tableRef = ref(null);

function addNew() {
    products.products.forEach(async (product) => {
        const docRef = await setDoc(doc(db, 'products', `product-${product.id}`), {
            ...product,
            createdAt: new Date()
        });
        console.log('Document written with ID: ', docRef.id);
    });
}

onMounted(() => {
    productStore.productList(100);
    productStore.getSingleProduct(`product-${14}`);
});

const columns = [
    {
        title: 'ID',
        key: 'id',
        width: 100
    },
    {
        title: 'Title',
        key: 'title',
        width: 200,
        sorter: 'default',
        ellipsis: {
            tooltip: true
        }
    },
    {
        title: 'Price',
        key: 'price',
        width: 100,
        sorter: 'default'
    },
    {
        title: 'Category',
        key: 'category',
        width: 100
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
                    onClick: () => alert(row.title)
                },
                { default: () => 'Get Title' }
            );
        }
    }
];
</script>

<template>
    <Header title="Products" icon="home">
        <template #actions>
            <button class="btn btn-primary btn-sm">Add New</button>
        </template>
    </Header>

    <n-data-table striped ref="tableRef" class="overflow-x-auto" :columns="columns" :data="productStore.products" :pagination="{ pageSize: 5 }" :bordered="false" />
</template>

<style scoped></style>

<route lang="yaml">
name: products
</route>
