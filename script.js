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

  // Instant auto-refresh on site load for fastest experience
  setTimeout(() => {
    const refreshBtn = document.getElementById('refresh-reels-btn');
    if (refreshBtn) {
      refreshBtn.click();
    } else {
      loadPosts();
    }
  }, 10); // Ultra-fast refresh on site load

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
        }, 100);
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
        }, 100);
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
  const sendButton = document.querySelector('.input-container button');
  const inputContainer = document.querySelector('.input-container');

  function validateAndConvert(text) {
    // Remove @ if exists at the beginning
    let cleanText = text.startsWith('@') ? text.substring(1) : text;

    // Check for invalid characters (non-English letters, spaces, and invalid symbols)
    const validPattern = /^[a-zA-Z0-9._]+$/;
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
      const sendButton = document.querySelector('.input-container button');
      const inputContainer = document.querySelector('.input-container');
      
      if (inputField) {
        inputField.value = '';
        inputField.disabled = false;
      }
      
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.textContent = 'Send';
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

          // Clear reels from Firebase
          const reelsRef = window.firebaseDb.ref(window.firebaseDb.database, 'reels');
          window.firebaseDb.set(reelsRef, {})
            .then(() => {
              console.log('Firebase reels cleared');
              // Reload posts if on explore page
              const explorePage = document.getElementById('explore-page');
              if (explorePage && explorePage.style.display !== 'none') {
                loadPosts();
              }
            })
            .catch((error) => {
              console.log('Firebase reels clear error:', error);
            });

          // Clear reel likes from Firebase
          const reelLikesRef = window.firebaseDb.ref(window.firebaseDb.database, 'reelLikes');
          window.firebaseDb.set(reelLikesRef, {})
            .then(() => {
              console.log('Firebase reel likes cleared');
            })
            .catch((error) => {
              console.log('Firebase reel likes clear error:', error);
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
        if (voteContainer.style.display === 'none') {
          voteContainer.style.display = 'block';
        } else {
          voteContainer.style.display = 'none';
        }
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

    // Parse input format: @username+number
    const match = inputValue.match(/^@?([a-zA-Z0-9._]+)\+(\d+)$/);
    if (!match) {
      alert('فرمت صحیح: @username+2');
      return;
    }

    const username = '@' + match[1].toLowerCase();
    const voteCount = parseInt(match[2]);

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
          
          // Add votes for this user
          if (votes[username]) {
            votes[username] += voteCount;
          } else {
            votes[username] = voteCount;
          }

          // Save back to Firebase
          window.firebaseDb.set(votesRef, votes)
            .then(() => {
              console.log('Admin vote submitted successfully');
              adminVoteInput.value = '';
              alert(`${voteCount} رای برای ${username} ثبت شد`);
              updateLeaderboard();
            })
            .catch((error) => {
              console.log('Firebase write error:', error);
              submitAdminVoteToLocalStorage(username, voteCount);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        submitAdminVoteToLocalStorage(username, voteCount);
      }
    } else {
      submitAdminVoteToLocalStorage(username, voteCount);
    }
  }

  // Submit admin vote to localStorage
  function submitAdminVoteToLocalStorage(username, voteCount) {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    
    if (votes[username]) {
      votes[username] += voteCount;
    } else {
      votes[username] = voteCount;
    }

    localStorage.setItem('votes', JSON.stringify(votes));
    
    const adminVoteInput = document.getElementById('admin-vote-input');
    if (adminVoteInput) {
      adminVoteInput.value = '';
    }
    
    alert(`${voteCount} رای برای ${username} ثبت شد`);
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
    markAsVoted();
  }

  // Mark input as voted
  function markAsVoted() {
    const inputContainer = document.querySelector('.input-container');
    const inputField = document.querySelector('.input-container input');
    const sendButton = document.querySelector('.input-container button');

    inputContainer.classList.add('voted');
    inputField.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Voted ✓';
    
    // Clear input
    inputField.value = '';
  }

  // Update leaderboard function
  function updateLeaderboard() {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};
          displayLeaderboard(votes);
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        // Fallback to localStorage
        const votes = JSON.parse(localStorage.getItem('votes') || '{}');
        displayLeaderboard(votes);
      }
    } else {
      // Use localStorage
      const votes = JSON.parse(localStorage.getItem('votes') || '{}');
      displayLeaderboard(votes);
    }
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

      row.innerHTML = `
        <td>${medalHtml || rank}</td>
        <td>${username}</td>
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
    if (hasVoted) {
      markAsVoted();
    }
  }

  // Initialize vote state when page loads
  initializeVoteState();

  // Video upload and management functions
  function initializeVideoUpload() {
    const addPostButton = document.getElementById('add-post-button');
    const videoUpload = document.getElementById('video-upload');
    const captionInput = document.getElementById('caption-input');
    const instagramIdInput = document.getElementById('instagram-id-input');

    if (addPostButton) {
      addPostButton.addEventListener('click', function(e) {
        e.preventDefault();
        uploadPost();
      });
    }
  }

  function uploadPost() {
    const videoFile = document.getElementById('video-upload').files[0];
    const caption = document.getElementById('caption-input').value.trim();
    const instagramId = document.getElementById('instagram-id-input').value.trim();

    // Validation
    if (!videoFile) {
      alert('لطفاً یک ویدیو انتخاب کنید');
      return;
    }

    if (!caption) {
      alert('کپشن ویدیو الزامی است');
      return;
    }

    if (!instagramId) {
      alert('آیدی اینستاگرام الزامی است');
      return;
    }

    // Validate Instagram ID
    const instagramPattern = /^[a-zA-Z0-9._]+$/;
    if (!instagramPattern.test(instagramId)) {
      alert('آیدی اینستاگرام نامعتبر است');
      return;
    }

    // Check video file size (max 5MB for better performance)
    if (videoFile.size > 5 * 1024 * 1024) {
      alert('فایل ویدیو خیلی بزرگ است. لطفاً فایل کوچکتر از 5MB انتخاب کنید.');
      return;
    }

    // Disable button during upload
    const addPostButton = document.getElementById('add-post-button');
    addPostButton.disabled = true;
    addPostButton.textContent = 'در حال آپلود...';

    // Create unique ID with timestamp and random component
    const uniqueId = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Convert video to base64 for storage
    const reader = new FileReader();
    reader.onload = function(e) {
      const videoBase64 = e.target.result;
      
      // Create URL for video preview
      const videoURL = URL.createObjectURL(videoFile);
      
      const postData = {
        id: uniqueId,
        videoURL: videoBase64,
        previewURL: videoURL,
        caption: caption,
        instagramId: instagramId,
        likes: 0,
        timestamp: Date.now()
      };

      // Save to Firebase or localStorage
      savePost(postData);
    };
    
    reader.onerror = function() {
      alert('خطا در خواندن فایل ویدیو');
      clearUploadForm();
    };
    
    reader.readAsDataURL(videoFile);
  }

  function savePost(postData) {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const reelsRef = window.firebaseDb.ref(window.firebaseDb.database, 'reels/' + postData.id);
        window.firebaseDb.set(reelsRef, postData)
          .then(() => {
            console.log('Reel uploaded successfully');
            clearUploadForm();
            loadPosts();
            alert('Reel uploaded successfully!');
          })
          .catch((error) => {
            console.log('Firebase write error:', error);
            savePostToLocalStorage(postData);
          });
      } catch (error) {
        console.log('Firebase error:', error);
        savePostToLocalStorage(postData);
      }
    } else {
      savePostToLocalStorage(postData);
    }
  }

  function savePostToLocalStorage(postData) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift(postData); // Add to beginning
    localStorage.setItem('posts', JSON.stringify(posts));
    
    clearUploadForm();
    loadPosts();
    alert('Post uploaded successfully!');
  }

  function clearUploadForm() {
    document.getElementById('video-upload').value = '';
    document.getElementById('caption-input').value = '';
    document.getElementById('instagram-id-input').value = '';
    
    const addPostButton = document.getElementById('add-post-button');
    addPostButton.disabled = false;
    addPostButton.textContent = 'Upload Post';
  }

  // Global variable to store Firebase listener
  let reelsListener = null;

  function loadPosts() {
    const reelContent = document.getElementById('reel-content');
    if (!reelContent) return;

    // Show minimal loading indicator for faster perception
    if (!reelsListener) {
      reelContent.innerHTML = '<div class="loading">Loading</div>';
    }

    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const reelsRef = window.firebaseDb.ref(window.firebaseDb.database, 'reels');
        
        // Remove previous listener if exists
        if (reelsListener) {
          window.firebaseDb.off(reelsRef, 'value', reelsListener);
        }
        
        // Create persistent listener that updates in real-time
        reelsListener = (snapshot) => {
          const reels = snapshot.val() || {};
          const reelsArray = Object.values(reels).sort((a, b) => b.timestamp - a.timestamp);
          displayPosts(reelsArray);
        };
        
        window.firebaseDb.onValue(reelsRef, reelsListener, (error) => {
          console.log('Firebase read error:', error);
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          displayPosts(posts);
        });
        
      } catch (error) {
        console.log('Firebase error:', error);
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        displayPosts(posts);
      }
    } else {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      displayPosts(posts);
    }
  }

  function displayPosts(posts) {
    const reelContent = document.getElementById('reel-content');
    if (!reelContent) return;

    reelContent.innerHTML = '';

    // Only use Firebase data if available, otherwise use localStorage
    let postsToDisplay = [];
    
    if (window.firebaseDb && window.firebaseDb.useFirebase && posts.length > 0) {
      postsToDisplay = posts.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      postsToDisplay = localPosts.sort((a, b) => b.timestamp - a.timestamp);
    }

    if (postsToDisplay.length === 0) {
      reelContent.innerHTML = '<div class="no-posts">هنوز هیچ ریلی آپلود نشده است</div>';
      return;
    }

    // Create scrollable container
    reelContent.style.overflowY = 'auto';
    reelContent.style.scrollBehavior = 'smooth';
    reelContent.style.scrollSnapType = 'y mandatory';

    postsToDisplay.forEach((post, index) => {
      const reelItem = document.createElement('div');
      reelItem.className = `reel-item ${index === 0 ? 'active' : ''}`;
      
      // Use previewURL if available, otherwise use videoURL
      const videoSrc = post.previewURL || post.videoURL;
      
      // Check if user has liked this post
      const isLiked = isPostLikedByUser(post.id);
      
      reelItem.innerHTML = `
        <div class="reel-header">
          <span class="reel-username">@${post.instagramId}</span>
        </div>
        <video class="reel-video" src="${videoSrc}" muted loop autoplay playsinline></video>
        <div class="reel-actions">
          <button class="reel-like-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
            <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="like-count">${post.likes || 0}</span>
          </button>
        </div>
      `;

      reelContent.appendChild(reelItem);

      // Add click to mute/unmute video
      const video = reelItem.querySelector('.reel-video');
      video.addEventListener('click', function(e) {
        // Prevent double-tap interference
        e.stopPropagation();
        this.muted = !this.muted;
        showMuteIndicator(this.muted);
      });

      // Add like functionality (only for button clicks, not double-tap)
      const likeBtn = reelItem.querySelector('.reel-like-btn');
      if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!isPostLikedByUser(post.id)) {
            toggleReelLike(post.id);
          }
        });
      }
    });

    // Add swipe functionality for mobile
    addSwipeNavigation(reelContent, postsToDisplay.length);
  }

  function getUserLikeStatus(postId) {
    const userId = getUserId();
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      // For Firebase, we'll check during rendering
      return false;
    }
    const likedPosts = JSON.parse(localStorage.getItem('userLikes') || '{}');
    return likedPosts[userId] && likedPosts[userId][postId] || false;
  }

  function isPostLikedByUser(postId) {
    const userId = getUserId();
    const likedPosts = JSON.parse(localStorage.getItem('userLikes') || '{}');
    return likedPosts[userId] && likedPosts[userId][postId] || false;
  }

  function showMuteIndicator(isMuted) {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.mute-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'mute-indicator';
    indicator.innerHTML = isMuted ? 
      '<svg viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>' :
      '<svg viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    
    document.body.appendChild(indicator);
    
    // Remove after 1 second
    setTimeout(() => {
      indicator.remove();
    }, 1000);
  }

  function toggleReelLike(reelId) {
    const userId = getUserId();
    const likeBtn = document.querySelector(`[data-post-id="${reelId}"].reel-like-btn`);
    
    // Check if user has already liked this post
    if (isPostLikedByUser(reelId)) {
      console.log('User has already liked this post');
      return; // Prevent duplicate likes
    }
    
    const isCurrentlyLiked = likeBtn.classList.contains('liked');
    
    // Optimistic UI update
    likeBtn.classList.add('liked');
    
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const userLikeRef = window.firebaseDb.ref(window.firebaseDb.database, `reelLikes/${userId}/${reelId}`);
        const reelRef = window.firebaseDb.ref(window.firebaseDb.database, `reels/${reelId}/likes`);
        
        if (!isCurrentlyLiked) {
          // Like the reel
          window.firebaseDb.set(userLikeRef, true);
          window.firebaseDb.onValue(reelRef, (reelSnapshot) => {
            const currentLikes = reelSnapshot.val() || 0;
            window.firebaseDb.set(reelRef, currentLikes + 1);
            updateLikeUI(reelId, currentLikes + 1, true);
          }, { onlyOnce: true });
          
          // Show heart animation
          showHeartAnimation(likeBtn);
        }
      } catch (error) {
        console.log('Firebase error:', error);
        toggleLikeLocalStorage(reelId, true);
      }
    } else {
      toggleLikeLocalStorage(reelId, true);
    }
  }

  function toggleLike(postId) {
    const userId = getUserId();
    const likeBtn = document.querySelector(`[data-post-id="${postId}"].reel-like-btn`);
    const isCurrentlyLiked = likeBtn.classList.contains('liked');
    
    // Optimistic UI update
    likeBtn.classList.toggle('liked');
    
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const userLikeRef = window.firebaseDb.ref(window.firebaseDb.database, `postLikes/${userId}/${postId}`);
        const postRef = window.firebaseDb.ref(window.firebaseDb.database, `posts/${postId}/likes`);
        
        if (!isCurrentlyLiked) {
          // Like the post
          window.firebaseDb.set(userLikeRef, true);
          window.firebaseDb.onValue(postRef, (postSnapshot) => {
            const currentLikes = postSnapshot.val() || 0;
            window.firebaseDb.set(postRef, currentLikes + 1);
            updateLikeUI(postId, currentLikes + 1, true);
          }, { onlyOnce: true });
          
          // Show heart animation
          showHeartAnimation(likeBtn);
        } else {
          // Unlike the post
          window.firebaseDb.set(userLikeRef, false);
          window.firebaseDb.onValue(postRef, (postSnapshot) => {
            const currentLikes = postSnapshot.val() || 0;
            window.firebaseDb.set(postRef, Math.max(0, currentLikes - 1));
            updateLikeUI(postId, Math.max(0, currentLikes - 1), false);
          }, { onlyOnce: true });
        }
      } catch (error) {
        console.log('Firebase error:', error);
        toggleLikeLocalStorage(postId, !isCurrentlyLiked);
      }
    } else {
      toggleLikeLocalStorage(postId, !isCurrentlyLiked);
    }
  }

  function showHeartAnimation(button) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }

  function toggleLikeLocalStorage(postId, isLiked) {
    const userId = getUserId();
    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    
    if (!userLikes[userId]) {
      userLikes[userId] = {};
    }
    
    const wasLiked = userLikes[userId][postId] || false;

    if (isLiked && !wasLiked) {
      userLikes[userId][postId] = true;
      updatePostLikesLocalStorage(postId, 1);
      updateLikeUI(postId, null, true);
    } else if (!isLiked && wasLiked) {
      userLikes[userId][postId] = false;
      updatePostLikesLocalStorage(postId, -1);
      updateLikeUI(postId, null, false);
    }

    localStorage.setItem('userLikes', JSON.stringify(userLikes));
  }

  function updateLikeUI(postId, newCount, isLiked) {
    const likeBtn = document.querySelector(`[data-post-id="${postId}"].reel-like-btn`);
    const likeCountElement = document.querySelector(`[data-post-id="${postId}"].reel-like-btn .like-count`);
    
    if (likeBtn) {
      if (isLiked) {
        likeBtn.classList.add('liked');
      } else {
        likeBtn.classList.remove('liked');
      }
    }
    
    if (likeCountElement && newCount !== null) {
      likeCountElement.textContent = newCount;
    }
  }

  function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  function updatePostLikes(postId, change) {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const postRef = window.firebaseDb.ref(window.firebaseDb.database, `posts/${postId}/likes`);
        window.firebaseDb.onValue(postRef, (snapshot) => {
          const currentLikes = snapshot.val() || 0;
          const newLikes = Math.max(0, currentLikes + change);
          
          window.firebaseDb.set(postRef, newLikes)
            .then(() => {
              // Update UI
              const likeCountElement = document.querySelector(`[data-post-id="${postId}"].like-button .like-count`);
              if (likeCountElement) {
                likeCountElement.textContent = newLikes;
              }
            })
            .catch((error) => {
              console.log('Firebase like update error:', error);
              updatePostLikesLocalStorage(postId, change);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        updatePostLikesLocalStorage(postId, change);
      }
    } else {
      updatePostLikesLocalStorage(postId, change);
    }
  }

  function updatePostLikesLocalStorage(postId, change) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      posts[postIndex].likes = Math.max(0, posts[postIndex].likes + change);
      localStorage.setItem('posts', JSON.stringify(posts));
      
      // Update UI
      const likeCountElement = document.querySelector(`[data-post-id="${postId}"].like-button .like-count`);
      if (likeCountElement) {
        likeCountElement.textContent = posts[postIndex].likes;
      }
    }
  }

  function showCommentModal(postId) {
    const modal = document.getElementById('comment-modal');
    modal.style.display = 'flex';
    modal.setAttribute('data-post-id', postId);
    loadComments(postId);
    
    // Add close event listener
    const closeBtn = modal.querySelector('.comment-close-btn');
    closeBtn.onclick = closeCommentModal;
    
    // Add send comment event listener
    const sendBtn = modal.querySelector('#send-comment');
    const commentInput = modal.querySelector('#comment-input');
    
    sendBtn.onclick = () => sendComment(postId);
    commentInput.onkeypress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendComment(postId);
      }
    };
  }

  function closeCommentModal() {
    const modal = document.getElementById('comment-modal');
    modal.style.display = 'none';
    modal.removeAttribute('data-post-id');
    
    // Clear input
    const commentInput = modal.querySelector('#comment-input');
    commentInput.value = '';
  }

  function sendComment(postId) {
    const commentInput = document.getElementById('comment-input');
    const content = commentInput.value.trim();
    
    if (!content) {
      alert('لطفاً نظر خود را بنویسید');
      return;
    }

    const userId = getUserId();
    const commentId = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
    
    const commentData = {
      id: commentId,
      postId: postId,
      content: content,
      author: userId,
      likes: 0,
      timestamp: Date.now()
    };

    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const commentRef = window.firebaseDb.ref(window.firebaseDb.database, `comments/${postId}/${commentId}`);
        window.firebaseDb.set(commentRef, commentData)
          .then(() => {
            commentInput.value = '';
            loadComments(postId);
            updatePostCommentsCount(postId, 1);
          })
          .catch((error) => {
            console.log('Firebase comment error:', error);
            saveCommentToLocalStorage(commentData);
          });
      } catch (error) {
        console.log('Firebase error:', error);
        saveCommentToLocalStorage(commentData);
      }
    } else {
      saveCommentToLocalStorage(commentData);
    }
  }

  function saveCommentToLocalStorage(commentData) {
    const comments = JSON.parse(localStorage.getItem('comments') || '{}');
    if (!comments[commentData.postId]) {
      comments[commentData.postId] = {};
    }
    comments[commentData.postId][commentData.id] = commentData;
    localStorage.setItem('comments', JSON.stringify(comments));
    
    const commentInput = document.getElementById('comment-input');
    commentInput.value = '';
    loadComments(commentData.postId);
    updatePostCommentsCount(commentData.postId, 1);
  }

  function loadComments(postId) {
    const container = document.getElementById('comments-container');
    container.innerHTML = '<div class="loading">در حال بارگذاری نظرات...</div>';

    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const commentsRef = window.firebaseDb.ref(window.firebaseDb.database, `comments/${postId}`);
        window.firebaseDb.onValue(commentsRef, (snapshot) => {
          const comments = snapshot.val() || {};
          displayComments(comments);
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        const comments = JSON.parse(localStorage.getItem('comments') || '{}');
        displayComments(comments[postId] || {});
      }
    } else {
      const comments = JSON.parse(localStorage.getItem('comments') || '{}');
      displayComments(comments[postId] || {});
    }
  }

  function displayComments(comments) {
    const container = document.getElementById('comments-container');
    container.innerHTML = '';

    const commentsArray = Object.values(comments).sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp);

    if (commentsArray.length === 0) {
      container.innerHTML = '<div class="no-comments">هنوز کامنتی ثبت نشده است</div>';
      return;
    }

    commentsArray.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.className = 'comments';
      commentElement.innerHTML = `
        <div class="comment-react">
          <button data-comment-id="${comment.id}">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
            </svg>
          </button>
          <hr>
          <span>${comment.likes}</span>
        </div>
        <div class="comment-container">
          <div class="user">
            <div class="user-pic">
              <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
              </svg>
            </div>
            <div class="user-info">
              <span>${comment.author}</span>
              <p>${new Date(comment.timestamp).toLocaleString('fa-IR')}</p>
            </div>
          </div>
          <p class="comment-content">${comment.content}</p>
        </div>
      `;
      
      container.appendChild(commentElement);
      
      // Add like comment functionality
      const likeBtn = commentElement.querySelector('button');
      likeBtn.addEventListener('click', () => toggleCommentLike(comment.id));
    });
  }

  function toggleCommentLike(commentId) {
    const userId = getUserId();
    
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const userLikeRef = window.firebaseDb.ref(window.firebaseDb.database, `commentLikes/${userId}/${commentId}`);
        window.firebaseDb.onValue(userLikeRef, (snapshot) => {
          const isLiked = snapshot.val() || false;
          
          if (!isLiked) {
            // Like comment
            window.firebaseDb.set(userLikeRef, true);
            updateCommentLikes(commentId, 1);
          } else {
            // Unlike comment
            window.firebaseDb.set(userLikeRef, false);
            updateCommentLikes(commentId, -1);
          }
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        toggleCommentLikeLocalStorage(commentId);
      }
    } else {
      toggleCommentLikeLocalStorage(commentId);
    }
  }

  function toggleCommentLikeLocalStorage(commentId) {
    const likedComments = JSON.parse(localStorage.getItem('likedComments') || '[]');
    const isLiked = likedComments.includes(commentId);
    
    if (!isLiked) {
      likedComments.push(commentId);
      updateCommentLikesLocalStorage(commentId, 1);
    } else {
      const index = likedComments.indexOf(commentId);
      likedComments.splice(index, 1);
      updateCommentLikesLocalStorage(commentId, -1);
    }
    
    localStorage.setItem('likedComments', JSON.stringify(likedComments));
  }

  function updateCommentLikes(commentId, change) {
    const modal = document.getElementById('comment-modal');
    const postId = modal.getAttribute('data-post-id');
    
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const commentRef = window.firebaseDb.ref(window.firebaseDb.database, `comments/${postId}/${commentId}/likes`);
        window.firebaseDb.onValue(commentRef, (snapshot) => {
          const currentLikes = snapshot.val() || 0;
          const newLikes = Math.max(0, currentLikes + change);
          window.firebaseDb.set(commentRef, newLikes);
          loadComments(postId); // Reload to sort by likes
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        updateCommentLikesLocalStorage(commentId, change);
      }
    } else {
      updateCommentLikesLocalStorage(commentId, change);
    }
  }

  function updateCommentLikesLocalStorage(commentId, change) {
    const modal = document.getElementById('comment-modal');
    const postId = modal.getAttribute('data-post-id');
    const comments = JSON.parse(localStorage.getItem('comments') || '{}');
    
    if (comments[postId] && comments[postId][commentId]) {
      comments[postId][commentId].likes = Math.max(0, comments[postId][commentId].likes + change);
      localStorage.setItem('comments', JSON.stringify(comments));
      loadComments(postId); // Reload to sort by likes
    }
  }

  function updatePostCommentsCount(postId, change) {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const postRef = window.firebaseDb.ref(window.firebaseDb.database, `posts/${postId}/comments`);
        window.firebaseDb.onValue(postRef, (snapshot) => {
          const currentComments = snapshot.val() || 0;
          window.firebaseDb.set(postRef, Math.max(0, currentComments + change));
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        updatePostCommentsCountLocalStorage(postId, change);
      }
    } else {
      updatePostCommentsCountLocalStorage(postId, change);
    }
  }

  function updatePostCommentsCountLocalStorage(postId, change) {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      posts[postIndex].comments = Math.max(0, posts[postIndex].comments + change);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }

  // Add improved swipe navigation with smooth scrolling
  function addSwipeNavigation(container, totalReels) {
    let currentIndex = 0;
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;
    let velocity = 0;
    let lastTime = 0;
    let lastY = 0;

    // Double tap detection for likes
    let lastTap = 0;
    let tapCount = 0;

    container.addEventListener('touchstart', function(e) {
      startY = e.touches[0].clientY;
      lastY = startY;
      lastTime = Date.now();
      isScrolling = true;
      velocity = 0;
    });

    container.addEventListener('touchmove', function(e) {
      if (!isScrolling) return;
      currentY = e.touches[0].clientY;
      
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaY = currentY - lastY;
      
      if (deltaTime > 0) {
        velocity = deltaY / deltaTime;
      }
      
      lastY = currentY;
      lastTime = currentTime;
      
      e.preventDefault();
    });

    container.addEventListener('touchend', function(e) {
      if (!isScrolling) return;
      isScrolling = false;

      const deltaY = startY - currentY;
      const threshold = 30; // Reduced threshold for easier swiping
      const velocityThreshold = 0.5;

      // Auto-continue scroll based on velocity
      if (Math.abs(velocity) > velocityThreshold || Math.abs(deltaY) > threshold) {
        if ((deltaY > 0 || velocity < -velocityThreshold) && currentIndex < totalReels - 1) {
          // Swipe up or fast upward velocity - next reel
          currentIndex++;
          showReelSmooth(currentIndex);
        } else if ((deltaY < 0 || velocity > velocityThreshold) && currentIndex > 0) {
          // Swipe down or fast downward velocity - previous reel
          currentIndex--;
          showReelSmooth(currentIndex);
        } else {
          // Snap back to current reel
          showReelSmooth(currentIndex);
        }
      } else {
        // Snap back to current reel
        showReelSmooth(currentIndex);
      }
    });

    // Double tap for like
    container.addEventListener('click', function(e) {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        const activeReel = container.querySelector('.reel-item.active');
        if (activeReel) {
          const postId = activeReel.querySelector('.reel-like-btn').getAttribute('data-post-id');
          if (postId) {
            // Check if user hasn't already liked
            if (!isPostLikedByUser(postId)) {
              toggleReelLike(postId);
              showHeartAnimation(e);
            }
          }
        }
        tapCount = 0;
      } else {
        tapCount++;
      }
      
      lastTap = currentTime;
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (document.getElementById('explore-page').style.display === 'none') return;
      
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        currentIndex--;
        showReelSmooth(currentIndex);
      } else if (e.key === 'ArrowDown' && currentIndex < totalReels - 1) {
        currentIndex++;
        showReelSmooth(currentIndex);
      }
    });

    function showReelSmooth(index) {
      const reels = container.querySelectorAll('.reel-item');
      
      // Smooth scroll to target reel
      if (reels[index]) {
        reels[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // Update active states
      reels.forEach((reel, i) => {
        reel.classList.remove('active');
        const video = reel.querySelector('.reel-video');
        
        if (i === index) {
          // Add active class with delay for smooth transition
          setTimeout(() => {
            reel.classList.add('active');
            if (video) {
              video.play().catch(e => console.log('Video play failed:', e));
            }
          }, 100);
        } else {
          // Pause non-active videos
          if (video) {
            video.pause();
          }
        }
      });
    }

    function showHeartAnimation(event) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      
      const rect = container.getBoundingClientRect();
      const x = event.clientX || (rect.left + rect.width / 2);
      const y = event.clientY || (rect.top + rect.height / 2);
      
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      heart.style.fontSize = '40px';
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 1500);
    }

    // Initialize with first reel
    if (totalReels > 0) {
      setTimeout(() => showReelSmooth(0), 100);
    }
  }

  // Initialize video functionality when DOM is ready
  setTimeout(() => {
    initializeVideoUpload();
    
    // Load posts when visiting explore page with auto refresh
    const exploreLink = document.querySelector('[data-page="explore"]');
    if (exploreLink) {
      exploreLink.addEventListener('click', () => {
        setTimeout(() => {
          // Auto refresh on page entry
          const refreshBtn = document.getElementById('refresh-reels-btn');
          if (refreshBtn) {
            refreshBtn.click();
          } else {
            loadPosts();
          }
        }, 10); // Ultra-fast refresh
      });
    }

    // Auto refresh when page loads if starting on explore
    if (window.location.hash === '#explore' || document.querySelector('[data-page="explore"]').classList.contains('active')) {
      setTimeout(() => {
        const refreshBtn = document.getElementById('refresh-reels-btn');
        if (refreshBtn) {
          refreshBtn.click();
        } else {
          loadPosts();
        }
      }, 10); // Ultra-fast refresh
    }

    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-reels-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        // Add loading state
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.8 1 6.4 2.6L21 3v6h-6"/>
          </svg>
          Loading...
        `;
        
        // Reload posts
        loadPosts();
        
        // Reset button after 0.5 seconds for ultra-fast experience
        setTimeout(() => {
          refreshBtn.disabled = false;
          refreshBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.8 1 6.4 2.6L21 3v6h-6"/>
            </svg>
            Refresh
          `;
        }, 500);
      });
    }

    // Remove auto-refresh interval - Firebase listener handles real-time updates
    // No need for periodic refresh since we use persistent Firebase listener

    // Also load posts when page loads if on explore
    if (window.location.hash === '#explore') {
      setTimeout(() => {
        loadPosts();
      }, 500);
    }
  }, 100);

  // Make functions globally available
  window.updateLeaderboard = updateLeaderboard;
  window.submitAdminVote = submitAdminVote;
  window.submitAdminVoteToLocalStorage = submitAdminVoteToLocalStorage;
  window.loadPosts = loadPosts;
  window.toggleLike = toggleLike;
  window.showCommentModal = showCommentModal;
});