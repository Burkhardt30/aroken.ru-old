export const header = () => {

    const HEADER = document.querySelector('.header')
    const MAIN = document.querySelector('.main')
    const BURGER_BUTTON = document.querySelector('.burger-button')
    const BURGER_MENU = document.querySelector('.header__burger-body')
    
    // Внутренний отступ мэйна, равный хэдеру ======================================================================================================

    setPageOffset()
    window.addEventListener('resize', setPageOffset)
    window.addEventListener('scroll', setPageOffset)

    function setPageOffset() {
        MAIN.style.paddingTop = HEADER.offsetHeight + 15 + 'px'

        if (getComputedStyle(BURGER_MENU).position === 'fixed') {
            BURGER_MENU.style.paddingTop = HEADER.offsetHeight + 15 + 'px'
        } else {
            BURGER_MENU.style.cssText = ''
        }
    }

    // Появление хэдера при скролле ======================================================================================================

    let lastPageYOffset = window.pageYOffset
    window.addEventListener('scroll', toggleHeader)

    function toggleHeader() {

        const newPageYOffset = window.pageYOffset
        
        if (newPageYOffset < HEADER.offsetHeight) {
            HEADER.classList.add('header--show')
            return false
        }

        if (newPageYOffset < lastPageYOffset) {
            HEADER.classList.add('header--show')
        } else {
            HEADER.classList.remove('header--show')
        }

        lastPageYOffset = newPageYOffset

    }

    // Открытие бургер-меню ======================================================================================================

    BURGER_BUTTON.addEventListener('click', (e) => {

        e.preventDefault()

        if (!BURGER_MENU.closest('.header__burger-body--show')) {
            // Перестать скрывать хэдер при скролле
            window.removeEventListener('scroll', toggleHeader)
            HEADER.classList.add('header--show')
            // Убрать скроллбар одноременно с раскрытием
            // бургер-меню
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            // Паддинг для избавления от скачка при сокрытии скроллбара
            document.body.style.paddingRight = -width + 'px'
            HEADER.style.paddingRight = -width + 'px'
            // Ниже добавить все зафиксированные элементы
            // ...
        } else {
            // Вернуть сокрытие хэдера при скролле
            window.addEventListener('scroll', toggleHeader)
            // Вернуть скроллбар
            document.body.style.paddingRight = 0
            HEADER.style.paddingRight = 0
            document.body.style.overflow = "visible"
        }

        BURGER_MENU.classList.toggle('header__burger-body--show')
        BURGER_BUTTON.classList.toggle('burger-button--active')
    })

}