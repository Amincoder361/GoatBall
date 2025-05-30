// نمایش دکمه Skip بعد از ۵ ثانیه
setTimeout(() => {
  document.getElementById("skipBtn").style.display = "block";
}, 5000);

// وقتی روی Skip کلیک شد
document.getElementById("skipBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});

// بعد از ۱۵ ثانیه انتقال خودکار
setTimeout(() => {
  window.location.href = "home.html";
}, 15000);