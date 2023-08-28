export const accordion = {

    isOpen: null,

    toggle(el) {
        if (this.isOpen) {
            this.slideUp(el)
        } else {
            this.slideDown(el)
        }
    },

    slideDown(el) {

        if (!el) return

        el.style.maxHeight = el.scrollHeight + 'px'
        this.isOpen = true
        
    },

    slideUp(el) {

        if (!el) return

        el.style.maxHeight = null
        this.isOpen = false

    },

}