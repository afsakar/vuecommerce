import { defineStore } from 'pinia';
import { db } from '@/plugins/firebase';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    getDocs,
    query,
    where,
    addDoc,
    onSnapshot,
    deleteDoc,
    limit,
    updateDoc
} from 'firebase/firestore';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        product: null,
        products: [],
        errors: null,
        loading: false
    }),
    getters: {
        getProduct() {
            return this.product || null;
        },
        getProductList() {
            return this.products || null;
        }
    },
    actions: {
        async productList(productLimit = 20) {
            try {
                const querySnapshot = await getDocs(query(collection(db, 'products'), limit(productLimit)));
                if (this.products.length > 0) {
                    return;
                } else {
                    querySnapshot.forEach((doc) => {
                        this.products.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getSingleProduct(id) {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.product = { ...docSnap.data(), id: docSnap.id };
                } else {
                    console.log('No such document!');
                }
            } catch (e) {
                console.log(e);
            }
        },
        async addProduct(product) {
            try {
                const random = Math.floor(Math.random() * 100000);
                const docRef = setDoc(doc(db, 'products', `${random}`), { ...product, createdAt: new Date() });
                console.log('Document written with ID: ', docRef.id);

                await updateDoc(docRef, {
                    id: docRef.id
                });
            } catch (e) {
                this.errors = e;
                console.error('Error adding document: ', e);
            }
        },
        async deleteProduct(id) {
            try {
                const docRef = doc(db, 'products', `${id}`);
                await deleteDoc(docRef);
                console.log('Document successfully deleted!');
            } catch (e) {
                console.error('Error removing document: ', e);
            }
        },
        async updateProduct(id, product) {
            try {
                const docRef = doc(db, 'products', `${id}`);
                await updateDoc(docRef, product);
                console.log('Document successfully updated!');
            } catch (e) {
                console.error('Error updating document: ', e);
            }
        }
    }
});
