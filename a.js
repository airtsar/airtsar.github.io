(function () {
    'use strict';

    // Уникальный код, который пользователь должен ввести
    const AUTH_CODE = '12345';

    // Функция для динамического копирования всех настроек из Lampa.Storage
    function saveAllStorageToServer() {
        const allStorageData = Lampa.Storage.all();  // Получаем все данные из Lampa.Storage

        // Сохраняем все данные из Lampa.Storage под ключом "site_settings"
        Lampa.Storage.set('site_settings', allStorageData);

        console.log("Все данные из Lampa.Storage сохранены под ключом 'site_settings':", allStorageData);
    }

    // Функция для проверки введенного кода
    function validateAndSaveSettings(code) {
        if (code === AUTH_CODE) {
            console.log("Введен правильный код:", code);
            saveAllStorageToServer();
        } else {
            console.log("Неверный код:", code);
        }
    }

    // Добавляем новый параметр для ввода кода
    Lampa.SettingsApi.addComponent({
        component: 'authorization_plugin',
        name: 'Авторизация по коду',
        icon: '<svg width="24px" height="24px" ... fill="#ffffff"/></svg>'
    });

    Lampa.SettingsApi.addParam({
        component: 'authorization_plugin',
        param: {
            name: 'auth_code',
            type: 'input',
            values: '',
            placeholder: 'Введите код',
            default: ''
        },
        field: {
            name: 'Код авторизации',
            description: 'Введите код для сохранения всех настроек'
        },
        onChange: function (value) {
            if (value) {
                validateAndSaveSettings(value);
            }
        }
    });

})();
