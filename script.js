document.getElementById('form-pendaftaran').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Terima kasih telah mendaftar! Kami akan menghubungi Anda melalui email.');
    this.reset();
});

(function () {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const track = slider.querySelector('.testimonials-track');
    const slides = Array.from(track.children);
    const btnPrev = slider.querySelector('.slider-btn.prev');
    const btnNext = slider.querySelector('.slider-btn.next');

    let slidesToShow = 1;
    let slideWidth = 0;
    let current = 0;
    let autoplayTimer = null;

    function calc() {
        slideWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
        const containerWidth = track.getBoundingClientRect().width;
        slidesToShow = Math.max(1, Math.floor(containerWidth / (slideWidth || containerWidth)));
        // clamp current
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        if (current > maxIndex) current = maxIndex;
        update();
    }

    function update() {
        const x = -(current * slideWidth);
        track.style.transform = `translateX(${x}px)`;
    }

    function prev() {
        current = Math.max(0, current - 1);
        update();
        restartAutoplay();
    }

    function next() {
        const maxIndex = Math.max(0, slides.length - slidesToShow);
        current = Math.min(maxIndex, current + 1);
        update();
        restartAutoplay();
    }

    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);

    // responsive
    window.addEventListener('resize', () => {
        // small debounce
        clearTimeout(window._testiResize);
        window._testiResize = setTimeout(calc, 120);
    });

    // touch / swipe support
    let pointerStart = null;
    let pointerDelta = 0;
    track.addEventListener('pointerdown', (e) => {
        pointerStart = e.clientX;
        track.style.transition = 'none';
    });
    window.addEventListener('pointermove', (e) => {
        if (pointerStart === null) return;
        pointerDelta = e.clientX - pointerStart;
        track.style.transform = `translateX(${-(current * slideWidth) + pointerDelta}px)`;
    });
    window.addEventListener('pointerup', (e) => {
        if (pointerStart === null) return;
        track.style.transition = '';
        if (Math.abs(pointerDelta) > 50) {
            if (pointerDelta < 0) next(); else prev();
        } else {
            update();
        }
        pointerStart = null;
        pointerDelta = 0;
    });

    track.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.36,1)';
    calc();
})();