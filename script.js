document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.navMenu a');
  const pages = document.querySelectorAll('.page');

  // Comprehensive protection against user interactions
  function preventInteractions() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Disable copy shortcuts
    document.addEventListener('keydown', function(e) {
      // Disable Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+U, F12, etc.
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || 
                        e.key === 'a' || e.key === 'A' ||
                        e.key === 's' || e.key === 'S' ||
                        e.key === 'u' || e.key === 'U' ||
                        e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Disable zoom shortcuts
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    // Disable mouse wheel zoom
    document.addEventListener('wheel', function(e) {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });

    // Disable pinch zoom on touch devices
    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, { passive: false });

    // Disable double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      lastTouchEnd = now;
    }, true);
  }

  // Initialize protection
  preventInteractions();

  // Connection status management
  let connectionStatusShown = false;

  function showConnectionStatus(isConnected) {
    // Only show once per session
    if (connectionStatusShown) return;
    connectionStatusShown = true;

    const statusElement = document.getElementById('connection-status');
    const statusIcon = document.getElementById('status-icon');
    const statusText = document.getElementById('status-text');

    if (!statusElement || !statusIcon || !statusText) return;

    // Set content based on connection status
    if (isConnected) {
      statusElement.className = 'connection-status connected';
      statusIcon.textContent = '✓';
      statusText.textContent = 'Connected';
    } else {
      statusElement.className = 'connection-status disconnected';
      statusIcon.textContent = '✕';
      statusText.textContent = 'Not Connected';
    }

    // Show the notification
    statusElement.style.display = 'block';
    setTimeout(() => {
      statusElement.classList.add('show');
    }, 100);

    // Hide after 5 seconds
    setTimeout(() => {
      statusElement.classList.remove('show');
      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 500);
    }, 5000);
  }

  // Admin access variables
  let homeClickCount = 0;
  let homeClickTimer = null;
  let longPressTimer = null;
  let isLongPress = false;

  // Function to stop video when leaving home page
  function stopVideo() {
    const iframe = document.getElementById('tutorial-video');
    if (iframe) {
      // Stop video by reloading the iframe src
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    }
  }

  // Function to switch pages with fade effect
  function switchPage(targetPage) {
    const currentPage = document.querySelector('.page[style*="flex"]');
    const targetPageElement = document.getElementById(targetPage + '-page');

    // Stop video if leaving home page
    if (currentPage && currentPage.id === 'home-page' && targetPage !== 'home') {
      stopVideo();
    }

    if (currentPage && targetPageElement && currentPage !== targetPageElement) {
      // Fade out current page
      currentPage.classList.add('fade-out');

      setTimeout(() => {
        // Hide all pages
        pages.forEach(page => {
          page.style.display = 'none';
          page.classList.remove('fade-out');
        });

        // Show target page with fade in
        targetPageElement.style.display = 'flex';
        targetPageElement.style.opacity = '0';

        // Trigger fade in
        setTimeout(() => {
          targetPageElement.style.opacity = '1';
        }, 10);

      }, 300);
    } else if (targetPageElement) {
      // Direct switch if no current page or same page
      pages.forEach(page => {
        page.style.display = 'none';
      });
      targetPageElement.style.display = 'flex';
    }
  }

  menuLinks.forEach(link => {
    // Mouse down event for long press detection
    link.addEventListener('mousedown', function(e) {
      isLongPress = false;
      longPressTimer = setTimeout(() => {
        isLongPress = true;
        showAdminLogin();
      }, 5000); // 5 seconds
    });

    // Mouse up event to clear long press timer
    link.addEventListener('mouseup', function(e) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    // Mouse leave event to clear long press timer
    link.addEventListener('mouseleave', function(e) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    // Touch start event for mobile long press
    link.addEventListener('touchstart', function(e) {
      isLongPress = false;
      longPressTimer = setTimeout(() => {
        isLongPress = true;
        showAdminLogin();
      }, 5000); // 5 seconds
    });

    // Touch end event to clear long press timer
    link.addEventListener('touchend', function(e) {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }

      // If it was a long press, prevent normal click behavior
      if (isLongPress) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Remove active class from all links
      menuLinks.forEach(l => l.classList.remove('active'));

      // Add active class to touched link
      this.classList.add('active');

      // Switch to the selected page
      const targetPage = this.getAttribute('data-page');
      switchPage(targetPage);

      // Update leaderboard if switching to result page
      if (targetPage === 'result') {
        setTimeout(() => {
          updateLeaderboard();
        }, 500);
      }

      // Remove focus immediately
      this.blur();
    });

    // Click event
    link.addEventListener('click', function(e) {
      // If it was a long press, prevent normal click behavior
      if (isLongPress) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Check for admin access (triple click on Home)
      if (this.getAttribute('data-page') === 'home') {
        homeClickCount++;

        if (homeClickTimer) {
          clearTimeout(homeClickTimer);
        }

        homeClickTimer = setTimeout(() => {
          homeClickCount = 0;
        }, 1000);

        if (homeClickCount === 3) {
          homeClickCount = 0;
          showAdminLogin();
          return;
        }
      }

      // Remove active class from all links
      menuLinks.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      this.classList.add('active');

      // Switch to the selected page
      const targetPage = this.getAttribute('data-page');
      switchPage(targetPage);

      // Update leaderboard if switching to result page
      if (targetPage === 'result') {
        setTimeout(() => {
          updateLeaderboard();
        }, 500);
      }

      // Remove focus immediately to prevent any highlight
      setTimeout(() => {
        this.blur();
      }, 10);
    });

    // Prevent any focus highlight
    link.addEventListener('focus', function() {
      this.blur();
    });

    // Prevent context menu on long press
    link.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  });

  // Prevent selection on the entire menu
  document.querySelector('.navMenu').addEventListener('selectstart', function(e) {
    e.preventDefault();
  });

  // Input validation and auto-conversion
  const inputField = document.querySelector('.input-container input');
  const sendButton = document.querySelector('.input-container .button:not(.change-button)');
  const changeButton = document.querySelector('.change-button');
  const inputContainer = document.querySelector('.input-container');

  function validateAndConvert(text) {
    // Remove @ if exists at the beginning
    let cleanText = text.startsWith('@') ? text.substring(1) : text;

    // Replace dots with asterisk to preserve usernames, remove other invalid chars
    cleanText = cleanText.replace(/\./g, '*').replace(/[#$\/\[\]]/g, '');

    // Check for invalid characters (only allow English letters, numbers, underscore and asterisk)
    const validPattern = /^[a-zA-Z0-9_*]+$/;
    const hasInvalidChars = !validPattern.test(cleanText);
    const hasSpaces = /\s/.test(cleanText);

    if (hasInvalidChars || hasSpaces || cleanText.trim() === '') {
      return { isValid: false, convertedText: text };
    }

    // Convert to lowercase and add @ prefix
    const convertedText = '@' + cleanText.toLowerCase();
    return { isValid: true, convertedText: convertedText };
  }

  function showError() {
    inputContainer.classList.remove('success');
    inputContainer.classList.add('error');

    setTimeout(() => {
      inputContainer.classList.remove('error');
    }, 3000);
  }

  function showSuccess() {
    inputContainer.classList.remove('error');
    inputContainer.classList.add('success');

    setTimeout(() => {
      inputContainer.classList.remove('success');
    }, 3000);
  }

  sendButton.addEventListener('click', function(e) {
    e.preventDefault();

    // Check if site is locked
    if (isLocked) {
      showError();
      return;
    }

    const inputValue = inputField.value.trim();

    if (inputValue === '') {
      showError();
      return;
    }

    const validation = validateAndConvert(inputValue);

    if (!validation.isValid) {
      showError();
    } else {
      // Update input field with converted text
      inputField.value = validation.convertedText;

      // Show success state
      showSuccess();

      // Submit vote to Firebase or localStorage
      submitVote(validation.convertedText);
    }
  });

  // Also validate on Enter key press
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      if (!isLocked) {
        sendButton.click();
      } else {
        showError();
      }
    }
  });

  // Change button event listener
  changeButton.addEventListener('click', function(e) {
    e.preventDefault();

    // Check if site is locked
    if (isLocked) {
      showError();
      return;
    }

    const inputValue = inputField.value.trim();

    if (inputValue === '') {
      showError();
      return;
    }

    const validation = validateAndConvert(inputValue);

    if (!validation.isValid) {
      showError();
    } else {
      // Update input field with converted text
      inputField.value = validation.convertedText;

      // Show success state
      showSuccess();

      // Change vote
      changeVote(validation.convertedText);
    }
  });

  // Admin panel variables
  let isLocked = false;

  // Admin panel functions
  function showAdminLogin() {
    const password = prompt('رمز عبور ادمین را وارد کنید:');
    if (password === '9831') {
      showAdminPanel();
    } else if (password !== null) {
      alert('رمز عبور اشتباه است!');
    }
  }

  function showAdminPanel() {
    // Hide all pages
    pages.forEach(page => {
      page.style.display = 'none';
    });

    // Show admin panel
    document.getElementById('admin-panel').style.display = 'flex';

    // Remove active from all menu items
    menuLinks.forEach(l => l.classList.remove('active'));
  }

  function closeAdminPanel() {
    document.getElementById('admin-panel').style.display = 'none';

    // Return to home page
    document.getElementById('home-page').style.display = 'flex';

    // Set home as active
    document.querySelector('[data-page="home"]').classList.add('active');
  }

  // Reset function
  function resetSite() {
    if (confirm('آیا مطمئن هستید که می‌خواهید تمام اطلاعات سایت پاک شود؟')) {
      // Clear all stored data
      localStorage.clear();
      sessionStorage.clear();

      // Reset form
      const inputField = document.querySelector('.input-container input');
      const sendButton = document.querySelector('.input-container .button:not(.change-button)');
      const changeButton = document.querySelector('.change-button');
      const inputContainer = document.querySelector('.input-container');

      if (inputField) {
        inputField.value = '';
        inputField.disabled = false;
      }

      if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = 'Send';
      }

      if (changeButton) {
        changeButton.disabled = true;
        changeButton.textContent = 'Change';
      }

      if (inputContainer) {
        inputContainer.classList.remove('error', 'success', 'voted');
      }

      // Reset lock state
      setLockState(false);

      // Reset Firebase data if using Firebase
      if (window.firebaseDb && window.firebaseDb.useFirebase) {
        try {
          // Clear votes from Firebase
          const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
          window.firebaseDb.set(votesRef, {})
            .then(() => {
              console.log('Firebase votes cleared');
              // Update leaderboard
              updateLeaderboard();
            })
            .catch((error) => {
              console.log('Firebase clear error:', error);
            });
        } catch (error) {
          console.log('Firebase reset error:', error);
        }
      }

      // Update leaderboard
      updateLeaderboard();

      alert('سایت با موفقیت ریست شد!');
    }
  }

  // Lock function
  function toggleLock() {
    setLockState(!isLocked);
  }

  // Firebase lock state management
  function updateLockState(locked) {
    isLocked = locked;
    const sendButton = document.querySelector('.input-container button');
    const lockBtn = document.getElementById('lock-btn');
    const inputContainer = document.querySelector('.input-container');

    if (isLocked) {
      if (sendButton) {
        sendButton.innerHTML = '🔒';
        sendButton.disabled = true;
        sendButton.style.cursor = 'not-allowed';
      }
      if (lockBtn) {
        lockBtn.textContent = 'Lock ✅';
        lockBtn.style.background = 'linear-gradient(135deg, #00FF00 0%, #006400 100%)';
      }
      if (inputContainer) {
        inputContainer.classList.remove('success');
        inputContainer.classList.add('error');
      }
    } else {
      if (sendButton) {
        sendButton.innerHTML = 'Send';
        sendButton.disabled = false;
        sendButton.style.cursor = 'pointer';
      }
      if (lockBtn) {
        lockBtn.textContent = 'Lock ❌';
        lockBtn.style.background = 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)';
      }
      if (inputContainer) {
        inputContainer.classList.remove('error', 'success');
      }
    }
  }

  // Initialize lock state from Firebase or localStorage
  function initializeLockState() {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        // Listen for real-time updates from Firebase
        const lockRef = window.firebaseDb.ref(window.firebaseDb.database, 'siteLocked');
        window.firebaseDb.onValue(lockRef, (snapshot) => {
          const locked = snapshot.val() !== null ? snapshot.val() : false;
          console.log('Firebase lock state received:', locked);
          // Also save to localStorage as backup
          localStorage.setItem('siteLocked', locked.toString());
          updateLockState(locked);
        }, (error) => {
          console.log('Firebase read error, using localStorage. Please check Firebase Rules:', error);
          // Fallback to localStorage if Firebase fails
          const locked = localStorage.getItem('siteLocked') === 'true';
          updateLockState(locked);
        });
      } catch (error) {
        console.log('Firebase connection error, using localStorage:', error);
        // Fallback to localStorage
        const locked = localStorage.getItem('siteLocked') === 'true';
        updateLockState(locked);
      }
    } else {
      // Fallback to localStorage
      const locked = localStorage.getItem('siteLocked') === 'true';
      updateLockState(locked);
    }
  }

  // Set lock state to Firebase or localStorage
  function setLockState(locked) {
    console.log('Setting lock state to:', locked);

    // Always save to localStorage first
    localStorage.setItem('siteLocked', locked.toString());
    updateLockState(locked);

    // Try to save to Firebase if available
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const lockRef = window.firebaseDb.ref(window.firebaseDb.database, 'siteLocked');
        window.firebaseDb.set(lockRef, locked)
          .then(() => {
            console.log('Successfully saved lock state to Firebase:', locked);
          })
          .catch((error) => {
            console.log('Firebase write error. Please check Firebase Rules:', error);
            console.log('Lock state saved to localStorage only');
          });
      } catch (error) {
        console.log('Firebase connection error, but localStorage updated:', error);
      }
    }
  }

  // Function to display full results
  function displayFullResults() {
    const fullscreenOverlay = document.getElementById('fullscreen-results-overlay');

    if (fullscreenOverlay) {
      fullscreenOverlay.classList.add('show');

      if (window.firebaseDb && window.firebaseDb.useFirebase) {
        try {
          const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
          window.firebaseDb.onValue(votesRef, (snapshot) => {
            const votes = snapshot.val() || {};
            showFullscreenResults(votes);
          }, { onlyOnce: true });
        } catch (error) {
          console.log('Firebase error in displayFullResults:', error);
          showFullscreenResults({});
        }
      } else {
        console.log('Firebase not available for full results');
        showFullscreenResults({});
      }
    }
  }

  // Function to close fullscreen results
  function closeFullscreenResults() {
    const fullscreenOverlay = document.getElementById('fullscreen-results-overlay');
    if (fullscreenOverlay) {
      fullscreenOverlay.classList.remove('show');
    }
  }

  // Function to show full results
  function showFullResults(votes, container) {
    const sortedVotes = Object.entries(votes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10); // Top 10

    container.innerHTML = '';

    if (sortedVotes.length === 0) {
      container.innerHTML = '<div class="no-data">هیچ رای ثبت نشده</div>';
      return;
    }

    sortedVotes.forEach(([username, voteCount], index) => {
      const item = document.createElement('div');
      item.className = 'full-result-item';
      
      // Convert username for display (replace * with .)
      const displayUsername = convertDisplayName(username);
      
      item.innerHTML = `
        <span class="result-rank">${index + 1}</span>
        <span class="result-username">${displayUsername}</span>
        <span class="result-votes">${voteCount}</span>
      `;
      container.appendChild(item);
    });
  }

  // Function to show fullscreen results
  function showFullscreenResults(votes) {
    const fullscreenBody = document.getElementById('fullscreen-results-body');

    if (!fullscreenBody) {
      console.log('Fullscreen results body not found');
      return;
    }

    // Clear existing content
    fullscreenBody.innerHTML = '';

    // Convert votes object to array and sort by votes (descending)
    const sortedVotes = Object.entries(votes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10); // Top 10

    if (sortedVotes.length === 0) {
      fullscreenBody.innerHTML = '<tr><td colspan="3" class="fullscreen-no-data">هیچ رای ثبت نشده</td></tr>';
      return;
    }

    // Fill with actual data
    sortedVotes.forEach(([username, voteCount], index) => {
      const rank = index + 1;
      const row = document.createElement('tr');
      row.className = `fullscreen-rank-${rank}`;

      let medalHtml = '';
      if (rank <= 3) {
        medalHtml = `<span class="fullscreen-rank-medal">${rank}</span>`;
      }

      // Convert username for display (replace * with .)
      const displayUsername = convertDisplayName(username);

      row.innerHTML = `
        <td>${medalHtml || rank}</td>
        <td>${displayUsername}</td>
        <td>${voteCount}</td>
      `;

      fullscreenBody.appendChild(row);
    });
  }

  // Add close button event listener when DOM is ready
  setTimeout(() => {
    const closeBtn = document.querySelector('.admin-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeAdminPanel);
    }

    // Add Reset button event listener
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetSite);
    }

    // Add Lock button event listener
    const lockBtn = document.getElementById('lock-btn');
    if (lockBtn) {
      lockBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleLock();
      });
    }

    // Add Vote button event listener
    const voteBtn = document.getElementById('vote-btn');
    const voteContainer = document.getElementById('admin-vote-container');
    if (voteBtn && voteContainer) {
      voteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (voteContainer.style.display === 'none' || voteContainer.style.display === '') {
          voteContainer.style.display = 'block';
        } else {
          voteContainer.style.display = 'none';
        }
      });
    }

    // Add Full Result button event listener
    const fullResultBtn = document.getElementById('full-result-btn');
    if (fullResultBtn) {
      fullResultBtn.addEventListener('click', function(e) {
        e.preventDefault();
        displayFullResults();
      });
    }

    // Add admin vote submit functionality
    const adminVoteSubmit = document.getElementById('admin-vote-submit');
    const adminVoteInput = document.getElementById('admin-vote-input');
    if (adminVoteSubmit && adminVoteInput) {
      adminVoteSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        submitAdminVote();
      });

      adminVoteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          submitAdminVote();
        }
      });
    }

    // Add fullscreen close button event listener
    const fullscreenCloseBtn = document.getElementById('fullscreen-close-btn');
    if (fullscreenCloseBtn) {
      fullscreenCloseBtn.addEventListener('click', closeFullscreenResults);
    }

    // Close fullscreen results when clicking outside
    const fullscreenOverlay = document.getElementById('fullscreen-results-overlay');
    if (fullscreenOverlay) {
      fullscreenOverlay.addEventListener('click', function(e) {
        if (e.target === fullscreenOverlay) {
          closeFullscreenResults();
        }
      });
    }

    // Initialize lock state
    initializeLockState();
  }, 100);

  // Admin vote submission function
  function submitAdminVote() {
    const adminVoteInput = document.getElementById('admin-vote-input');
    const inputValue = adminVoteInput.value.trim();

    if (!inputValue) {
      alert('لطفاً آیدی و تعداد رای را وارد کنید');
      return;
    }

    // Parse input format: @username+number or @username-number
    const match = inputValue.match(/^@?([a-zA-Z0-9._]+)([+-])(\d+)$/);
    if (!match) {
      alert('فرمت صحیح: @username+2 یا @username-2');
      return;
    }

    // Replace dots with asterisk, remove other invalid characters
    let cleanUsername = match[1].replace(/\./g, '*').replace(/[#$\/\[\]]/g, '');
    const username = '@' + cleanUsername.toLowerCase();
    const operation = match[2];
    const voteCount = parseInt(match[3]);
    const isSubtract = operation === '-';

    if (voteCount <= 0) {
      alert('تعداد رای باید عدد مثبت باشد');
      return;
    }

    // Submit votes
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};

          // Add or subtract votes for this user
          if (votes[username]) {
            votes[username] += isSubtract ? -voteCount : voteCount;
            if (votes[username] < 0) {
              votes[username] = 0;  // Prevent negative votes
            }
          } else {
            votes[username] = isSubtract ? 0 : voteCount; // Start from 0 if subtracting
          }

          // Save back to Firebase
          window.firebaseDb.set(votesRef, votes)
            .then(() => {
              console.log('Admin vote submitted successfully');
              adminVoteInput.value = '';
              alert(`${voteCount} رای برای ${username} ${isSubtract ? 'کم شد' : 'ثبت شد'}`);
              updateLeaderboard();
            })
            .catch((error) => {
              console.log('Firebase write error:', error);
              submitAdminVoteToLocalStorage(username, voteCount, isSubtract);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        submitAdminVoteToLocalStorage(username, voteCount, isSubtract);
      }
    } else {
      submitAdminVoteToLocalStorage(username, voteCount, isSubtract);
    }
  }

  // Submit admin vote to localStorage
  function submitAdminVoteToLocalStorage(username, voteCount, isSubtract) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');

    if (votes[username]) {
      votes[username] += isSubtract ? -voteCount : voteCount;
      if (votes[username] < 0) {
        votes[username] = 0;  // Prevent negative votes
      }
    } else {
      votes[username] = isSubtract ? 0 : voteCount; // Start from 0 if subtracting
    }

    localStorage.setItem('votes', JSON.stringify(votes));

    const adminVoteInput = document.getElementById('admin-vote-input');
    if (adminVoteInput) {
      adminVoteInput.value = '';
    }

    alert(`${voteCount} رای برای ${username} ${isSubtract ? 'کم شد' : 'ثبت شد'}`);
    updateLeaderboard();
  }

  // Vote submission function
  function submitVote(username) {
    // Check if user has already voted
    const hasVoted = localStorage.getItem('hasVoted') === 'true';
    if (hasVoted) {
      showError();
      return;
    }

    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        // Get current votes from Firebase
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};

          // Increment vote count for this user
          if (votes[username]) {
            votes[username]++;
          } else {
            votes[username] = 1;
          }

          // Save back to Firebase
          window.firebaseDb.set(votesRef, votes)
            .then(() => {
              console.log('Vote submitted successfully');
              // Mark user as voted
              localStorage.setItem('hasVoted', 'true');
              localStorage.setItem('votedFor', username);
              markAsVoted();
            })
            .catch((error) => {
              console.log('Firebase write error:', error);
              // Fallback to localStorage
              submitVoteToLocalStorage(username);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        // Fallback to localStorage
        submitVoteToLocalStorage(username);
      }
    } else {
      // Use localStorage
      submitVoteToLocalStorage(username);
    }
  }

  // Submit vote to localStorage
  function submitVoteToLocalStorage(username) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');

    if (votes[username]) {
      votes[username]++;
    } else {
      votes[username] = 1;
    }

    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('hasVoted', 'true');
    localStorage.setItem('votedFor', username);
    markAsVoted();
  }

  // Change vote function
  function changeVote(newUsername) {
    const hasChanged = localStorage.getItem('hasChanged') === 'true';
    if (hasChanged) {
      showError();
      return;
    }

    const oldUsername = localStorage.getItem('votedFor');
    if (!oldUsername) {
      showError();
      return;
    }

    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        // Get current votes from Firebase
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};

          // Remove vote from old user
          if (votes[oldUsername] && votes[oldUsername] > 0) {
            votes[oldUsername]--;
            if (votes[oldUsername] === 0) {
              delete votes[oldUsername];
            }
          }

          // Add vote to new user
          if (votes[newUsername]) {
            votes[newUsername]++;
          } else {
            votes[newUsername] = 1;
          }

          // Save back to Firebase
          window.firebaseDb.set(votesRef, votes)
            .then(() => {
              console.log('Vote changed successfully');
              localStorage.setItem('votedFor', newUsername);
              localStorage.setItem('hasChanged', 'true');
              markAsChanged();
            })
            .catch((error) => {
              console.log('Firebase write error:', error);
              changeVoteToLocalStorage(oldUsername, newUsername);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        changeVoteToLocalStorage(oldUsername, newUsername);
      }
    } else {
      changeVoteToLocalStorage(oldUsername, newUsername);
    }
  }

  // Change vote to localStorage
  function changeVoteToLocalStorage(oldUsername, newUsername) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');

    // Remove vote from old user
    if (votes[oldUsername] && votes[oldUsername] > 0) {
      votes[oldUsername]--;
      if (votes[oldUsername] === 0) {
        delete votes[oldUsername];
      }
    }

    // Add vote to new user
    if (votes[newUsername]) {
      votes[newUsername]++;
    } else {
      votes[newUsername] = 1;
    }

    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('votedFor', newUsername);
    localStorage.setItem('hasChanged', 'true');
    markAsChanged();
  }

  // Mark as changed
  function markAsChanged() {
    const inputContainer = document.querySelector('.input-container');
    const inputField = document.querySelector('.input-container input');
    const changeButton = document.querySelector('.change-button');

    // Remove previous states
    inputContainer.classList.remove('error', 'voted');
    inputContainer.classList.add('success');

    inputField.disabled = true;
    changeButton.disabled = true;
    changeButton.textContent = 'Changed ✓';

    // Clear input
    inputField.value = '';
  }

  // Mark input as voted
  function markAsVoted() {
    const inputContainer = document.querySelector('.input-container');
    const inputField = document.querySelector('.input-container input');
    const sendButton = document.querySelector('.input-container .button:not(.change-button)');
    const changeButton = document.querySelector('.change-button');

    // Remove previous states and add success state
    inputContainer.classList.remove('error');
    inputContainer.classList.add('success');

    // Don't disable input field so user can use change button
    inputField.disabled = false;
    sendButton.disabled = true;
    sendButton.textContent = 'Voted ✓';

    // Enable change button
    changeButton.disabled = false;

    // Clear input
    inputField.value = '';

    // After 3 seconds, change to voted state
    setTimeout(() => {
      inputContainer.classList.remove('success');
      inputContainer.classList.add('voted');
    }, 3000);
  }

  // Update leaderboard function
  function updateLeaderboard() {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};
          console.log('Firebase votes data loaded:', votes);
          displayLeaderboard(votes);
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error in updateLeaderboard:', error);
        // Show empty leaderboard instead of localStorage fallback
        displayLeaderboard({});
      }
    } else {
      console.log('Firebase not available, showing empty leaderboard');
      // Show empty leaderboard when Firebase is not available
      displayLeaderboard({});
    }
  }

  // Function to convert display name (replace * back to .)
  function convertDisplayName(username) {
    return username.replace(/\*/g, '.');
  }

  // Display leaderboard
  function displayLeaderboard(votes) {
    const leaderboardBody = document.getElementById('leaderboard-body');

    if (!leaderboardBody) {
      console.log('Leaderboard body not found');
      return;
    }

    // Clear existing content
    leaderboardBody.innerHTML = '';

    // Convert votes object to array and sort by votes (descending)
    const sortedVotes = Object.entries(votes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5); // Top 5 only

    if (sortedVotes.length === 0) {
      // Show 5 unknown entries instead of no data message
      for (let i = 1; i <= 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i}</td>
          <td>@unknown</td>
          <td>0</td>
        `;
        leaderboardBody.appendChild(row);
      }
      return;
    }

    // Fill with actual data
    sortedVotes.forEach(([username, voteCount], index) => {
      const rank = index + 1;
      const row = document.createElement('tr');
      row.className = `rank-${rank}`;

      let medalHtml = '';
      if (rank <= 3) {
        medalHtml = `<span class="rank-medal">${rank}</span>`;
      }

      // Convert username for display (replace * with .)
      const displayUsername = convertDisplayName(username);

      row.innerHTML = `
        <td>${medalHtml || rank}</td>
        <td>${displayUsername}</td>
        <td>${voteCount}</td>
      `;

      leaderboardBody.appendChild(row);
    });

    // Fill remaining slots with unknown if less than 5
    if (sortedVotes.length < 5) {
      for (let i = sortedVotes.length + 1; i <= 5; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i}</td>
          <td>@unknown</td>
          <td>0</td>
        `;
        leaderboardBody.appendChild(row);
      }
    }
  }

  // Initialize vote state
  function initializeVoteState() {
    const hasVoted = localStorage.getItem('hasVoted') === 'true';
    const hasChanged = localStorage.getItem('hasChanged') === 'true';

    if (hasVoted) {
      markAsVoted();
    }

    if (hasChanged) {
      markAsChanged();
    }
  }

  // Clear localStorage to ensure only Firebase data is used
  localStorage.removeItem('votes');

  // Initialize vote state when page loads
  initializeVoteState();

  // Initialize leaderboard when page loads
  setTimeout(() => {
    updateLeaderboard();
  }, 3000); // Wait for Firebase connection

  // Make functions globally available
  window.updateLeaderboard = updateLeaderboard;
  window.submitAdminVote = submitAdminVote;
  window.submitAdminVoteToLocalStorage = submitAdminVoteToLocalStorage;
  window.showConnectionStatus = showConnectionStatus;
});