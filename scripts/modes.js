// Get saved theme from localStorage or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme on page load
document.body.className = savedTheme;
document.querySelector('header').className = savedTheme;
document.querySelector('a').className = savedTheme;
document.querySelector(
  '.search-input'
).className = `search-input error-shit ${savedTheme}`;
document.querySelector('.search-btn').className = `search-btn ${savedTheme}`;
document.querySelector('.profile').className = `profile ${savedTheme}`;
document.querySelector('header .error').className = `error ${savedTheme}`;
document.querySelector(
  '.suggestions-dropdown'
).className = `suggestions-dropdown ${savedTheme}`;
document
  .querySelectorAll('.suggestions-dropdown .suggestion-item')
  .forEach((item) => {
    item.className = `suggestion-item ${savedTheme}`;
  });
document.querySelector('main').className = savedTheme;

// Update pic-section if it exists
const picSection = document.querySelector('.pic-section');
if (picSection) {
  picSection.className = `pic-section ${savedTheme}`;
}

// Update forecast items if they exist
document.querySelectorAll('.forecast-item').forEach((item) => {
  item.className = `forecast-item ${savedTheme}`;
});

document.querySelectorAll('.forecast-emoji').forEach((item) => {
  item.className = `forecast-emoji ${savedTheme}`;
});

document.querySelector(
  '.profile-setion'
).className = `profile-setion ${savedTheme}`;
document.querySelector('.up-pf').className = `up-pf ${savedTheme}`;
document.querySelector('.img').className = `img ${savedTheme}`;
document.getElementById('user-email').className = savedTheme;
document.querySelector('select').className = savedTheme;
document.querySelectorAll('option').forEach((item) => {
  item.className = savedTheme;
});

// Set the correct radio button as checked
const themeRadios = document.querySelectorAll('input[name="theme"]');
themeRadios.forEach((radio) => {
  if (radio.value === savedTheme) {
    radio.checked = true;
  }
});

const radios = document.querySelectorAll('input[name="theme"]');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedTheme = radio.value;

    // Save theme to localStorage
    localStorage.setItem('theme', selectedTheme);

    document.body.className = selectedTheme;
    document.querySelector('header').className = selectedTheme;
    document.querySelector('a').className = selectedTheme;
    document.querySelector(
      '.search-input'
    ).className = `search-input error-shit ${selectedTheme}`;
    document.querySelector(
      '.search-btn'
    ).className = `search-btn ${selectedTheme}`;
    document.querySelector('.profile').className = `profile ${selectedTheme}`;
    document.querySelector(
      'header .error'
    ).className = `error ${selectedTheme}`;
    document.querySelector(
      '.suggestions-dropdown'
    ).className = `suggestions-dropdown ${selectedTheme}`;
    document
      .querySelectorAll('.suggestions-dropdown .suggestion-item')
      .forEach((item) => {
        item.className = `suggestion-item ${selectedTheme}`;
      });

    document.querySelector('main').className = selectedTheme;

    // Update pic-section if it exists
    const picSection = document.querySelector('.pic-section');
    if (picSection) {
      picSection.className = `pic-section ${selectedTheme}`;
    }

    // Update forecast items if they exist
    document.querySelectorAll('.forecast-item').forEach((item) => {
      item.className = `forecast-item ${selectedTheme}`;
    });

    document.querySelectorAll('.forecast-emoji').forEach((item) => {
      item.className = `forecast-emoji ${selectedTheme}`;
    });

    document.querySelector(
      '.profile-setion'
    ).className = `profile-setion ${selectedTheme}`;
    document.querySelector('.up-pf').className = `up-pf ${selectedTheme}`;
    document.querySelector('.img').className = `img ${selectedTheme}`;
    document.getElementById('user-email').className = selectedTheme;
    document.querySelector('select').className = selectedTheme;
    document.querySelectorAll('option').forEach((item) => {
      item.className = selectedTheme;
    });
  });
});
