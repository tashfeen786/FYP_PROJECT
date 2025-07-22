let helmetedCount = 0;
let unhelmetedCount = 0;
let totalCount = 0;
const detectionLog = document.getElementById('detectionLog');
const numberPlates = document.getElementById('numberPlates');
const helmetedCountElem = document.getElementById('helmetedCount');
const unhelmetedCountElem = document.getElementById('unhelmetedCount');
const totalCountElem = document.getElementById('totalCount');

function addDetection(helmeted, plate) {
  const logEntry = document.createElement('li');
  const time = new Date().toLocaleTimeString();
  logEntry.textContent = `[${time}] ${helmeted ? 'Helmeted' : 'Unhelmeted'} - Plate: ${plate}`;
  detectionLog.prepend(logEntry);

  const plateTag = document.createElement('span');
  plateTag.className = "bg-gray-700 px-2 py-1 rounded";
  plateTag.textContent = plate;
  numberPlates.appendChild(plateTag);

  if (helmeted) helmetedCount++;
  else unhelmetedCount++;

  totalCount++;
  updateStats();
}

function updateStats() {
  helmetedCountElem.textContent = helmetedCount;
  unhelmetedCountElem.textContent = unhelmetedCount;
  totalCountElem.textContent = totalCount;
}

function exportData() {
  const rows = [["Time", "Helmeted", "Plate"]];
  Array.from(detectionLog.children).forEach(log => {
    const parts = log.textContent.match(/\[(.*?)\] (.*?) - Plate: (.*)/);
    if (parts) rows.push([parts[1], parts[2], parts[3]]);
  });

  let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "detection_log.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

setInterval(() => {
  const helmeted = Math.random() > 0.3;
  const plate = "ABC-" + Math.floor(Math.random() * 9000 + 1000);
  addDetection(helmeted, plate);
}, 5000);
