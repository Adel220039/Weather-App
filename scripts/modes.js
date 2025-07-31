const radios = document.querySelectorAll('input[name="theme"]');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    document.body.className = radio.value;
    document.querySelector('header').className = radio.value;
    document.querySelector('a').className = radio.value;
    document.querySelector('.search-input').className = `search-input error-shit ${radio.value}`;
    document.querySelector('.search-btn').className = `search-btn ${radio.value}`;
    document.querySelector('.profile').className = `profile ${radio.value}`;
    document.querySelector('header .error').className = `error ${radio.value}`;
    document.querySelector('.suggestions-dropdown').className = `suggestions-dropdown ${radio.value}`;
    document.querySelectorAll('.suggestions-dropdown .suggestion-item').forEach(item => {
      item.className = `suggestion-item ${radio.value}`;
    });

    document.querySelector('main').className = radio.value;
    document.querySelector('.pic-section').className = `pic-section ${radio.value}`;
    document.querySelectorAll('.forecast-item').forEach(item =>{
      item.className = `forecast-item ${radio.value}`
    });

    document.querySelectorAll('.forecast-emoji').forEach(item =>{
      item.className = `forecast-emoji ${radio.value}`
    })

    document.querySelector('.profile-setion').className = `profile-setion ${radio.value}`;
    document.querySelector('.up-pf').className = `up-pf ${radio.value}`;
    document.querySelector('.img').className = `img ${radio.value}`;
    document.getElementById('user-email').className = radio.value;
    document.querySelector('select').className = radio.value;
    document.querySelectorAll('option').forEach(item=>{
      item.className = radio.value
    });
  });
});