(function () {
  var GATE_PASSWORD_HASH = "ed34fd15a17670794b866faafc385501befb47fbd8956cd749e1b4196542c475";
  var gate = document.getElementById('pw-gate');
  var input = document.getElementById('pw-input');
  var error = document.getElementById('pw-error');

  if (localStorage.getItem('pocchia-unlocked') === 'true') {
    gate.classList.add('hidden');
  } else {
    document.body.style.overflow = 'hidden';
  }

  async function sha256(text) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) {
      return b.toString(16).padStart(2, '0');
    }).join('');
  }

  function revealSite(withAnimation) {
    gate.classList.add('hidden');

    if (!withAnimation) {
      document.body.style.overflow = '';
      return;
    }

    var cols = 12;
    var rows = 8;
    var grid = document.createElement('div');
    grid.id = 'reveal-grid';
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    grid.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';

    var cells = [];
    for (var i = 0; i < cols * rows; i++) {
      var cell = document.createElement('div');
      cell.className = 'reveal-cell';
      grid.appendChild(cell);
      cells.push(cell);
    }
    document.body.appendChild(grid);

    // Ordine casuale di scomparsa dei quadrati
    for (var i = cells.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cells[i]; cells[i] = cells[j]; cells[j] = tmp;
    }

    var delayStep = 18;
    cells.forEach(function (cell, index) {
      setTimeout(function () {
        cell.style.opacity = '0';
      }, index * delayStep);
    });

    setTimeout(function () {
      document.body.style.overflow = '';
      grid.remove();
    }, cells.length * delayStep + 400);
  }

  async function tryUnlock() {
    var hash = await sha256(input.value);
    if (hash === GATE_PASSWORD_HASH) {
      localStorage.setItem('pocchia-unlocked', 'true');
      revealSite(true);
    } else {
      error.classList.add('show');
      input.value = '';
      input.focus();
    }
  }

  var form = document.getElementById('pw-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    tryUnlock();
  });

  window.addEventListener('load', function () {
    input.focus();
  });
})();
