<script setup>
import { onMounted, ref } from 'vue';
import { NDataTable } from 'naive-ui';
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
    productStore.productList(30);
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
    }
];
</script>

<template>
    <h1 class="text-3xl flex items-center justify-center gap-3">
        <span>Products</span>
    </h1>

    <n-data-table striped ref="tableRef" class="overflow-x-auto" :columns="columns" :data="productStore.products" :pagination="{ pageSize: 5 }" :bordered="false" />
</template>

<style scoped></style>

<route lang="yaml">
name: products
</route>
