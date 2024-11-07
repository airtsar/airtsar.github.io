(function() {
    'use strict';

    // Добавляем пункт для ввода токена пользователя в настройки интерфейса
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'user_token',
            type: 'input', // Поле для ввода текста
            default: '' // Значение по умолчанию
        },
        field: {
            name: 'Токен пользователя',
            description: "Введите уникальный токен для синхронизации настроек" // Описание поля
        },
        onRender: function(item) {
            setTimeout(function() {
                // Размещаем поле после элемента с именем "card_interfice_poster"
                $('div[data-name="user_token"]').insertAfter('div[data-name="card_interfice_poster"]');
            }, 0);
        },
        onChange: function(item) {
            const token = item.value;
            console.log('Token введен:', token); // Выводим введенный токен для отладки
            Lampa.Storage.set('user_token', token); // Сохраняем токен в Lampa.Storage
        }
    });

})();
