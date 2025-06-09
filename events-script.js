document.addEventListener('DOMContentLoaded', function () {
  const possiblePaths = [
    'all-events.json',
    './all-events.json',
    'data/all-events.json',
    '../all-events.json'
  ];

  function tryFetch(pathIndex) {
    if (pathIndex >= possiblePaths.length) {
      showError();
      return;
    }

    fetch(possiblePaths[pathIndex])
      .then(response => {
        if (!response.ok) throw new Error('Not found');
        return response.json();
      })
      .then(events => {
        displayEvents(events);
      })
      .catch(() => {
        console.log(`Tried ${possiblePaths[pathIndex]}, failed. Trying next path...`);
        tryFetch(pathIndex + 1);
      });
  }

  function displayEvents(events) {
    const container = document.getElementById('event-container');
    container.innerHTML = '';

    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';

      const imageHTML = event.image
        ? `<img src="${event.image}" alt="${event.name}" onerror="this.src='assets/default-event.jpg'">`
        : '<div class="missing-image">No Image</div>';

      card.innerHTML = `
        <div class="card-top">
          <div class="profile-pic">
            ${imageHTML}
          </div>
          <div class="event-name">${event.name}</div>
          <div class="event-meta">${event.date} • ${event.location}</div>
          <div class="event-desc">${event.description}</div>
        </div>
        <div class="card-bottom">
          <div class="event-slots">Available Slots: ${event.availableSlots}</div>
          <button class="apply-btn" onclick="applyEvent('${event.id}')">Apply</button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  function showError() {
    const container = document.getElementById('event-container');
    container.innerHTML = `
      <div class="error-message">
        <p>Couldn't load events. Please check:</p>
        <ul>
          <li>Is the JSON file in the correct location?</li>
          <li>Are you running this through a local server?</li>
          <li>Check browser console for details (F12)</li>
        </ul>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }

  tryFetch(0);
});

function applyEvent(id) {
  alert(`Apply button clicked for event ID: ${id}`);
}
