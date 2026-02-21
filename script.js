document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if(menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    const header = document.querySelector('.header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.querySelector('.scroll-down');
    const heroWrapper = document.querySelector('.hero-bg-video-wrapper');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (scrollPos < 900) {

            if(heroContent) {
                heroContent.style.transition = 'none';
                heroContent.style.opacity = 1 - (scrollPos / 600);
                heroContent.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }

            if(heroScroll) {
                heroScroll.style.transition = 'none';
                heroScroll.style.opacity = 1 - (scrollPos / 200);
            }

            if(heroWrapper) {
                heroWrapper.style.transition = 'none';
                heroWrapper.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }
        }
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-header.active');
            if(currentlyActive && currentlyActive !== header) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = null;
            }

            header.classList.toggle('active');
            const content = header.nextElementSibling;

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');

    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const serviceID = 'service_wyt85sr';
            const templateID = 'template_c65e1ls';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerHTML = 'Enviado <i class="fa-solid fa-check"></i>';
                    alert('Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 3000);
                }, (err) => {
                    btn.innerHTML = 'Error <i class="fa-solid fa-xmark"></i>';
                    alert('Ocurrió un error al enviar el mensaje. Intente nuevamente o utilice WhatsApp.');
                    console.error('FAILED...', err);
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

});