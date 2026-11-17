// Mobile menu: the button opens and closes the nav links.
(function () {
  var nav = document.querySelector('.topnav');
  var btn = nav && nav.querySelector('.menu-btn');
  if (!btn) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  nav.querySelectorAll('.navlinks a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();

// Analytics: named Microsoft Clarity events for key actions on any page.
(function () {
  function track(name) {
    try { if (window.clarity) window.clarity('event', name); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    if (el.matches('.copy-btn')) {
      var page = location.pathname.split('/').pop().replace('.html', '') || 'page';
      track('copy_' + page.replace(/-/g, '_'));
      return;
    }
    var href = el.getAttribute('href') || '';
    if (/resume\.pdf$/i.test(href)) track('resume_download');
    else if (href.indexOf('mailto:') === 0) track('email_click');
    else if (/linkedin\.com/i.test(href)) track('linkedin_click');
    else if (/happinest\.life/i.test(href)) track('happinest_click');
    else if (el.matches('.next')) track('read_next_click');
    else if (el.closest('.navlinks')) track('nav_' + el.textContent.trim().toLowerCase().replace(/\s+/g, '_'));
  });
})();
