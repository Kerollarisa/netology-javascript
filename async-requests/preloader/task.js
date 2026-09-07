document.addEventListener('DOMContentLoaded', async function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');

    try {
        const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
        const data = await response.json();

        loader.classList.remove('loader_active');

        itemsContainer.innerHTML = '';

        const valute = data.response.Valute;

        for (let key in valute) {
            const currency = valute[key];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <div class="item__code">${currency.CharCode}</div>
                <div class="item__value">${currency.Value}</div>
                <div class="item__currency">руб.</div>
            `;
            itemsContainer.appendChild(itemDiv);
        }
    } catch (error) {
        loader.classList.remove('loader_active');
        itemsContainer.innerHTML = 'Не удалось загрузить курсы валют';
        console.error('Ошибка:', error);
    }
});
