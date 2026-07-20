// =====================================================
// ФУНКЦИЯ: Получение даты следующего Нового года
// =====================================================
function getNextNewYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    return new Date(currentYear + 1, 0, 1, 0, 0, 0);
}

// Флаг, чтобы конфетти выстрелило только один раз
let confettiLaunched = false;

// Функция запуска конфетти (теперь она точно в глобальной области видимости)
function launchConfetti() {
    if (confettiLaunched) return; // Если уже запускали, выходим
    confettiLaunched = true;

    console.log('🎊 Запускаю конфетти!');

    // Первый залп
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });

    // Второй залп через 250мс (для красоты)
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
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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

  // Проверка наступления Нового года
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
// СЛАЙД-ШОУ С ФОТО ЛИССАБОНА
// =====================================================
// Определяем мобильное устройство
const isMobile = window.innerWidth <= 768;

// Выбираем фото в зависимости от устройства
const lisbonPhotos = isMobile
  ? [
      'images/mobile/lisbon-1-mobile.jpg',
      'images/mobile/lisbon-2-mobile.jpg',
      'images/mobile/lisbon-3-mobile.jpg',
      'images/mobile/lisbon-4-mobile.jpg',
      'images/mobile/lisbon-5-mobile.jpg',
      'images/mobile/lisbon-6-mobile.jpg',
    ]
  : [
      'images/lisbon-1.jpg',
      'images/lisbon-2.jpg',
      'images/lisbon-3.jpg',
      'images/lisbon-4.jpg',
      'images/lisbon-5.jpg',
      'images/lisbon-6.jpg',
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
}

function changeSlide() {
  const slides = document.querySelectorAll('.background-slide');

  if (slides.length === 0) return;

  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % lisbonPhotos.length;
  slides[currentSlide].classList.add('active');
}

// Пересоздаём слайд-шоу при изменении размера окна
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Проверяем, изменился ли тип устройства
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      location.reload(); // Перезагружаем страницу
    }
  }, 250);
});

// Запускаем слайд-шоу при загрузке
initSlideshow();

// Меняем фото каждые 8 секунд
setInterval(changeSlide, 8000);

// =====================================================
// ЗАПУСК ТАЙМЕРА
// =====================================================

updateTimer(); // Первый запуск сразу, чтобы не ждать 1 секунду до появления цифр
setInterval(updateTimer, 1000); // Обновление каждую секунду (1000 мс)



