const requestInput = document.getElementById('requestInput');
const sendButton = document.getElementById('sendButton');
const clearButton = document.getElementById('clearButton');
const responseSection = document.getElementById('responseSection');
const responseContent = document.getElementById('responseContent');
const historyList = document.getElementById('historyList');

// Загрузка истории из localStorage
let history = JSON.parse(localStorage.getItem('requestHistory')) || [];

// Отображение истории
function displayHistory() {
    historyList.innerHTML = '';
    history.slice(-10).reverse().forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-request">${item.request}</div>
            <div class="history-time">${new Date(item.timestamp).toLocaleString('ru-RU')}</div>
        `;
        historyItem.addEventListener('click', () => {
            requestInput.value = item.request;
        });
        historyList.appendChild(historyItem);
    });
}

// Инициализация истории
displayHistory();

// Отправка запроса
sendButton.addEventListener('click', async () => {
    const request = requestInput.value.trim();
    
    if (!request) {
        alert('Пожалуйста, введите запрос');
        return;
    }
    
    // Блокируем кнопку
    sendButton.disabled = true;
    sendButton.querySelector('.btn-text').style.display = 'none';
    sendButton.querySelector('.btn-loader').style.display = 'inline';
    
    // Показываем секцию ответа
    responseSection.style.display = 'block';
    responseContent.textContent = 'Обработка запроса...';
    responseContent.className = 'response-content';
    
    try {
        const response = await fetch('http://localhost:3091/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request: request })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            responseContent.textContent = data.message || 'Запрос успешно обработан!';
            responseContent.className = 'response-content success';
            
            // Показываем инструкцию об автоматической обработке
            const instructionBox = document.getElementById('instructionBox');
            if (instructionBox) {
                instructionBox.style.display = 'block';
            }
            
            // Добавляем в историю
            history.push({
                request: request,
                timestamp: Date.now(),
                success: true
            });
            localStorage.setItem('requestHistory', JSON.stringify(history));
            displayHistory();
        } else {
            responseContent.textContent = data.error || 'Произошла ошибка при обработке запроса';
            responseContent.className = 'response-content error';
            
            // Скрываем инструкцию при ошибке
            const instructionBox = document.getElementById('instructionBox');
            if (instructionBox) {
                instructionBox.style.display = 'none';
            }
        }
    } catch (error) {
        responseContent.textContent = `Ошибка соединения: ${error.message}. Убедитесь, что сервер запущен на порту 3091.`;
        responseContent.className = 'response-content error';
    } finally {
        // Разблокируем кнопку
        sendButton.disabled = false;
        sendButton.querySelector('.btn-text').style.display = 'inline';
        sendButton.querySelector('.btn-loader').style.display = 'none';
    }
});

// Очистка поля ввода
clearButton.addEventListener('click', () => {
    requestInput.value = '';
    requestInput.focus();
});

// Отправка по Enter (Ctrl+Enter)
requestInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        sendButton.click();
    }
});

