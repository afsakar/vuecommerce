import { defineStore } from 'pinia';
import { db } from '@/plugins/firebase';
import { useAuthStore } from '@/composables/authStore.js';
import { collection, doc, getDoc, getDocs, query, where, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

export const useAddressStore = defineStore('addressStore', {
    state: () => ({
        address: null,
        addresses: [],
        errors: null,
        loading: false,
        user: useAuthStore().userData
    }),
    getters: {
        addressQuery() {
            return query(collection(db, 'addresses'), where('user', '==', this.user.uid)) || null;
        },
        getUser() {
            return this.user || null;
        },
        getAddresses() {
            return this.addresses || null;
        }
    },
    actions: {
        async addressList() {
            try {
                const querySnapshot = await getDocs(this.addressQuery);
                querySnapshot.forEach((doc) => {
                    this.addresses.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
            } catch (e) {
                console.log(e);
            }
        },
        async getAddress(id) {
            try {
                const docRef = doc(db, 'addresses', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.address = { ...docSnap.data(), id: docSnap.id };
                } else {
                    console.log('No such document!');
                }
            } catch (e) {
                console.log(e);
            }
        },
        async addAddress(data) {
            const docRef = await addDoc(collection(db, 'addresses'), data);
            console.log('Document written with ID: ', docRef.id);

            onSnapshot(this.addressQuery, (querySnapshot) => {
                this.addresses = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            });
        },
        async deleteAddress(id) {
            const docRef = doc(db, 'addresses', id);
            await deleteDoc(docRef);

            onSnapshot(this.addressQuery, (querySnapshot) => {
                this.addresses = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            });
        }
    }
});
