import router from '@/router';
import { defineStore } from 'pinia';
import { auth, db } from '@/plugins/firebase';
import { collection, doc, getDoc, getDocs, setDoc, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, sendEmailVerification, createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
        validateErrors: null
    }),
    getters: {
        isAuthenticated() {
            return this.userData !== null;
        },
        user() {
            return this.userData;
        },
        loading() {
            return this.loadingUser || this.loadingSession;
        },
        error() {
            return this.validateErrors;
        }
    },
    actions: {
        async login(email, password) {
            this.loadingUser = true;
            try {
                await signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        this.userData = userCredential.user;
                        console.log(this.userData.email);
                        router.push('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingUser = false;
            }
        },
        async register(data) {
            this.loadingUser = true;
            try {
                const userList = [];
                const querySnapshot = await getDocs(collection(db, 'users'));
                querySnapshot.forEach((doc) => {
                    userList.push(doc.data());
                });
                const userEmailExists = userList.find((user) => user.email === data.email);
                const userPhoneExists = userList.find((user) => user.phone === data.phone);
                if (userEmailExists || userPhoneExists) {
                    this.validateErrors = {
                        email: userEmailExists ? 'Email already exists' : null,
                        phone: userPhoneExists ? 'Phone already exists' : null
                    };
                } else {
                    await createUserWithEmailAndPassword(auth, data.email, data.password)
                        .then((userCredential) => {
                            this.userData = userCredential.user;
                            setDoc(doc(db, 'users', this.userData.uid), {
                                email: data.email,
                                displayName: data.displayName,
                                phone: data.phone,
                                isAdmin: false
                            });
                            sendEmailVerification(auth.currentUser).then(() => {
                                console.log('Email sent!');
                            });
                            router.push('/');
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        });
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingUser = false;
            }
        },
        async sendEmailVerification() {
            try {
                await sendEmailVerification(auth.currentUser).then(() => {
                    console.log('Email sent!');
                });
            } catch (e) {
                console.log(e);
            }
        },
        async logout() {
            try {
                await signOut(auth);
                this.userData = null;
                await router.push('/login');
            } catch (e) {
                console.log(e);
            }
        },
        async checkSession() {
            return new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        if (user) {
                            this.userData = user;
                            this.getUserData();
                        } else {
                            this.userData = null;
                        }
                        resolve(user);
                    },
                    (e) => reject(e)
                );
                unsubscribe();
            });
        },
        async getUserData() {
            this.loadingUser = true;
            try {
                const docRef = doc(db, 'users', this.userData.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.userData = { ...this.userData, ...docSnap.data() };
                } else {
                    console.log('No such document!');
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingUser = false;
            }
        },
        async updateAccount(data) {
            this.loadingUser = true;
            try {
                const userList = [];
                const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '!=', this.userData.email)));
                querySnapshot.forEach((doc) => {
                    userList.push(doc.data());
                });

                const userEmailExists = userList.find((user) => user.email === data.email);
                const userPhoneExists = userList.find((user) => user.phone === data.phone);

                if (userEmailExists || userPhoneExists) {
                    this.validateErrors = {
                        email: userEmailExists ? 'Email already exists' : null,
                        phone: userPhoneExists ? 'Phone already exists' : null
                    };
                } else {
                    this.validateErrors = null;
                    await updateProfile(auth.currentUser, data)
                        .then(() => {
                            this.userData = { ...this.userData, ...data };
                            setDoc(doc(db, 'users', this.userData.uid), {
                                email: data.email,
                                displayName: data.displayName,
                                phone: data.phone
                            });
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode, errorMessage);
                        });
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingUser = false;
            }
        },
        async updatePassword(password) {
            this.loadingUser = true;
            try {
                await updatePassword(auth.currentUser, password)
                    .then(() => {
                        console.log('Password updated!');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingUser = false;
            }
        }
    },
    persist: {
        paths: ['userData']
    }
});
