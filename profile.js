//  DROP-DOWN PROFILE MENU 
function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const avatar = document.querySelector(".avatar-icon");
  const dropdown = document.getElementById("dropdownMenu");
  if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

//  POPUP MESSAGE 
function showPopup(message, color = '#8b73ff') {
  const popup = document.getElementById('popupMessage');
  popup.textContent = message;
  popup.style.display = 'block';
  popup.style.boxShadow = `
    0 0 8px ${color}80,
    0 0 18px ${color}40,
    inset 0 0 8px rgba(255, 255, 255, 0.05)
  `;
  popup.style.backgroundColor = '#2d3436';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2500);
}

// USER PROFILE LOGIC 
let userProfile = {
  name: "DUO:TONE",
  handle: "@duotone",
  role: "Organizer",
  location: "Manila, PH",
  email: "duotone@gmail.com",
  phone: "Private",
  organization: "Amply",
  website: "duotone.link",
  profilePic: "assets/blank-pfp.png",
  joinedDate: "Jun 2025",
  lastActive: "June 14, 2025"
};

// Load from localStorage if available
if (localStorage.getItem("amplyUser")) {
  userProfile = JSON.parse(localStorage.getItem("amplyUser"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
});

// Render profile info dynamically
function renderProfile() {
  document.querySelector(".profile-pic").src = userProfile.profilePic;

  document.querySelector(".profile-info").innerHTML = `
    <h2 id="profileName">${userProfile.name}</h2>
    <input type="text" id="inputName" class="hidden" />

    <p class="handle" id="profileHandle">${userProfile.handle}</p>
    <input type="text" id="inputHandle" class="hidden" />

    <p class="role" id="profileRole">${userProfile.role}</p>
    <select id="inputRole" class="hidden">
      <option value="Organizer">Organizer</option>
      <option value="Artist">Artist</option>
    </select>

    <p class="location" id="profileLocation">${userProfile.location}</p>
    <input type="text" id="inputLocation" class="hidden" />
  `;

  document.getElementById("contactInfo").innerHTML = `
    <p><strong>Email:</strong> <span id="profileEmail">${userProfile.email}</span>
      <input type="email" id="inputEmail" class="hidden" /></p>

    <p><strong>Phone:</strong> <span id="profilePhone">${userProfile.phone}</span>
      <input type="text" id="inputPhone" class="hidden" /></p>

    <p><strong>Organization:</strong> <span id="profileOrg">${userProfile.organization}</span>
      <input type="text" id="inputOrg" class="hidden" /></p>

    <p><strong>Website:</strong> <a id="profileWebsite" href="#">${userProfile.website}</a>
      <input type="text" id="inputWebsite" class="hidden" /></p>

    <p><strong>Date Joined:</strong> ${userProfile.joinedDate}</p>
    <p><strong>Last Active:</strong> ${userProfile.lastActive}</p>

    <div class="profile-edit-buttons">
      <button id="editBtn" class="action-btn" onclick="editProfile()">Edit Profile</button>
      <button id="saveBtn" class="action-btn hidden" onclick="saveProfile()">Save</button>
      <button id="cancelBtn" class="action-btn hidden" onclick="cancelEdit()">Cancel</button>
    </div>
  `;

  document.querySelector(".profile-actions").innerHTML = `
    <a href="applications.html" class="action-btn">Manage Events</a>
    <a href="login.html" class="logout-btn">Log Out</a>
  `;
}

// Enable edit mode
function editProfile() {
  // Show inputs
  document.getElementById("inputEmail").classList.remove("hidden");
  document.getElementById("inputPhone").classList.remove("hidden");
  document.getElementById("inputOrg").classList.remove("hidden");
  document.getElementById("inputWebsite").classList.remove("hidden");
  document.getElementById("inputName").classList.remove("hidden");
  document.getElementById("inputRole").classList.remove("hidden"); 
  document.getElementById("inputLocation").classList.remove("hidden");
  document.getElementById("inputHandle").classList.remove("hidden");

  // Hide display
  document.getElementById("profileEmail").style.display = "none";
  document.getElementById("profilePhone").style.display = "none";
  document.getElementById("profileOrg").style.display = "none";
  document.getElementById("profileWebsite").style.display = "none";
  document.getElementById("profileName").style.display = "none";
  document.getElementById("profileRole").style.display = "none"; 
  document.getElementById("profileLocation").style.display = "none";
  document.getElementById("profileHandle").style.display = "none";

  // Fill inputs
  document.getElementById("inputEmail").value = userProfile.email;
  document.getElementById("inputPhone").value = userProfile.phone;
  document.getElementById("inputOrg").value = userProfile.organization;
  document.getElementById("inputWebsite").value = userProfile.website;
  document.getElementById("inputName").value = userProfile.name;
  document.getElementById("inputRole").value = userProfile.role.includes("Organizer") ? "Organizer" : "Artist"; 
  document.getElementById("inputLocation").value = userProfile.location;
  document.getElementById("inputHandle").value = userProfile.handle;

  // Toggle buttons
  document.getElementById("saveBtn").classList.remove("hidden");
  document.getElementById("cancelBtn").classList.remove("hidden");
  document.getElementById("editBtn").classList.add("hidden");
}

function saveProfile() {
  userProfile.email = document.getElementById("inputEmail").value;
  userProfile.phone = document.getElementById("inputPhone").value;
  userProfile.organization = document.getElementById("inputOrg").value;
  userProfile.website = document.getElementById("inputWebsite").value;
  userProfile.name = document.getElementById("inputName").value;
  
  const selectedRole = document.getElementById("inputRole").value;
  userProfile.role = selectedRole === "Organizer" ? "Organizer" : "Artist";

  userProfile.location = document.getElementById("inputLocation").value;
  userProfile.handle = document.getElementById("inputHandle").value;

  // Update static fields
  document.getElementById("profileEmail").textContent = userProfile.email;
  document.getElementById("profilePhone").textContent = userProfile.phone;
  document.getElementById("profileOrg").textContent = userProfile.organization;
  document.getElementById("profileWebsite").textContent = userProfile.website;
  document.getElementById("profileName").textContent = userProfile.name;
  document.getElementById("profileRole").textContent = userProfile.role;
  document.getElementById("profileLocation").textContent = userProfile.location;
  document.getElementById("profileHandle").textContent = userProfile.handle;

  // Save to localStorage
  localStorage.setItem("amplyUser", JSON.stringify(userProfile));
  showPopup("✅ Profile updated!", "#8b73ff");

  cancelEdit();
}

function cancelEdit() {
  // Hide inputs
  document.getElementById("inputEmail").classList.add("hidden");
  document.getElementById("inputPhone").classList.add("hidden");
  document.getElementById("inputOrg").classList.add("hidden");
  document.getElementById("inputWebsite").classList.add("hidden");
  document.getElementById("inputName").classList.add("hidden");
  document.getElementById("inputRole").classList.add("hidden"); 
  document.getElementById("inputLocation").classList.add("hidden");
  document.getElementById("inputHandle").classList.add("hidden");

  // Show display text
  document.getElementById("profileEmail").style.display = "inline";
  document.getElementById("profilePhone").style.display = "inline";
  document.getElementById("profileOrg").style.display = "inline";
  document.getElementById("profileWebsite").style.display = "inline";
  document.getElementById("profileName").style.display = "block";
  document.getElementById("profileRole").style.display = "block"; 
  document.getElementById("profileLocation").style.display = "block";
  document.getElementById("profileHandle").style.display = "block";

  // Toggle buttons
  document.getElementById("saveBtn").classList.add("hidden");
  document.getElementById("cancelBtn").classList.add("hidden");
  document.getElementById("editBtn").classList.remove("hidden");
}

// Event Management Logic
document.addEventListener('DOMContentLoaded', () => {
  const applications = [
    {
      event: "BEBET's Paresan & Karaoke Bar",
      name: "Maya Dela Torre",
      email: "maya.torresings@gmail.com",
      genre: "Acoustic Pop",
      link: "https://youtu.be/mayalive",
      message: "Looking forward to jamming with the Bebet's crowd! I’ve got a few originals and some OPM covers ready. Let’s vibe!"
    },
    {
      event: "BEBET's Paresan & Karaoke Bar",
      name: "DJ Harana",
      email: "djharana@spinmail.com",
      genre: "Lo-fi R&B",
      link: "https://soundcloud.com/djharana/live-set",
      message: "Late nights and lo-fi hits are my specialty. I’m ready to spin between karaoke sets or even drop a remix battle if Bebet’s up for it!"
    },
    {
      event: "BEBET's Paresan & Karaoke Bar",
      name: "The Crispy Sisigs",
      email: "bookings@crispsisigs.ph",
      genre: "Alt Rock / Parody",
      link: "https://youtu.be/crispysisigs",
      message: "We play alt rock bangers and rewrite them with food puns. Think ‘Sweet Child O’ Mine’ but it’s about sinigang. Bebet deserves the chaos."
    },
    {
      event: "BEBET's Paresan & Karaoke Bar",
      name: "Lance the Lounge Singer",
      email: "lance@croons.com",
      genre: "Jazz / Standards",
      link: "https://youtube.com/lancethelounge",
      message: "Smooth vocals, Sinatra vibes, and an ironic cover of ‘My Humps’. Trust me, it works. Let’s get classy and weird at Bebet’s."
    }
  ];

  const container = document.getElementById('applications-list');

  applications.forEach(app => {
    const card = document.createElement('div');
    card.classList.add('application-card');
    card.innerHTML = `
      <h3>📅 ${app.event}</h3>
      <div class="application-info">
        👤 <strong>Artist Name:</strong> ${app.name}<br/>
        📧 <strong>Contact Email:</strong> ${app.email}<br/>
        🎵 <strong>Genre:</strong> ${app.genre}<br/>
        🔗 <strong>Performance Link:</strong> <a href="${app.link}" target="_blank">View Link</a>
      </div>
      <div class="message-box">
        💬 ${app.message}
      </div>
      <div class="application-actions">
        <button class="approve-btn">Approve</button>
        <button class="reject-btn">Reject</button>
      </div>
    `;
    container.appendChild(card);

    const approveBtn = card.querySelector('.approve-btn');
    const rejectBtn = card.querySelector('.reject-btn');

    approveBtn.addEventListener('click', () => {
      showPopup('✅ Application has been accepted!', '#8b73ff');
    });

    rejectBtn.addEventListener('click', () => {
      showPopup('❌ Application has been rejected!', '#ff8dc4');
    });
  });
});

// ARTIST USER PROFILE LOGIC (for artists-user-profile.html)
let artistUserProfile = {
  name: "Maya Dela Torre",
  handle: "@mayalive",
  role: "Artist",
  location: "Pasig City, PH",
  email: "maya.torresings@gmail.com",
  phone: "0917-XXXXXXX",
  organization: "Independent",
  website: "youtube.com/mayalive",
  profilePic: "assets/maya-pfp.png",
  joinedDate: "May 2025",
  lastActive: "June 14, 2025"
};

// Load from localStorage if available (specific key for artist users)
if (localStorage.getItem("amplyArtistUser")) {
  artistUserProfile = JSON.parse(localStorage.getItem("amplyArtistUser"));
}

function renderArtistProfile() {
  // Reuse DOM logic similar to renderProfile but targeting artistUserProfile
  document.querySelector(".profile-pic").src = artistUserProfile.profilePic;

  document.querySelector(".profile-info").innerHTML = `
    <h2 id="profileName">${artistUserProfile.name}</h2>
    <input type="text" id="inputName" class="hidden" />

    <p class="handle" id="profileHandle">${artistUserProfile.handle}</p>
    <input type="text" id="inputHandle" class="hidden" />

    <p class="role" id="profileRole">${artistUserProfile.role}</p>
    <select id="inputRole" class="hidden">
      <option value="Artist">Artist</option>
      <option value="Organizer">Organizer</option>
    </select>

    <p class="location" id="profileLocation">${artistUserProfile.location}</p>
    <input type="text" id="inputLocation" class="hidden" />
  `;

  document.getElementById("contactInfo").innerHTML = `
    <p><strong>Email:</strong> <span id="profileEmail">${artistUserProfile.email}</span>
      <input type="email" id="inputEmail" class="hidden" /></p>

    <p><strong>Phone:</strong> <span id="profilePhone">${artistUserProfile.phone}</span>
      <input type="text" id="inputPhone" class="hidden" /></p>

    <p><strong>Organization:</strong> <span id="profileOrg">${artistUserProfile.organization}</span>
      <input type="text" id="inputOrg" class="hidden" /></p>

    <p><strong>Website:</strong> <a id="profileWebsite" href="#">${artistUserProfile.website}</a>
      <input type="text" id="inputWebsite" class="hidden" /></p>

    <p><strong>Date Joined:</strong> ${artistUserProfile.joinedDate}</p>
    <p><strong>Last Active:</strong> ${artistUserProfile.lastActive}</p>

    <div class="profile-edit-buttons">
      <button id="editBtn" class="action-btn" onclick="editArtistProfile()">Edit Profile</button>
      <button id="saveBtn" class="action-btn hidden" onclick="saveArtistProfile()">Save</button>
      <button id="cancelBtn" class="action-btn hidden" onclick="cancelArtistEdit()">Cancel</button>
    </div>
  `;
}

// These are the artist-specific edit functions
function editArtistProfile() {
  ["inputEmail", "inputPhone", "inputOrg", "inputWebsite", "inputName", "inputRole", "inputLocation", "inputHandle"]
    .forEach(id => document.getElementById(id).classList.remove("hidden"));
  ["profileEmail", "profilePhone", "profileOrg", "profileWebsite", "profileName", "profileRole", "profileLocation", "profileHandle"]
    .forEach(id => document.getElementById(id).style.display = "none");

  document.getElementById("inputEmail").value = artistUserProfile.email;
  document.getElementById("inputPhone").value = artistUserProfile.phone;
  document.getElementById("inputOrg").value = artistUserProfile.organization;
  document.getElementById("inputWebsite").value = artistUserProfile.website;
  document.getElementById("inputName").value = artistUserProfile.name;
  document.getElementById("inputRole").value = artistUserProfile.role;
  document.getElementById("inputLocation").value = artistUserProfile.location;
  document.getElementById("inputHandle").value = artistUserProfile.handle;

  document.getElementById("saveBtn").classList.remove("hidden");
  document.getElementById("cancelBtn").classList.remove("hidden");
  document.getElementById("editBtn").classList.add("hidden");
}

function saveArtistProfile() {
  artistUserProfile.email = document.getElementById("inputEmail").value;
  artistUserProfile.phone = document.getElementById("inputPhone").value;
  artistUserProfile.organization = document.getElementById("inputOrg").value;
  artistUserProfile.website = document.getElementById("inputWebsite").value;
  artistUserProfile.name = document.getElementById("inputName").value;
  artistUserProfile.role = document.getElementById("inputRole").value;
  artistUserProfile.location = document.getElementById("inputLocation").value;
  artistUserProfile.handle = document.getElementById("inputHandle").value;

  localStorage.setItem("amplyArtistUser", JSON.stringify(artistUserProfile));
  showPopup("🎨 Artist profile updated!", "#ff8dc4");

  renderArtistProfile();
}

function cancelArtistEdit() {
  ["inputEmail", "inputPhone", "inputOrg", "inputWebsite", "inputName", "inputRole", "inputLocation", "inputHandle"]
    .forEach(id => document.getElementById(id).classList.add("hidden"));
  ["profileEmail", "profilePhone", "profileOrg", "profileWebsite", "profileName", "profileRole", "profileLocation", "profileHandle"]
    .forEach(id => document.getElementById(id).style.display = id.includes("Name") || id.includes("Role") || id.includes("Location") ? "block" : "inline");

  document.getElementById("saveBtn").classList.add("hidden");
  document.getElementById("cancelBtn").classList.add("hidden");
  document.getElementById("editBtn").classList.remove("hidden");
}

// Real event metadata
const artistApplications = [
  {
    eventId: "bebets-paresan-and-karaoke-bar",
    status: "pending",
    organizer: "DUO:TONE",
    date: "Weekly (Fridays and Saturdays)",
  },
  {
    eventId: "kick-off-manila-music-fest-2025",
    status: "accepted",
    organizer: "PINTIG Org",
    date: "2025-03-01",
  },
  {
    eventId: "aurora-music-festival-clark-2025",
    status: "accepted",
    organizer: "Echolab Studios",
    date: "2025-05-03/2025-05-04",
  },
  {
    eventId: "malaya-music-fest-2025",
    status: "pending",
    organizer: "Alliance PH",
    date: "2025-06-14/2025-06-15",
  }
];

const eventData = [
  {
    id: "malaya-music-fest-2025",
    name: "Malaya Music Fest 2025",
    image: "events/malaya-mf.jpg"
  },
  {
    id: "kick-off-manila-music-fest-2025",
    name: "Kick Off Manila Music Fest 2025",
    image: "events/kick-off-manila-mf.png"
  },
  {
    id: "aurora-music-festival-clark-2025",
    name: "Aurora Music Festival 2025",
    image: "events/aurora-mf.jpg"
  },
  {
    id: "bebets-paresan-and-karaoke-bar",
    name: "BEBET's Paresan & Karaoke Bar",
    image: "events/bebets.png"
  }
];

const acceptedContainer = document.getElementById("accepted-list");
const pendingContainer = document.getElementById("pending-list");

function createApplicationCard(app, eventDetails) {
  const card = document.createElement("div");
  card.classList.add("application-card");

  const statusMessage = app.status === "accepted"
    ? "🎉 Congratulations! Your application has been accepted. Please check your email or socials to coordinate with the organizers."
    : "📨 Your application has been submitted. Please wait for a response from the event organizers.";

  card.innerHTML = `
    <img src="${eventDetails.image}" class="application-img" alt="${eventDetails.name}"/>
    <h4>${eventDetails.name}</h4>
    <div class="application-info">
      🏢 <strong>Organizer:</strong> ${app.organizer}<br/>
      📆 <strong>Date:</strong> ${app.date}
    </div>
    <div class="message-box">${statusMessage}</div>
  `;

  return card;
}

artistApplications.forEach(app => {
  const eventDetails = eventData.find(e => e.id === app.eventId);
  if (!eventDetails) return;

  const card = createApplicationCard(app, eventDetails);
  if (app.status === "accepted") {
    acceptedContainer.appendChild(card);
  } else {
    pendingContainer.appendChild(card);
  }
});
