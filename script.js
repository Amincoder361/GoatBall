
// Using localStorage for demonstration (will work locally)

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('li');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding content section
            const contentId = this.id + '-content';
            const activeContent = document.getElementById(contentId);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Update results if results section is shown
                if (this.id === 'results') {
                    displayResults();
                }
            }
        });
    });
});

// Track vote count for users (local only for rate limiting)
let userVoteCount = JSON.parse(localStorage.getItem('userVoteCount')) || 0;

// Admin system variables
let isAdmin = false;
let hasUnlimitedVotes = false;
let isVotingEnabled = true;

function getVotes() {
    return JSON.parse(localStorage.getItem('allVotes')) || [];
}

function saveVote(username) {
    const votes = getVotes();
    votes.push(username);
    localStorage.setItem('allVotes', JSON.stringify(votes));
    return true;
}

function submitVote() {
    const input = document.getElementById('instagram-input');
    const messageDiv = document.getElementById('vote-message');
    const username = input.value.trim();
    
    // Clear previous messages
    messageDiv.className = 'vote-message';
    messageDiv.style.display = 'none';
    
    // Check if voting is enabled
    if (!isVotingEnabled) {
        showMessage('رای دادن در حال حاضر غیرفعال است!', 'error');
        return;
    }
    
    // Check if user has reached maximum votes (unless admin with unlimited votes)
    if (!hasUnlimitedVotes && userVoteCount >= 3) {
        showMessage('شما حداکثر 3 بار می‌توانید رای دهید!', 'error');
        return;
    }
    
    // Validate input
    if (!username.startsWith('@')) {
        showMessage('آیدی باید با @ شروع شود!', 'error');
        return;
    }
    
    // Remove @ and check word count
    const usernameWithoutAt = username.slice(1);
    const words = usernameWithoutAt.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length > 3) {
        showMessage('آیدی نمی‌تواند بیشتر از 3 کلمه باشد!', 'error');
        return;
    }
    
    // Convert to lowercase and save
    const savedUsername = '@' + usernameWithoutAt.toLowerCase();
    
    // Show loading message
    showMessage('در حال ثبت رای...', 'success');
    
    // Save vote to localStorage
    const success = saveVote(savedUsername);
    
    if (success) {
        // Increment user vote count locally (unless unlimited votes)
        if (!hasUnlimitedVotes) {
            userVoteCount++;
            localStorage.setItem('userVoteCount', JSON.stringify(userVoteCount));
        }
        
        // Show success message with remaining votes
        if (hasUnlimitedVotes) {
            showMessage('تایید شد - رای نامحدود فعال', 'success');
        } else {
            const remainingVotes = 3 - userVoteCount;
            if (remainingVotes > 0) {
                showMessage(`تایید شد - ${remainingVotes} رای باقی مانده`, 'success');
            } else {
                showMessage('تایید شد - رای‌های شما تمام شد', 'success');
            }
        }
        
        // Clear input
        input.value = '';
    } else {
        showMessage('خطا در ثبت رای، لطفاً دوباره تلاش کنید', 'error');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('vote-message');
    messageDiv.textContent = message;
    messageDiv.className = `vote-message ${type}`;
    messageDiv.style.display = 'block';
}

function displayResults() {
    const resultsList = document.getElementById('results-list');
    
    // Get votes from localStorage
    const votes = getVotes();
    
    // Count votes for each username
    const voteCounts = {};
    votes.forEach(username => {
        voteCounts[username] = (voteCounts[username] || 0) + 1;
    });
    
    // Convert to array and sort by vote count
    const sortedResults = Object.entries(voteCounts)
        .sort((a, b) => b[1] - a[1]);
    
    const totalVotes = votes.length;
    
    // Generate HTML for top 10 results
    let html = '';
    
    for (let i = 0; i < 10; i++) {
        const rank = i + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        
        if (i < sortedResults.length) {
            // Real vote data
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
                </div>
            `;
        } else {
            // Unknown placeholder
            html += `
                <div class="result-item ${rankClass}">
                    <div class="result-rank">${rank}</div>
                    <div class="result-username">Unknown</div>
                    <div class="result-stats">
                        <div class="result-votes">0 رای</div>
                        <div class="result-percentage">%0.0</div>
                    </div>
                </div>
            `;
        }
    }
    
    resultsList.innerHTML = html;
}

// Admin Functions
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
        // Reset local storage
        localStorage.clear();
        userVoteCount = 0;
        
        // Reset admin settings
        hasUnlimitedVotes = false;
        isVotingEnabled = true;
        
        // Reset database (clear all votes)
        saveVoteData([]);
        
        alert('سایت با موفقیت ریست شد!');
        updateVoteStatusDisplay();
        
        // Refresh results if visible
        const resultsSection = document.getElementById('results-content');
        if (resultsSection.classList.contains('active')) {
            displayResults();
        }
    }
}

function adminVote() {
    const input = document.getElementById('admin-vote-input');
    const username = input.value.trim();
    
    if (!username.startsWith('@')) {
        alert('آیدی باید با @ شروع شود!');
        return;
    }
    
    // Remove @ and check word count
    const usernameWithoutAt = username.slice(1);
    const words = usernameWithoutAt.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length > 3) {
        alert('آیدی نمی‌تواند بیشتر از 3 کلمه باشد!');
        return;
    }
    
    // Convert to lowercase and save
    const savedUsername = '@' + usernameWithoutAt.toLowerCase();
    
    // Save vote
    const success = saveVote(savedUsername);
    
    if (success) {
        alert(`رای برای ${savedUsername} ثبت شد!`);
        input.value = '';
        
        // Refresh results if visible
        const resultsSection = document.getElementById('results-content');
        if (resultsSection.classList.contains('active')) {
            displayResults();
        }
    } else {
        alert('خطا در ثبت رای!');
    }
}

function toggleVoteStatus() {
    isVotingEnabled = !isVotingEnabled;
    updateVoteStatusDisplay();
    
    if (isVotingEnabled) {
        alert('رای دادن فعال شد!');
    } else {
        alert('رای دادن غیرفعال شد!');
    }
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

function saveVoteData(votes) {
    localStorage.setItem('allVotes', JSON.stringify(votes));
    return true;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const adminModal = document.getElementById('admin-modal');
    const adminPanel = document.getElementById('admin-panel');
    
    if (event.target === adminModal) {
        closeAdminLogin();
    }
    if (event.target === adminPanel) {
        closeAdminPanel();
    }
}
