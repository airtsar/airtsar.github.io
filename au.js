(function () {
    'use strict';

    // Иконка для кнопки авторизации (пример иконки, замените на свою)
    var icon_auth = '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.84 0-3.5-.63-4.85-1.69l.8-.8c1.11.75 2.44 1.19 4.05 1.19 3.31 0 6-2.69 6-6s-2.69-6-6-6c-3.31 0-6 2.69-6 6h1.5l-2.5 2.5-2.5-2.5H6c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z" fill="#ffffff"/></svg>';

    function startAuthorization() {
        $('#AUTH_BUTTON').remove();

        var authButton = '<div id="AUTH_BUTTON" class="head__action selector auth-screen">' + icon_auth + '</div>';

        $('#app > div.head > div > div.head__actions').append(authButton);
        $('#AUTH_BUTTON').insertAfter('div[class="head__action selector open--settings"]');

        $('#AUTH_BUTTON').on('hover:enter hover:click hover:touch', function () {
            var token = Lampa.Storage.get('user_token');
            if (token) {
                console.log("Токен авторизации:", token);
                // Выполните необходимые действия с токеном, например, отправьте на сервер
            } else {
                console.log("Токен не задан");
            }
        });
    }

    // Добавляем компонент для авторизации в меню настроек
    Lampa.SettingsApi.addComponent({
        component: 'authorization',
        name: 'Авторизация',
        icon: icon_auth
    });

    // Добавляем параметр для ввода токена
    Lampa.SettingsApi.addParam({
        component: 'authorization',
        param: {
            name: 'user_token',
            type: 'input',
            values: '',
            placeholder: 'Введите ваш токен',
            default: ''
        },
        field: {
            name: 'Токен пользователя',
            description: 'Введите уникальный токен для авторизации'
        },
        onChange: function (value) {
            if (value) {
                console.log("Токен введен:", value);
                startAuthorization(); // Активируем кнопку авторизации, если токен введен
            } else {
                $('#AUTH_BUTTON').remove(); // Удаляем кнопку, если токен пуст
            }
        }
    });

    // Инициализация кнопки авторизации при старте приложения, если токен уже сохранен
    if (Lampa.Storage.get('user_token')) {
        startAuthorization();
    }

})();
