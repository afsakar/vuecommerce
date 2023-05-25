import { computed } from 'vue';

export const isMobile = computed(() => {
    if (window.innerWidth <= 768) {
        return true;
    }
    return false;
});

export function formatPrice(price) {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function reverseSlug(slug) {
    var words = slug?.split('-');

    for (var i = 0; i < words?.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words?.join(' ');
}
