const video = document.getElementById('video');
const captureCanvas = document.getElementById('captureCanvas');
const startCameraBtn = document.getElementById('startCameraBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const retryBtn = document.getElementById('retryBtn');
const statusEl = document.getElementById('status');
const resultSection = document.getElementById('resultSection');

// Список профессий с характеристиками
const professions = [
    {
        name: 'Программист',
        icon: '💻',
        description: 'Создатель программного обеспечения, разработчик приложений и веб-сайтов. Работает с кодом и решает технические задачи.',
        skills: ['Логическое мышление', 'Внимательность к деталям', 'Усидчивость', 'Аналитические способности', 'Креативность'],
        traits: ['технический', 'аналитический', 'детальный', 'логичный'],
        salary: { min: 80000, max: 250000, currency: '₽' }
    },
    {
        name: 'Дизайнер',
        icon: '🎨',
        description: 'Создатель визуальных решений, работает с графикой, интерфейсами и визуальной коммуникацией.',
        skills: ['Креативность', 'Чувство стиля', 'Внимание к деталям', 'Коммуникабельность', 'Работа с цветом'],
        traits: ['креативный', 'визуальный', 'художественный', 'эстетичный'],
        salary: { min: 60000, max: 180000, currency: '₽' }
    },
    {
        name: 'Врач',
        icon: '👨‍⚕️',
        description: 'Специалист по диагностике и лечению заболеваний, забота о здоровье людей.',
        skills: ['Эмпатия', 'Внимательность', 'Ответственность', 'Аналитическое мышление', 'Стрессоустойчивость'],
        traits: ['заботливый', 'ответственный', 'аналитический', 'эмпатичный'],
        salary: { min: 50000, max: 200000, currency: '₽' }
    },
    {
        name: 'Учитель',
        icon: '👨‍🏫',
        description: 'Педагог, передающий знания и навыки, работающий с людьми и развивающий их потенциал.',
        skills: ['Коммуникабельность', 'Терпение', 'Эмпатия', 'Организаторские способности', 'Знание предмета'],
        traits: ['коммуникабельный', 'терпеливый', 'обучающий', 'организованный'],
        salary: { min: 35000, max: 80000, currency: '₽' }
    },
    {
        name: 'Предприниматель',
        icon: '💼',
        description: 'Создатель бизнеса, лидер команды, принимающий стратегические решения и управляющий проектами.',
        skills: ['Лидерство', 'Принятие решений', 'Коммуникабельность', 'Стрессоустойчивость', 'Стратегическое мышление'],
        traits: ['лидерский', 'решительный', 'коммуникабельный', 'стратегический'],
        salary: { min: 0, max: 0, currency: '₽', note: 'Зависит от успеха бизнеса' }
    },
    {
        name: 'Психолог',
        icon: '🧠',
        description: 'Специалист по изучению человеческого поведения и психики, помогающий людям решать проблемы.',
        skills: ['Эмпатия', 'Активное слушание', 'Аналитическое мышление', 'Терпение', 'Коммуникабельность'],
        traits: ['эмпатичный', 'аналитический', 'терпеливый', 'понимающий'],
        salary: { min: 40000, max: 120000, currency: '₽' }
    },
    {
        name: 'Инженер',
        icon: '⚙️',
        description: 'Специалист по проектированию и созданию технических систем и конструкций.',
        skills: ['Техническое мышление', 'Математика', 'Внимание к деталям', 'Решение проблем', 'Проектирование'],
        traits: ['технический', 'точный', 'аналитический', 'системный'],
        salary: { min: 60000, max: 180000, currency: '₽' }
    },
    {
        name: 'Маркетолог',
        icon: '📊',
        description: 'Специалист по продвижению продуктов и услуг, анализу рынка и работе с аудиторией.',
        skills: ['Аналитика', 'Креативность', 'Коммуникабельность', 'Стратегическое мышление', 'Работа с данными'],
        traits: ['аналитический', 'креативный', 'коммуникабельный', 'стратегический'],
        salary: { min: 50000, max: 150000, currency: '₽' }
    },
    {
        name: 'Писатель',
        icon: '✍️',
        description: 'Создатель текстового контента, автор книг, статей и других литературных произведений.',
        skills: ['Креативность', 'Грамотность', 'Воображение', 'Усидчивость', 'Эмпатия'],
        traits: ['креативный', 'воображение', 'эмпатичный', 'детальный'],
        salary: { min: 30000, max: 200000, currency: '₽', note: 'Зависит от популярности' }
    },
    {
        name: 'Архитектор',
        icon: '🏗️',
        description: 'Проектировщик зданий и сооружений, сочетающий технические знания с художественным видением.',
        skills: ['Креативность', 'Пространственное мышление', 'Технические знания', 'Внимание к деталям', 'Проектирование'],
        traits: ['креативный', 'технический', 'пространственный', 'эстетичный'],
        salary: { min: 70000, max: 200000, currency: '₽' }
    },
    {
        name: 'Веб-разработчик',
        icon: '🌐',
        description: 'Специалист по созданию веб-приложений и сайтов, работающий с frontend и backend технологиями.',
        skills: ['Программирование', 'HTML/CSS/JavaScript', 'Фреймворки', 'Работа с базами данных', 'Веб-технологии'],
        traits: ['технический', 'креативный', 'детальный', 'адаптивный'],
        salary: { min: 80000, max: 250000, currency: '₽' }
    },
    {
        name: 'Мобильный разработчик',
        icon: '📱',
        description: 'Разработчик приложений для мобильных устройств (iOS, Android), создающий удобные интерфейсы.',
        skills: ['Мобильные платформы', 'UI/UX дизайн', 'Программирование', 'Оптимизация', 'Кроссплатформенность'],
        traits: ['технический', 'инновационный', 'пользовательский', 'адаптивный'],
        salary: { min: 90000, max: 280000, currency: '₽' }
    },
    {
        name: 'Backend-разработчик',
        icon: '⚙️',
        description: 'Специалист по серверной части приложений, работающий с базами данных, API и бизнес-логикой.',
        skills: ['Серверные технологии', 'Базы данных', 'API разработка', 'Архитектура систем', 'Безопасность'],
        traits: ['технический', 'логичный', 'системный', 'аналитический'],
        salary: { min: 100000, max: 300000, currency: '₽' }
    },
    {
        name: 'Frontend-разработчик',
        icon: '🎨',
        description: 'Специалист по созданию пользовательских интерфейсов, работающий с визуальной частью приложений.',
        skills: ['HTML/CSS/JavaScript', 'UI/UX дизайн', 'Фреймворки', 'Адаптивность', 'Производительность'],
        traits: ['креативный', 'визуальный', 'детальный', 'пользовательский'],
        salary: { min: 80000, max: 250000, currency: '₽' }
    },
    {
        name: 'DevOps-инженер',
        icon: '🔧',
        description: 'Специалист по автоматизации процессов разработки, развертывания и мониторинга IT-инфраструктуры.',
        skills: ['CI/CD', 'Облачные технологии', 'Контейнеризация', 'Мониторинг', 'Автоматизация'],
        traits: ['технический', 'системный', 'оптимизационный', 'адаптивный'],
        salary: { min: 120000, max: 350000, currency: '₽' }
    },
    {
        name: 'Тестировщик (QA)',
        icon: '🔍',
        description: 'Специалист по обеспечению качества программного обеспечения, выявлению ошибок и тестированию.',
        skills: ['Тестирование', 'Внимательность', 'Аналитическое мышление', 'Документирование', 'Автоматизация тестов'],
        traits: ['детальный', 'аналитический', 'систематичный', 'терпеливый'],
        salary: { min: 60000, max: 180000, currency: '₽' }
    },
    {
        name: 'Системный администратор',
        icon: '🖥️',
        description: 'Специалист по настройке, обслуживанию и обеспечению работоспособности IT-инфраструктуры.',
        skills: ['Операционные системы', 'Сетевые технологии', 'Безопасность', 'Резервное копирование', 'Мониторинг'],
        traits: ['технический', 'ответственный', 'системный', 'решительный'],
        salary: { min: 70000, max: 200000, currency: '₽' }
    },
    {
        name: 'Аналитик данных',
        icon: '📊',
        description: 'Специалист по анализу больших объемов данных, выявлению закономерностей и созданию отчетов.',
        skills: ['Аналитика', 'Статистика', 'Визуализация данных', 'SQL', 'Машинное обучение'],
        traits: ['аналитический', 'детальный', 'логичный', 'систематичный'],
        salary: { min: 90000, max: 250000, currency: '₽' }
    },
    {
        name: 'Специалист по ИИ/ML',
        icon: '🤖',
        description: 'Разработчик систем искусственного интеллекта и машинного обучения для решения сложных задач.',
        skills: ['Машинное обучение', 'Нейронные сети', 'Алгоритмы', 'Python', 'Анализ данных'],
        traits: ['инновационный', 'аналитический', 'математический', 'исследовательский'],
        salary: { min: 150000, max: 400000, currency: '₽' }
    },
    {
        name: 'Бизнес-аналитик',
        icon: '💼',
        description: 'Специалист по анализу бизнес-процессов, оптимизации работы систем и внедрению IT-решений.',
        skills: ['Бизнес-процессы', 'Аналитика', 'Коммуникация', 'ERP/CRM системы', 'Проектирование'],
        traits: ['аналитический', 'коммуникабельный', 'стратегический', 'системный'],
        salary: { min: 80000, max: 200000, currency: '₽' }
    },
    {
        name: 'Архитектор ПО',
        icon: '🏛️',
        description: 'Проектировщик архитектуры программных систем, определяющий структуру и технологии разработки.',
        skills: ['Архитектура систем', 'Проектирование', 'Технологии', 'Масштабируемость', 'Безопасность'],
        traits: ['системный', 'стратегический', 'технический', 'аналитический'],
        salary: { min: 150000, max: 400000, currency: '₽' }
    },
    {
        name: 'Менеджер IT-проектов',
        icon: '📋',
        description: 'Руководитель IT-проектов, координирующий команду разработчиков и обеспечивающий выполнение задач.',
        skills: ['Управление проектами', 'Коммуникация', 'Планирование', 'Командообразование', 'IT-технологии'],
        traits: ['лидерский', 'организованный', 'коммуникабельный', 'стратегический'],
        salary: { min: 100000, max: 300000, currency: '₽' }
    },
    {
        name: 'Администратор БД',
        icon: '🗄️',
        description: 'Специалист по проектированию, настройке и обслуживанию баз данных для обеспечения их эффективной работы.',
        skills: ['Базы данных', 'SQL', 'Оптимизация', 'Резервное копирование', 'Безопасность данных'],
        traits: ['технический', 'системный', 'детальный', 'ответственный'],
        salary: { min: 90000, max: 250000, currency: '₽' }
    },
    {
        name: 'Игровой разработчик',
        icon: '🎮',
        description: 'Создатель видеоигр, работающий над игровыми механиками, графикой и функциональностью игровых приложений.',
        skills: ['Игровые движки', '3D моделирование', 'Игровая физика', 'Программирование', 'Оптимизация'],
        traits: ['креативный', 'технический', 'инновационный', 'увлеченный'],
        salary: { min: 100000, max: 300000, currency: '₽' }
    },
    {
        name: '3D-художник',
        icon: '🎨',
        description: 'Специалист по созданию трехмерной графики, моделей и визуальных эффектов для игр и виртуальных пространств.',
        skills: ['3D моделирование', 'Текстурирование', 'Анимация', 'Рендеринг', 'Визуализация'],
        traits: ['креативный', 'художественный', 'детальный', 'визуальный'],
        salary: { min: 70000, max: 200000, currency: '₽' }
    },
    {
        name: 'VR/AR разработчик',
        icon: '🥽',
        description: 'Создатель приложений виртуальной и дополненной реальности, работающий с инновационными технологиями.',
        skills: ['VR/AR технологии', '3D пространство', 'Интерактивность', 'Программирование', 'UX для VR/AR'],
        traits: ['инновационный', 'технический', 'креативный', 'экспериментальный'],
        salary: { min: 120000, max: 350000, currency: '₽' }
    },
    {
        name: 'Геймдизайнер',
        icon: '🎯',
        description: 'Проектировщик игрового опыта, создающий концепции игр, механики и правила игрового процесса.',
        skills: ['Игровой дизайн', 'Механики игр', 'Балансировка', 'Прототипирование', 'Психология игрока'],
        traits: ['креативный', 'аналитический', 'коммуникабельный', 'стратегический'],
        salary: { min: 80000, max: 250000, currency: '₽' }
    },
    {
        name: 'Технический художник',
        icon: '🖼️',
        description: 'Специалист на стыке программирования и искусства, создающий инструменты и эффекты для игровой графики.',
        skills: ['Шейдеры', 'Визуальные эффекты', 'Оптимизация графики', 'Инструменты разработки', 'Техническая графика'],
        traits: ['технический', 'художественный', 'инновационный', 'решение проблем'],
        salary: { min: 100000, max: 280000, currency: '₽' }
    },
    {
        name: 'Разработчик игровых движков',
        icon: '⚙️',
        description: 'Создатель и оптимизатор игровых движков, обеспечивающих работу игровой графики, физики и логики.',
        skills: ['Игровые движки', 'Графические процессоры', 'Оптимизация', 'Архитектура систем', 'Низкоуровневое программирование'],
        traits: ['технический', 'системный', 'оптимизационный', 'глубокий'],
        salary: { min: 150000, max: 400000, currency: '₽' }
    },
    {
        name: 'Аниматор игр',
        icon: '🎬',
        description: 'Специалист по созданию анимации персонажей, объектов и эффектов в играх и виртуальных пространствах.',
        skills: ['Анимация', '3D моделирование', 'Риггинг', 'Motion capture', 'Визуальные эффекты'],
        traits: ['художественный', 'детальный', 'креативный', 'терпеливый'],
        salary: { min: 70000, max: 200000, currency: '₽' }
    },
    {
        name: 'Разработчик симуляторов',
        icon: '✈️',
        description: 'Создатель симуляторов для обучения, тренировки и моделирования реальных процессов в виртуальной среде.',
        skills: ['Физическое моделирование', 'Алгоритмы', 'Реалистичность', 'Программирование', 'Математика'],
        traits: ['технический', 'точный', 'аналитический', 'системный'],
        salary: { min: 100000, max: 300000, currency: '₽' }
    },
    {
        name: 'Специалист по смешанной реальности',
        icon: '🌐',
        description: 'Разработчик решений, объединяющих виртуальную и реальную реальность для создания инновационных приложений.',
        skills: ['MR технологии', 'Компьютерное зрение', '3D пространство', 'Интерактивность', 'Интеграция реальности'],
        traits: ['инновационный', 'технический', 'креативный', 'исследовательский'],
        salary: { min: 130000, max: 380000, currency: '₽' }
    }
];

// Функция для определения типа профессии
function getProfessionType(profession) {
    const itProfessions = ['Программист', 'Веб-разработчик', 'Мобильный разработчик', 'Backend-разработчик',
                          'Frontend-разработчик', 'DevOps-инженер', 'Тестировщик (QA)', 'Системный администратор',
                          'Аналитик данных', 'Специалист по ИИ/ML', 'Бизнес-аналитик', 'Архитектор ПО',
                          'Менеджер IT-проектов', 'Администратор БД'];
    const tvpProfessions = ['Игровой разработчик', '3D-художник', 'VR/AR разработчик', 'Геймдизайнер',
                           'Технический художник', 'Разработчик игровых движков', 'Аниматор игр',
                           'Разработчик симуляторов', 'Специалист по смешанной реальности'];
    
    if (itProfessions.includes(profession.name)) return 'IT';
    if (tvpProfessions.includes(profession.name)) return 'TVP';
    return 'OTHER';
}

let stream = null;
let currentResult = null;
let scannerAnimationId = null;
let scanY = 0;
let offscreenCanvas = null;
let offscreenCtx = null;

// Включение камеры
startCameraBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        video.srcObject = stream;
        startCameraBtn.style.display = 'none';
        analyzeBtn.style.display = 'inline-block';
        document.getElementById('scanLine').style.display = 'block';
        statusEl.textContent = 'Камера активирована! Нажмите "Анализировать", чтобы выполнить сканирование.';
        statusEl.className = 'status-message success';
        startContourScanner();
    } catch (error) {
        statusEl.textContent = 'Ошибка доступа к камере: ' + error.message;
        statusEl.className = 'status-message error';
    }
});

// Анализ изображения
analyzeBtn.addEventListener('click', () => {
    if (!stream) {
        statusEl.textContent = 'Сначала включите камеру!';
        statusEl.className = 'status-message error';
        return;
    }
    
    statusEl.textContent = 'Фиксация кадра...';
    statusEl.className = 'status-message info';
    stopContourScanner();
    
    // Захватываем кадр с видео перед остановкой камеры
    captureCanvas.width = video.videoWidth;
    captureCanvas.height = video.videoHeight;
    const ctx = captureCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Останавливаем камеру и скрываем видео
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    video.srcObject = null;
    video.style.display = 'none';
    
    // Показываем зафиксированный кадр
    captureCanvas.style.display = 'block';
    captureCanvas.style.width = '100%';
    captureCanvas.style.height = 'auto';
    captureCanvas.style.transform = 'scaleX(-1)';
    
    // Контур и скан-линия остаются над кадром
    const contourCanvas = document.getElementById('contourCanvas');
    const scanLineEl = document.getElementById('scanLine');
    contourCanvas.width = captureCanvas.width;
    contourCanvas.height = captureCanvas.height;
    contourCanvas.style.display = 'block';
    scanLineEl.style.display = 'block';
    
    statusEl.textContent = 'Сканирование...';
    
    const imgData = ctx.getImageData(0, 0, captureCanvas.width, captureCanvas.height);
    const edgePixels = getEdgePixels(imgData.data, captureCanvas.width, captureCanvas.height);
    
    runCaptureScan(edgePixels, captureCanvas.width, captureCanvas.height, () => {
        document.getElementById('overlay').style.display = 'none';
        scanLineEl.style.display = 'none';
        contourCanvas.style.display = 'none';
        statusEl.textContent = 'Анализ изображения...';
        const result = analyzeImage(captureCanvas);
        displayResult(result);
        analyzeBtn.style.display = 'none';
        retryBtn.style.display = 'inline-block';
    });
});

// Повторный анализ
retryBtn.addEventListener('click', async () => {
    resultSection.style.display = 'none';
    analyzeBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    
    // Скрываем кадр и контур
    captureCanvas.style.display = 'none';
    const contourEl = document.getElementById('contourCanvas');
    if (contourEl) contourEl.style.display = 'none';
    
    statusEl.textContent = 'Включение камеры...';
    statusEl.className = 'status-message info';
    
    try {
        // Включаем камеру заново
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        video.srcObject = stream;
        video.style.display = 'block';
        
        // Показываем overlay обратно
        document.getElementById('overlay').style.display = 'block';
        
        analyzeBtn.style.display = 'inline-block';
        document.getElementById('scanLine').style.display = 'block';
        statusEl.textContent = 'Камера активирована! Нажмите "Анализировать", чтобы выполнить сканирование.';
        statusEl.className = 'status-message success';
        startContourScanner();
    } catch (error) {
        statusEl.textContent = 'Ошибка доступа к камере: ' + error.message;
        statusEl.className = 'status-message error';
        startCameraBtn.style.display = 'inline-block';
    }
});

// Сканер по контуру в реальном времени (без ИИ)
const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
const EDGE_STEP = 2;
const EDGE_THRESHOLD = 70;
const SCAN_BAND = 35;
const SCAN_SPEED = 2;
const CAPTURE_SCAN_SPEED = 8;

function getEdgePixels(data, w, h) {
    const edgePixels = [];
    for (let y = 1; y < h - 1; y += EDGE_STEP) {
        for (let x = 1; x < w - 1; x += EDGE_STEP) {
            let gx = 0, gy = 0;
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const i = ((y + ky) * w + (x + kx)) * 4;
                    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    const idx = (ky + 1) * 3 + (kx + 1);
                    gx += gray * sobelX[idx];
                    gy += gray * sobelY[idx];
                }
            }
            const mag = Math.sqrt(gx * gx + gy * gy);
            if (mag > EDGE_THRESHOLD) edgePixels.push({ x, y });
        }
    }
    return edgePixels;
}

function contourScannerLoop() {
    if (!stream || !video.videoWidth) {
        scannerAnimationId = requestAnimationFrame(contourScannerLoop);
        return;
    }
    
    const w = video.videoWidth;
    const h = video.videoHeight;
    const contourCanvas = document.getElementById('contourCanvas');
    const scanLineEl = document.getElementById('scanLine');
    
    if (!offscreenCanvas || offscreenCanvas.width !== w) {
        offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = w;
        offscreenCanvas.height = h;
        offscreenCtx = offscreenCanvas.getContext('2d');
    }
    if (!contourCanvas) return;
    
    contourCanvas.width = w;
    contourCanvas.height = h;
    contourCanvas.style.display = 'block';
    
    offscreenCtx.drawImage(video, 0, 0);
    const imgData = offscreenCtx.getImageData(0, 0, w, h);
    const edgePixels = getEdgePixels(imgData.data, w, h);
    
    scanY = (scanY + SCAN_SPEED) % (h + 80);
    const scanCenter = scanY - 40;
    
    const ctx = contourCanvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    
    const pixelSize = Math.max(1.5, Math.min(3, w / 240));
    
    edgePixels.forEach(p => {
        const d = Math.abs(p.y - scanCenter);
        let alpha = 0;
        if (d < SCAN_BAND) {
            alpha = 1 - d / SCAN_BAND;
            alpha = 0.3 + alpha * 0.7;
        }
        if (alpha > 0) {
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 8;
            ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, pixelSize, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    ctx.shadowBlur = 0;
    
    if (scanLineEl) {
        scanLineEl.style.top = (scanCenter / h * 100) + '%';
    }
    
    scannerAnimationId = requestAnimationFrame(contourScannerLoop);
}

function startContourScanner() {
    scanY = 0;
    if (scannerAnimationId) cancelAnimationFrame(scannerAnimationId);
    scannerAnimationId = requestAnimationFrame(contourScannerLoop);
}

function stopContourScanner() {
    if (scannerAnimationId) {
        cancelAnimationFrame(scannerAnimationId);
        scannerAnimationId = null;
    }
}

// Один проход сканера по зафиксированному кадру (быстрее)
function runCaptureScan(edgePixels, w, h, onComplete) {
    const contourCanvas = document.getElementById('contourCanvas');
    const scanLineEl = document.getElementById('scanLine');
    if (!contourCanvas || !scanLineEl) {
        onComplete();
        return;
    }
    
    let captureScanY = -SCAN_BAND;
    
    function frame() {
        captureScanY += CAPTURE_SCAN_SPEED;
        const scanCenter = captureScanY;
        
        const ctx = contourCanvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
        
        const pixelSize = Math.max(1.5, Math.min(3, w / 240));
        
        edgePixels.forEach(p => {
            const d = Math.abs(p.y - scanCenter);
            let alpha = 0;
            if (d < SCAN_BAND) {
                alpha = 1 - d / SCAN_BAND;
                alpha = 0.3 + alpha * 0.7;
            }
            if (alpha > 0) {
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 8;
                ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, pixelSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.shadowBlur = 0;
        
        scanLineEl.style.top = (scanCenter / h * 100) + '%';
        
        if (captureScanY < h + SCAN_BAND) {
            requestAnimationFrame(frame);
        } else {
            onComplete();
        }
    }
    
    requestAnimationFrame(frame);
}

// Анализ изображения - извлечение характеристик
function analyzeImage(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Анализируем автоматически центральную область кадра (там обычно находится человек)
    const width = canvas.width * 0.6;
    const height = canvas.height * 0.7;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2.5;
    
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data; // Массив RGBA: [R, G, B, A, R, G, B, A, ...]
    
    // ШАГ 1: Анализ яркости изображения
    // Проходим по каждому 16-му пикселю (для оптимизации)
    let brightness = 0;
    const samples = [];
    
    for (let i = 0; i < data.length; i += 16) { // Пропускаем каждый 4-й пиксель
        const r = data[i];     // Красный канал (0-255)
        const g = data[i + 1]; // Зеленый канал (0-255)
        const b = data[i + 2]; // Синий канал (0-255)
        
        // Вычисляем яркость пикселя (среднее значение RGB)
        const pixelBrightness = (r + g + b) / 3;
        brightness += pixelBrightness;
        samples.push({ r, g, b, brightness: pixelBrightness });
    }
    
    // Средняя яркость всего изображения (0-255)
    brightness = brightness / samples.length;
    
    // ШАГ 2: Анализ цветового разнообразия
    // Измеряем, насколько различаются цвета в изображении
    let colorSum = 0;
    samples.forEach(sample => {
        // Сумма разниц между каналами показывает разнообразие цветов
        const colorDiff = Math.abs(sample.r - sample.g) + 
                         Math.abs(sample.g - sample.b) + 
                         Math.abs(sample.b - sample.r);
        colorSum += colorDiff;
    });
    const colorVariance = colorSum / samples.length; // Среднее разнообразие
    
    // ШАГ 3: Анализ контраста
    // Разница между самым темным и самым светлым пикселем
    const sortedBrightness = samples.map(s => s.brightness).sort((a, b) => a - b);
    const minBright = sortedBrightness[0];
    const maxBright = sortedBrightness[sortedBrightness.length - 1];
    const contrast = maxBright - minBright;
    
    // Возвращаем извлеченные характеристики для определения профессии
    return determineProfession(brightness, colorVariance, contrast);
}

// Определение профессии на основе анализа изображения
function determineProfession(brightness, colorVariance, contrast) {
    console.log('📊 Анализ изображения:');
    console.log(`   Яркость: ${brightness.toFixed(1)} (0-255)`);
    console.log(`   Цветовое разнообразие: ${colorVariance.toFixed(1)}`);
    console.log(`   Контраст: ${contrast.toFixed(1)}`);
    
    // ШАГ 1: Вычисляем оценку для каждой профессии
    const scores = professions.map((prof) => {
        let score = 0;
        
        // БАЗОВЫЕ КРИТЕРИИ (применяются ко всем профессиям):
        
        // 1. Качество освещения
        // Нормальное освещение (120-180) = хорошие условия для работы
        if (brightness > 120 && brightness < 180) {
            score += 20;
        }
        
        // 2. Цветовое разнообразие
        // Высокое разнообразие (>30) может указывать на творческие профессии
        if (colorVariance > 30) {
            score += 15;
        }
        
        // 3. Контраст изображения
        // Хороший контраст (>50) = четкое изображение, внимание к деталям
        if (contrast > 50) {
            score += 15;
        }
        
        // СПЕЦИФИЧЕСКИЕ КРИТЕРИИ для каждой профессии:
        
        // Программист: нужны хорошее освещение и контраст (работа за компьютером)
        if (prof.name === 'Программист' && brightness > 100 && contrast > 40) {
            score += 20;
        }
        
        // Дизайнер: важна работа с цветом (высокое цветовое разнообразие)
        if (prof.name === 'Дизайнер' && colorVariance > 40) {
            score += 25;
        }
        
        // Врач: умеренное освещение (клинические условия)
        if (prof.name === 'Врач' && brightness > 110 && brightness < 160) {
            score += 20;
        }
        
        // Учитель: хорошее освещение и контраст (классная комната)
        if (prof.name === 'Учитель' && brightness > 100 && contrast > 30) {
            score += 20;
        }
        
        // Предприниматель: яркое освещение (офис, презентации)
        if (prof.name === 'Предприниматель' && brightness > 120) {
            score += 20;
        }
        
        // Психолог: умеренное освещение (комфортная обстановка)
        if (prof.name === 'Психолог' && brightness > 100 && brightness < 170) {
            score += 20;
        }
        
        // Инженер: хороший контраст (работа с чертежами, деталями)
        if (prof.name === 'Инженер' && contrast > 45) {
            score += 20;
        }
        
        // Маркетолог: яркое освещение и цветовое разнообразие
        if (prof.name === 'Маркетолог' && brightness > 120 && colorVariance > 35) {
            score += 20;
        }
        
        // Писатель: умеренное освещение (комфорт для работы)
        if (prof.name === 'Писатель' && brightness > 100 && brightness < 180) {
            score += 20;
        }
        
        // Архитектор: хороший контраст и цветовое разнообразие
        if (prof.name === 'Архитектор' && contrast > 40 && colorVariance > 30) {
            score += 20;
        }
        
        // IT-профессии: хорошее освещение и контраст (работа за компьютером)
        const itProfessions = ['Веб-разработчик', 'Мобильный разработчик', 'Backend-разработчик', 
                              'Frontend-разработчик', 'DevOps-инженер', 'Тестировщик (QA)', 
                              'Системный администратор', 'Аналитик данных', 'Специалист по ИИ/ML',
                              'Бизнес-аналитик', 'Архитектор ПО', 'Менеджер IT-проектов', 'Администратор БД'];
        
        if (itProfessions.includes(prof.name)) {
            if (brightness > 100 && contrast > 40) {
                score += 25;
            }
            if (colorVariance > 25) {
                score += 15; // IT-специалисты работают с разнообразными интерфейсами
            }
        }
        
        // Специфические бонусы для IT-профессий
        if (prof.name === 'Веб-разработчик' && colorVariance > 35) {
            score += 15; // Работа с цветами в веб-дизайне
        }
        
        if (prof.name === 'Frontend-разработчик' && colorVariance > 40) {
            score += 20; // Визуальная работа с интерфейсами
        }
        
        if (prof.name === 'Аналитик данных' && contrast > 50) {
            score += 15; // Работа с графиками и визуализацией
        }
        
        if (prof.name === 'Специалист по ИИ/ML' && brightness > 120 && contrast > 45) {
            score += 20; // Работа с данными требует хорошего освещения
        }
        
        // ТВП-профессии: работа с визуальным контентом и графикой
        const tvpProfessions = ['Игровой разработчик', '3D-художник', 'VR/AR разработчик', 'Геймдизайнер',
                               'Технический художник', 'Разработчик игровых движков', 'Аниматор игр',
                               'Разработчик симуляторов', 'Специалист по смешанной реальности'];
        
        if (tvpProfessions.includes(prof.name)) {
            if (brightness > 110 && contrast > 45) {
                score += 30; // Работа с графикой требует хорошего освещения
            }
            if (colorVariance > 40) {
                score += 25; // Высокое цветовое разнообразие для визуальных профессий
            }
        }
        
        // Специфические бонусы для ТВП-профессий
        if (prof.name === '3D-художник' && colorVariance > 45) {
            score += 20; // Работа с цветами и текстурами
        }
        
        if (prof.name === 'Геймдизайнер' && brightness > 120 && colorVariance > 35) {
            score += 20; // Творческая работа с визуальным контентом
        }
        
        if (prof.name === 'VR/AR разработчик' && contrast > 50 && brightness > 110) {
            score += 25; // Работа с виртуальными пространствами
        }
        
        return { profession: prof, score: score };
    });
    
    // ШАГ 2: Сортируем профессии по оценке (от большего к меньшему)
    scores.sort((a, b) => b.score - a.score);
    
    // ШАГ 3: Формируем результат
    // Основная профессия - с наивысшей оценкой
    const mainScore = scores[0].score;
    // Ограничиваем процент совпадения от 65% до 95% для реалистичности
    const matchPercentage = Math.min(95, Math.max(65, Math.round(mainScore)));
    
    // Альтернативные профессии - выбираем разнообразные (не только IT)
    const mainProf = scores[0].profession;
    const mainProfType = getProfessionType(mainProf);
    
    // Берем следующие по рейтингу профессии (без случайности)
    const allScores = scores.slice(1);
    const others = allScores.slice(0, 3).map(s => ({
        profession: s.profession,
        match: Math.min(90, Math.max(50, Math.round(s.score)))
    }));
    
    console.log(`✅ Рекомендуемая профессия: ${scores[0].profession.name} (${matchPercentage}%)`);
    
    return {
        main: scores[0].profession,
        match: matchPercentage,
        others: others
    };
}

// Отображение результата
function displayResult(result, selectedProfession = null) {
    // Сохраняем результат для переключения
    currentResult = result;
    
    // Используем выбранную профессию или основную
    const mainProf = selectedProfession || result.main;
    
    document.getElementById('professionIcon').textContent = mainProf.icon;
    document.getElementById('professionName').textContent = mainProf.name;
    document.getElementById('professionDescription').textContent = mainProf.description;
    
    // Обновляем процент совпадения для выбранной профессии
    let matchPercent = result.match;
    if (selectedProfession && selectedProfession !== result.main) {
        // Находим процент для выбранной профессии
        const selectedItem = result.others.find(o => o.profession.name === selectedProfession.name);
        matchPercent = selectedItem ? selectedItem.match : result.match;
    }
    document.getElementById('matchPercentage').textContent = matchPercent + '%';
    
    // Отображаем зарплату
    const salaryEl = document.getElementById('professionSalary');
    if (salaryEl && mainProf.salary) {
        if (mainProf.salary.note) {
            salaryEl.innerHTML = `<strong>Зарплата:</strong> ${mainProf.salary.note}`;
        } else {
            const minFormatted = mainProf.salary.min.toLocaleString('ru-RU');
            const maxFormatted = mainProf.salary.max.toLocaleString('ru-RU');
            salaryEl.innerHTML = `<strong>Зарплата:</strong> ${minFormatted} - ${maxFormatted} ${mainProf.salary.currency}/мес`;
        }
    }
    
    const skillsList = document.getElementById('professionSkills');
    skillsList.innerHTML = '';
    mainProf.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });
    
    const otherProfessionsEl = document.getElementById('otherProfessions');
    otherProfessionsEl.innerHTML = '';
    result.others.forEach(item => {
        const div = document.createElement('div');
        div.className = 'profession-mini';
        div.setAttribute('data-profession', item.profession.name);
        div.style.cursor = 'pointer';
        div.innerHTML = `
            <div class="profession-mini-icon">${item.profession.icon}</div>
            <div class="profession-mini-name">${item.profession.name}</div>
            <div class="profession-mini-match">${item.match}%</div>
        `;
        
        // Добавляем обработчик клика
        div.addEventListener('click', () => {
            // Убираем выделение с других карточек
            document.querySelectorAll('.profession-mini').forEach(card => {
                card.classList.remove('selected');
            });
            // Выделяем текущую карточку
            div.classList.add('selected');
            // Обновляем отображение для выбранной профессии
            displayResult(result, item.profession);
        });
        
        otherProfessionsEl.appendChild(div);
    });
    
    resultSection.style.display = 'block';
    statusEl.textContent = 'Анализ завершен!';
    statusEl.className = 'status-message success';
    
    // Показываем эффект поздравления
    showCelebration(mainProf, matchPercent);
    
    // Отображаем рекомендованные дисциплины
    displayRecommendedTopics(mainProf);
}

// Функция для показа эффекта поздравления
function showCelebration(profession, matchPercent) {
    // Просто запускаем конфетти без попапа
    startConfetti();
    
    // Останавливаем конфетти через 5 секунд
    setTimeout(() => {
        stopConfetti();
    }, 5000);
}

// Конфетти
let confettiParticles = [];
let confettiAnimationId = null;
const confettiCanvas = document.getElementById('confettiCanvas');

function initConfetti() {
    if (!confettiCanvas) return;
    
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
}

function startConfetti() {
    if (!confettiCanvas) return;
    
    initConfetti();
    confettiParticles = [];
    
    // Создаем больше частиц конфетти для красивого эффекта
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b6b', '#4ECDC4', '#ffd700', '#ff9500', '#9d4edd', '#06ffa5'];
    
    // Создаем волны конфетти из разных точек
    const centerX = confettiCanvas.width / 2;
    const centerY = confettiCanvas.height / 2;
    
    // Первая волна из центра вверх
    for (let i = 0; i < 100; i++) {
        const angle = (Math.PI * 2 * i) / 100;
        const distance = Math.random() * 50;
        confettiParticles.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY - 100 + Math.sin(angle) * distance,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 4 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.3,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
    
    // Вторая волна сверху экрана
    for (let i = 0; i < 80; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10 - Math.random() * 50,
            vx: (Math.random() - 0.5) * 2.5,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
    
    // Третья волна из верхних углов
    for (let i = 0; i < 50; i++) {
        const startX = Math.random() > 0.5 ? 0 : confettiCanvas.width;
        confettiParticles.push({
            x: startX,
            y: -10 - Math.random() * 30,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 9 + 5,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.25,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
    
    animateConfetti();
}

function animateConfetti() {
    if (!confettiCanvas || confettiParticles.length === 0) return;
    
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles = confettiParticles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.15; // Гравитация
        particle.vx *= 0.99; // Сопротивление воздуха
        particle.rotation += particle.rotationSpeed;
        
        // Рисуем частицу с тенью для объема
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Тень
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
            ctx.fill();
            // Обводка для объема
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
        } else {
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            // Обводка для объема
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }
        
        ctx.restore();
        
        // Удаляем частицы, которые упали за экран
        return particle.y < confettiCanvas.height + 50;
    });
    
    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    }
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    confettiParticles = [];
    if (confettiCanvas) {
        const ctx = confettiCanvas.getContext('2d');
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// Обновляем размер canvas при изменении размера окна
window.addEventListener('resize', () => {
    if (confettiCanvas) {
        initConfetti();
    }
});

// Инициализация конфетти при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (confettiCanvas) {
            initConfetti();
        }
    });
} else {
    if (confettiCanvas) {
        initConfetti();
    }
}

// Функция для определения профиля на основе профессии
function determineProfile(profession) {
    // Профессии для профиля ТВП (Технологии виртуальных пространств)
    const tvpProfessions = [
        'Игровой разработчик', '3D-художник', 'VR/AR разработчик', 'Геймдизайнер',
        'Технический художник', 'Разработчик игровых движков', 'Аниматор игр',
        'Разработчик симуляторов', 'Специалист по смешанной реальности'
    ];
    
    if (tvpProfessions.includes(profession.name)) {
        return 'TVP';
    }
    
    // Остальные профессии относятся к профилю РКБП
    return 'RKBP';
}

// Функция для получения рекомендованных дисциплин на основе профессии
function getRecommendedTopics(profession) {
    // Определяем профиль
    const profile = determineProfile(profession);
    const profileData = topicsData.profiles[profile];
    
    const allTopics = [
        ...profileData.topics.red,
        ...profileData.topics.green,
        ...profileData.topics.blue,
        ...profileData.topics.orange
    ];
    
    // Ключевые слова для сопоставления профессий с дисциплинами
    const professionKeywords = {
        'Программист': ['программирование', 'разработка', 'алгоритм', 'структуры данных', 'язык', 'приложение', 'веб', 'мобильный', 'бэкенд', 'база данных', 'тестирование', 'информатика', 'технологии программирования'],
        'Дизайнер': ['дизайн', 'интерфейс', 'пользовательский', 'проектирование', 'кроссплатформенный', 'веб', 'мобильный', 'приложение'],
        'Предприниматель': ['управление', 'проект', 'бизнес', 'процесс', 'клиент', 'ресурс', 'предприятие', 'документооборот', 'конфигурация', 'жизненный цикл', 'экономический'],
        'Маркетолог': ['управление', 'клиент', 'анализ', 'бизнес', 'процесс', 'документооборот', 'предприятие'],
        'Инженер': ['проектирование', 'моделирование', 'система', 'архитектура', 'инфраструктура', 'конфигурирование', 'администрирование', 'база данных'],
        'Архитектор': ['проектирование', 'дизайн', 'архитектура', 'моделирование', 'система', 'интерфейс', 'кроссплатформенный'],
        'Психолог': ['психология', 'педагогика', 'социальный', 'коммуникация'],
        'Учитель': ['психология', 'педагогика', 'социальный', 'коммуникация', 'культура речи'],
        'Врач': ['безопасность', 'жизнедеятельность', 'культура'],
        'Писатель': ['культура речи', 'русский язык', 'коммуникация', 'история'],
        'Веб-разработчик': ['веб', 'разработка', 'приложение', 'программирование', 'язык', 'технологии программирования', 'информатика', 'база данных', 'бэкенд'],
        'Мобильный разработчик': ['мобильный', 'приложение', 'разработка', 'кроссплатформенный', 'программирование', 'язык', 'технологии программирования', 'дизайн', 'интерфейс'],
        'Backend-разработчик': ['бэкенд', 'разработка', 'база данных', 'программирование', 'язык', 'технологии программирования', 'архитектура', 'система', 'администрирование'],
        'Frontend-разработчик': ['веб', 'разработка', 'интерфейс', 'пользовательский', 'дизайн', 'программирование', 'язык', 'технологии программирования'],
        'DevOps-инженер': ['операционные системы', 'сетевые технологии', 'инфраструктура', 'система', 'администрирование', 'конфигурирование', 'инфокоммуникационные'],
        'Тестировщик (QA)': ['тестирование', 'приложение', 'кроссплатформенный', 'разработка', 'система', 'проектирование'],
        'Системный администратор': ['операционные системы', 'сетевые технологии', 'администрирование', 'инфраструктура', 'система', 'конфигурирование', 'инфокоммуникационные'],
        'Аналитик данных': ['данные', 'управление данными', 'большие данные', 'статистика', 'вероятность', 'анализ', 'информационно-аналитические'],
        'Специалист по ИИ/ML': ['искусственный интеллект', 'большие данные', 'алгоритм', 'структуры данных', 'математический', 'статистика', 'вероятность', 'моделирование'],
        'Бизнес-аналитик': ['бизнес', 'процесс', 'анализ', 'моделирование', 'управление', 'клиент', 'ресурс', 'предприятие', 'информационно-аналитические', 'экономический'],
        'Архитектор ПО': ['архитектура', 'система', 'проектирование', 'моделирование', 'разработка', 'инфраструктура', 'конфигурирование'],
        'Менеджер IT-проектов': ['управление', 'проект', 'разработка', 'система', 'бизнес', 'процесс', 'жизненный цикл'],
        'Администратор БД': ['база данных', 'проектирование', 'администрирование', 'данные', 'управление данными', 'система'],
        'Игровой разработчик': ['игр', 'разработка', 'моделирование', 'трехмерное', 'пространств', 'симулятор', 'мультиплеер', 'анимационн', 'графическ'],
        '3D-художник': ['трехмерное', 'моделирование', 'игр', 'пространств', 'анимационн', 'графическ', 'визуальн'],
        'VR/AR разработчик': ['смешанной реальности', 'виртуальн', 'разработка', 'пространств', 'трехмерное', 'моделирование'],
        'Геймдизайнер': ['игр', 'разработка', 'игровых', 'пространств', 'моделирование', 'симулятор'],
        'Технический художник': ['графическ', 'процессор', 'визуальн', 'моделирование', 'трехмерное', 'игр'],
        'Разработчик игровых движков': ['графическ', 'процессор', 'игр', 'разработка', 'архитектура', 'система'],
        'Аниматор игр': ['анимационн', 'моделирование', 'трехмерное', 'игр', 'пространств'],
        'Разработчик симуляторов': ['симулятор', 'алгоритм', 'моделирование', 'разработка', 'игр'],
        'Специалист по смешанной реальности': ['смешанной реальности', 'виртуальн', 'разработка', 'пространств', 'трехмерное']
    };
    
    const keywords = professionKeywords[profession.name] || ['программирование', 'разработка', 'система'];
    
    // Находим подходящие дисциплины
    const recommended = allTopics
        .map(topic => {
            let score = 0;
            const titleLower = topic.title.toLowerCase();
            
            keywords.forEach(keyword => {
                if (titleLower.includes(keyword.toLowerCase())) {
                    score += 10;
                }
            });
            
            // Дополнительные бонусы для IT-профессий (профиль РКБП)
            const itProfessionsList = ['Программист', 'Дизайнер', 'Инженер', 'Архитектор', 
                                      'Веб-разработчик', 'Мобильный разработчик', 'Backend-разработчик',
                                      'Frontend-разработчик', 'DevOps-инженер', 'Тестировщик (QA)',
                                      'Системный администратор', 'Аналитик данных', 'Специалист по ИИ/ML',
                                      'Бизнес-аналитик', 'Архитектор ПО', 'Менеджер IT-проектов', 'Администратор БД'];
            
            if (itProfessionsList.includes(profession.name)) {
                if (profileData.topics.green.includes(topic) || profileData.topics.blue.includes(topic)) {
                    score += 5;
                }
            }
            
            // Бонусы для профессий ТВП
            const tvpProfessionsList = ['Игровой разработчик', '3D-художник', 'VR/AR разработчик', 'Геймдизайнер',
                                       'Технический художник', 'Разработчик игровых движков', 'Аниматор игр',
                                       'Разработчик симуляторов', 'Специалист по смешанной реальности'];
            
            if (tvpProfessionsList.includes(profession.name)) {
                if (profileData.topics.orange.includes(topic)) {
                    score += 10; // Высокий приоритет для специализированных дисциплин ТВП
                }
                if (profileData.topics.blue.includes(topic)) {
                    score += 5;
                }
            }
            
            // Бонусы для бизнес-профессий
            if (['Предприниматель', 'Маркетолог'].includes(profession.name)) {
                if (profileData.topics.orange.includes(topic)) {
                    score += 5;
                }
            }
            
            return { topic, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8) // Топ-8 рекомендованных дисциплин
        .map(item => item.topic);
    
    return { topics: recommended, profile: profileData };
}

// Отображение рекомендованных дисциплин
function displayRecommendedTopics(profession) {
    const result = getRecommendedTopics(profession);
    const recommendedTopics = result.topics;
    const profileData = result.profile;
    const topicsListEl = document.getElementById('recommendedTopics');
    
    if (!topicsListEl) return;
    
    topicsListEl.innerHTML = '';
    
    // Добавляем информацию о рекомендованном профиле
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    profileInfo.innerHTML = `
        <div class="profile-badge">
            <strong>Рекомендуемый профиль:</strong> ${profileData.profile} (${profileData.profileShort})
        </div>
    `;
    topicsListEl.appendChild(profileInfo);
    
    if (recommendedTopics.length === 0) {
        const noTopicsMsg = document.createElement('p');
        noTopicsMsg.style.textAlign = 'center';
        noTopicsMsg.style.opacity = '0.9';
        noTopicsMsg.textContent = 'Рекомендуем изучить все дисциплины кафедры КБ9 для всестороннего развития!';
        topicsListEl.appendChild(noTopicsMsg);
        return;
    }
    
    recommendedTopics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        
        const details = [];
        if (topic.creditUnit) details.push(`<div><strong>З.е.:</strong> ${topic.creditUnit}</div>`);
        if (topic.lecture) details.push(`<div><strong>Лекции:</strong> ${topic.lecture}</div>`);
        if (topic.practice) details.push(`<div><strong>Практика:</strong> ${topic.practice}</div>`);
        if (topic.exam) details.push(`<div><strong>Экзамен:</strong> ${topic.exam}</div>`);
        if (topic.test) details.push(`<div><strong>Зачет:</strong> ${topic.test}</div>`);
        if (topic.course && topic.course.length > 0) {
            details.push(`<div><strong>Курс:</strong> ${topic.course.join(', ')}</div>`);
        }
        
        card.innerHTML = `
            <div class="topic-title">${topic.title}</div>
            <div class="topic-details">
                ${details.join('')}
            </div>
        `;
        
        topicsListEl.appendChild(card);
    });
}

