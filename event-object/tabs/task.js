document.addEventListener('DOMContentLoaded', function() {
    const navs = document.querySelectorAll('.tab__navigation');

    navs.forEach(nav => {
        const tabs = nav.querySelectorAll('.tab');
        const contentsContainer = nav.nextElementSibling;
        if (!contentsContainer || !contentsContainer.classList.contains('tab__contents')) {
            return;
        }
        const contents = contentsContainer.querySelectorAll('.tab__content');

        if (tabs.length !== contents.length) {
            console.warn('Количество вкладок и панелей не совпадает');
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('tab_active'));
                this.classList.add('tab_active');

                contents.forEach(c => c.classList.remove('tab__content_active'));
                contents[index].classList.add('tab__content_active');
            });
        });
    });
});
