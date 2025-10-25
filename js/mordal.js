function openPopup(id) {
  document.getElementById(id).style.display = "block";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('click', function (e) {
      // 背景または .popup-content 以外をクリックしたら閉じる
      if (!e.target.closest('.popup-card')) {
        popup.style.display = 'none';
      }
    });
  });
});