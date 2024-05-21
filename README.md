# Для запуска проекта нужно запустить локальный сервер.

Для этого нужно:

1. Перейти на сайт проекта https://pain4metoo.github.io/casino/
2. Склонировать репозиторий `git clone https://github.com/pain4metoo/casino-server.git`
3. Перейти в папку с сервером `cd json-server-auth`
4. Установить зависимости `npm install`
5. Запустить сервер командой `npm run start`
6. Теперь у вас проект работает на вашем локальном сервере

Сервер запускается на порте http://localhost:3000
Все данные находятся в файле db.json

# Описание проекта "Казино Анубиса"

![anubis](https://i.ibb.co/8Mp2wFd/anubis-wallpaper-preview.jpg 'anubis')

Проект "Казино Анубиса" представляет собой SPA в котором вы сможете поиграть в виртуальное онлайн казино. Сайт работает на локальном JSON сервере с промежуточным ПО аутентификации JWT для [JSON Server].
На сайте имеется регистрация/авторизация связанная с локальным сервером. Игровой автомат представляет из себя игру с полем 5x6 блоков. При каждом спине генерируется случайная комбинация символов из 5 редких и 5 обычных символов. Выйгрыш случится если в игре окажется 7 или более одинаковых символов. Одинаковые символы исчезают и происходит добрасывания новых символов на место старых. Каждый символ имеет свою цену. Чем больше одинаковых символов вы найдёте, тем больше будет выйгрыш. Алгоритм игрового автомата написан с нуля и тесно связан с серверным API и отрисовкой в PixiJS.

Стэк: TypeScript, React, Redux + Redux Toolkit, Redux Thunk, React Pixi, PixiJS, SCSS.
В проекте используются вспомогательные библиотеки такие как: Bootstrap, axios, use-sound.

# Презентация проекта

[Видео презентации "Казино Анубиса"](https://youtu.be/z1vJjXQWHD8 'кликни меня')

На видео продемонстрирована работа приложения, которое включает в себя:

1. Процесс авторизации/регистрации
2. Ошибки при авторизации/регистрации
3. Игру в игровой автомат
4. Загрузку ресурсов при очень медленном интернете с отлюченным кешом
5. Функционал приложения
6. Корректность работы автомата при прерывании игры
