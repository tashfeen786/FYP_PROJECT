let total = 0;
let helmeted = 0;
let noHelmet = 0;
const logBody = document.getElementById("log-body");

// Mock function for detection results (you’ll replace this with real backend logic)
function mockDetection() {
  const now = new Date().toLocaleTimeString();
  const numberPlate = "ABC-" + Math.floor(Math.random() * 999);
  const isHelmeted = Math.random() > 0.5;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${now}</td>
    <td>${numberPlate}</td>
    <td style="color:${isHelmeted ? 'lightgreen' : 'tomato'}">${isHelmeted ? 'Helmet' : 'No Helmet'}</td>
  `;

  logBody.appendChild(row);
  total++;
  if (isHelmeted) helmeted++;
  else noHelmet++;

  document.getElementById("total").innerText = total;
  document.getElementById("helmeted").innerText = helmeted;
  document.getElementById("no-helmet").innerText = noHelmet;
}

let detectionInterval;

document.getElementById("start-btn").addEventListener("click", () => {
  detectionInterval = setInterval(mockDetection, 2000); // every 2 seconds
});

document.getElementById("stop-btn").addEventListener("click", () => {
  clearInterval(detectionInterval);
});

document.getElementById("export").addEventListener("click", () => {
  const rows = Array.from(logBody.querySelectorAll("tr"));
  let csv = "Time,Number Plate,Status\n";
  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    csv += `${cols[0].innerText},${cols[1].innerText},${cols[2].innerText}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "detection_logs.csv";
  a.click();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});
