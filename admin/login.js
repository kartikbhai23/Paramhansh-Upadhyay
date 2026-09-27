(function () {
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('loginEmail');
  const pwEl = document.getElementById('loginPassword');
  const errEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  const toggle = document.getElementById('togglePw');
  const closeBtn = document.getElementById('authClose');
  const btnLabel = btn.querySelector('span');
  let csrfToken = '';

  function showError(msg) { errEl.textContent = msg; errEl.hidden = false; }
  function clearError() { errEl.hidden = true; errEl.textContent = ''; }
  function setLoading(on) {
    btn.disabled = on;
    btnLabel.textContent = on ? 'Signing in…' : 'Sign in';
  }

  // Show / hide password
  toggle.addEventListener('click', function () {
    const show = pwEl.type === 'password';
    pwEl.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    pwEl.focus();
  });

  function closeLogin() {
    document.body.classList.add('auth-closing');
    window.setTimeout(function () { window.location.href = '/'; }, 320);
  }

  closeBtn.addEventListener('click', closeLogin);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLogin();
  });

  // If already signed in, go straight to the panel. Also fetch a CSRF token.
  async function init() {
    try {
      const me = await fetch('/api/auth/me', { credentials: 'same-origin' }).then(r => r.json());
      if (me && me.authenticated) { location.replace('/admin'); return; }
    } catch (e) { /* ignore, show the form */ }
    try {
      const r = await fetch('/api/csrf', { credentials: 'same-origin' }).then(r => r.json());
      csrfToken = r.csrfToken || '';
    } catch (e) { /* token fetched again on submit if needed */ }
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearError();
    const email = emailEl.value.trim();
    const password = pwEl.value;
    if (!email || !password) { showError('Enter your email and password.'); return; }
    setLoading(true);
    try {
      if (!csrfToken) {
        const c = await fetch('/api/csrf', { credentials: 'same-origin' }).then(r => r.json());
        csrfToken = c.csrfToken || '';
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { location.replace('/admin'); return; }
      if (res.status === 429) showError(data.error || 'Too many attempts. Please wait and try again.');
      else showError(data.error || 'Invalid credentials.');
      // Refresh token in case the session rotated after a failed attempt.
      try { const c = await fetch('/api/csrf', { credentials: 'same-origin' }).then(r => r.json()); csrfToken = c.csrfToken || csrfToken; } catch (e2) {}
    } catch (err) {
      showError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  init();
})();
