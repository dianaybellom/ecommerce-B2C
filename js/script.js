document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    // Verificar si los elementos existen antes de agregar eventos
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active"); // Agrega o quita la clase "active"
        });
    } else {
        console.error("Error: No se encontró 'menuToggle' o 'navMenu'.");
    }
});

