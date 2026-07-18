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
// СЛАЙД-ШОУ ФОТО ЛИССАБОНА
// =====================================================

// Фото Лиссабона с Unsplash (предновогодние и праздничные)
const lisbonPhotos = [
    // Замок Святого Георгия
    'https://images.unsplash.com/photo-1555881400-744a674ad223?w=1920',
    // Площадь Коммерции
    'https://images.unsplash.com/photo-1585238342024-78d3811b48f7?w=1920',
    // Трамвай 28
    'https://images.unsplash.com/photo-1557621953-411a0810bb2a?w=1920',
    // Башня Белен
    'https://images.unsplash.com/photo-158258259197b0679f793cd12b465e8d?w=1920',
    // Ночной Лиссабон
    'https://images.unsplash.com/photo-1564595880728-2dfd1714433b?w=1920',
    // Алфама
    'https://images.unsplash.com/photo-15839591747bf8-5e4e67e2a9b6?w=1920',
    // Мост 25 апреля
    'https://images.unsplash.com/photo-1555881400-744a674ad223?w=1920',
    // Праздничный Лиссабон
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920'
];

let currentSlide = 0;

function initSlideshow() {
    const slideshowContainer = document.querySelector('.background-slideshow');
    
    // Создаём слайды
    lisbonPhotos.forEach((photoUrl, index) => {
        const slide = document.createElement('div');
        slide.className = 'background-slide';
        slide.style.backgroundImage = `url(${photoUrl})`;
        
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
    
    // Добавляем затемнение
    const overlay = document.createElement('div');
    overlay.className = 'background-overlay';
    slideshowContainer.appendChild(overlay);
}

function changeSlide() {
    const slides = document.querySelectorAll('.background-slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % lisbonPhotos.length;
    
    slides[currentSlide].classList.add('active');
}

// =====================================================
// ЗАПУСК
// =====================================================

// Инициализация слайд-шоу
initSlideshow();

// Меняем фото каждые 8 секунд
setInterval(changeSlide, 8000);

// Обновляем таймер сразу и каждую секунду
updateTimer();
setInterval(updateTimer, 1000);
