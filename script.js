const userRawUrl = 'https://raw.githubusercontent.com/emon606-tech/usr/main/user.txt';

// ✅ Download links you provided
const downloadLinkEnglish = 'https://raw.githubusercontent.com/emonxxx11/zip-file-apk/main/MissionPay.zip';
const downloadLinkBangla  = 'https://raw.githubusercontent.com/emonxxx11/zip-file-apk/main/MissionPay%20বাংলা_.zip';

function startDownloadEnglish() {
  window.open(downloadLinkEnglish, '_blank');
}
function startDownloadBangla() {
  window.open(downloadLinkBangla, '_blank');
}

fetch(userRawUrl)
  .then(response => response.text())
  .then(data => {
    const count = (data.match(/user\s*=\s*/gi) || []).length;
    document.getElementById("user-count").textContent = `📊 Total Users: ${count}`;
  })
  .catch(() => {
    document.getElementById("user-count").textContent = '⚠️ Failed to load user data.';
  });

// Email modal
function openEmailModal() {
  document.getElementById('emailModal').style.display = 'flex';
}
function closeEmailModal() {
  document.getElementById('emailModal').style.display = 'none';
}
function copyEmail() {
  const email = document.getElementById('emailAddress').textContent;
  navigator.clipboard.writeText(email);
  const btn = document.getElementById('copyBtn');
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy Email', 2000);
}

// Rain effect
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 2
  });
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;

  for (const p of particles) {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y + p.length);
    ctx.stroke();
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -p.length;
      p.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawRain);
}
drawRain();
