document.addEventListener('DOMContentLoaded', function() {
    // Презентация - переключение слайдов
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideIndicator = document.querySelector('.slide-indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        slideIndicator.textContent = `${index + 1}/${slides.length}`;
        currentSlide = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Автоматическое переключение слайдов
    setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    // Инициализация первого слайда
    showSlide(0);
    
    // Аккордеон
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // Закрываем другие открытые элементы
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Демо рисования цифр
    const canvas = document.getElementById('drawing-board');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear-btn');
    const guessBtn = document.getElementById('guess-btn');
    const guessResult = document.getElementById('guess-result');
    const aiGuess = document.getElementById('ai-guess');
    let isDrawing = false;
    
    // Настройка холста
    ctx.strokeStyle = '#6e8efb';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    
    // Очистка холста
    clearBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        guessResult.classList.add('hidden');
    });
    
    // Рисование
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Для сенсорных устройств
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(
            e.type === 'touchstart' ? 'mousedown' : 'mousemove',
            {
                clientX: touch.clientX,
                clientY: touch.clientY
            }
        );
        canvas.dispatchEvent(mouseEvent);
    }
    
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    // "Угадывание" цифры (имитация ИИ)
    guessBtn.addEventListener('click', function() {
        const randomDigit = Math.floor(Math.random() * 10);
        aiGuess.textContent = randomDigit;
        guessResult.classList.remove('hidden');
    });
    
    // Форма обратной связи
    const signupForm = document.getElementById('signup-form');
    const formSuccess = document.getElementById('form-success');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        

    });
    
    // Анимация при скролле
    const scrollSections = document.querySelectorAll('.scroll-section');
    
    function checkScroll() {
        scrollSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
    
    // Проверяем при загрузке и при скролле
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Инициализация - показываем первую секцию сразу
    scrollSections[0].classList.add('visible');
});