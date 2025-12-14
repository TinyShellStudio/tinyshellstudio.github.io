/* =========================================
   1. PRELOADER (PANTALLA DE CARGA) MEJORADO
   ========================================= */
const preloader = document.getElementById("preloader");

// PLAN A: Funciona cuando todo carga perfecto
window.addEventListener("load", () => {
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 500); 
    }
});

// PLAN B: Seguridad para móviles (Forzar salida)
// Si después de 5 segundos (5000ms) sigue ahí, lo quitamos a la fuerza.
setTimeout(() => {
    if (preloader && !preloader.classList.contains("hidden")) {
        preloader.classList.add("hidden");
    }
}, 500);

/* =========================================
   2. FUNCIONES GLOBALES (Noticias de Juegos)
   IMPORTANTE: Estas deben estar FUERA del DOMContentLoaded
   para que los botones "onclick" del HTML las encuentren.
   ========================================= */
function openNewsModal(element) {
    const modal = document.getElementById('newsModal');
    
    // Obtener datos del botón presionado
    const title = element.getAttribute('data-title');
    const date = element.getAttribute('data-date');
    const image = element.getAttribute('data-image');
    const content = element.getAttribute('data-content'); 
    
    // Rellenar la modal
    if(document.getElementById('modalTitle')) document.getElementById('modalTitle').innerText = title;
    if(document.getElementById('modalDate')) document.getElementById('modalDate').innerText = date;
    if(document.getElementById('modalText')) document.getElementById('modalText').innerHTML = content;
    
    const modalImgDiv = document.getElementById('modalImage');
    if(modalImgDiv) {
        modalImgDiv.style.backgroundImage = `url('${image}')`;
    }

    // Mostrar modal
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Permitir scroll
    }
}

// Cerrar modal de noticias al hacer clic fuera
window.onclick = function(event) {
    const newsModal = document.getElementById('newsModal');
    const successModal = document.getElementById('success-modal');
    
    if (event.target == newsModal) {
        closeNewsModal();
    }
    if (event.target == successModal) {
        successModal.classList.remove('active');
    }
}

/* =========================================
   3. LÓGICA PRINCIPAL (Al cargar la página)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    
// --- A. MENÚ MÓVIL ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // 1. Abrir/Cerrar al tocar el botón hamburguesa
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); 
        });

        // 2. NUEVO: CERRAR AL TOCAR CUALQUIER ENLACE DEL MENÚ
        // Seleccionamos todos los enlaces dentro del menú
        const menuLinks = document.querySelectorAll('.nav-links a');
        
        // A cada uno le decimos: "Cuando te toquen, cierra el menú"
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- B. ANIMACIONES SCROLL ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // --- C. LÓGICA DE NEWSLETTER (FORMSPREE) ---
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("newsletter-email");
    const successModal = document.getElementById("success-modal");
    const closeSuccessBtn = document.querySelector(".close-modal");

    // Funciones locales para la modal de éxito
    const openSuccessModal = () => { if(successModal) successModal.classList.add("active"); }
    const closeSuccessModal = () => { if(successModal) successModal.classList.remove("active"); }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

// ANTES: const formEndpoint = "https://formspree.io/f/xgvgqyed"; 
            
            // AHORA: Usamos FormSubmit con soporte AJAX (Gratis e Ilimitado)
            // Pon TU CORREO REAL después de /ajax/
            const formEndpoint = "https://formsubmit.co/ajax/contact.tinyshellstudio@gmail.com";
            
            const formData = new FormData(form);

            fetch(formEndpoint, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    openSuccessModal(); // ¡Éxito!
                    if(emailInput) emailInput.value = ""; 
                } else {
                    alert("Hubo un error al enviar. Intenta de nuevo.");
                }
            }).catch(error => {
                alert("Error de conexión.");
            });
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", closeSuccessModal);
    }
});