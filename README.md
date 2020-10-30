# Быстрый старт HTML (Gulp 4.0.2 / Sass 4.1.0)

## Установленные пакеты

Название пакета  | Версия | Описание
-------------------|--------|-------------
[gulp](https://www.npmjs.com/package/gulp "gulp")  | 4.0.2 | Таск-менеджер Gulp
[gulp-sass](https://www.npmjs.com/package/gulp-sass "gulp-sass")  | 4.1.0 | Препроцессор Sass
[browser-sync](https://www.npmjs.com/package/browser-sync "browser-sync")  | 2.26.13 | Сервер для работы и автоматического обновления страниц
[del](https://www.npmjs.com/package/del "del")  | 6.0.0 | Плагин для удаления файлов и каталогов
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer "gulp-autoprefixer")  | 7.0.1 | Плагин для автоматической расстановки префиксов
[gulp-cache](https://www.npmjs.com/package/gulp-cache "gulp-cache")  | 1.1.3 | Плагин для кэширования
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css "gulp-clean-css")  | 4.3.0 | Плагин для минимизации CSS с использованием clean-css
[gulp-concat](https://www.npmjs.com/package/gulp-concat "gulp-concat")  | 2.6.1 | Плагин для конкатенации файлов
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin "gulp-imagemin")  | 7.1.0 | Плагин для сжатия JPEG, GIF и SVG изображений
[gulp-notify](https://www.npmjs.com/package/gulp-notify "gulp-notify")  | 3.2.0 | Плагин для информирование о найденных ошибках
[gulp-rename](https://www.npmjs.com/package/gulp-rename "gulp-rename")  | 2.0.0 | Плагин для переименования файлов
[gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es "gulp-uglify-es")  | 2.0.0 | Плагин для минификации js-файлов
[imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress "imagemin-jpeg-recompress") | 7.0.0 | Плагин для сжатия JPEG
[imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant "imagemin-pngquant")  | 9.0.1 | Плагин для сжатия PNG изображений

## Как установить
1. Скачайте Optimized html start template
2. Установите [Node.js](https://nodejs.org/ "Node.js") на компьютер
3. Установите gulp командой **npm i -g gulp**
4. Установите npm-check-updates для проверки последних обновлений пакетов командой **npm i -g npm-check-updates**
5. Проверьте  последние обновление пакетов командой **ncu**
    - Если вы увидите сообщение** (All dependencies match the latest package versions)**, это значит, что все пакеты на данный момент имеют последнию версию
    - Если вы увидите сообщение **(Run ncu -u to upgrade package.json)**, это значит, что один или более пакетов нужнаются в обновление. Для обновление введите команду **ncu -u** после этого **npm install**
6. Установите модули Node.js командой **npm i**
7. Запустите шаблон командой **gulp**. Готово, можно работать

## Таски Gulp
- **gulp**: Запуск дефолтного gulp таска (browser-sync, sass, codeJS, watch) для разработки
- **build**: Сборка проекта в папку dist (очистка, сжатие картинок, удаление всего лишнего)
- **clearcache**: Очистка кеша gulp. Полезно для очистки кеш картинок и закешированных путей

## Документация к быстрому старту HTML

- Все HTML файлы должны иметь одинаковое стартовое наполнение, как у файла **app/index.html**
- Все HTML файлы должны находится в папке **app/*.html**
- Весь JS код пишите в **app/libs/CommonJs/common.js**

------------
- Все CSS стили библиотек размещайте в **app/sass/_libs.sass**
- Все Sass переменные размещайте в **app/sass/_vars.sass**
- Все Sass медиазапросы размещайте в **app/sass/_media.sass**
- Все Sass шрифты размещайте в **app/sass/_fonts.sass**
- Все Sass стили размещайте в **app/sass/main.sass**

------------
- Для установки новой JS библиотеки просто выполните в терминале команду **bower i plugin-name**. Библиотека автоматически будет размещена в папке **app/libs**. Bower должен быть установлен в вашей системе. Для установки **Bower** просто выполните команду **npm i -g bower** в терминале. После этого укажите все ссылки на скрипты JS библиотек в таске **codeJS (gulpfile.js)**

------------
- При запуске gulp в консоле появиться **Browsersync**
    - **Local** Для браузера на компьютере
    - **External** Для мобильньных устройств
    - **UI** Вход в админ-панель
    - **External** Вход в админ-панель с мобильного устройства

