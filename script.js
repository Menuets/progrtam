function saveBrowserInfo() {
  const browserInfo = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    javaEnabled: navigator.javaEnabled()
  };

  localStorage.setItem('browserInfo', JSON.stringify(browserInfo));
}

function displayLocalStorageInfo() {
  const footer = document.getElementById('info-footer');
  let info = '<strong>Інформація з localStorage:</strong><br>';
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    info += `${key}: ${localStorage.getItem(key)}<br>`;
  }
  
  footer.innerHTML = info;
}

saveBrowserInfo();
displayLocalStorageInfo();

function fetchComments() {
  fetch(`https://jsonplaceholder.typicode.com/posts/13/comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка завантаження коментарів');
      }
      return response.json();
    })
    .then(comments => {
      const commentsDiv = document.getElementById('comments');
      comments.forEach(comment => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${comment.name}</strong> (${comment.email}): ${comment.body}`;
        commentsDiv.appendChild(p);
      });
    })
    .catch(error => {
      console.error('Помилка:', error);
      const commentsDiv = document.getElementById('comments');
      commentsDiv.innerHTML = '<p>Не вдалося завантажити коментарі. Спробуйте пізніше.</p>';
    });
}

fetchComments();

function setupModal() {
  let modalShown = false;
  
  setTimeout(() => {
    if (!modalShown) {
      document.getElementById('feedbackModal').classList.add('show');
      modalShown = true;
    }
  }, 60000);

  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Дякуємо за ваш відгук!');
        document.getElementById('feedbackModal').classList.remove('show');
        form.reset();
      } else {
        throw new Error('Помилка відправки форми');
      }
    })
    .catch(error => {
      console.error('Помилка:', error);
      alert('Сталася помилка при відправці форми. Спробуйте ще раз.');
    });
  });
}

setupModal();

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  function applyAutoTheme() {
    const hour = new Date().getHours();
    const isNightTime = hour < 7 || hour >= 21;
    
    body.classList.toggle('dark', isNightTime);
    toggle.checked = isNightTime;
    
    localStorage.setItem('darkTheme', isNightTime);
  }

  const savedTheme = localStorage.getItem('darkTheme');
  if (savedTheme !== null) {
    const isDark = savedTheme === 'true';
    body.classList.toggle('dark', isDark);
    toggle.checked = isDark;
  } else {
    applyAutoTheme();
  }

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    body.classList.toggle('dark', isDark);
    localStorage.setItem('darkTheme', isDark);
  });
}

setupThemeToggle();