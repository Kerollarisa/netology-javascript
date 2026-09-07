document.addEventListener('DOMContentLoaded', () => {
    const pollUrl = 'https://students.netoservices.ru/nestjs-backend/poll';

    fetch(pollUrl)
        .then(response => response.json())
        .then(pollData => renderPoll(pollData))
        .catch(error => console.error('Ошибка загрузки опроса:', error));

    function renderPoll(pollData) {
        const titleEl = document.getElementById('poll__title');
        const answersEl = document.getElementById('poll__answers');
        answersEl.innerHTML = '';
        titleEl.textContent = pollData.data.title;

        pollData.data.answers.forEach((answerText, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answerText;
            button.dataset.answerIndex = index;
            button.addEventListener('click', () => onAnswerClick(pollData.id, index));
            answersEl.appendChild(button);
        });
    }

    function onAnswerClick(pollId, answerIndex) {
        const body = `vote=${pollId}&answer=${answerIndex}`;
        fetch(pollUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        .then(response => response.json())
        .then(statData => showResults(statData.stat))
        .catch(error => console.error('Ошибка при голосовании:', error));
    }

    function showResults(stat) {
        const answersEl = document.getElementById('poll__answers');
        answersEl.innerHTML = '';
        const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

        stat.forEach(item => {
            const percent = totalVotes === 0 ? 0 : (item.votes / totalVotes * 100).toFixed(2);
            const div = document.createElement('div');
            div.textContent = `${item.answer}: ${item.votes} голосов (${percent}%)`;
            answersEl.appendChild(div);
        });
    }
});
