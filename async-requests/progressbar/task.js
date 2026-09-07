const form = document.getElementById('form');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!fileInput.files.length) {
        alert('Выберите файл для загрузки.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);

    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            progress.value = percent;
        }
    });

    xhr.addEventListener('load', function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert('Файл успешно загружен!');
        } else {
            alert('Ошибка загрузки: ' + xhr.status + ' ' + xhr.statusText);
        }
        progress.value = 0;
    });

    xhr.addEventListener('error', function() {
        alert('Произошла ошибка сети.');
        progress.value = 0;
    });

    xhr.send(formData);
});
