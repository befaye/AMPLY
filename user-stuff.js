function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Optional: Close dropdown if clicking outside
window.addEventListener("click", function (e) {
  const avatar = document.querySelector(".avatar-icon");
  const dropdown = document.getElementById("dropdownMenu");
  if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// for event manangment tab
document.addEventListener('DOMContentLoaded', () => {
  const applications = [
    {
      event: "Indie Groove Night",
      name: "John Doe",
      email: "john@email.com",
      genre: "Indie Rock",
      link: "https://youtu.be/example",
      message: "Hey! I'm excited to perform at your event. Here's my best set!"
    },
    {
      event: "Soundwave Festival",
      name: "Band XYZ",
      email: "contact@bandxyz.com",
      genre: "Pop Rock",
      link: "https://soundcloud.com/bandxyz/demo",
      message: "We bring high energy and crowd engagement. Hope to be considered!"
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
  });
});
