document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню: переключатель
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('navbar');
    mobileMenuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  
    let foundSecrets = 0;
  
    // Фокус на скрытый input для улавливания клавиш (для мобильных)
    const keyCaptureInput = document.getElementById('secret-key-capture');
    if (keyCaptureInput) {
      keyCaptureInput.focus();
    }
  
    /* Анимация сердечек в header */
    function addHeaderHearts() {
      const headerHeartsContainer = document.querySelector('.header-hearts');
      setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤';
        // Позиционируем от 5% до 95% для избежания вылазания за пределы
        heart.style.left = (Math.random() * 90 + 5) + '%';
        heart.style.top = (Math.random() * 90 + 5) + '%';
        heart.style.opacity = 0;
        heart.style.transition = 'opacity 0.5s';
        document.body.appendChild(heart);
        setTimeout(() => { heart.style.opacity = 1; }, 100);
        setTimeout(() => {
          heart.style.opacity = 0;
          setTimeout(() => { heart.remove(); }, 500);
        }, 3000 + Math.random() * 2000);
      }, 800);
    }
    addHeaderHearts();
  
    /* Генерация стреляющих звёзд */
    function spawnShootingStar() {
      const container = document.querySelector('.shooting-stars');
      const star = document.createElement('div');
      star.classList.add('shooting-star');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 50 + '%';
      const distance = 200 + Math.random() * 200;
      star.style.setProperty('--distance', distance + 'px');
      container.appendChild(star);
      setTimeout(() => { star.remove(); }, 1500);
      setTimeout(spawnShootingStar, 5000 + Math.random() * 5000);
    }
    spawnShootingStar();
  
    /* IntersectionObserver для появления секций */
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fadeInUp').forEach(section => {
      observer.observe(section);
    });
  
    /* ----------------------- */
    /* Секрет 1: Наша История */
    /* ----------------------- */
    const ourStorySection = document.getElementById('our-story');
  
    // Desktop: двойной клик
    ourStorySection.addEventListener('dblclick', () => {
      showSecretMessage('message1');
      addFloatingHearts(6);
      foundSecrets++;
    });
  
    // Mobile: двойной тап
    let lastTapTime = 0;
    ourStorySection.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastTapTime < 300) {
        showSecretMessage('message1');
        addFloatingHearts(6);
        foundSecrets++;
        e.preventDefault();
      }
      lastTapTime = currentTime;
    });
  
    /* ---------------------------- */
    /* Секрет 2: Скрытая фраза "Влюбиться к февралю" */
    /* ---------------------------- */
    const secretTriggerSpan = document.querySelector('.secret-trigger');
    let hoverTimer = null;
    let secretTouchTimer = null;
  
    // Desktop: при наведении на 2 сек., затем двойной клик
    secretTriggerSpan.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        secretTriggerSpan.addEventListener('dblclick', secretTriggerSpanDblClick);
      }, 2000);
    });
    secretTriggerSpan.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      secretTriggerSpan.removeEventListener('dblclick', secretTriggerSpanDblClick);
    });
  
    // Mobile: долгий тап (2 сек.)
    secretTriggerSpan.addEventListener('touchstart', () => {
      secretTouchTimer = setTimeout(() => {
        showSecretMessage('message2');
        addFloatingHearts(8);
        foundSecrets++;
      }, 2000);
    });
    secretTriggerSpan.addEventListener('touchend', () => {
      clearTimeout(secretTouchTimer);
    });
  
    function secretTriggerSpanDblClick(e) {
      e.stopPropagation();
      showSecretMessage('message2');
      addFloatingHearts(8);
      foundSecrets++;
    }
  
    /* -------------------------------------- */
    /* Секрет 3: Длительное нажатие на письмо */
    /* -------------------------------------- */
    const loveLetterDiv = document.getElementById('loveLetter');
    let loveLetterTimer;
  
    // Desktop-события
    loveLetterDiv.addEventListener('mousedown', () => {
      loveLetterTimer = setTimeout(() => {
        showSecretMessage('message3');
        addFloatingHearts(10);
        foundSecrets++;
      }, 5000);
    });
    loveLetterDiv.addEventListener('mouseup', () => {
      clearTimeout(loveLetterTimer);
    });
    loveLetterDiv.addEventListener('mouseleave', () => {
      clearTimeout(loveLetterTimer);
    });
  
    // Mobile-события
    loveLetterDiv.addEventListener('touchstart', () => {
      loveLetterTimer = setTimeout(() => {
        showSecretMessage('message3');
        addFloatingHearts(10);
        foundSecrets++;
      }, 5000);
    });
    loveLetterDiv.addEventListener('touchend', () => {
      clearTimeout(loveLetterTimer);
    });
    loveLetterDiv.addEventListener('touchcancel', () => {
      clearTimeout(loveLetterTimer);
    });
  
    /* -------------------------------- */
    /* Секрет 4: Навигационная панель */
    /* -------------------------------- */
    // Desktop: правая кнопка мыши
    navbar.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showSecretMessage('message4');
      addFloatingHearts(9);
      foundSecrets++;
    });
  
    // Mobile: длительное нажатие (1 сек.)
    let navbarTouchTimer;
    navbar.addEventListener('touchstart', () => {
      navbarTouchTimer = setTimeout(() => {
        showSecretMessage('message4');
        addFloatingHearts(9);
        foundSecrets++;
      }, 1000);
    });
    navbar.addEventListener('touchend', () => {
      clearTimeout(navbarTouchTimer);
    });
    navbar.addEventListener('touchcancel', () => {
      clearTimeout(navbarTouchTimer);
    });
  
    /* -------------------------------- */
    /* Секрет 5: Клавиатурная последовательность */
    /* -------------------------------- */
    const keySequence = "люблютебя";
    let inputSequence = "";
    let sequenceTimer;
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (/[а-яё]/.test(key)) {
        if (!sequenceTimer) {
          sequenceTimer = setTimeout(() => {
            inputSequence = "";
            sequenceTimer = null;
          }, 5000);
        }
        inputSequence += key;
        if (inputSequence.includes(keySequence)) {
          showSecretMessage('message5');
          addFloatingHearts(11);
          foundSecrets++;
          inputSequence = "";
          clearTimeout(sequenceTimer);
          sequenceTimer = null;
        }
      }
    });
  
    /* Секция поздравления (день рождения) */
    const birthdayText = document.querySelector('.birthday-text');
    if (birthdayText) {
      birthdayText.addEventListener('click', launchBalloonsAndConfetti);
    }
  
    /* Функция показа секретного сообщения */
    function showSecretMessage(id) {
      const message = document.getElementById(id);
      message.style.display = 'block';
      setTimeout(() => { message.style.display = 'none'; }, 3000);
    }
  
    /* Функция для добавления плавающих сердечек */
    function addFloatingHearts(count) {
      for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤';
        // Позиционируем от 5% до 95%
        heart.style.left = (Math.random() * 90 + 5) + '%';
        heart.style.top = (Math.random() * 90 + 5) + '%';
        heart.style.opacity = 0;
        heart.style.transition = 'opacity 0.5s';
        document.body.appendChild(heart);
        setTimeout(() => { heart.style.opacity = 1; }, 100);
        setTimeout(() => {
          heart.style.opacity = 0;
          setTimeout(() => { heart.remove(); }, 500);
        }, 3000 + Math.random() * 2000);
      }
    }
  
    /* Функция запуска анимации шариков и конфетти */
    function launchBalloonsAndConfetti() {
      // Шарики: создаём 10 шариков
      for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.bottom = '-60px';
        balloon.style.animationDelay = Math.random() * 0.5 + 's';
        balloon.style.backgroundImage = 'radial-gradient(circle at 30% 30%, ' + getRandomColor() + ', ' + getRandomColor() + ')';
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 5000);
      }
      // Конфетти: создаём 30 элементов
      for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 20 + '%';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
      }
    }
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  });
  