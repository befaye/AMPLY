// Run on DOM ready
document.addEventListener('DOMContentLoaded', initEventsPage);

function initEventsPage() {
  const paths = [
    'all-events.json',
    './all-events.json',
    'data/all-events.json',
    '../all-events.json'
  ];
  fetchFromPaths(0, paths);
}

function fetchFromPaths(index, paths) {
  if (index >= paths.length) return showError();

  fetch(paths[index])
    .then(res => {
      if (!res.ok) throw new Error('Fetch failed');
      return res.json();
    })
    .then(displayEvents)
    .catch(() => {
      console.log(`Failed: ${paths[index]}`);
      fetchFromPaths(index + 1, paths);
    });
}

const eventMap = {};

function displayEvents(events) {
  const container = document.getElementById('event-container');
  container.innerHTML = '';

  events.forEach(event => {
    eventMap[event.id] = event; // Store for later lookup
    const card = createEventCard(event);
    container.appendChild(card);
    card.querySelector('.apply-btn').addEventListener('click', () => applyToEvent(event.id));
  });
}

function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event-card';

  const imageSrc = event.image ? event.image : 'assets/default-event.jpg';

  card.innerHTML = `
    <div class="event-pic">
      <img src="${imageSrc}" alt="${event.name}" onerror="this.src='assets/default-event.jpg'">
    </div>
    <h3 class="event-name">${event.name}</h3>
    <div class="event-meta">
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Genre:</strong> ${event.genre}</p>
    </div>
    <p class="event-desc">${event.description}</p>
    <p class="event-slots">🎤 Slots available: ${event.availableSlots}</p>
    <a class="apply-btn" href="event-application.html?eventId=${encodeURIComponent(event.id)}&eventName=${encodeURIComponent(event.name)}">Apply</a>
  `;

  return card;
}

function applyToEvent(id) {
  function applyToEvent(id) {
  const event = eventMap[id];
  if (!event) return;

  const query = `?eventId=${encodeURIComponent(event.id)}&eventName=${encodeURIComponent(event.name)}`;
  window.location.href = `event-application.html${query}`;
  }
}

function showError() {
  const container = document.getElementById('event-container');
  container.innerHTML = `
    <div class="error-message">
      <p>Couldn't load events. Check:</p>
      <ul>
        <li>File path correct?</li>
        <li>Running on a local server?</li>
        <li>Console logs (F12)</li>
      </ul>
      <button id="retry-btn">Try Again</button>
    </div>
  `;

  document.getElementById('retry-btn').addEventListener('click', () => location.reload());
}

// Load event data from URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get('eventId');
const eventName = params.get('eventName');

document.getElementById('event-name').textContent = decodeURIComponent(eventName || '');
document.getElementById('event-id').value = eventId || '';

// Handle form submission
document.getElementById('application-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    eventId: document.getElementById('event-id').value,
    artistName: document.getElementById('artist-name').value,
    email: document.getElementById('email').value,
    genre: document.getElementById('genre').value,
    performanceLink: document.getElementById('performance-link').value,
    message: document.getElementById('message').value,
    submittedAt: new Date().toISOString()
  };

  // Save to localStorage (or replace with backend integration)
  const applications = JSON.parse(localStorage.getItem('eventApplications') || '[]');
  applications.push(formData);
  localStorage.setItem('eventApplications', JSON.stringify(applications));

  document.getElementById('application-form').reset();
  document.getElementById('success-message').style.display = 'block';
});