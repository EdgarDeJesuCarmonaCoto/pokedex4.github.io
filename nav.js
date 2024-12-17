document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbarList = document.getElementById('navbar-list');

    if (menuToggle && navbarList) {
        menuToggle.addEventListener('click', () => {
            navbarList.classList.toggle('active');
        });
    } else {
        console.error('Elemento no encontrado: Verifica los IDs en el HTML');
    }
});