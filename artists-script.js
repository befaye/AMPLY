// Run when DOM is ready
document.addEventListener('DOMContentLoaded', initArtistsPage);

// Try fetching from different paths
function initArtistsPage() {
  const paths = [
    'all-artists.json',
    './all-artists.json',
    'data/all-artists.json',
    '../all-artists.json'
  ];
  fetchFromPaths(0, paths);
}

// Fetch JSON from fallback paths
function fetchFromPaths(index, paths) {
  if (index >= paths.length) return showError();

  fetch(paths[index])
    .then(res => {
      if (!res.ok) throw new Error('Fetch failed');
      return res.json();
    })
    .then(displayArtists)
    .catch(() => {
      console.log(`Failed: ${paths[index]}`);
      fetchFromPaths(index + 1, paths);
    });
}

// Render artist cards
function displayArtists(artists) {
  const container = document.getElementById('artist-container');
  container.innerHTML = '';

  artists.forEach(artist => {
    const card = createArtistCard(artist);
    container.appendChild(card);
    card.querySelector('.view-btn').addEventListener('click', () => viewArtist(artist.id));
  });
}

// Create card HTML
function createArtistCard(artist) {
  const card = document.createElement('div');
  card.className = 'artist-card';

  const imageHTML = artist.image
    ? `<img src="${artist.image}" alt="${artist.name}" onerror="this.src='assets/default-artist.jpg'">`
    : '<div class="missing-image">No Image</div>';

  card.innerHTML = `
    <div class="artist-pic">${imageHTML}</div>
    <h3 class="artist-name">${artist.name}</h3>
    <div class="artist-meta">
      <p><strong>${artist.type}</strong></p>
      <p><strong>${artist.genre}</strong></p>
    </div>
    <p class="artist-desc">${artist.bio}</p>
    <button class="view-btn">View Artist</button>
  `;

  return card;
}

// Show error if fetch fails
function showError() {
  const container = document.getElementById('artist-container');
  container.innerHTML = `
    <div class="error-message">
      <p>Couldn't load artists. Check:</p>
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

// Go to artist detail page
function viewArtist(id) {
  window.location.href = `artist-detail.html?id=${id}`;
}
