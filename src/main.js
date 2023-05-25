import './style.css';
import App from './App.vue';
import { vMaska } from 'maska';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createORM } from 'pinia-orm';
import { createHead } from '@vueuse/head';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia().use(createORM()).use(piniaPluginPersistedstate);
const head = createHead();
const app = createApp(App);

app.directive('maska', vMaska).use(pinia).use(head).use(router).mount('#app');
/*
 eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkMzgyMjg2MDBlYzQwMzdkMzA0ZGU2NTA2MDFkZTA2NiIsImp0aSI6ImZhNWNjMzI3ZDQ4ZjBiYjU0NmUwMWFhNjAxOTNkMmU3M2M1MmU5MThiZmU4ZTA0YTUxMGQyN2U3ZTliYTczYTRmNTAxMDRkZmI1YzBmYTExN2QzY2FmNTVhZjcxOGRmY2E3YzZhMDQ4OWY5ZDc2OGJjZDk5N2Y0ZjBlNjdmMGY1YWJiODRjMmZkM2U4NjhlMTYwOTdiNjEyZmYyNTFlY2QiLCJpYXQiOjE2ODA5NzU2OTAsIm5iZiI6MTY4MDk3NTY5MCwiZXhwIjoxODM4NzYwNDUwLCJzdWIiOiI4Njg2NCIsInNjb3BlcyI6WyJvcmRlcnM6cmVhZCIsIm9yZGVyczp3cml0ZSIsInByb2R1Y3RzOnJlYWQiLCJwcm9kdWN0czp3cml0ZSIsInNoaXBwaW5nczpyZWFkIiwic2hpcHBpbmdzOndyaXRlIiwiZGlzY291bnRzOnJlYWQiLCJkaXNjb3VudHM6d3JpdGUiLCJwYXlvdXRzOnJlYWQiLCJyZWZ1bmRzOnJlYWQiLCJyZWZ1bmRzOndyaXRlIiwic2hvcDpyZWFkIiwic2hvcDp3cml0ZSJdfQ.FPAwtxX2LlWsv9plH8VPg-K34lScvECIdpjcR0SxqttLQRIdRiEs5pbYm7n76-E5yW0IvwBBkGNZdQV9AxjIdubom-ROK8M5yHmaFt-90ZhVlC4mzWVKUrbAZBNTwqAjmhL_FyGDjJit15Py5OeIHqrLq63V5SPSktO8GdPGahFif2za2A5I5oGaCpwtiMHWG4SwUlkPRw2XhEdRK98S51h8WrYOaRYPDl7z716coMglwsDvHNDVtreGEBro2y2RWLhHb-BUejgPSaWEZFiBll-nOXj8tZgGAnNSOY5MMgNjfCejSdjcG0kKiz7aSKa4g49EHw8gl6J2K0qsEE2-dQ
 */
