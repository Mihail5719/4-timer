// Получаем целевую дату — 1 января следующего года
function getNextNewYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Новый год — это 1 января следующего года, 00:00:00
  return new Date(currentYear + 1, 0, 1, 0, 0, 0);
}

// Функция склонения русских слов (1 месяц, 2 месяца, 5 месяцев)
function declension(number, forms) {
  // forms = ['месяц', 'месяца', 'месяцев']
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

// Вычисляем разницу между текущей датой и Новым годом
function calculateTimeDifference(targetDate) {
  const now = new Date();
  let months = 0;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Если Новый год уже наступил в этом году — берём следующий
  if (now >= targetDate) {
    targetDate = new Date(targetDate.getFullYear() + 1, 0, 1, 0, 0, 0);
  }

  // Считаем полные месяцы
  months =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth());

  // Создаём промежуточную дату после добавления месяцев
  const tempDate = new Date(now);
  tempDate.setMonth(tempDate.getMonth() + months);

  // Если после добавления месяцев мы "перепрыгнули" целевую дату — уменьшаем на 1
  if (tempDate > targetDate) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  // Считаем оставшиеся дни
  const diffMs = targetDate - tempDate;
  const totalSeconds = Math.floor(diffMs / 1000);

  days = Math.floor(totalSeconds / (3600 * 24));
  hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  minutes = Math.floor((totalSeconds % 3600) / 60);
  seconds = totalSeconds % 60;

  return { months, days, hours, minutes, seconds };
}

// Форматируем и выводим дату Нового года
function formatTargetDate(targetDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return targetDate.toLocaleDateString('ru-RU', options);
}

// Обновляем таймер на странице
function updateTimer() {
  const targetDate = getNextNewYear();
  const time = calculateTimeDifference(targetDate);

  // Обновляем значения
  document.getElementById('months').textContent = time.months;
  document.getElementById('days').textContent = time.days;
  document.getElementById('hours').textContent = time.hours;
  document.getElementById('minutes').textContent = time.minutes;
  document.getElementById('seconds').textContent = time.seconds;

  // Обновляем подписи с правильным склонением
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

  // Показываем целевую дату
  document.getElementById('target-date').textContent =
    `🎅 Цель: ${formatTargetDate(targetDate)}`;
}

// Запускаем таймер сразу и обновляем каждую секунду
updateTimer();
setInterval(updateTimer, 1000);
