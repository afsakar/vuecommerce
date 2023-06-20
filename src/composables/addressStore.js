import {defineStore} from 'pinia';
import {db} from '@/plugins/firebase';
import {useAuthStore} from '@/composables/authStore.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    onSnapshot,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

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
                if (this.addresses.length > 0) {
                    return;
                } else {
                    querySnapshot.forEach((doc) => {
                        this.addresses.push({
                            ...doc.data()
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getAddress(id) {
            try {
                const docRef = doc(db, 'addresses', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.address = {...docSnap.data()};
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

            await updateDoc(docRef, {
                id: docRef.id,
                createdAt: new Date()
            });

            onSnapshot(this.addressQuery, (querySnapshot) => {
                this.addresses = querySnapshot.docs.map((doc) => ({...doc.data()}));
            });
        },
        async deleteAddress(id) {
            const docRef = doc(db, 'addresses', id);
            await deleteDoc(docRef);

            onSnapshot(this.addressQuery, (querySnapshot) => {
                this.addresses = querySnapshot.docs.map((doc) => ({...doc.data()}));
            });
        }
    }
});
