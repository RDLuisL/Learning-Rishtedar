// wheel.js
const colors = ["#511158", "#91226F", "#511158", "#91226f", "#511158", "#91226f", "#511158", "#91226f", "#511158", "#91226f", "#511158"];
const prize_descriptions = ["Entradas", "Vegetariano", "Pollo", "Seafood", "Cordero", "305", "Tandoor", "Postres", "Cocteles", "Vinos", "Cervezas", "Pan", "India"];

let startAngle = 0;
const arc = (2 * Math.PI) / prize_descriptions.length;
let spinTimeout = null;
let spinTime = 0;
let spinTimeTotal = 7000;
let wheel;
const spinSound = document.getElementById("spin-sound");

function drawSpinnerWheel() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const outsideRadius = 200;
    const textRadius = 160;
    const insideRadius = 125;
    wheel = canvas.getContext("2d");
    wheel.clearRect(0, 0, 500, 500);
    wheel.strokeStyle = "#ecf0f1";
    wheel.lineWidth = 5;
    wheel.font = '18px Helvetica, Arial';

    for (let i = 0; i < prize_descriptions.length; i++) {
      const angle = startAngle + i * arc;
      wheel.fillStyle = colors[i % colors.length];

      wheel.beginPath();
      wheel.arc(250, 250, outsideRadius, angle, angle + arc, false);
      wheel.arc(250, 250, insideRadius, angle + arc, angle, true);
      wheel.stroke();
      wheel.fill();

      wheel.save();
      wheel.fillStyle = "#ecf0f1";
      wheel.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
      wheel.rotate(angle + arc / 2 + Math.PI / 2);
      const text = prize_descriptions[i] || "Not this time!";
      wheel.fillText(text, -wheel.measureText(text).width / 2, 0);
      wheel.restore();
    }

    // Arrow
    wheel.fillStyle = "#ecf0f1";
    wheel.beginPath();
    wheel.moveTo(250 - 4, 250 - (outsideRadius + 5));
    wheel.lineTo(250 + 4, 250 - (outsideRadius + 5));
    wheel.lineTo(250, 250 - (outsideRadius - 13));
    wheel.closePath();
    wheel.fill();
  }
}

function spin() {
  $("#spin").off('click');
  document.getElementById("result-area").innerHTML = "";
  spinSound.currentTime = 0;
  spinSound.play();
  spinTime = 0;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = easeOut(spinTime, 0, 360, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawSpinnerWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  spinSound.pause();
  spinSound.currentTime = 0;

  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  const index = Math.floor((360 - degrees % 360) / arcd) % prize_descriptions.length;
  const category = prize_descriptions[index];

  const fileMap = {
    "Entradas": "entradas.js",
    "Vegetariano": "vegetariano.js",
    "Pollo": "murgh.js",
    "Seafood": "seafood.html",
    "Cordero": "lamb.js",
    "305": "305.js",
    "Tandoor": "tandoor.js",
    "Postres": "desert.js",
    "Cocteles": "cocktails.js",
    "Vinos": "wines.js",
    "Cervezas": "beer.js",
    "Pan": "bread.js",
    "India": "hindi.js"
  };

  const file = fileMap[category];
  const isHTML = file.endsWith(".html");
  const link = isHTML ? file : `index.html?module=${file}`;

  const resultArea = document.getElementById("result-area");
  resultArea.innerHTML = `
    <p>Categoría:</p>
    <button id="category-button" onclick="location.href='${link}'">${category}</button>
  `;

  $("#spin").on('click', function (e) {
    e.preventDefault();
    spin();
  });
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

drawSpinnerWheel();

$("#spin").on('click', function (e) {
  e.preventDefault();
  spin();
});
