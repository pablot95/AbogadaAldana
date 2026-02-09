document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------
       1. Inicialización de Librerías (AOS)
    ----------------------------------------------- */
    AOS.init({
        duration: 1000,   // Duración de la animación (ms)
        offset: 100,      // Offset desde el fondo de la ventana (px)
        once: true,       // La animación ocurre solo una vez al hacer scroll
        easing: 'ease-out-cubic'
    });

    /* -----------------------------------------------
       2. Menú Móvil
    ----------------------------------------------- */
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if(menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    /* -----------------------------------------------
       3. Header Scroll Effect (Glassmorphism)
    ----------------------------------------------- */
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Verificar estado inicial por si se recarga le página a mitad de scroll
    handleScroll();

    /* -----------------------------------------------
       3.1. Hero Fade Out Effect + Parallax
    ----------------------------------------------- */
    const heroContent = document.querySelector('.hero-content');
    const heroScroll = document.querySelector('.scroll-down');
    /* Seleccionamos el Wrapper para no romper la animación de zoom interna de la imagen,
       ya que la imagen (.hero-bg-image) tiene una animación CSS que entra en conflicto con transform JS */
    const heroWrapper = document.querySelector('.hero-bg-video-wrapper'); 

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Solo aplicar si estamos en la zona del hero
        if (scrollPos < 900) {
            
            // Efecto para el Contenido (Texto)
            if(heroContent) {
                // IMPORTANTÍSIMO: Desactivar transition para evitar "delay" o lag
                heroContent.style.transition = 'none'; 
                heroContent.style.opacity = 1 - (scrollPos / 600);
                heroContent.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }

            // Efecto para el Scroll Wrapper (Ratón)
            if(heroScroll) {
                heroScroll.style.transition = 'none';
                heroScroll.style.opacity = 1 - (scrollPos / 200);
            }

            // Efecto para la Imagen de Fondo (Wrapper)
            if(heroWrapper) {
                heroWrapper.style.transition = 'none';
                /* Movemos el contenedor entero (imagen + overlay). 
                   Misma velocidad que el contenido para cumplir "literal la misma animación".
                   Sin opacidad. */
                heroWrapper.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }
        }
    });

    /* -----------------------------------------------
       4. Acordeón (FAQ)
    ----------------------------------------------- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Cerrar otros (opcional, comportamiento de acordeón estricto)
            const currentlyActive = document.querySelector('.accordion-header.active');
            if(currentlyActive && currentlyActive !== header) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = null;
            }

            // Alternar el actual
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* -----------------------------------------------
       5. Smooth Scroll para enlaces internos con compensación del header
    ----------------------------------------------- */
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

    /* -----------------------------------------------
       6. Formulario Simple
    ----------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulación de envío
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Gracias por su mensaje. Nos pondremos en contacto a la brevedad.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

});

