// Основной модуль
import gulp from 'gulp'
// Пути
import { path } from './gulp/config/path.js'
// Общие плагины
import { plugins } from './gulp/config/plugins.js'

// Передаём значения в глобальную переменную

global.app = {
    isProd: process.argv.includes('--prod'),
    isDev: !process.argv.includes('--prod'),
    path,
    gulp,
    plugins,
}

// Импорт задач
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { zip } from './gulp/tasks/zip.js'
import { otfToTtf, ttfToWoff, woffCopy, iconfontsCopy, fontsStyle } from './gulp/tasks/fonts.js'

// Наблюдатель за изменениями в файлах
const watcher = () => {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, woffCopy, iconfontsCopy, fontsStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images))

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const prod = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)

export { dev }
export { prod }
export { deployZIP }

// Выполнение сценария по умолчанию
gulp.task('default', dev)