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

function showPopup(message, color = '#8b73ff') {
  const popup = document.getElementById('popup');
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
