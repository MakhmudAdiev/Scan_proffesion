/**
 * Автоматический обработчик запросов
 * Этот скрипт автоматически читает и обрабатывает запросы из файлов
 */

const fs = require('fs').promises;
const path = require('path');

// Файлы для проверки
const REQUEST_FILES = [
    path.join(__dirname, 'user-request.txt'),
    path.join(__dirname, 'NEW_REQUEST.txt'),
    path.join(__dirname, 'last-request.json')
];

// Файл для отслеживания обработанных запросов
const PROCESSED_FILE = path.join(__dirname, '.processed-requests.json');

/**
 * Читает последний запрос из файлов
 */
async function getLatestRequest() {
    let latestRequest = null;
    let latestTime = 0;
    
    // Проверяем user-request.txt
    try {
        const content = await fs.readFile(REQUEST_FILES[0], 'utf8');
        if (content.trim()) {
            const stats = await fs.stat(REQUEST_FILES[0]);
            if (stats.mtimeMs > latestTime) {
                latestTime = stats.mtimeMs;
                latestRequest = {
                    request: content.trim(),
                    source: 'user-request.txt',
                    timestamp: stats.mtimeMs
                };
            }
        }
    } catch (error) {
        // Файл не существует или недоступен
    }
    
    // Проверяем NEW_REQUEST.txt
    try {
        const content = await fs.readFile(REQUEST_FILES[1], 'utf8');
        if (content.trim()) {
            const stats = await fs.stat(REQUEST_FILES[1]);
            if (stats.mtimeMs > latestTime) {
                latestTime = stats.mtimeMs;
                // Извлекаем запрос из файла
                const match = content.match(/Новый запрос от пользователя:\s*\n\n(.+?)\n\n/);
                latestRequest = {
                    request: match ? match[1].trim() : content.trim(),
                    source: 'NEW_REQUEST.txt',
                    timestamp: stats.mtimeMs
                };
            }
        }
    } catch (error) {
        // Файл не существует или недоступен
    }
    
    // Проверяем last-request.json
    try {
        const content = await fs.readFile(REQUEST_FILES[2], 'utf8');
        const data = JSON.parse(content);
        if (data.request) {
            const stats = await fs.stat(REQUEST_FILES[2]);
            if (stats.mtimeMs > latestTime) {
                latestTime = stats.mtimeMs;
                latestRequest = {
                    request: data.request,
                    source: 'last-request.json',
                    timestamp: stats.mtimeMs,
                    fullData: data
                };
            }
        }
    } catch (error) {
        // Файл не существует или недоступен
    }
    
    return latestRequest;
}

/**
 * Проверяет, был ли запрос уже обработан
 */
async function isProcessed(request) {
    try {
        const processed = await fs.readFile(PROCESSED_FILE, 'utf8');
        const data = JSON.parse(processed);
        return data.processedRequests?.some(
            r => r.request === request.request && 
                 Math.abs(r.timestamp - request.timestamp) < 1000
        ) || false;
    } catch (error) {
        return false;
    }
}

/**
 * Помечает запрос как обработанный
 */
async function markAsProcessed(request) {
    try {
        let data = { processedRequests: [] };
        try {
            const content = await fs.readFile(PROCESSED_FILE, 'utf8');
            data = JSON.parse(content);
        } catch (error) {
            // Файл не существует, создаем новый
        }
        
        data.processedRequests = data.processedRequests || [];
        data.processedRequests.push({
            request: request.request,
            timestamp: request.timestamp,
            processedAt: Date.now()
        });
        
        // Оставляем только последние 100 запросов
        if (data.processedRequests.length > 100) {
            data.processedRequests = data.processedRequests.slice(-100);
        }
        
        await fs.writeFile(PROCESSED_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Ошибка при сохранении обработанных запросов:', error);
    }
}

/**
 * Главная функция обработки
 */
async function processRequest() {
    try {
        const request = await getLatestRequest();
        
        if (!request) {
            return { hasRequest: false, message: 'Нет новых запросов' };
        }
        
        // Проверяем, был ли запрос уже обработан
        if (await isProcessed(request)) {
            return { hasRequest: false, message: 'Запрос уже обработан' };
        }
        
        // Помечаем как обработанный
        await markAsProcessed(request);
        
        return {
            hasRequest: true,
            request: request.request,
            source: request.source,
            timestamp: request.timestamp
        };
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        return { hasRequest: false, error: error.message };
    }
}

// Экспортируем функции
module.exports = {
    processRequest,
    getLatestRequest,
    isProcessed,
    markAsProcessed
};

// Если запущен напрямую, обрабатываем запрос
if (require.main === module) {
    processRequest().then(result => {
        if (result.hasRequest) {
            console.log('Найден новый запрос:');
            console.log(JSON.stringify(result, null, 2));
        } else {
            console.log(result.message || 'Нет новых запросов для обработки');
        }
    });
}


