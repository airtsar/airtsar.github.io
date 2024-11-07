(function() {
    'use strict';

    const keys = ['airtsar_set', 'protocol', 'helper'];
    let previousSettings = {};

    // Функция для безопасного получения значений из Lampa.Storage
    function getSetting(key) {
        const value = Lampa.Storage.get(key);
        if (typeof value === 'undefined') {
            console.warn(`Warning: Значение для ключа "${key}" не найдено.`);
            return null;
        }
        return value;
    }

    // Добавляем поле для ввода токена в настройки интерфейса
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'user_token',
            type: 'input',
            default: '',
        },
        field: {
            name: 'Токен пользователя',
            description: "Введите уникальный токен для синхронизации настроек",
        },
        onRender: function(item) {
            setTimeout(function() {
                const tokenElement = $('div[data-name="user_token"]');
                if (tokenElement.length) {
                    tokenElement.insertAfter('div[data-name="logo_card"]');
                }
            }, 0);
        },
        onChange: function(item) {
            const token = item.value;
            if (token) {
                console.log('Token введен:', token);
                Lampa.Storage.set('user_token', token);
            }
        }
    });

    function trackChangesAndSync() {
        const token = Lampa.Storage.get('user_token');
        if (!token) {
            console.log('Токен не введен. Ожидание...');
            return;
        }

        const currentSettings = {};
        keys.forEach(key => {
            const value = getSetting(key);
            if (value !== null) {
                currentSettings[key] = value;
            }
        });

        let hasChanges = false;
        for (let key in currentSettings) {
            if (currentSettings[key] !== previousSettings[key]) {
                hasChanges = true;
                break;
            }
        }

        if (hasChanges) {
            console.log('Изменения обнаружены, отправка данных на сервер');

            fetch('https://yourserver.com/save_settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    settings: currentSettings,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Настройки сохранены на сервере:', data);
                previousSettings = { ...currentSettings };
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
            });
        } else {
            console.log('Нет изменений, синхронизация не требуется');
        }
    }

    // Проверяем изменения каждые 5 минут
    setInterval(trackChangesAndSync, 5 * 60 * 1000);

})();
