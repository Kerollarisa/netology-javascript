const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const value = dropdown.querySelector('.dropdown__value');
    const list = dropdown.querySelector('.dropdown__list');

    value.addEventListener('click', function(e) {
        list.classList.toggle('dropdown__list_active');
    });

    list.addEventListener('click', function(e) {
        const item = e.target.closest('.dropdown__item');
        if (!item) return; // если кликнули не по пункту – ничего не делаем

        const link = item.querySelector('.dropdown__link');
        if (link) {
            value.textContent = link.textContent.trim();
        }

        list.classList.remove('dropdown__list_active');

        e.preventDefault();
    });
});
