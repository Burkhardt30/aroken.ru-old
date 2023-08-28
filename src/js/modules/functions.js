// Проверить поддержку webp и задать соответствующий класс
export function isWebp() {
    // Проверка поддержки webp
    function testWebp(callback) {
        let webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }

    // Назначение класса
    testWebp(function (support) {
        let className = support === true ? 'webp' : 'no-webp'
        document.documentElement.classList.add(className)
    })
}

// Вращение элемента по движению курсора
export const rotate3d = (
    elSelector,
    {
        sensitivity = .6,
        thickness = 3.625
    } = ''
) => {

    const targets = document.querySelectorAll(elSelector)

    if (targets.length === 0) return

    for (let el of targets) {
        let layers

        // Создать объём

        createLayers()

        function createLayers() {

            el.style.perspective = '900px'

            const innerHTML = el.innerHTML

            layers = document.createElement('div')
            layers.className = 'z-layers'
            layers.innerHTML = innerHTML
            layers.style.position = 'relative'
            layers.style.transformStyle = 'preserve-3d'
            layers.style.width = '100%'
            layers.style.height = '100%'

            el.innerHTML = ''
            el.append(layers)

            for (let i = 0; i < 7; i++) {
                const clone = layers.cloneNode()

                clone.classList.remove('z-layers')
                clone.classList.add('z-layer')
                clone.innerHTML = innerHTML

                clone.style.position = 'absolute'
                clone.style.top = 0
                clone.style.left = 0
                clone.style.right = 0
                clone.style.bottom = 0
                clone.style.pointerEvents = 'none'
                clone.style.userSelect = 'none'

                clone.style.transform = `translateZ(-${(i + 1) * (thickness)}px)`
                clone.style.opacity = `${(7 - i) * (0.0625)}`

                layers.append(clone)
            }
        }

        // Вращать при движении курсора

        document.addEventListener('touchmove', (e) => {
            rotate(e)
        })
        document.addEventListener('mousemove', (e) => {
            rotate(e)
        })

        function rotate(e) {

            let screenX
            let screenY

            if (e.type === 'mousemove') {
                screenX = e.clientX
                screenY = e.clientY
            } else {
                screenX = e.changedTouches[e.changedTouches.length - 1].clientX
                screenY = e.changedTouches[e.changedTouches.length - 1].clientY
            }

            const pointerX = (screenX * 100 / document.documentElement.clientWidth - 50) * sensitivity
            const pointerY = (screenY * 100 / document.documentElement.clientHeight - 50) * sensitivity

            layers.style.transform = `rotateX(${-pointerY}deg) rotateY(${pointerX}deg)`
        }
    }


}

// Параллакс при движении курсора мыши

export const parallax = (elSelector, sensitivity = 1) => {

    const targets = document.querySelectorAll(elSelector)

    if (targets.length === 0) return

    for (let el of targets) {

        document.addEventListener('touchmove', move)
        document.addEventListener('mousemove', move)

        function move(e) {

            let screenX
            let screenY

            if (e.type === 'mousemove') {
                screenX = e.clientX
                screenY = e.clientY
            } else {
                screenX = e.changedTouches[e.changedTouches.length - 1].clientX
                screenY = e.changedTouches[e.changedTouches.length - 1].clientY
            }

            const pointerX = -(screenX * 100 / document.documentElement.clientWidth - 50) * sensitivity
            const pointerY = -(screenY * 100 / document.documentElement.clientHeight - 50) * sensitivity

            el.style.transform = `translateX(${pointerX}px) translateY(${pointerY}px)`

        }

    }
}

// Анимация
export const animate = ({ timing, draw, duration }) => {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

// Плавное перемещение по якорям

export const smoothScrollToAnchor = (e) => {

    const target = e.target.closest('[href^="#"]')

    if (!target) return

    const id = target.getAttribute('href')

    if (id.length == 1) return

    e.preventDefault()

    const headerTopHeight = 45
    const top = document.querySelector(id).getBoundingClientRect().top - headerTopHeight + window.pageYOffset

    window.scrollTo({
        top: top,
        behavior: 'smooth'
    })
}