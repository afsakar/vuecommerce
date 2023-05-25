import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        count: 0,
        items: localStorage.getItem('cart')
    }),
    getters: {
        cartItems: (state) => JSON.parse(state.items),
        cartCount: (state) => {
            const cart = JSON.parse(state.items);
            if (cart) {
                return cart.reduce((acc, item) => acc + item.quantity, 0);
            }
            return 0;
        },
        cartTotal: (state) => {
            const cart = JSON.parse(state.items);
            if (cart) {
                return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            }
            return 0;
        },
        cartTotalDiscount: (state, getters) => {
            const cart = JSON.parse(state.items);
            if (cart) {
                return cart.reduce((acc, item) => acc + item.price * item.quantity * (item.discountPercentage / 100), 0);
            }
            return 0;
        },
        cartTotalTax: (state, getters) => {
            const cart = JSON.parse(state.items);
            if (cart) {
                return cart.reduce((acc, item) => acc + item.price * item.quantity * 0.18, 0);
            }
            return 0;
        },
        cartTotalWithTaxDiscount: (state, getters) => {
            return state.cartTotal - state.cartTotalDiscount + state.cartTotalTax;
        }
    },
    actions: {
        addToCart(product) {
            const cart = JSON.parse(this.items) || [];
            const item = cart.find((item) => item.id === product.id);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        },
        removeFromCart(product) {
            const cart = JSON.parse(this.items);
            const item = cart.find((item) => item.id === product.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(cart.indexOf(item), 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        },
        removeItem(product) {
            const cart = JSON.parse(this.items);
            const item = cart.find((item) => item.id === product.id);
            cart.splice(cart.indexOf(item), 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        },
        clearCart() {
            localStorage.removeItem('cart');
            this.items = localStorage.getItem('cart');
        },
        decrementItemQuantity(product) {
            const cart = JSON.parse(this.items);
            const item = cart.find((item) => item.id === product.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        },
        incrementItemQuantity(product) {
            const cart = JSON.parse(this.items);
            const item = cart.find((item) => item.id === product.id);
            if (item) {
                item.quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        },
        updateItemQuantity(product, quantity) {
            const cart = JSON.parse(this.items);
            const item = cart.find((item) => item.id === product.id);
            if (quantity < 1) {
                quantity = 1;
            }
            if (item) {
                item.quantity = parseInt(quantity);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            this.items = localStorage.getItem('cart');
        }
    }
});
