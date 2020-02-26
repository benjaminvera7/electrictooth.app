export default function toast(msg) {
  let snackbar = document.getElementById('snackbar');
  snackbar.textContent = msg;
  snackbar.className = 'show';
  setTimeout(function() {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}
