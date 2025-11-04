const loadingStart = Date.now();
window.addEventListener('load', function(){
  const elapsed = Date.now() - loadingStart;
  const minTime = 3000;
  if (elapsed < minTime) {
    setTimeout(hideLoading, minTime - elapsed);
  } else {
    hideLoading();
  }
});
function hideLoading() {
  const loading = document.getElementById('loading');
  loading.style.opacity = 0;
  setTimeout(() => {
    loading.style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  }, 500); // フェードアウト0.5秒
}
