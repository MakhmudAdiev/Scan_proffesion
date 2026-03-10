/**
 * Скрипт для обработки последнего запроса от пользователя
 * Этот файл можно вызвать из AI для обработки запросов
 */

const fs = require('fs').promises;
const path = require('path');

async function getLastRequest() {
    try {
        const lastRequestFile = path.join(__dirname, 'last-request.json');
        const data = await fs.readFile(lastRequestFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

async function markRequestAsProcessed(requestFile) {
    try {
        const data = await fs.readFile(requestFile, 'utf8');
        const requestData = JSON.parse(data);
        requestData.status = 'processed';
        requestData.processedAt = new Date().toISOString();
        await fs.writeFile(requestFile, JSON.stringify(requestData, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка при обновлении статуса запроса:', error);
    }
}

// Экспортируем функции для использования
module.exports = {
    getLastRequest,
    markRequestAsProcessed
};

// Если запущен напрямую, выводим последний запрос
if (require.main === module) {
    getLastRequest().then(request => {
        if (request) {
            console.log('Последний запрос:');
            console.log(JSON.stringify(request, null, 2));
        } else {
            console.log('Запросов не найдено');
        }
    });
}


