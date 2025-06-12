const API_URL = 'https://api.jsonbin.io/v3/b/684ae6787bd2c23aa68b07ee';
const API_KEY = '$2a$10$Hy3/4s29Jyba45vL/R/4POWCQrtDMjQuFYyye1NdP5Rx7Ogt0/Um.';

let isVotingEnabled = true;

// گرفتن رای‌ها از jsonbin
async function getVotes() {
    const res = await fetch(API_URL + '/latest', {
        headers: { 'X-Master-Key': API_KEY }
    });
    const data = await res.json();
    return data.record || {};
}

// ذخیره رای جدید
async function saveVote(username) {
    const votes = await getVotes();
    votes[username] = (votes[username] || 0) + 1;

    const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        },
        body: JSON.stringify(votes)
    });

    return res.ok;
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('vote-message');
    messageDiv.textContent = message;
    messageDiv.className = `vote-message ${type}`;
    messageDiv.style.display = 'block';
}

async function submitVote() {
    const input = document.getElementById('instagram-input');
    const username = input.value.trim();

    showMessage('', ''); // پاک کردن پیام قبلی

    if (!isVotingEnabled) {
        showMessage('رای دادن غیرفعال است!', 'error');
        return;
    }

    if (!username.startsWith('@')) {
        showMessage('آیدی باید با @ شروع شود!', 'error');
        return;
    }

    const clean = username.slice(1).toLowerCase();
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length > 3) {
        showMessage('آیدی نباید بیشتر از ۳ کلمه باشد!', 'error');
        return;
    }

    const savedUsername = '@' + clean;
    showMessage('در حال ثبت رای...', 'success');

    const ok = await saveVote(savedUsername);
    if (ok) {
        showMessage('✅ رأی ثبت شد', 'success');
        input.value = '';
        const resultsSection = document.getElementById('results-content');
        if (resultsSection.classList.contains('active')) displayResults();
    } else {
        showMessage('❌ خطا در ثبت رای', 'error');
    }
}

async function displayResults() {
    const resultsList = document.getElementById('results-list');
    const votes = await getVotes();

    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);

    let html = '';

    for (let i = 0; i < 10; i++) {
        const rank = i + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';

        if (i < sorted.length) {
            const [username, count] = sorted[i];
            const percent = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : '0.0';

            html += `
                <div class="result-item ${rankClass}">
                    <div class="result-rank">${rank}</div>
                    <div class="result-username">${username}</div>
                    <div class="result-stats">
                        <div class="result-votes">${count} رای</div>
                        <div class="result-percentage">%${percent}</div>
                    </div>
                </div>`;
        } else {
            html += `
                <div class="result-item ${rankClass}">
                    <div class="result-rank">${rank}</div>
                    <div class="result-username">Unknown</div>
                    <div class="result-stats">
                        <div class="result-votes">0 رای</div>
                        <div class="result-percentage">%0.0</div>
                    </div>
                </div>`;
        }
    }

    resultsList.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('li');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            this.classList.add('active');

            const contentId = this.id + '-content';
            const activeContent = document.getElementById(contentId);
            if (activeContent) {
                activeContent.classList.add('active');
                if (this.id === 'results') displayResults();
            }
        });
    });
});
