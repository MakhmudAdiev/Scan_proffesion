const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Откройте index.html в браузере или перейдите на http://localhost:${PORT}`);
});

