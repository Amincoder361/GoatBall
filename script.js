const API_URL = 'https://api.jsonbin.io/v3/b/684ae6787bd2c23aa68b07ee';
const API_KEY = '$2a$10$Hy3/4s29Jyba45vL/R/4POWCQrtDMjQuFYyye1NdP5Rx7Ogt0/Um.';

// Track vote count per user (rate limiting per browser)
let userVoteCount = JSON.parse(localStorage.getItem('userVoteCount')) || 0;
let isAdmin = false;
let hasUnlimitedVotes = false;
let isVotingEnabled = true;

// ✅ جایگزین localStorage با jsonbin.io ✅
// گرفتن رای‌ها از jsonbin
async function getVotes() {
  const res = await fetch(API_URL + '/latest', {
    headers: { 'X-Master-Key': API_KEY }
  });
  const data = await res.json();
  return data.record || [];
}

// ذخیره رای جدید در jsonbin
async function saveVoteBin(username) {
  const votesArr = await getVotes();
  votesArr.push(username);
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(votesArr)
  });
  return res.ok;
}

// ———————————————————————————————————————————————————

// Document ready & menu navigation
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('li');
  const contentSections = document.querySelectorAll('.content-section');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
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

// نمایش پیام
function showMessage(message, type) {
  const messageDiv = document.getElementById('vote-message');
  messageDiv.textContent = message;
  messageDiv.className = `vote-message ${type}`;
  messageDiv.style.display = 'block';
}

// پاک کردن پیام
function clearMessage() {
  const messageDiv = document.getElementById('vote-message');
  messageDiv.textContent = '';
  messageDiv.className = 'vote-message';
  messageDiv.style.display = 'none';
}

// ———————————————————————————————————————————————————

// تابع ثبت رأی
async function submitVote() {
  const input = document.getElementById('instagram-input');
  const username = input.value.trim();
  clearMessage();

  if (!isVotingEnabled) {
    showMessage('رای دادن در حال حاضر غیرفعال است!', 'error');
    return;
  }

  if (!hasUnlimitedVotes && userVoteCount >= 3) {
    showMessage('شما حداکثر ۳ بار می‌توانید رای دهید!', 'error');
    return;
  }

  if (!username.startsWith('@')) {
    showMessage('آیدی باید با @ شروع شود!', 'error');
    return;
  }

  const usernameWithoutAt = username.slice(1);
  const words = usernameWithoutAt.split(/\s+/).filter(word => word.length > 0);
  if (words.length > 3) {
    showMessage('آیدی نمی‌تواند بیشتر از ۳ کلمه باشد!', 'error');
    return;
  }

  const savedUsername = '@' + usernameWithoutAt.toLowerCase();
  showMessage('در حال ثبت رای...', 'success');

  const ok = await saveVoteBin(savedUsername);
  if (ok) {
    if (!hasUnlimitedVotes) {
      userVoteCount++;
      localStorage.setItem('userVoteCount', JSON.stringify(userVoteCount));
    }
    const remaining = hasUnlimitedVotes ? '' : ` — ${3 - userVoteCount} رای باقی`;
    showMessage(`✅ رای ثبت شد${remaining}`, 'success');
    input.value = '';
    if (document.getElementById('results-content').classList.contains('active')) {
      displayResults();
    }
  } else {
    showMessage('خطا در ثبت رای، لطفاً دوباره تلاش کنید', 'error');
  }
}

// ———————————————————————————————————————————————————

// تابع نمایش نتایج
async function displayResults() {
  const resultsList = document.getElementById('results-list');
  const votes = await getVotes();

  const voteCounts = {};
  votes.forEach(u => voteCounts[u] = (voteCounts[u] || 0) + 1);

  const sortedResults = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
  const totalVotes = votes.length;

  let html = '';
  for (let i = 0; i < 10; i++) {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : '';

    if (i < sortedResults.length) {
      const [username, voteCount] = sortedResults[i];
      const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : '0.0';
      html += `
        <div class="result-item ${rankClass}">
          <div class="result-rank">${rank}</div>
          <div class="result-username">${username}</div>
          <div class="result-stats">
            <div class="result-votes">${voteCount} رای</div>
            <div class="result-percentage">%${percentage}</div>
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

// ———————————————————————————————————————————————————

// Admin functions (unchanged)
function openAdminLogin() {
  document.getElementById('admin-modal').style.display = 'block';
}
function closeAdminLogin() {
  document.getElementById('admin-modal').style.display = 'none';
  document.getElementById('admin-code').value = '';
  document.getElementById('admin-error').textContent = '';
}
function checkAdminCode() {
  const code = document.getElementById('admin-code').value;
  const errorDiv = document.getElementById('admin-error');

  if (code === 'Amin9831') {
    isAdmin = true;
    closeAdminLogin();
    openAdminPanel();
  } else {
    errorDiv.textContent = 'کد ادمین اشتباه است!';
  }
}
function openAdminPanel() {
  document.getElementById('admin-panel').style.display = 'block';
  updateVoteStatusDisplay();
}
function closeAdminPanel() {
  document.getElementById('admin-panel').style.display = 'none';
}
function resetSite() {
  if (confirm('آیا مطمئن هستید که می‌خواهید سایت را ریست کنید؟')) {
    localStorage.clear();
    userVoteCount = 0;
    hasUnlimitedVotes = false;
    isVotingEnabled = true;
    // ریست
    saveVoteBin([]).then(ok => {
      if (ok) alert('سایت با موفقیت ریست شد!');
      updateVoteStatusDisplay();
      if (document.getElementById('results-content').classList.contains('active'))
        displayResults();
    });
  }
}
function adminVote() {
  const input = document.getElementById('admin-vote-input');
  const username = input.value.trim();
  if (!username.startsWith('@')) {
    alert('آیدی باید با @ شروع شود!');
    return;
  }
  const cleaned = username.slice(1).toLowerCase();
  if (cleaned.split(/\s+/).filter(Boolean).length > 3) {
    alert('آیدی نمی‌تواند بیشتر از ۳ کلمه باشد!');
    return;
  }
  const savedUsername = '@' + cleaned;
  saveVoteBin(savedUsername).then(ok => {
    if (ok) {
      alert(`رای برای ${savedUsername} ثبت شد!`);
      input.value = '';
      if (document.getElementById('results-content').classList.contains('active'))
        displayResults();
    } else alert('خطا در ثبت رای!');
  });
}
function toggleVoteStatus() {
  isVotingEnabled = !isVotingEnabled;
  updateVoteStatusDisplay();
  alert(isVotingEnabled ? 'رای دادن فعال شد!' : 'رای دادن غیرفعال شد!');
}
function updateVoteStatusDisplay() {
  const statusDiv = document.getElementById('vote-status');
  if (isVotingEnabled) {
    statusDiv.textContent = 'Vote ✅';
    statusDiv.style.color = '#4CAF50';
  } else {
    statusDiv.textContent = 'Vote ❌';
    statusDiv.style.color = '#f44336';
  }
}

// Prevent modal close on outside click
window.onclick = function(event) {
  const adminModal = document.getElementById('admin-modal');
  const adminPanel = document.getElementById('admin-panel');
  if (event.target === adminModal) closeAdminLogin();
  if (event.target === adminPanel) closeAdminPanel();
}
