// Copy buttons: copies the card's text as plain text, with "- " for list items.
document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var src = btn.closest('.card').querySelector('.copy-text');
    var lines = [];
    src.childNodes.forEach(function (node) {
      if (node.nodeType !== 1) return;
      if (node.tagName === 'UL') {
        node.querySelectorAll('li').forEach(function (li) { lines.push('- ' + li.innerText.trim()); });
        lines.push('');
      } else {
        lines.push(node.innerText.trim());
        lines.push('');
      }
    });
    var text = lines.join('\n').trim();
    var icon = btn.innerHTML;
    var tick = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    var done = function () {
      btn.innerHTML = tick;
      btn.setAttribute('aria-label', 'Copied');
      btn.title = 'Copied';
      btn.classList.add('done');
      setTimeout(function () {
        btn.innerHTML = icon;
        btn.setAttribute('aria-label', 'Copy');
        btn.title = 'Copy';
        btn.classList.remove('done');
      }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    }
  });
});
