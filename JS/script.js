document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MENÚ MÓVIL
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); 
        });
    }

    // 2. ANIMACIONES SCROLL
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});

// 3. MODALES DE NOTICIAS
function openNewsModal(element) {
    const modal = document.getElementById('newsModal');
    const title = element.getAttribute('data-title');
    const date = element.getAttribute('data-date');
    const image = element.getAttribute('data-image');
    const content = element.getAttribute('data-content'); 
    
    if(document.getElementById('modalTitle')) document.getElementById('modalTitle').innerText = title;
    if(document.getElementById('modalDate')) document.getElementById('modalDate').innerText = date;
    if(document.getElementById('modalText')) document.getElementById('modalText').innerHTML = content;
    
    const modalImgDiv = document.getElementById('modalImage');
    if(modalImgDiv) {
        modalImgDiv.style.backgroundImage = `url('${image}')`;
    }

    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('newsModal');
    if (event.target == modal) {
        closeNewsModal();
    }
}