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

  document.getElementById('target-date').textContent =
    `🎅 Цель: ${formatTargetDate(targetDate)}`;
}

// =====================================================
// ФЕЙЕРВЕРКИ НАД ЛИССАБОНОМ
// =====================================================

// Создание одного фейерверка в заданной точке
function createFirework(x, y) {
  const fireworks = document.getElementById('fireworks');
  const colors = [
    '#ffd700',
    '#ff6b6b',
    '#4ecdc4',
    '#ff1493',
    '#00ff00',
    '#ff8c00',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Создаём 20 частиц
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.background = color;
    particle.style.boxShadow = `0 0 6px ${color}`;

    // Случайное направление разлёта
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 50 + Math.random() * 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    fireworks.appendChild(particle);

    // Удаляем частицу после завершения анимации
    setTimeout(() => particle.remove(), 1500);
  }
}

// Случайный фейерверк
function autoFirework() {
  const x = 10 + Math.random() * 80;
  const y = 10 + Math.random() * 50;
  createFirework(x, y);
}

// Проверка особых моментов (последние 10 секунд)
function checkSpecialMoments() {
  const time = calculateTimeDifference(getNextNewYear());

  // Если до Нового года меньше 10 секунд — запускаем салют!
  if (
    time.seconds < 10 &&
    time.minutes === 0 &&
    time.hours === 0 &&
    time.days === 0 &&
    time.months === 0
  ) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => autoFirework(), i * 300);
    }
  }
}

// =====================================================
// ЗАПУСК ТАЙМЕРА И АНИМАЦИЙ
// =====================================================

// Обновляем таймер сразу и каждую секунду
updateTimer();
setInterval(updateTimer, 1000);

// Запускаем фейерверки каждые 3 секунды (с вероятностью 60%)
setInterval(() => {
  if (Math.random() > 0.4) {
    autoFirework();
  }
}, 3000);

// Проверяем особые моменты каждую секунду
setInterval(checkSpecialMoments, 1000);
