(function () {
  if (!window.PostTaskConfig) return;
  const { isLoggedIn, postUrl, loginUrl, loginUrlWithRedirect } = window.PostTaskConfig;

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('post-task');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();

      // OPTION A: strict /login/ (no query params)
      // window.location.href = isLoggedIn ? postUrl : loginUrl;

      // OPTION B: /login/ with redirect back to /post-a-task/ (if your login page honors ?redirect_to=)
      window.location.href = isLoggedIn ? postUrl : loginUrlWithRedirect;
    });
  });
})();
