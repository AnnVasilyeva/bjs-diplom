const logoutButton = new LogoutButton();

//Выход из личного кабинета
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();


const updateStocks = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
//Вызовите данную функцию для получения текущих валют.
updateStocks();
//интервал для повторного вызова функции
setInterval(updateStocks, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();


//пополнение баланса
moneyManager.addMoneyCallback = data => {

    ApiConnector.addMoney(data, response => {
        //проверка успешности запроса
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Баланс пополнен успешно!');
        } else {
            moneyManager.setMessage(true, 'Ошибка!');
        }
    });
}

//конвертирование валюты

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Конвертация выполнена успешно!');
        } else {
            moneyManager.setMessage(true, 'Ошибка!');
        }
    });
}

//перевод валюты

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Перевод выполнен успешно!');
        } else {
            moneyManager.setMessage(true, 'Ошибка!');
        }
    });
}

//Работа с избранным

const favoritesWidget = new FavoritesWidget();

//Запросите начальный список избранного
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

//добавление пользователя в список избранных

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь успешно добавлен');
        } else {
            favoritesWidget.setMessage(true, 'Ошибка!');
        }
    });
}

//удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => {

    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь успешно удален');
        } else {
            favoritesWidget.setMessage(true, 'Ошибка!');
        }
    });
}








