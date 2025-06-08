/**
 * Main function that runs when DOM is fully loaded
 */
function initArtistsPage() {
  // Possible paths to try for the JSON data file
  const possiblePaths = [
    'all-artists.json',
    './all-artists.json',
    'data/all-artists.json',
    '../all-artists.json'
  ];
  
  // Start trying to fetch data (begin with first path)
  tryFetch(0, possiblePaths);
}

/**
 * Attempts to fetch artist data from different possible paths
 * @param {number} pathIndex - Index of the path to try
 * @param {string[]} possiblePaths - Array of possible JSON file paths
 */
function tryFetch(pathIndex, possiblePaths) {
  // If tried all paths without success, show error
  if (pathIndex >= possiblePaths.length) {
    showError();
    return;
  }
  
  // Attempt to fetch JSON data
  fetch(possiblePaths[pathIndex])
    .then(response => {
      if (!response.ok) throw new Error('Not found');
      return response.json();
    })
    .then(artists => {
      // If successful, display the artists
      displayArtists(artists);
    })
    .catch(error => {
      // If failed, try next path
      console.log(`Tried ${possiblePaths[pathIndex]}, failed. Trying next path...`);
      tryFetch(pathIndex + 1, possiblePaths);
    });
}

/**
 * Displays artist cards in the grid
 * @param {Object[]} artists - Array of artist objects
 */
function displayArtists(artists) {
  const container = document.getElementById('artist-container');
  container.innerHTML = ''; // Clear loading message
  
  // Create a card for each artist
  artists.forEach(artist => {
    const card = createArtistCard(artist);
    container.appendChild(card);
    
    // Add click event to view button
    const viewBtn = card.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => viewArtist(artist.id));
  });
}

/**
 * Creates an artist card element
 * @param {Object} artist - Artist data object
 * @returns {HTMLElement} - Artist card element
 */
function createArtistCard(artist) {
  const card = document.createElement('div');
  card.className = 'artist-card';
  
  // Handle potential missing image with fallback
  const imageHTML = artist.image 
    ? `<img src="${artist.image}" alt="${artist.name}" onerror="this.src='assets/default-artist.jpg'">`
    : '<div class="missing-image">No Image</div>';
  
  // HTML template for each artist card
  card.innerHTML = `
    <div class="profile-pic">
      ${imageHTML}
    </div>
    <h3 class="artist-name">${artist.name}</h3>
    <p><strong>${artist.type}</strong></p>
    <p><strong>${artist.genre}</strong></p>
    <p class="artist-desc">${artist.bio}</p>
    <button class="view-btn">View Artist</button>
  `;
  
  return card;
}

/**
 * Displays error message if loading fails
 */
function showError() {
  const container = document.getElementById('artist-container');
  container.innerHTML = `
    <div class="error-message">
      <p>Couldn't load artists. Please check:</p>
      <ul>
        <li>Is the JSON file in the correct location?</li>
        <li>Are you running this through a local server?</li>
        <li>Check browser console for details (F12)</li>
      </ul>
      <button id="retry-btn">Try Again</button>
    </div>
  `;
  
  // Add click event to retry button
  document.getElementById('retry-btn').addEventListener('click', () => {
    window.location.reload();
  });
}

/**
 * Redirects to artist detail page
 * @param {string|number} id - Artist ID
 */
function viewArtist(id) {
  window.location.href = `artist-detail.html?id=${id}`;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initArtistsPage);