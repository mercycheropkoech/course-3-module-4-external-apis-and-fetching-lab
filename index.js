// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const input = document.querySelector('input');
const button = document.querySelector('button');
const display = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

button.addEventListener('click', async () => {
  const state = input.value.trim();

  try {
    const res = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    const data = await res.json();

    const alerts = data.features;

    // CLEAR UI FIRST
    display.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    // SHOW DATA
    display.textContent = `${data.title}: ${alerts.length}`;

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.properties.headline;
      display.appendChild(p);
    });

    // CLEAR INPUT
    input.value = "";

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
  }
});