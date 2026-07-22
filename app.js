// =====================================================
// НАСТРОЙКИ ГОРОДОВ И ПЕРЕМЕННЫЕ
// =====================================================

// Текущий город (читаем из памяти или ставим Лиссабон по умолчанию)
let currentCity = localStorage.getItem('selectedCity') || 'lisbon';

// Текущий режим (false = день, true = ночь)
let isNightMode = localStorage.getItem('lisbonTheme') === 'night';

// Флаг, чтобы конфетти выстрелило только один раз
let confettiLaunched = false;

// База данных городов (часовые пояса в часах относительно UTC)
const cities = {
  lisbon: {
    name: 'Лиссабоне',
    flag: '🇵🇹',
    timezone: 0, // UTC+0
    photos: {
      day: [
        'images/lisbon-1.jpg',
        'images/lisbon-2.jpg',
        'images/lisbon-3.jpg',
        'images/lisbon-4.jpg',
        'images/lisbon-5.jpg',
        'images/lisbon-6.jpg',
      ],
      night: [
        'images/lisbon-night-1.jpg',
        'images/lisbon-night-2.jpg',
        'images/lisbon-night-3.jpg',
        'images/lisbon-night-4.jpg',
        'images/lisbon-night-5.jpg',
        'images/lisbon-night-6.jpg',
      ],
    },
    photosMobile: {
      day: [
        'images/mobile/lisbon-1-mobile.jpg',
        'images/mobile/lisbon-2-mobile.jpg',
        'images/mobile/lisbon-3-mobile.jpg',
        'images/mobile/lisbon-4-mobile.jpg',
        'images/mobile/lisbon-5-mobile.jpg',
        'images/mobile/lisbon-6-mobile.jpg',
      ],
      night: [
        'images/mobile/lisbon-night-1-mobile.jpg',
        'images/mobile/lisbon-night-2-mobile.jpg',
        'images/mobile/lisbon-night-3-mobile.jpg',
        'images/mobile/lisbon-night-4-mobile.jpg',
        'images/mobile/lisbon-night-5-mobile.jpg',
        'images/mobile/lisbon-night-6-mobile.jpg',
      ],
    },
  },
  moscow: {
    name: 'Москве',
    flag: '🇷🇺',
    timezone: 3, // UTC+3
    photos: {
      day: [
        'images/moscow-1.jpg',
        'images/moscow-2.jpg',
        'images/moscow-3.jpg',
        'images/moscow-4.jpg',
        'images/moscow-5.jpg',
        'images/moscow-6.jpg',
      ],
      night: [
        'images/moscow-night-1.jpg',
        'images/moscow-night-2.jpg',
        'images/moscow-night-3.jpg',
        'images/moscow-night-4.jpg',
        'images/moscow-night-5.jpg',
        'images/moscow-night-6.jpg',
      ],
    },
    photosMobile: {
      day: [
        'images/mobile/moscow-1-mobile.jpg',
        'images/mobile/moscow-2-mobile.jpg',
        'images/mobile/moscow-3-mobile.jpg',
        'images/mobile/moscow-4-mobile.jpg',
        'images/mobile/moscow-5-mobile.jpg',
        'images/mobile/moscow-6-mobile.jpg',
      ],
      night: [
        'images/mobile/moscow-night-1-mobile.jpg',
        'images/mobile/moscow-night-2-mobile.jpg',
        'images/mobile/moscow-night-3-mobile.jpg',
        'images/mobile/moscow-night-4-mobile.jpg',
        'images/mobile/moscow-night-5-mobile.jpg',
        'images/mobile/moscow-night-6-mobile.jpg',
      ],
    },
  },
  newyork: {
    name: 'Нью-Йорке',
    flag: '🇺🇸',
    timezone: -5, // UTC-5
    photos: {
      day: [
        'images/newyork-1.jpg',
        'images/newyork-2.jpg',
        'images/newyork-3.jpg',
        'images/newyork-4.jpg',
        'images/newyork-5.jpg',
        'images/newyork-6.jpg',
      ],
      night: [
        'images/newyork-night-1.jpg',
        'images/newyork-night-2.jpg',
        'images/newyork-night-3.jpg',
        'images/newyork-night-4.jpg',
        'images/newyork-night-5.jpg',
        'images/newyork-night-6.jpg',
      ],
    },
    photosMobile: {
      day: [
        'images/mobile/newyork-1-mobile.jpg',
        'images/mobile/newyork-2-mobile.jpg',
        'images/mobile/newyork-3-mobile.jpg',
        'images/mobile/newyork-4-mobile.jpg',
        'images/mobile/newyork-5-mobile.jpg',
        'images/mobile/newyork-6-mobile.jpg',
      ],
      night: [
        'images/mobile/newyork-night-1-mobile.jpg',
        'images/mobile/newyork-night-2-mobile.jpg',
        'images/mobile/newyork-night-3-mobile.jpg',
        'images/mobile/newyork-night-4-mobile.jpg',
        'images/mobile/newyork-night-5-mobile.jpg',
        'images/mobile/newyork-night-6-mobile.jpg',
      ],
    },
  },
};

// =====================================================
// ФУНКЦИЯ: Получение даты следующего Нового года (с учётом часового пояса)
// =====================================================
function getNextNewYear() {
  const city = cities[currentCity];
  const now = new Date();
  const currentYear = now.getFullYear();

  // Создаем дату 1 января следующего года в UTC (полночь)
  const targetUTC = new Date(Date.UTC(currentYear + 1, 0, 1, 0, 0, 0));

  // Корректируем на часовой пояс города
  targetUTC.setHours(targetUTC.getHours() - city.timezone);

  return targetUTC;
}

// =====================================================
// ФУНКЦИЯ: Запуск конфетти
// =====================================================
function launchConfetti() {
  if (confettiLaunched) return;
  confettiLaunched = true;

  console.log('🎊 Запускаю конфетти!');

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
    });
  }, 250);
}

// =====================================================
// ФУНКЦИЯ: Склонение русских слов
// =====================================================
function declension(number, forms) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

// =====================================================
// ФУНКЦИЯ: Вычисление разницы между датами
// =====================================================
function calculateTimeDifference(targetDate) {
  const now = new Date();
  let months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  if (now >= targetDate) {
    targetDate = new Date(targetDate.getFullYear() + 1, 0, 1, 0, 0, 0);
  }

  months =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth());

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
  // Всегда показываем "1 января [год]", независимо от часового пояса устройства
  // Если из-за часового пояса дата сдвинулась на 31 декабря, берем следующий год
  const year =
    targetDate.getMonth() === 11 && targetDate.getDate() === 31
      ? targetDate.getFullYear() + 1
      : targetDate.getFullYear();
  return `1 января ${year} г.`;
}

// =====================================================
// ФУНКЦИЯ: Обновление таймера на странице
// =====================================================
function updateTimer() {
  const targetDate = getNextNewYear();
  const time = calculateTimeDifference(targetDate);
  const city = cities[currentCity];

  // Обновляем заголовок города
  document.getElementById('city-title').textContent =
    `🎄 До Нового года в ${city.name} осталось:`;

  document.getElementById('months').textContent = time.months;
  document.getElementById('days').textContent = time.days;
  document.getElementById('hours').textContent = time.hours;
  document.getElementById('minutes').textContent = time.minutes;
  document.getElementById('seconds').textContent = time.seconds;

  document.getElementById('months-label').textContent = declension(
    time.months,
    ['месяц', 'месяца', 'месяцев'],
  );
  document.getElementById('days-label').textContent = declension(time.days, [
    'день',
    'дня',
    'дней',
  ]);
  document.getElementById('hours-label').textContent = declension(time.hours, [
    'час',
    'часа',
    'часов',
  ]);
  document.getElementById('minutes-label').textContent = declension(
    time.minutes,
    ['минута', 'минуты', 'минут'],
  );
  document.getElementById('seconds-label').textContent = declension(
    time.seconds,
    ['секунда', 'секунды', 'секунд'],
  );

  if (
    time.months === 0 &&
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    document.getElementById('target-date').textContent = '🎉 С Новым Годом! 🎉';
    launchConfetti();
  } else {
    document.getElementById('target-date').textContent =
      `🎅 Цель: ${formatTargetDate(targetDate)}`;
  }
}

// =====================================================
// СЛАЙД-ШОУ С ФОТО (ДЕНЬ / НОЧЬ + ГОРОДА)
// =====================================================

// Функция получения нужного набора фото
function getCurrentPhotoSet() {
  const currentIsMobile = window.innerWidth <= 768;
  const city = cities[currentCity];
  const photoSet = currentIsMobile ? city.photosMobile : city.photos;
  return isNightMode ? photoSet.night : photoSet.day;
}

let currentSlide = 0;

function initSlideshow() {
  const slideshowContainer = document.querySelector('.background-slideshow');
  const photos = getCurrentPhotoSet();

  // Очищаем старые слайды
  slideshowContainer.innerHTML = '';

  // Создаём слайды
  photos.forEach((photoUrl, index) => {
    const slide = document.createElement('div');
    slide.className = 'background-slide';
    slide.style.backgroundImage = `url('${photoUrl}')`;
    if (index === 0) slide.classList.add('active');
    slideshowContainer.appendChild(slide);
  });
}

function changeSlide() {
  const slides = document.querySelectorAll('.background-slide');
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

// =====================================================
// ОБРАБОТЧИКИ СОБЫТИЙ
// =====================================================

// 1. Переключатель День/Ночь
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
  themeSwitch.checked = isNightMode;

  themeSwitch.addEventListener('change', function () {
    isNightMode = this.checked;
    localStorage.setItem('lisbonTheme', isNightMode ? 'night' : 'day');

    const newPhotos = getCurrentPhotoSet();
    const slides = document.querySelectorAll('.background-slide');

    slides.forEach((slide, index) => {
      slide.style.backgroundImage = `url('${newPhotos[index]}')`;
    });

    slides.forEach((slide) => slide.classList.remove('active'));
    currentSlide = 0;
    slides[currentSlide].classList.add('active');

    console.log(
      isNightMode ? '🌙 Ночной режим включён' : '☀️ Дневной режим включён',
    );
  });
}

// 2. Переключатель городов
const cityButtons = document.querySelectorAll('.city-btn');
cityButtons.forEach((btn) => {
  // Устанавливаем активную кнопку при загрузке
  if (btn.dataset.city === currentCity) {
    btn.classList.add('active');
  }

  btn.addEventListener('click', function () {
    const newCity = this.dataset.city;
    if (newCity === currentCity) return; // Уже выбран

    currentCity = newCity;
    localStorage.setItem('selectedCity', currentCity);

    // Обновляем активную кнопку
    cityButtons.forEach((b) => b.classList.remove('active'));
    this.classList.add('active');

    // Перезапускаем слайд-шоу с новыми фото
    currentSlide = 0;
    initSlideshow();

    // Сбрасываем флаг конфетти для нового города
    confettiLaunched = false;

    // Обновляем таймер (он сам обновит заголовок)
    updateTimer();

    console.log(`🌍 Город изменён на: ${cities[currentCity].name}`);
  });
});

// 3. Пересоздаём слайд-шоу при изменении размера окна (мобильный <-> десктоп)
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    const newIsMobile = window.innerWidth <= 768;
    const oldIsMobile = getCurrentPhotoSet().some((url) =>
      url.includes('mobile'),
    );

    if (newIsMobile !== oldIsMobile) {
      location.reload();
    }
  }, 250);
});

// =====================================================
// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// =====================================================
initSlideshow();
setInterval(changeSlide, 8000); // Меняем фото каждые 8 секунд

updateTimer(); // Первый запуск таймера сразу
setInterval(updateTimer, 1000); // Обновление каждую секунду
