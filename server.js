const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const autoProcess = require('./auto-process');

const execAsync = promisify(exec);
const app = express();
const PORT = 3091;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API для игры
app.get('/api/game/words', (req, res) => {
    const words = [
        'кот', 'собака', 'дом', 'машина', 'солнце', 'дерево', 'цветок', 'книга',
        'компьютер', 'телефон', 'самолет', 'корабль', 'велосипед', 'мяч', 'торт',
        'яблоко', 'банан', 'слон', 'лев', 'тигр', 'медведь', 'заяц', 'птица',
        'рыба', 'звезда', 'луна', 'облако', 'дождь', 'снег', 'море', 'гора',
        'река', 'лес', 'бабочка', 'пчела', 'муравей', 'змея', 'лягушка'
    ];
    res.json({ words });
});

// Хранилище для запросов (в реальном приложении можно использовать базу данных)
let requestQueue = [];

// Функция для обработки запроса через AI
async function processAIRequest(userRequest) {
    // Сохраняем запрос в специальный файл для обработки AI
    const requestFile = path.join(__dirname, 'ai-requests', `request-${Date.now()}.json`);
    
    // Создаем директорию, если её нет
    const requestsDir = path.join(__dirname, 'ai-requests');
    try {
        await fs.mkdir(requestsDir, { recursive: true });
    } catch (error) {
        // Директория уже существует
    }
    
    // Сохраняем запрос с метаданными
    const requestData = {
        request: userRequest,
        timestamp: new Date().toISOString(),
        status: 'pending',
        projectPath: __dirname
    };
    
    await fs.writeFile(
        requestFile,
        JSON.stringify(requestData, null, 2),
        'utf8'
    );
    
    // Также сохраняем последний запрос для быстрого доступа
    await fs.writeFile(
        path.join(__dirname, 'last-request.json'),
        JSON.stringify(requestData, null, 2),
        'utf8'
    );
    
    // Сохраняем запрос в простой текстовый файл для прямого чтения AI
    // Это основной файл, который AI будет читать
    await fs.writeFile(
        path.join(__dirname, 'user-request.txt'),
        userRequest,
        'utf8'
    );
    
    // Создаем файл-триггер, чтобы AI знал, что есть новый запрос
    await fs.writeFile(
        path.join(__dirname, 'NEW_REQUEST.txt'),
        `Новый запрос от пользователя:\n\n${userRequest}\n\nВремя: ${new Date().toLocaleString('ru-RU')}\n\nПрочитай этот файл и выполни запрос.`,
        'utf8'
    );
    
    return {
        success: true,
        message: `✅ Запрос отправлен AI: "${userRequest}". Запрос сохранен в user-request.txt и NEW_REQUEST.txt. Теперь скажите AI: "Прочитай NEW_REQUEST.txt и выполни запрос" или "Обработай запрос из user-request.txt"`,
        requestFile: path.basename(requestFile)
    };
}

// API endpoint для обработки запросов
app.post('/api/request', async (req, res) => {
    try {
        const { request } = req.body;
        
        if (!request || typeof request !== 'string') {
            return res.status(400).json({ 
                error: 'Запрос должен быть непустой строкой' 
            });
        }
        
        // Добавляем запрос в очередь
        requestQueue.push({
            request: request,
            timestamp: Date.now()
        });
        
        // Сохраняем запрос в файл для обработки
        const requestData = {
            request: request,
            timestamp: new Date().toISOString()
        };
        
        await fs.writeFile(
            path.join(__dirname, 'pending-request.json'),
            JSON.stringify(requestData, null, 2),
            'utf8'
        );
        
        // Обрабатываем запрос
        const result = await processAIRequest(request);
        
        // Автоматически обрабатываем запрос через AI
        // Создаем файл-триггер для автоматической обработки
        setTimeout(async () => {
            try {
                const processResult = await autoProcess.processRequest();
                if (processResult.hasRequest) {
                    console.log(`🤖 Автоматически обработан запрос: "${processResult.request}"`);
                    // Здесь можно добавить логику для автоматического выполнения запроса
                    // Например, вызов AI API или выполнение команд
                }
            } catch (error) {
                console.error('Ошибка при автоматической обработке:', error);
            }
        }, 1000); // Небольшая задержка для сохранения файла
        
        res.json({
            success: true,
            message: `✅ Запрос отправлен и будет автоматически обработан: "${request}"`,
            requestId: requestQueue.length - 1,
            autoProcess: true
        });
        
    } catch (error) {
        console.error('Ошибка при обработке запроса:', error);
        res.status(500).json({ 
            error: 'Внутренняя ошибка сервера: ' + error.message 
        });
    }
});

// API endpoint для получения статуса
app.get('/api/status', (req, res) => {
    res.json({
        status: 'running',
        queueLength: requestQueue.length,
        lastRequest: requestQueue.length > 0 ? requestQueue[requestQueue.length - 1] : null
    });
});

// API endpoint для получения истории
app.get('/api/history', (req, res) => {
    res.json({
        history: requestQueue.slice(-20) // Последние 20 запросов
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Откройте index.html в браузере или перейдите на http://localhost:${PORT}`);
});

