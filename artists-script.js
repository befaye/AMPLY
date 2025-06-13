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

// Fetch artist data from JSON
async function fetchArtistData() {
  const paths = [
    'all-artists.json',
    './all-artists.json',
    'data/all-artists.json',
    '../all-artists.json'
  ];

  for (let i = 0; i < paths.length; i++) {
    try {
      const res = await fetch(paths[i]);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.warn(`Failed to fetch from ${paths[i]}`);
    }
  }

  // Final fallback
  document.body.innerHTML = '<h2>Could not load artist data. Please try again later.</h2>';
  throw new Error('All paths failed.');
}

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
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

  const imageHTML = artist.pfp
    ? `<img src="${artist.pfp}" alt="${artist.name}" onerror="this.src='assets/default-artist.jpg'">`
    : '<div class="missing-image">No Image</div>';

  card.innerHTML = `
    <div class="artist-pic">${imageHTML}</div>
    <h3 class="artist-name" title="${artist.name}">${artist.name}</h3>
    <div class="artist-meta">
      <p><strong>${artist.type}</strong></p>
      <p><strong>${artist.genre}</strong></p>
    </div>
    <p class="artist-desc">${artist["short-desc"]?.trim() || "<em>No description available.</em>"}</p>
    <a class="view-btn" href="artist-profile.html?id=${artist.id}">View Artist</a>
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

// Render the artist profile if we're on the profile page
async function renderArtistProfile() {
  const artistId = getQueryParam('id');
  if (!artistId) return;

  const allArtists = await fetchArtistData();
  const artist = allArtists.find(a => a.id === Number(artistId));
  if (!artist) {
    document.body.innerHTML = '<h2>Artist not found.</h2>';
    return;
  }

  // Scroll to top before rendering
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Cover Photo (set as background image)
  const coverEl = document.querySelector('.cover-photo');
  coverEl.style.backgroundImage = `url('${artist["cover-pic"] || "assets/default-cover.jpg"}')`;
  coverEl.classList.add('fade-in');

  // Profile Picture
  const pfp = document.getElementById('pfp-img');
  pfp.src = artist.pfp || 'assets/default-artist.jpg';
  pfp.classList.add('fade-in');

  // Basic Info
  document.getElementById('artist-name').textContent = artist.name;
  document.getElementById('artist-genre').textContent = artist.genre || "Unknown";
  document.getElementById('artist-type').textContent = artist.type || "Unknown";
  document.getElementById('artist-location').textContent = artist.location || "Unknown";

  // Bio
  document.getElementById('artist-bio').textContent = artist.bio || "No biography available.";

  // Members (if group/band)
  const membersSection = document.getElementById('members-section');
  const membersWrapper = membersSection?.closest('.members-wrapper');
  if (artist.type?.toLowerCase().includes('band') || artist.type?.toLowerCase().includes('group')) {
    const memberList = artist.members?.join(', ') || "No members listed";
    membersSection.innerHTML = `<strong>Members:</strong> ${memberList}`;
  } else if (membersWrapper) {
    membersWrapper.style.display = 'none';
  }

  // Socials
  const socialsSection = document.getElementById('socials-section');
  socialsSection.innerHTML = '';
  if (artist.socials && Object.keys(artist.socials).length > 0) {
    for (const platform in artist.socials) {
      const link = document.createElement('a');
      link.href = artist.socials[platform];
      link.target = '_blank';
      link.className = 'social-link';
      link.textContent = platform;
      socialsSection.appendChild(link);
    }
  } else {
    socialsSection.innerHTML = "<p>No social links provided.</p>";
  }

  // Contact
  const contactSection = document.getElementById('contact-section');
  contactSection.innerHTML = `<p>${artist.contact || "No contact information available."}</p>`;

  // Gallery
  const gallerySection = document.getElementById('artist-gallery');
  gallerySection.innerHTML = '';
  if (artist.gallery && artist.gallery.length > 0) {
    artist.gallery.forEach(img => {
      const imageEl = document.createElement('img');
      imageEl.src = img;
      imageEl.alt = 'Artist artwork';
      imageEl.loading = 'lazy';
      gallerySection.appendChild(imageEl);
    });
  } else {
    gallerySection.innerHTML = "<p>No gallery images available.</p>";
  }

  // Video Highlight
  const videoSection = document.getElementById('artist-video');
  if (artist.videoHighlight) {
    const embedCode = getYouTubeEmbed(artist.videoHighlight);
    videoSection.innerHTML = embedCode;
  } else {
    videoSection.innerHTML = "<p>No video highlight available.</p>";
  }

  // Fade in all main profile content after rendering
  document.querySelector('.profile-details')?.classList.add('fade-in');
  document.querySelector('.main-artist-content')?.classList.add('fade-in');
}

// Convert YouTube URL to embed iframe
function getYouTubeEmbed(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  if (!match) return '<p>Invalid video link.</p>';
  const videoId = match[1];
  return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>`;
}

// Automatically render the profile if on artist-profile.html
if (window.location.href.includes('artist-profile.html')) {
  renderArtistProfile();
}