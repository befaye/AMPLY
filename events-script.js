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

function displayEvents(events) {
  const container = document.getElementById('event-container');
  container.innerHTML = '';

  events.forEach(event => {
    const card = createEventCard(event);
    container.appendChild(card);
    card.querySelector('.apply-btn').addEventListener('click', () => applyToEvent(event.id));
  });
}

function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event-card';

  const imageHTML = event.image
    ? `<img src="${event.image}" alt="${event.name}" onerror="this.src='assets/default-event.jpg'">`
    : '<div class="missing-image">No Image</div>';

  card.innerHTML = `
    <div class="event-pic">${imageHTML}</div>
    <h3 class="event-name">${event.name}</h3>
    <div class="event-meta">
      <p><strong>Type:</strong> ${event.type}</p>
      <p><strong>Genre:</strong> ${event.genre}</p>
    </div>
    <p class="event-desc">${event.description}</p>
    <p class="event-slots">Slots available: ${event.availableSlots}</p>
    <button class="apply-btn">Apply</button>
  `;

  return card;
}

function applyToEvent(id) {
  // Replace with actual navigation or logic
  window.location.href = `apply.html?eventId=${id}`;
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
