import {defineStore} from 'pinia';
import {ref, onMounted} from 'vue';
import {db} from '@/plugins/firebase';
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

export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({
        category: null,
        categories: [],
        errors: null,
        loading: false,
    }),
    getters: {
        categoryQuery() {
            return query(collection(db, 'categories')) || null;
        },
        getCategories() {
            return this.categories || null;
        }
    },
    actions: {
        async categoryList(pageLimit = 20) {
            try {
                const querySnapshot = await getDocs(query(collection(db, 'categories'), limit(pageLimit)));
                if (this.categories.length > 0) {
                    return;
                } else {
                    querySnapshot.forEach((doc) => {
                        this.categories.push({
                            ...doc.data(),
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getCategory(id) {
            try {
                const docRef = doc(db, 'categories', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.category = {...docSnap.data(), id: docSnap.id};
                } else {
                    console.log('No such document!');
                }
            } catch (e) {
                console.log(e);
            }
        },
        async addCategory(data) {
            try {
                const docRef = await addDoc(collection(db, 'categories'), data);
                console.log('Document written with ID: ', docRef.id);

                await updateDoc(docRef, {
                    id: docRef.id,
                    createdAt: new Date()
                });

                onSnapshot(this.categoryQuery, (querySnapshot) => {
                    this.categories = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
                });
            } catch (e) {
                console.log(e);
            }
        },
        async deleteCategory(id) {
            try {
                const docRef = doc(db, 'categories', id);
                await deleteDoc(docRef);

                onSnapshot(this.categoryQuery, (querySnapshot) => {
                    this.categories = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
});