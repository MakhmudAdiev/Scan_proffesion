/**
 * Скрипт для автоматического чтения и обработки запросов
 * Этот файл можно вызвать для обработки последнего запроса
 */

const autoProcess = require('./auto-process');
const fs = require('fs').promises;
const path = require('path');

async function main() {
    console.log('🔍 Проверяю наличие новых запросов...\n');
    
    const result = await autoProcess.processRequest();
    
    if (result.hasRequest) {
        console.log('✅ Найден новый запрос:');
        console.log(`   Запрос: "${result.request}"`);
        console.log(`   Источник: ${result.source}`);
        console.log(`   Время: ${new Date(result.timestamp).toLocaleString('ru-RU')}\n`);
        console.log('📝 Запрос готов к обработке AI.\n');
        console.log('💡 Теперь AI может прочитать этот запрос и выполнить его.');
        return result.request;
    } else {
        console.log(`ℹ️  ${result.message || 'Нет новых запросов для обработки'}\n`);
        return null;
    }
}

// Запускаем, если вызван напрямую
if (require.main === module) {
    main().catch(error => {
        console.error('Ошибка:', error);
        process.exit(1);
    });
}

module.exports = { main };


