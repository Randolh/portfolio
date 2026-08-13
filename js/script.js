document.addEventListener('DOMContentLoaded', () => {
    // Hero Avatar Carousel
    const avatar = document.querySelector('.hero__avatar');
    if (!avatar) return;

    const track = avatar.querySelector('.hero__avatar-track');
    const slides = avatar.querySelectorAll('.hero__image');
    const dots = avatar.querySelectorAll('.hero__avatar-dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        track.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 15000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    track.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            startAutoSlide();
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    avatar.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    avatar.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 30) {
            nextSlide();
            startAutoSlide();
        } else if (touchEndX - touchStartX > 30) {
            prevSlide();
            startAutoSlide();
        }
    }, { passive: true });

    avatar.addEventListener('mouseenter', stopAutoSlide);
    avatar.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
});
