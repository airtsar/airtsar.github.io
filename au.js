Lampa.SettingsApi.addParam({
    component: 'authorization', // Новый компонент для авторизации
    param: {
        name: 'user_token',
        type: 'input',
        values: '',
        placeholder: 'Введите ваш токен',
        default: ''
    },
    field: {
        name: 'Токен пользователя',
        description: 'Введите уникальный токен для подключения к серверу'
    },
    onRender: function(item) {
        console.log("onRender сработал для компонента авторизации, добавляем поле для ввода токена");

        // Устанавливаем таймер, чтобы поле отображалось ниже других компонентов, если это необходимо
        setTimeout(function() {
            $('div[data-name="user_token"]').insertAfter('div[data-name="location_server"]');
        }, 100);
    },
    onChange: function(item) {
        console.log("Изменено значение токена:", item.value);
        // Здесь можно добавить логику для проверки или сохранения токена
    }
});
