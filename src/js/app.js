import * as moduleFunctions from './modules/functions.js'
import { header } from './modules/header.js'
import { accordion } from './modules/accordion.js'
import Swiper, { Navigation, Autoplay } from 'swiper'
import SmoothScroll from 'smoothscroll-for-websites'
import 'fslightbox/index.js'
import { Modal } from './modules/modal.js'
import '../../node_modules/choices.js/public/assets/scripts/choices.min.js'

(function () {

    moduleFunctions.isWebp()

    // Функционал хэдера ======================================================================================================

    header()

    // Вращение 3д заголовка ======================================================================================================

    moduleFunctions.rotate3d('.hero__title')

    // Параллакс декораций ======================================================================================================

    moduleFunctions.parallax('.hero__decor', .2)
    moduleFunctions.parallax('.community__decor', .2)

    // Cлайдер отзывов ======================================================================================================

    const swiper = new Swiper('.testimonials__slider', {
        modules: [Navigation, Autoplay],
        autoplay: {
        },
        slidesPerView: 2,
        autoHeight: true,
        spaceBetween: 15,
        loop: true,
        navigation: {
            prevEl: '.testimonials__arrow--prev',
            nextEl: '.testimonials__arrow--next',
        },
        breakpoints: {
            700: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 4,
            },
        },
    });

    // Аккордеон ======================================================================================================

    accordionInit()

    function accordionInit() {

        const accordions = document.querySelectorAll('.accordion');

        accordions.forEach(el => {

            const items = el.querySelectorAll('.accordion__item')
            const contents = el.querySelectorAll('.accordion__content')

            const activeItem = el.querySelector('.accordion__item--open')

            if (activeItem) {
                const content = activeItem.querySelector('.accordion__content')
                accordion.slideDown(content)
            }

            el.addEventListener('click', (e) => {

                const button = e.target.closest('.accordion__button')
                if (!button) return

                const item = button.closest('.accordion__item')
                if (!item) return

                const content = item.querySelector('.accordion__content')
                if (!content) return

                e.preventDefault()

                for (const content of contents) {
                    accordion.slideUp(content)
                }

                const isOpen = item.closest('.accordion__item--open')

                for (const item of items) {
                    item.classList.remove('accordion__item--open')
                }

                if (isOpen) {
                    item.classList.remove('accordion__item--open')
                    accordion.slideUp(content)
                } else {
                    item.classList.add('accordion__item--open')
                    accordion.slideDown(content)
                }
            });
        });
    }

    // Плавное появление элементов при скролле ======================================================================================================

    const animItems = document.querySelectorAll('[data-animate]')

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll)
        function animOnScroll() {
            for (let animItem of animItems) {
                const animItemHeight = animItem.offsetHeight
                const animItemOffset = offset(animItem).top
                const animItemStartIndex = 4

                let animItemPoint = document.documentElement.clientHeight - animItemHeight / animItemStartIndex
                if (animItemHeight > document.documentElement.clientHeight) {
                    animItemPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / animItemStartIndex
                }

                if (window.pageYOffset > animItemOffset - animItemPoint && window.pageYOffset < animItemOffset + animItemHeight) {
                    animItem.classList.add('_active')
                } else {
                    if (animItem.dataset.animate !== 'no-hide') {
                        animItem.classList.remove('_active')
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => animOnScroll(), 300);
    }

    // Плавный скрол ======================================================================================================

    SmoothScroll({
        // Время скролла 400 = 0.4 секунды
        animationTime: 600,
        // Размер шага в пикселях
        stepSize: 75,

        // Дополнительные настройки:

        // Ускорение
        accelerationDelta: 30,
        // Максимальное ускорение
        accelerationMax: 2,

        // Поддержка клавиатуры
        keyboardSupport: true,
        // Шаг скролла стрелками на клавиатуре в пикселях
        arrowScroll: 50,

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,
    })

    // Плавное перемещение по якорям ======================================================================================================

    document.addEventListener('click', moduleFunctions.smoothScrollToAnchor)

    // Модалки ======================================================================================================

    const modal = new Modal({
        isOpen: () => {
            paymentInit()
        }
    });

    // Купон в модалке ======================================================================================================

    couponInit()

    function couponInit() {

        const coupon = document.querySelector('.popup__coupon')
        const button = document.querySelector('.popup__coupon-heading a')
        const body = document.querySelector('.popup__coupon-body')

        if (!button || !body) return

        button.addEventListener('click', (e) => {
            e.preventDefault()

            let isOpen = coupon.classList.contains('popup__coupon--open')

            if (isOpen) {
                coupon.classList.remove('popup__coupon--open')
                accordion.slideUp(body)
            } else {
                coupon.classList.add('popup__coupon--open')
                accordion.slideDown(body)
            }
        })

    }

    // Выбор месседжера ======================================================================================================

    selectInit()

    function selectInit() {

        const input = document.forms['order']['selectedMessager']
        const element = document.querySelector('.popup__select')
        const choices = new Choices(element, {
            allowHTML: true,
            searchEnabled: false,
            choices: [
                {
                    value: 'tg',
                    label: '<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7554 0.344579L1.11255 5.63277C0.563535 5.87903 0.377844 6.37219 0.97985 6.63984L4.47982 7.75786L12.9423 2.50084C13.4044 2.17081 13.8774 2.25881 13.4704 2.62186L6.20223 9.23668L5.97392 12.0361C6.18539 12.4683 6.57259 12.4703 6.81957 12.2555L8.83041 10.3429L12.2743 12.9351C13.0742 13.4111 13.5094 13.1039 13.6815 12.2315L15.9404 1.48017C16.1749 0.406296 15.775 -0.066864 14.7554 0.344579Z" /></svg>',
                },
                {
                    value: 'vk',
                    label: '<svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1"><g><path d="M 16.921875 12.417969 C 16.898438 12.375 16.882812 12.335938 16.863281 12.308594 C 16.566406 11.777344 16.003906 11.125 15.171875 10.351562 L 15.144531 10.324219 L 15.136719 10.3125 L 15.128906 10.3125 C 14.75 9.953125 14.511719 9.710938 14.410156 9.589844 C 14.226562 9.351562 14.1875 9.113281 14.285156 8.871094 C 14.355469 8.6875 14.621094 8.300781 15.082031 7.710938 C 15.324219 7.398438 15.515625 7.148438 15.660156 6.957031 C 16.679688 5.597656 17.125 4.730469 16.988281 4.355469 L 16.933594 4.265625 C 16.898438 4.210938 16.808594 4.164062 16.660156 4.121094 C 16.511719 4.074219 16.324219 4.066406 16.09375 4.097656 L 13.542969 4.113281 C 13.5 4.101562 13.441406 4.101562 13.363281 4.121094 C 13.289062 4.136719 13.25 4.144531 13.25 4.144531 L 13.207031 4.167969 L 13.171875 4.195312 C 13.140625 4.210938 13.109375 4.242188 13.074219 4.289062 C 13.039062 4.332031 13.007812 4.382812 12.984375 4.441406 C 12.707031 5.15625 12.390625 5.820312 12.035156 6.433594 C 11.816406 6.800781 11.617188 7.117188 11.433594 7.386719 C 11.25 7.65625 11.097656 7.855469 10.972656 7.980469 C 10.851562 8.109375 10.738281 8.210938 10.636719 8.285156 C 10.535156 8.363281 10.460938 8.394531 10.40625 8.382812 C 10.355469 8.371094 10.304688 8.359375 10.257812 8.347656 C 10.171875 8.296875 10.105469 8.222656 10.058594 8.132812 C 10.007812 8.039062 9.972656 7.925781 9.957031 7.785156 C 9.9375 7.648438 9.925781 7.527344 9.925781 7.425781 C 9.921875 7.328125 9.921875 7.183594 9.929688 7.003906 C 9.933594 6.820312 9.9375 6.695312 9.9375 6.628906 C 9.9375 6.40625 9.941406 6.160156 9.949219 5.898438 C 9.960938 5.636719 9.96875 5.429688 9.972656 5.273438 C 9.980469 5.121094 9.980469 4.960938 9.980469 4.789062 C 9.980469 4.617188 9.972656 4.480469 9.949219 4.382812 C 9.929688 4.289062 9.898438 4.191406 9.859375 4.101562 C 9.816406 4.011719 9.757812 3.9375 9.675781 3.890625 C 9.597656 3.839844 9.496094 3.796875 9.378906 3.769531 C 9.066406 3.699219 8.667969 3.660156 8.183594 3.652344 C 7.085938 3.640625 6.378906 3.714844 6.066406 3.867188 C 5.941406 3.929688 5.832031 4.019531 5.730469 4.132812 C 5.625 4.261719 5.609375 4.332031 5.6875 4.34375 C 6.039062 4.398438 6.292969 4.523438 6.4375 4.726562 L 6.492188 4.832031 C 6.535156 4.910156 6.574219 5.042969 6.617188 5.238281 C 6.65625 5.433594 6.683594 5.648438 6.695312 5.886719 C 6.726562 6.316406 6.726562 6.6875 6.695312 6.992188 C 6.667969 7.300781 6.636719 7.539062 6.613281 7.710938 C 6.585938 7.882812 6.546875 8.019531 6.492188 8.125 C 6.4375 8.234375 6.402344 8.296875 6.386719 8.320312 C 6.367188 8.34375 6.351562 8.359375 6.339844 8.367188 C 6.265625 8.394531 6.183594 8.410156 6.101562 8.410156 C 6.019531 8.410156 5.917969 8.367188 5.800781 8.285156 C 5.683594 8.203125 5.5625 8.089844 5.433594 7.945312 C 5.308594 7.800781 5.164062 7.597656 5.003906 7.339844 C 4.84375 7.078125 4.679688 6.773438 4.507812 6.417969 L 4.367188 6.160156 C 4.277344 5.996094 4.15625 5.753906 4.003906 5.4375 C 3.851562 5.121094 3.714844 4.816406 3.597656 4.523438 C 3.550781 4.398438 3.476562 4.304688 3.382812 4.238281 L 3.339844 4.210938 C 3.308594 4.1875 3.261719 4.164062 3.199219 4.136719 C 3.132812 4.109375 3.066406 4.089844 2.992188 4.078125 L 0.566406 4.097656 C 0.320312 4.097656 0.152344 4.152344 0.0625 4.265625 L 0.0273438 4.316406 C 0.0078125 4.347656 0 4.394531 0 4.460938 C 0 4.523438 0.0195312 4.605469 0.0546875 4.699219 C 0.40625 5.53125 0.792969 6.335938 1.207031 7.109375 C 1.625 7.882812 1.988281 8.503906 2.292969 8.976562 C 2.601562 9.449219 2.914062 9.894531 3.234375 10.3125 C 3.550781 10.734375 3.761719 11.003906 3.867188 11.121094 C 3.96875 11.238281 4.050781 11.328125 4.109375 11.386719 L 4.332031 11.597656 C 4.472656 11.738281 4.679688 11.910156 4.957031 12.109375 C 5.230469 12.304688 5.535156 12.5 5.867188 12.691406 C 6.203125 12.882812 6.589844 13.039062 7.03125 13.160156 C 7.476562 13.28125 7.90625 13.332031 8.324219 13.308594 L 9.34375 13.308594 C 9.550781 13.289062 9.707031 13.226562 9.8125 13.113281 L 9.847656 13.070312 C 9.871094 13.035156 9.894531 12.980469 9.914062 12.90625 C 9.9375 12.832031 9.945312 12.75 9.945312 12.660156 C 9.941406 12.40625 9.960938 12.179688 10.003906 11.976562 C 10.046875 11.769531 10.097656 11.617188 10.15625 11.515625 C 10.210938 11.410156 10.273438 11.324219 10.34375 11.253906 C 10.414062 11.183594 10.464844 11.140625 10.496094 11.125 C 10.523438 11.109375 10.546875 11.101562 10.566406 11.09375 C 10.707031 11.046875 10.875 11.09375 11.066406 11.230469 C 11.257812 11.371094 11.4375 11.542969 11.605469 11.746094 C 11.777344 11.949219 11.976562 12.175781 12.214844 12.429688 C 12.449219 12.683594 12.65625 12.875 12.832031 13 L 13.011719 13.105469 C 13.128906 13.175781 13.28125 13.242188 13.472656 13.300781 C 13.660156 13.359375 13.824219 13.375 13.96875 13.34375 L 16.234375 13.308594 C 16.457031 13.308594 16.632812 13.269531 16.757812 13.199219 C 16.882812 13.125 16.953125 13.042969 16.980469 12.953125 C 17.003906 12.867188 17.003906 12.765625 16.984375 12.652344 C 16.960938 12.539062 16.941406 12.460938 16.921875 12.417969 Z M 16.921875 12.417969 " /></g></svg>',
                }
            ]
        })
        const placeholders = {
            tg: 'Например, @FIBERSON',
            vk: 'Например, vk.com/fiberson',
        }

        input.placeholder = placeholders[element.value]
        element.addEventListener('change', () => {
            input.placeholder = placeholders[element.value]
        })

    }

    // Аккордеон в способах оплаты ======================================================================================================

    function paymentInit() {
        
        const submit = document.querySelector('.popup__order-button')
        const radios = document.forms['order']['way']
        let selectedWay = document.querySelector('.popup__way--selected')

        if (selectedWay) {
            const dropdown = selectedWay.querySelector('.popup__way-dropdown')
            accordion.slideDown(dropdown)
        }

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {

                selectedWay.classList.remove('popup__way--selected')
                const openedDropdown = selectedWay.querySelector('.popup__way-dropdown')
                accordion.slideUp(openedDropdown)

                const newWay = e.target.closest('.popup__way')
                const newDropdown = newWay.querySelector('.popup__way-dropdown')
                newWay.classList.add('popup__way--selected')
                accordion.slideDown(newDropdown)

                selectedWay = newWay
                
                // Отключить radio внутри способа с Тинькой
                const periodRadios = document.forms['order']['period']
                periodRadios.forEach(radio => {
                    if (radio.closest('.popup__way--selected')) {
                        radio.disabled = false
                    } else {
                        radio.disabled = true
                    }
                })

                // Изменить текст submit`а формы
                const isTinkoff = e.target.closest('.popup__way-default--tinkoff')

                if (isTinkoff) {
                    submit.textContent = 'Рассрочка под 0%'
                } else {
                    submit.textContent = 'Подтвердить заказ'
                }

            })
        })

    }

    const installments = {
        total: '53990.00₽',
        3: '',
        4: '',
        6: '',
        10: '',
        12: '',
    }

})()