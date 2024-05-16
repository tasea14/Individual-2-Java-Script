# Отчет по индивидуальной работе номер 2
#### Выполнила : Дяконица Наталья I2302
#### Проверил : Нартя Никита

## Цель

 Понимание работы продвинутых функций JavaScript, включая асинхронный JavaScript, модули и обработку ошибок.

## Ход работы 

### Создание index.html

```html
<!doctype html>
<html lang="ru">
<head>
   <meta charset="UTF-8">
   <meta name="viewport"
         content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Activity for Captain Smith</title>
</head>
<body>
<h1>Hey, Captain Smith, you can:</h1>
<i id="activity"></i>
<script type="module" src="src/index.js"></script>
</body>
</html>
```
### Получение данных с сервера

#### getRandomActivity

Функция `getRandomActivity()`, делает запрос и получает данные со стороннего ресурса: http://www.boredapi.com/api/activity/. 

```js
export async function getRandomActivity() {
    try {
        const response = await fetch('http://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Failed to fetch activity');
        }
        const data = await response.json();
        return data.activity; // Возвращаем данные активности
    } catch (error) {
        console.error('Error fetching activity:', error);
        return null;
    }
}
```

Мы тображаем полученную активность на странице `index.html`.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
   <meta charset="UTF-8">
   <meta name="viewport"
         content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Activity for Captain Smith</title>
</head>
<body>
<h1>Hey, Captain Smith, you can:</h1>
<i id="activity"></i>
<script>
    function getRandomActivity() {
        fetch('https://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('activity').textContent = data.activity;
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
        });
    }

    getRandomActivity();
</script>
</body>
</html>
```

Также в коде js файла мы добавляем обработку ошибок в функцию `getRandomActivity()`. 

В случае ошибки добавляем следующий текст в файл `index.html`: "К сожалению, произошла ошибка".
И меняем функцию `getRandomActivity()` так, чтобы она использовала ключевые слова `async / await`. В данном случае `await`

### setTimeout()
Далее добавляем функционал обновления данных каждую минуту. Используем функцию `setTimeout()`.

```js
setTimeout(updateActivity, 60000); 
```

### updateActivity()
 Меняем функцию `getRandomActivity()` так, чтобы она возвращала данные, и добавляем функцию `updateActivity()`, которая будет отображать полученные данные.

```js
export async function getRandomActivity() {
    try {
        const response = await fetch('http://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Failed to fetch activity');
        }
        const data = await response.json();
        return data.activity; // Возвращаем данные активности
    } catch (error) {
        console.error('Error fetching activity:', error);
        return null;
    }
}

export function updateActivity() {
    getRandomActivity()
        .then(activity => {
            if (activity) {
                document.getElementById('activity').textContent = activity;
            } else {
                document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
            }
        })
        .catch(error => {
            console.error('Error updating activity:', error);
            document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
        });
}

updateActivity(); 

setTimeout(updateActivity, 60000); 

```

## Заключение

В ходе работы была разработана веб-страница "Activity for Captain Smith", предназначенная для предложения случайной активности для капитана Смита. Были использованы продвинутые функции JavaScript, такие как асинхронный JavaScript, модули и обработка ошибок.

Создан файл `index.html`, содержащий основную структуру веб-страницы.
Разработана функция `getRandomActivity()`, которая делает асинхронный запрос к стороннему ресурсу `http://www.boredapi.com/api/activity/` для получения случайной активности. При получении данных, функция отображает активность на странице, а также добавлена обработка ошибок в случае неудачного запроса.
В коде страницы `index.html` была использована функция `getRandomActivity()` для получения и отображения случайной активности.
Добавлена функция `setTimeout(updateActivity, 60000);`, которая обновляет данные каждую минуту, позволяя капитану получать новые предложения по активностям.
Функция `updateActivity()` обновляет отображение активности на странице с учетом полученных данных или возникших ошибок.
## Вывод
Изучение продвинутых функций JavaScript, таких как асинхронный JavaScript, работа с модулями и обработка ошибок, позволяет разработчикам создавать более сложные и интерактивные веб-приложения. 

## Контрольные вопросы

1. _Какое значение возвращает функция fetch? Функция fetch возвращает объект типа Promise, который представляет асинхронный запрос к серверу и ожидание получения ответа (response). После того как запрос выполнен и ответ получен, Promise разрешается (resolved) и возвращает объект Response, представляющий полученный ответ от сервера._
   2. _Что представляет собой Promise? Promise представляет собой объект, который используется в JavaScript для работы с асинхронными операциями. Он представляет обещание о том, что выполнение операции завершится успешно или будет вызвано исключение. Promise может находиться в трех состояниях: ожидание (pending), выполнено (resolved), отклонено (rejected). Он позволяет работать с асинхронными операциями, такими как загрузка данных с сервера или выполнение асинхронных функций._
   3. _Какие методы доступны у объекта Promise? У объекта Promise доступны следующие методы:

then(onFulfilled, onRejected): вызывается при успешном выполнении Promise (resolved) и принимает два колбэка: onFulfilled для обработки успешного результата и onRejected для обработки ошибки.
catch(onRejected): вызывается при возникновении ошибки (rejected) и принимает колбэк onRejected для обработки ошибки.
finally(onFinally): вызывается после завершения Promise, независимо от того, был он выполнен успешно или была вызвана ошибка._
_
4._Каковы основные различия между использованием async / await и Promise? Основные различия между использованием async/await и Promise:

Promise - это асинхронная конструкция в JavaScript, которая используется для обработки асинхронных операций. Он представляет собой объект, который может находиться в трех состояниях: ожидание, выполнено или отклонено. Promise позволяет обрабатывать результаты асинхронных операций с помощью методов then(), catch(), и finally().
async/await - это синтаксический сахар, предоставляющий более удобный способ работы с асинхронным кодом. async используется для определения асинхронной функции, а await используется внутри таких функций для ожидания выполнения Promise. Основное отличие заключается в более удобном и читаемом синтаксисе async/await по сравнению с использованием цепочки then() для обработки результатов Promise._


