// =====================================================
// ФУНКЦИЯ: Получение даты следующего Нового года
// =====================================================
function getNextNewYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    return new Date(currentYear + 1, 0, 1, 0, 0, 0);
}

// =====================================================
// ФУНКЦИЯ: Склонение русских слов
// =====================================================
function declension(number, forms) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
        return forms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return forms[1];
    }
    if (n1 === 1) {
        return forms[0];
    }
    return forms[2];
}

// =====================================================
// ФУНКЦИЯ: Вычисление разницы между датами
// =====================================================
function calculateTimeDifference(targetDate) {
    const now = new Date();
    let months = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (now >= targetDate) {
        targetDate = new Date(targetDate.getFullYear() + 1, 0, 1, 0, 0, 0);
    }

    months = (targetDate.getFullYear() - now.getFullYear()) * 12 
             + (targetDate.getMonth() - now.getMonth());

    const tempDate = new Date(now);
    tempDate.setMonth(tempDate.getMonth() + months);

    if (tempDate > targetDate) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
    }

    const diffMs = targetDate - tempDate;
    const totalSeconds = Math.floor(diffMs / 1000);

    days = Math.floor(totalSeconds / (3600 * 24));
    hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;

    return { months, days, hours, minutes, seconds };
}

// =====================================================
// ФУНКЦИЯ: Форматирование целевой даты
// =====================================================
function formatTargetDate(targetDate) {
    const options = { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return targetDate.toLocaleDateString('ru-RU', options);
}

// =====================================================
// ФУНКЦИЯ: Обновление таймера на странице
// =====================================================
function updateTimer() {
    const targetDate = getNextNewYear();
    const time = calculateTimeDifference(targetDate);

    document.getElementById('months').textContent = time.months;
    document.getElementById('days').textContent = time.days;
    document.getElementById('hours').textContent = time.hours;
    document.getElementById('minutes').textContent = time.minutes;
    document.getElementById('seconds').textContent = time.seconds;

    document.getElementById('months-label').textContent = 
        declension(time.months, ['месяц', 'месяца', 'месяцев']);
    document.getElementById('days-label').textContent = 
        declension(time.days, ['день', 'дня', 'дней']);
    document.getElementById('hours-label').textContent = 
        declension(time.hours, ['час', 'часа', 'часов']);
    document.getElementById('minutes-label').textContent = 
        declension(time.minutes, ['минута', 'минуты', 'минут']);
    document.getElementById('seconds-label').textContent = 
        declension(time.seconds, ['секунда', 'секунды', 'секунд']);

    document.getElementById('target-date').textContent = 
        `🎅 Цель: ${formatTargetDate(targetDate)}`;
}

// =====================================================
// СНЕГОПАД
// =====================================================
function createSnowflakes() {
    const snowContainer = document.getElementById('snow');
    const snowflakeCount = 50; // Количество снежинок

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Случайный размер снежинки (от 2 до 6 пикселей)
        const size = Math.random() * 4 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Случайная позиция по горизонтали
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Случайная длительность падения (от 5 до 15 секунд)
        const duration = Math.random() * 10 + 5;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Случайная задержка (чтобы снежинки не падали одновременно)
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        
        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        snowContainer.appendChild(snowflake);
    }
}

// =====================================================
// ЗАПУСК
// =====================================================

// Создаём снежинки при загрузке
createSnowflakes();

// Обновляем таймер сразу и каждую секунду
updateTimer();
setInterval(updateTimer, 1000);
