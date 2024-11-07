(function() {
    'use strict';

    // Функция для добавления пользовательского токена в настройки интерфейса
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'user_token',
            type: 'string', // Поле для ввода текста
            default: '' // Значение по умолчанию
        },
        field: {
            name: 'Токен пользователя',
            description: "Введите уникальный токен для синхронизации настроек" // Описание поля
        },
        onRender: function(item) {
            console.log("Добавление поля ввода токена на экран настроек");

            // Попробуем добавить элемент в конец всех настроек интерфейса
            setTimeout(function() {
                const $targetElement = $('div.settings__content'); // Выбираем основной контейнер настроек
                if ($targetElement.length) {
                    console.log("Контейнер настроек найден, добавляем поле токена");
                    $targetElement.append($('div[data-name="user_token"]')); // Добавляем наше поле
                } else {
                    console.log("Контейнер настроек не найден");
                }
            }, 100); // Увеличиваем задержку для надежного добавления
        },
        onChange: function(item) {
            const token = item.value;
            console.log('Token введен:', token); // Выводим введенный токен для отладки
            Lampa.Storage.set('user_token', token); // Сохраняем токен в Lampa.Storage
        }
    });
})();
