document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');

    const fontSizeControls = document.querySelectorAll('.book__control_font-size .font-size');

    fontSizeControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();

            fontSizeControls.forEach(c => c.classList.remove('font-size_active'));
            this.classList.add('font-size_active');

            book.classList.remove('book_fs-small', 'book_fs-big');

            const size = this.dataset.size;
            if (size === 'small') {
                book.classList.add('book_fs-small');
            } else if (size === 'big') {
                book.classList.add('book_fs-big');
            }
        });
    });

    const colorControls = document.querySelectorAll('.book__control_color .color');

    colorControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();

            colorControls.forEach(c => c.classList.remove('color_active'));
            this.classList.add('color_active');

            book.classList.remove('book_color-black', 'book_color-gray', 'book_color-whitesmoke');

            const textColor = this.dataset.textColor;
            if (textColor) {
                book.classList.add('book_color-' + textColor);
            }
        });
    });

    const bgControls = document.querySelectorAll('.book__control_background .color');

    bgControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();

            bgControls.forEach(c => c.classList.remove('color_active'));
            this.classList.add('color_active');

            book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');

            const bgColor = this.dataset.bgColor;
            if (bgColor) {
                book.classList.add('book_bg-' + bgColor);
            }
        });
    });

    function initFromActive(controls, classPrefix, bookClassPrefix) {
        controls.forEach(control => {
            if (control.classList.contains('color_active') || control.classList.contains('font-size_active')) {
                if (classPrefix === 'book_fs-') {
                    const size = control.dataset.size;
                    if (size) {
                        book.classList.add(classPrefix + size);
                    }
                } else {
                    const value = control.dataset.textColor || control.dataset.bgColor;
                    if (value) {
                        book.classList.add(classPrefix + value);
                    }
                }
            }
        });
    }

    initFromActive(fontSizeControls, 'book_fs-', '');
    initFromActive(colorControls, 'book_color-', '');
    initFromActive(bgControls, 'book_bg-', '');
});
