document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.navMenu a');
  const pages = document.querySelectorAll('.page');

  // Dynamic Theme System
  const themes = {
    purplePink: {
      primary: '#9932CC',      // Purple
      secondary: '#FF69B4',    // Hot Pink
      gradient: 'linear-gradient(135deg, #9932CC 0%, #FF69B4 100%)',
      hover: 'linear-gradient(135deg, #BA55D3 0%, #FF1493 100%)',
      border: '#9932CC',
      glow: 'rgba(153, 50, 204, 0.5)'
    },
    blueGreen: {
      primary: '#00CED1',      // Dark Turquoise
      secondary: '#20B2AA',    // Light Sea Green
      gradient: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 100%)',
      hover: 'linear-gradient(135deg, #48D1CC 0%, #008B8B 100%)',
      border: '#00CED1',
      glow: 'rgba(0, 206, 209, 0.5)'
    },
    yellowGold: {
      primary: '#FFD700',      // Gold
      secondary: '#FFA500',    // Orange
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      hover: 'linear-gradient(135deg, #FFFF00 0%, #FF8C00 100%)',
      border: '#FFD700',
      glow: 'rgba(255, 215, 0, 0.5)'
    },
    redOrange: {
      primary: '#FF4500',      // Orange Red
      secondary: '#FF6347',    // Tomato
      gradient: 'linear-gradient(135deg, #FF4500 0%, #FF6347 100%)',
      hover: 'linear-gradient(135deg, #FF0000 0%, #FF7F50 100%)',
      border: '#FF4500',
      glow: 'rgba(255, 69, 0, 0.5)'
    }
  };

  // Select random theme
  const themeNames = Object.keys(themes);
  const randomTheme = themes[themeNames[Math.floor(Math.random() * themeNames.length)]];

  // Apply theme to CSS variables
  function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-gradient', theme.gradient);
    root.style.setProperty('--theme-hover', theme.hover);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-glow', theme.glow);

    // Apply to existing elements immediately
    updateElementStyles(theme);
  }

  // Update all themed elements
  function updateElementStyles(theme) {
    // Vote button
    const voteButton = document.querySelector('.input-container button');
    if (voteButton) {
      voteButton.style.background = theme.gradient;
      voteButton.style.boxShadow = `0px 0px 1px ${theme.glow}, 0px 0px 1px ${theme.glow}`;
    }

    // Vote button hover effect
    if (voteButton) {
      voteButton.addEventListener('mouseenter', function() {
        this.style.background = theme.hover;
        this.style.boxShadow = `0px 0px 100px ${theme.glow}, 0px 0px 100px ${theme.glow}`;
      });
      voteButton.addEventListener('mouseleave', function() {
        this.style.background = theme.gradient;
        this.style.boxShadow = `0px 0px 1px ${theme.glow}, 0px 0px 1px ${theme.glow}`;
      });
    }

    // Vote input focus
    const voteInput = document.querySelector('.input-container input');
    if (voteInput) {
      voteInput.addEventListener('focus', function() {
        this.style.border = `1px solid ${theme.primary}`;
        this.style.boxShadow = `inset 0px 0px 10px ${theme.glow}, inset 0px 0px 10px ${theme.glow}, 0px 0px 100px ${theme.glow}, 0px 0px 100px ${theme.glow}`;
      });
    }

    // Ribbons
    const ribbons = document.querySelectorAll('.ribbon, .fullscreen-results-ribbon');
    ribbons.forEach(ribbon => {
      ribbon.style.background = `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.primary} 100%)`;
    });

    // Table headers
    const tableHeaders = document.querySelectorAll('#leaderboard thead, .fullscreen-results-table thead');
    tableHeaders.forEach(header => {
      header.style.background = theme.gradient;
    });

    // Countdown timer border and labels
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach(unit => {
      unit.style.border = `1px solid ${theme.primary}`;
    });

    const timeLabels = document.querySelectorAll('.time-label');
    timeLabels.forEach(label => {
      label.style.color = theme.primary;
    });

    // Countdown title
    const countdownTitle = document.querySelector('.countdown-title');
    if (countdownTitle) {
      countdownTitle.style.color = theme.primary;
    }

    // Countdown container border
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
      countdownContainer.style.border = `2px solid ${theme.primary}`;
      countdownContainer.style.boxShadow = `0 8px 25px ${theme.glow}`;
    }

    // Admin timer buttons
    const timerButtons = document.querySelectorAll('.admin-timer-submit, .admin-vote-submit-btn, .timer-confirmation-ok-btn');
    timerButtons.forEach(btn => {
      if (!btn.classList.contains('admin-timer-stop')) {
        btn.style.background = theme.gradient;
        btn.addEventListener('mouseenter', function() {
          this.style.background = theme.hover;
        });
        btn.addEventListener('mouseleave', function() {
          this.style.background = theme.gradient;
        });
      }
    });

    // Admin vote submit button
    const adminVoteSubmit = document.querySelector('.admin-vote-submit');
    if (adminVoteSubmit) {
      adminVoteSubmit.style.background = theme.gradient;
      adminVoteSubmit.addEventListener('mouseenter', function() {
        this.style.background = theme.hover;
      });
      adminVoteSubmit.addEventListener('mouseleave', function() {
        this.style.background = theme.gradient;
      });
    }

    // Timer settings and admin vote overlays
    const overlayContainers = document.querySelectorAll('.timer-settings-container, .admin-vote-container, .timer-confirmation-container');
    overlayContainers.forEach(container => {
      container.style.border = `2px solid ${theme.primary}`;
      container.style.boxShadow = `0 20px 60px ${theme.glow}`;
    });

    // Overlay headers
    const overlayHeaders = document.querySelectorAll('.timer-settings-header, .admin-vote-header, .timer-confirmation-header');
    overlayHeaders.forEach(header => {
      header.style.background = theme.gradient;
    });

    // Input focus effects in overlays
    const overlayInputs = document.querySelectorAll('.timer-input-group input, .admin-vote-input-group input, .admin-vote-input-group select');
    overlayInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.style.borderColor = theme.primary;
        this.style.boxShadow = `0 0 10px ${theme.glow}`;
      });
    });

    // Leaderboard vote count color
    const voteCountCells = document.querySelectorAll('#leaderboard td:last-child, .fullscreen-results-table td:last-child');
    voteCountCells.forEach(cell => {
      cell.style.color = theme.primary;
    });

    // Medal colors for top ranks
    const rank1Medals = document.querySelectorAll('.rank-1 .rank-medal, .fullscreen-rank-1 .fullscreen-rank-medal');
    rank1Medals.forEach(medal => {
      medal.style.background = theme.gradient;
    });
  }

  // Apply the random theme
  applyTheme(randomTheme);
  console.log('Applied theme:', themeNames[themeNames.findIndex(name => themes[name] === randomTheme)]);

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
    const isHomeLink = link.getAttribute('data-page') === 'home';

    // Only add long press events to Home link
    if (isHomeLink) {
      // Mouse down event for long press detection (only for Home)
      link.addEventListener('mousedown', function(e) {
        isLongPress = false;
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          showAdminLogin();
        }, 3000); // 3 seconds
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

      // Touch start event for mobile long press (only for Home)
      link.addEventListener('touchstart', function(e) {
        isLongPress = false;
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          showAdminLogin();
        }, 3000); // 3 seconds
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

        // Remove active class from all links and reset styles
        menuLinks.forEach(l => {
          l.classList.remove('active');
          l.style.background = 'transparent';
          l.style.color = randomTheme.primary;
          l.style.border = `1px solid transparent`;
          l.style.boxShadow = 'none';
        });

        // Add active class to touched link and apply active styles
        this.classList.add('active');
        this.style.background = randomTheme.gradient;
        this.style.color = '#272727';
        this.style.border = `1px solid ${randomTheme.primary}`;
        this.style.boxShadow = `0 0 15px ${randomTheme.glow}`;

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
    } else {
      // For non-Home links, add simple touch end event
      link.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Remove active class from all links and reset styles
        menuLinks.forEach(l => {
          l.classList.remove('active');
          l.style.background = 'transparent';
          l.style.color = randomTheme.primary;
          l.style.border = `1px solid transparent`;
          l.style.boxShadow = 'none';
        });

        // Add active class to touched link and apply active styles
        this.classList.add('active');
        this.style.background = randomTheme.gradient;
        this.style.color = '#272727';
        this.style.border = `1px solid ${randomTheme.primary}`;
        this.style.boxShadow = `0 0 15px ${randomTheme.glow}`;

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
    }

    // Click event (for all links)
    link.addEventListener('click', function(e) {
      // If it was a long press on Home, prevent normal click behavior
      if (isHomeLink && isLongPress) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Remove active class from all links and reset styles
      menuLinks.forEach(l => {
        l.classList.remove('active');
        l.style.background = 'transparent';
        l.style.color = randomTheme.primary;
        l.style.border = `1px solid transparent`;
        l.style.boxShadow = 'none';
      });

      // Add active class to clicked link and apply active styles
      this.classList.add('active');
      this.style.background = randomTheme.gradient;
      this.style.color = '#272727';
      this.style.border = `1px solid ${randomTheme.primary}`;
      this.style.boxShadow = `0 0 15px ${randomTheme.glow}`;

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

    // Prevent context menu
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
  const sendButton = document.querySelector('.input-container .button');
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
    // Mark admin access for this session
    sessionStorage.setItem('isAdmin', 'true');

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
      const sendButton = document.querySelector('.input-container .button');
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

      // Stop timer if running
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      timerEndTime = null;
      hideCountdown();

      // Reset Firebase data if using Firebase
      if (window.firebaseDb && window.firebaseDb.useFirebase) {
        try {
          const database = window.firebaseDb.database;
          const resetTimestamp = Date.now();

          // Clear all Firebase data including global reset trigger
          const promises = [
            // Clear votes
            window.firebaseDb.set(window.firebaseDb.ref(database, 'votes'), {}),
            // Clear site lock
            window.firebaseDb.set(window.firebaseDb.ref(database, 'siteLocked'), false),
            // Clear admin actions
            window.firebaseDb.set(window.firebaseDb.ref(database, 'adminActions'), {}),
            // Clear results
            window.firebaseDb.set(window.firebaseDb.ref(database, 'results'), {}),
            // Clear timer
            window.firebaseDb.set(window.firebaseDb.ref(database, 'contestTimer'), {
              endTime: null,
              active: false
            }),
            // Clear user states (this will reset all users)
            window.firebaseDb.set(window.firebaseDb.ref(database, 'userStates'), {}),
            // Set global reset trigger
            window.firebaseDb.set(window.firebaseDb.ref(database, 'globalReset'), {
              timestamp: resetTimestamp,
              triggered: true
            })
          ];

          Promise.all(promises)
            .then(() => {
              console.log('All Firebase data cleared and global reset triggered');
              // Update leaderboard
              updateLeaderboard();
              alert('سایت و تمام اطلاعات Firebase با موفقیت ریست شد! همه کاربران ریست شدند.');
            })
            .catch((error) => {
              console.log('Firebase clear error:', error);
              // Update leaderboard anyway
              updateLeaderboard();
              alert('سایت ریست شد، ولی مشکلی در پاک کردن Firebase وجود داشت. لطفاً Firebase Rules را بررسی کنید.');
            });
        } catch (error) {
          console.log('Firebase reset error:', error);
          // Update leaderboard
          updateLeaderboard();
          alert('سایت ریست شد (localStorage)، ولی Firebase در دسترس نیست.');
        }
      } else {
        // Update leaderboard
        updateLeaderboard();
        alert('سایت با موفقیت ریست شد!');
      }
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
    if (voteBtn) {
      voteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showAdminVoteOverlay();
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

    // Add Timer button event listener
    const timerBtn = document.getElementById('timer-btn');
    if (timerBtn) {
      timerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showTimerSettings();
      });
    }

    // Add Revote button event listener
    const revoteBtn = document.getElementById('revote-btn');
    if (revoteBtn) {
      revoteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        enableRevote();
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

    // Add timer settings overlay event listeners
    const timerSettingsCloseBtn = document.getElementById('timer-settings-close-btn');
    const timerSettingsOverlay = document.getElementById('timer-settings-overlay');

    if (timerSettingsCloseBtn) {
      timerSettingsCloseBtn.addEventListener('click', closeTimerSettings);
    }

    if (timerSettingsOverlay) {
      timerSettingsOverlay.addEventListener('click', function(e) {
        if (e.target === timerSettingsOverlay) {
          closeTimerSettings();
        }
      });
    }

    // Add timer confirmation overlay event listeners
    const timerConfirmationCloseBtn = document.getElementById('timer-confirmation-close-btn');
    const timerConfirmationOkBtn = document.getElementById('timer-confirmation-ok-btn');
    const timerConfirmationOverlay = document.getElementById('timer-confirmation-overlay');

    if (timerConfirmationCloseBtn) {
      timerConfirmationCloseBtn.addEventListener('click', closeTimerConfirmation);
    }

    if (timerConfirmationOkBtn) {
      timerConfirmationOkBtn.addEventListener('click', closeTimerConfirmation);
    }

    if (timerConfirmationOverlay) {
      timerConfirmationOverlay.addEventListener('click', function(e) {
        if (e.target === timerConfirmationOverlay) {
          closeTimerConfirmation();
        }
      });
    }

    // Initialize lock state
    initializeLockState();

    // Add timer submit functionality
    const timerSubmitBtn = document.getElementById('admin-timer-submit');
    const timerStopBtn = document.getElementById('admin-timer-stop');
    if (timerSubmitBtn && timerStopBtn) {
      timerSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setTimer();
      });

      timerStopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        stopTimer();
      });
    }

    // Add admin vote overlay event listeners
    const adminVoteCloseBtn = document.getElementById('admin-vote-close-btn');
    const adminVoteOverlay = document.getElementById('admin-vote-overlay');
    const adminVoteSubmitBtn = document.getElementById('admin-vote-submit-btn');

    if (adminVoteCloseBtn) {
      adminVoteCloseBtn.addEventListener('click', closeAdminVoteOverlay);
    }

    if (adminVoteOverlay) {
      adminVoteOverlay.addEventListener('click', function(e) {
        if (e.target === adminVoteOverlay) {
          closeAdminVoteOverlay();
        }
      });
    }

    if (adminVoteSubmitBtn) {
      adminVoteSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        submitAdminVoteFromOverlay();
      });
    }

    // Initialize timer system for all users
    initializeTimer();
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



  // Mark input as voted
  function markAsVoted() {
    const inputContainer = document.querySelector('.input-container');
    const inputField = document.querySelector('.input-container input');
    const sendButton = document.querySelector('.input-container .button');

    // Remove previous states and add success state
    inputContainer.classList.remove('error');
    inputContainer.classList.add('success');

    // Disable input field and send button
    inputField.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = 'Voted ✓';

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

  // Check for revote flag and reset user vote state if needed
  function checkRevoteFlag() {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const allowRevoteRef = window.firebaseDb.ref(window.firebaseDb.database, 'allowRevote');
        window.firebaseDb.onValue(allowRevoteRef, (snapshot) => {
          const revoteData = snapshot.val();
          console.log('Checking revote flag:', revoteData);

          if (revoteData && revoteData.enabled) {
            const lastRevoteCheck = localStorage.getItem('lastRevoteCheck');
            const currentRevoteTime = revoteData.timestamp;
            const hasVoted = localStorage.getItem('hasVoted') === 'true';

            // If this is a new revote timestamp, reset ALL users regardless of their voting status
            if (!lastRevoteCheck || parseInt(lastRevoteCheck) < currentRevoteTime) {
              console.log('Revote enabled detected, clearing user voting state for ALL users');

              // Clear user voting state
              localStorage.removeItem('hasVoted');
              localStorage.removeItem('votedFor');

              // Save the revote timestamp so we don't reset again for the same revote
              localStorage.setItem('lastRevoteCheck', currentRevoteTime.toString());

              // Reset voting UI
              const inputField = document.querySelector('.input-container input');
              const sendButton = document.querySelector('.input-container .button');
              const inputContainer = document.querySelector('.input-container');

              if (inputField) {
                inputField.disabled = false;
                inputField.value = '';
              }

              if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send';
              }

              if (inputContainer) {
                inputContainer.classList.remove('error', 'success', 'voted');
              }

              console.log('User voting state reset due to revote flag');

              // Show notification to ALL users (not just those who voted)
              setTimeout(() => {
                try {
                  const inputElement = document.querySelector('.input-container input');
                  if (inputElement && !inputElement.disabled && document.body) {
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                      position: fixed;
                      top: 20px;
                      right: 20px;
                      background: linear-gradient(135deg, #00FF00 0%, #006400 100%);
                      color: white;
                      padding: 15px 20px;
                      border-radius: 10px;
                      z-index: 10000;
                      font-weight: bold;
                      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                      font-family: Arial, sans-serif;
                    `;
                    notification.textContent = 'رای‌گیری دوباره فعال شد! شما می‌توانید دوباره رای بدهید!';

                    document.body.appendChild(notification);

                    setTimeout(() => {
                      try {
                        if (notification && notification.parentNode) {
                          notification.parentNode.removeChild(notification);
                        }
                      } catch (removeError) {
                        console.log('Error removing notification:', removeError);
                      }
                    }, 5000);
                  }
                } catch (notificationError) {
                  console.log('Error creating notification:', notificationError);
                }
              }, 1500);
            }
          }
        }, (error) => {
          console.log('Error checking revote flag:', error);
        });
      } catch (error) {
        console.log('Firebase error in checkRevoteFlag:', error);
      }
    }
  }

  // Check for global reset and reset user state if needed
  function checkGlobalReset() {
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const resetRef = window.firebaseDb.ref(window.firebaseDb.database, 'globalReset');
        window.firebaseDb.onValue(resetRef, (snapshot) => {
          const resetData = snapshot.val();
          if (resetData && resetData.triggered) {
            const lastResetCheck = localStorage.getItem('lastResetCheck');
            const currentResetTime = resetData.timestamp;

            // If this is a new reset (timestamp is newer than our last check)
            if (!lastResetCheck || parseInt(lastResetCheck) < currentResetTime) {
              console.log('Global reset detected, clearing user data');

              // Clear all user data
              localStorage.clear();
              sessionStorage.clear();

              // Save the reset timestamp so we don't reset again
              localStorage.setItem('lastResetCheck', currentResetTime.toString());

              // Reset UI elements
              const inputField = document.querySelector('.input-container input');
              const sendButton = document.querySelector('.input-container .button');
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

              // Stop timer if running
              if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
              }
              timerEndTime = null;
              hideCountdown();

              // Update leaderboard
              updateLeaderboard();

              console.log('User state reset due to global reset');
            }
          }
        }, (error) => {
          console.log('Error checking global reset:', error);
        });
      } catch (error) {
        console.log('Firebase error in checkGlobalReset:', error);
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

  // Clear localStorage to ensure only Firebase data is used
  localStorage.removeItem('votes');

  // Initialize vote state when page loads
  initializeVoteState();

  // Check for global reset and revote flag earlier and more frequently
  setTimeout(() => {
    checkGlobalReset();
    checkRevoteFlag();
  }, 1000); // Check after Firebase connection

  // Check revote flag every 5 seconds to catch any updates
  setInterval(() => {
    checkRevoteFlag();
  }, 5000);

  // Initialize timer system immediately for all users
  initializeTimer();

  // Initialize leaderboard when page loads
  setTimeout(() => {
    updateLeaderboard();
  }, 3000); // Wait for Firebase connection

  // Timer System Variables
  let countdownInterval = null;
  let timerEndTime = null;

  // Timer Functions
  function setTimer() {
    const dateInput = document.getElementById('timer-date');
    const timeInput = document.getElementById('timer-time');

    if (!dateInput.value || !timeInput.value) {
      alert('لطفاً تاریخ و ساعت را کامل وارد کنید');
      return;
    }

    // Create target date
    const targetDateTime = new Date(`${dateInput.value}T${timeInput.value}:00`);
    const now = new Date();

    if (targetDateTime <= now) {
      alert('تاریخ و ساعت انتخاب شده باید در آینده باشد');
      return;
    }

    timerEndTime = targetDateTime.getTime();

    // Save to Firebase or localStorage
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const timerRef = window.firebaseDb.ref(window.firebaseDb.database, 'contestTimer');
        window.firebaseDb.set(timerRef, {
          endTime: timerEndTime,
          active: true
        })
        .then(() => {
          console.log('Timer saved to Firebase');
          closeTimerSettings();
          startCountdown();
          showTimerConfirmation(dateInput.value, timeInput.value);
        })
        .catch((error) => {
          console.log('Firebase timer save error:', error);
          saveTimerToLocalStorage();
        });
      } catch (error) {
        console.log('Firebase timer error:', error);
        saveTimerToLocalStorage();
      }
    } else {
      saveTimerToLocalStorage();
    }

    function saveTimerToLocalStorage() {
      localStorage.setItem('contestTimer', JSON.stringify({
        endTime: timerEndTime,
        active: true
      }));
      closeTimerSettings();
      startCountdown();
      showTimerConfirmation(dateInput.value, timeInput.value);
    }
  }

  // Show timer confirmation overlay
  function showTimerConfirmation(date, time) {
    const overlay = document.getElementById('timer-confirmation-overlay');
    const detailsContainer = document.getElementById('timer-confirmation-details');

    if (overlay && detailsContainer) {
      // Format the details
      const formattedDate = new Date(date).toLocaleDateString('fa-IR');
      const formattedTime = time;

      detailsContainer.innerHTML = `
        <div>تاریخ پایان: ${formattedDate}</div>
        <div>ساعت پایان: ${formattedTime}</div>
      `;

      overlay.classList.add('show');
    }
  }

  // Show timer settings overlay
  function showTimerSettings() {
    const overlay = document.getElementById('timer-settings-overlay');
    if (overlay) {
      overlay.classList.add('show');
    }
  }

  // Close timer settings overlay
  function closeTimerSettings() {
    const overlay = document.getElementById('timer-settings-overlay');
    if (overlay) {
      overlay.classList.remove('show');
    }
  }

  // Close timer confirmation overlay
  function closeTimerConfirmation() {
    const overlay = document.getElementById('timer-confirmation-overlay');
    if (overlay) {
      overlay.classList.remove('show');
    }
  }

  function stopTimer() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    timerEndTime = null;

    // Save to Firebase or localStorage
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const timerRef = window.firebaseDb.ref(window.firebaseDb.database, 'contestTimer');
        window.firebaseDb.set(timerRef, {
          endTime: null,
          active: false
        })
        .then(() => {
          console.log('Timer stopped in Firebase');
          hideCountdown();
          alert('تایمر متوقف شد');
        })
        .catch((error) => {
          console.log('Firebase timer stop error:', error);
          stopTimerInLocalStorage();
        });
      } catch (error) {
        console.log('Firebase timer error:', error);
        stopTimerInLocalStorage();
      }
    } else {
      stopTimerInLocalStorage();
    }

    function stopTimerInLocalStorage() {
      localStorage.setItem('contestTimer', JSON.stringify({
        endTime: null,
        active: false
      }));
      hideCountdown();
      alert('تایمر متوقف شد');
    }
  }

  function startCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    showCountdown();

    countdownInterval = setInterval(function() {
      const now = new Date().getTime();
      const timeLeft = timerEndTime - now;

      if (timeLeft <= 0) {
        // Timer finished
        clearInterval(countdownInterval);
        countdownInterval = null;
        hideCountdown();

        // Auto-lock the site for everyone
        setLockState(true);

        // Show alert only once per session
        const alertShown = sessionStorage.getItem('timerFinishedAlert');
        if (!alertShown) {
          alert('مسابقه به پایان رسید! سایت به طور خودکار قفل شد.');
          sessionStorage.setItem('timerFinishedAlert', 'true');
        }

        // Update timer status (only if admin)
        const hasAdminAccess = sessionStorage.getItem('isAdmin') === 'true';
        if (hasAdminAccess && window.firebaseDb && window.firebaseDb.useFirebase) {
          try {
            const timerRef = window.firebaseDb.ref(window.firebaseDb.database, 'contestTimer');
            window.firebaseDb.set(timerRef, {
              endTime: null,
              active: false
            });
          } catch (error) {
            console.log('Firebase timer finish error:', error);
          }
        } else if (!window.firebaseDb || !window.firebaseDb.useFirebase) {
          localStorage.setItem('contestTimer', JSON.stringify({
            endTime: null,
            active: false
          }));
        }

        return;
      }

      // Calculate time units
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update display
      updateCountdownDisplay(days, hours, minutes, seconds);
    }, 1000);
  }

  function updateCountdownDisplay(days, hours, minutes, seconds) {
    const daysElement = document.getElementById('days-value');
    const hoursElement = document.getElementById('hours-value');
    const minutesElement = document.getElementById('minutes-value');
    const secondsElement = document.getElementById('seconds-value');

    if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
  }

  function showCountdown() {
    const countdownContainer = document.getElementById('countdown-container');
    if (countdownContainer) {
      countdownContainer.style.display = 'block';
    }
  }

  function hideCountdown() {
    const countdownContainer = document.getElementById('countdown-container');
    if (countdownContainer) {
      countdownContainer.style.display = 'none';
    }

    // Reset display
    updateCountdownDisplay(0, 0, 0, 0);
  }

  // Initialize timer system
  function initializeTimer() {
    // Wait for Firebase to be ready, then load timer
    setTimeout(() => {
      if (window.firebaseDb && window.firebaseDb.useFirebase) {
        try {
          const timerRef = window.firebaseDb.ref(window.firebaseDb.database, 'contestTimer');
          // Listen for real-time updates to timer
          window.firebaseDb.onValue(timerRef, (snapshot) => {
            const timerData = snapshot.val();
            console.log('Timer data received from Firebase:', timerData);
            if (timerData && timerData.active && timerData.endTime) {
              const now = new Date().getTime();
              if (timerData.endTime > now) {
                timerEndTime = timerData.endTime;
                startCountdown();
                console.log('Timer started from Firebase');
              } else {
                // Timer expired, auto-lock for everyone
                if (countdownInterval) {
                  clearInterval(countdownInterval);
                  countdownInterval = null;
                }
                hideCountdown();
                setLockState(true);
                // Clean up expired timer (only if we're admin)
                const hasAdminAccess = sessionStorage.getItem('isAdmin') === 'true';
                if (hasAdminAccess) {
                  window.firebaseDb.set(timerRef, {
                    endTime: null,
                    active: false
                  });
                }
              }
            } else {
              hideCountdown();
            }
          }, (error) => {
            console.log('Firebase timer read error:', error);
            initializeTimerFromLocalStorage();
          });
        } catch (error) {
          console.log('Firebase timer init error:', error);
          initializeTimerFromLocalStorage();
        }
      } else {
        console.log('Firebase not available for timer, using localStorage');
        initializeTimerFromLocalStorage();
      }
    }, 2000); // Wait 2 seconds for Firebase to connect

    function initializeTimerFromLocalStorage() {
      const timerData = JSON.parse(localStorage.getItem('contestTimer') || '{}');
      if (timerData.active && timerData.endTime) {
        const now = new Date().getTime();
        if (timerData.endTime > now) {
          timerEndTime = timerData.endTime;
          startCountdown();
        } else {
          // Timer expired, clean up and auto-lock
          localStorage.setItem('contestTimer', JSON.stringify({
            endTime: null,
            active: false
          }));
          hideCountdown();
          setLockState(true);
        }
      } else {
        hideCountdown();
      }
    }
  }

  // Enable revote function
  function enableRevote() {
    if (confirm('آیا مطمئن هستید که می‌خواهید تمام رای‌ها پاک شود و همه کاربران بتوانند دوباره رای بدهند؟')) {
      if (window.firebaseDb && window.firebaseDb.useFirebase) {
        try {
          const revoteTimestamp = Date.now();

          // Clear all votes first
          const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');

          window.firebaseDb.set(votesRef, {})
            .then(() => {
              console.log('All votes cleared from Firebase');
              // Clear all user states
              const userStatesRef = window.firebaseDb.ref(window.firebaseDb.database, 'userStates');
              return window.firebaseDb.set(userStatesRef, {});
            })
            .then(() => {
              console.log('All user states cleared from Firebase');
              // Set allowRevote flag in Firebase
              const allowRevoteRef = window.firebaseDb.ref(window.firebaseDb.database, 'allowRevote');
              return window.firebaseDb.set(allowRevoteRef, {
                enabled: true,
                timestamp: revoteTimestamp
              });
            })
            .then(() => {
              console.log('Revote enabled in Firebase for all users');
              // Update leaderboard to show empty state
              updateLeaderboard();
              alert('تمام رای‌ها پاک شد و همه کاربران حالا می‌توانند دوباره رای بدهند!');
            })
            .catch((error) => {
              console.log('Firebase revote error:', error);
              alert('خطا در فعال کردن revote در Firebase');
            });
        } catch (error) {
          console.log('Firebase revote error:', error);
          alert('Firebase در دسترس نیست');
        }
      } else {
        alert('Firebase در دسترس نیست - revote فقط برای کاربر فعلی کار می‌کند');
        // Clear local votes and state
        localStorage.removeItem('votes');
        localStorage.removeItem('hasVoted');
        localStorage.removeItem('votedFor');

        const inputField = document.querySelector('.input-container input');
        const sendButton = document.querySelector('.input-container .button');
        const inputContainer = document.querySelector('.input-container');

        if (inputField) {
          inputField.disabled = false;
          inputField.value = '';
        }

        if (sendButton) {
          sendButton.disabled = false;
          sendButton.textContent = 'Send';
        }

        if (inputContainer) {
          inputContainer.classList.remove('error', 'success', 'voted');
        }

        // Update leaderboard
        updateLeaderboard();
      }
    }
  }

  // Show admin vote overlay
  function showAdminVoteOverlay() {
    const overlay = document.getElementById('admin-vote-overlay');
    if (overlay) {
      overlay.classList.add('show');

      // Clear previous inputs
      const usernameInput = document.getElementById('admin-vote-username');
      const countInput = document.getElementById('admin-vote-count');
      const operationSelect = document.getElementById('admin-vote-operation');

      if (usernameInput) usernameInput.value = '';
      if (countInput) countInput.value = '';
      if (operationSelect) operationSelect.value = 'add';
    }
  }

  // Close admin vote overlay
  function closeAdminVoteOverlay() {
    const overlay = document.getElementById('admin-vote-overlay');
    if (overlay) {
      overlay.classList.remove('show');
    }
  }

  // Submit admin vote from overlay
  function submitAdminVoteFromOverlay() {
    const usernameInput = document.getElementById('admin-vote-username');
    const countInput = document.getElementById('admin-vote-count');
    const operationSelect = document.getElementById('admin-vote-operation');

    const username = usernameInput.value.trim();
    const count = parseInt(countInput.value);
    const operation = operationSelect.value;

    if (!username) {
      alert('لطفاً نام کاربری را وارد کنید');
      return;
    }

    if (!count || count <= 0) {
      alert('لطفاً تعداد رای معتبر وارد کنید');
      return;
    }

    // Validate and convert username
    const validation = validateAndConvert(username);
    if (!validation.isValid) {
      alert('نام کاربری نامعتبر است');
      return;
    }

    const isSubtract = operation === 'subtract';
    const convertedUsername = validation.convertedText;

    // Submit votes using existing function
    if (window.firebaseDb && window.firebaseDb.useFirebase) {
      try {
        const votesRef = window.firebaseDb.ref(window.firebaseDb.database, 'votes');
        window.firebaseDb.onValue(votesRef, (snapshot) => {
          const votes = snapshot.val() || {};

          // Add or subtract votes for this user
          if (votes[convertedUsername]) {
            votes[convertedUsername] += isSubtract ? -count : count;
            if (votes[convertedUsername] < 0) {
              votes[convertedUsername] = 0;  // Prevent negative votes
            }
          } else {
            votes[convertedUsername] = isSubtract ? 0 : count; // Start from 0 if subtracting
          }

          // Save back to Firebase
          window.firebaseDb.set(votesRef, votes)
            .then(() => {
              console.log('Admin vote submitted successfully from overlay');
              closeAdminVoteOverlay();
              alert(`${count} رای برای ${convertedUsername} ${isSubtract ? 'کم شد' : 'ثبت شد'}`);
              updateLeaderboard();
            })
            .catch((error) => {
              console.log('Firebase write error:', error);
              submitAdminVoteToLocalStorageFromOverlay(convertedUsername, count, isSubtract);
            });
        }, { onlyOnce: true });
      } catch (error) {
        console.log('Firebase error:', error);
        submitAdminVoteToLocalStorageFromOverlay(convertedUsername, count, isSubtract);
      }
    } else {
      submitAdminVoteToLocalStorageFromOverlay(convertedUsername, count, isSubtract);
    }
  }

  // Submit admin vote to localStorage from overlay
  function submitAdminVoteToLocalStorageFromOverlay(username, voteCount, isSubtract) {
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
    closeAdminVoteOverlay();
    alert(`${voteCount} رای برای ${username} ${isSubtract ? 'کم شد' : 'ثبت شد'}`);
    updateLeaderboard();
  }

  // Make functions globally available
  window.updateLeaderboard = updateLeaderboard;
  window.submitAdminVote = submitAdminVote;
  window.submitAdminVoteToLocalStorage = submitAdminVoteToLocalStorage;
  window.showConnectionStatus = showConnectionStatus;
  window.setTimer = setTimer;
  window.stopTimer = stopTimer;
  window.initializeTimer = initializeTimer;
  window.showTimerConfirmation = showTimerConfirmation;
  window.closeTimerConfirmation = closeTimerConfirmation;
  window.enableRevote = enableRevote;
  window.showAdminVoteOverlay = showAdminVoteOverlay;
  window.closeAdminVoteOverlay = closeAdminVoteOverlay;
});