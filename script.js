let resources = {};
const subjectsNav = document.getElementById('subjects');
const contentSection = document.getElementById('content');

function createSubjectButtons(subjects) {
  subjectsNav.innerHTML = '';
  subjects.forEach(subject => {
    const btn = document.createElement('button');
    btn.textContent = subject;
    btn.classList.add('subject-btn');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showSubjectContent(subject);
    });
    subjectsNav.appendChild(btn);
  });
}

function showSubjectContent(subject) {
  const data = resources[subject];
  if (!data) {
    contentSection.innerHTML = '<p>No data available for this subject.</p>';
    return;
  }

  let html = '';

  if (data.notes && data.notes.length > 0) {
    html += `<div class="resource-section"><h2>Notes</h2><div class="resource-list">`;
    data.notes.forEach(note => {
      html += `<a href="${note.url}" target="_blank" rel="noopener">${note.title}</a>`;
    });
    html += `</div></div>`;
  }

  if (data.papers && data.papers.length > 0) {
    html += `<div class="resource-section"><h2>Past Papers</h2><div class="resource-list">`;
    data.papers.forEach(paper => {
      html += `<a href="${paper.url}" target="_blank" rel="noopener">${paper.title}</a>`;
    });
    html += `</div></div>`;
  }

  if (data.videos && data.videos.length > 0) {
    html += `<div class="resource-section"><h2>Videos</h2>`;
    data.videos.forEach(video => {
      html += `
        <div>
          <p>${video.title}</p>
          <iframe src="${video.url}" allowfullscreen></iframe>
        </div>
      `;
    });
    html += `</div>`;
  }

  contentSection.innerHTML = html;
}

// Fetch resources.json and initialize
fetch('resources.json')
  .then(res => res.json())
  .then(data => {
    resources = data;
    const subjects = Object.keys(resources).sort();
    createSubjectButtons(subjects);
  })
  .catch(err => {
    contentSection.innerHTML = '<p>Failed to load resources.json</p>';
    console.error(err);
  });
