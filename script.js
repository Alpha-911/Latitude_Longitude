'use strict'

let counter = 0;
const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');
const search = document.querySelector('.search-button');
const saveCoordinates = document.querySelector('.save-button');
const load = document.querySelectorAll('.load-button');

const valStreet = document.querySelector('.des-street');
const valCity = document.querySelector('.des-city');
const valPostalCode = document.querySelector('.des-postal-code');
const valState = document.querySelector('.des-state');
const valTimezone = document.querySelector('.des-timezone');
const valCountry = document.querySelector('.des-country');

function dataFetch(latitude, longitude) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=b4c1a95499034a14bdeef01573da32ce`)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            valStreet.textContent = data.features[0].properties.address_line1;
            valCity.textContent = data.features[0].properties.city;
            valPostalCode.textContent = data.features[0].properties.postcode;
            valState.textContent = data.features[0].properties.state;
            valTimezone.textContent = data.features[0].properties.timezone.name;
            valCountry.textContent = data.features[0].properties.country;
        })
}

function saveCoordinate(latitude, longitude) {
    const html = `
        <div class="entry">
            <div class="data">
                <div class="lat">
                    <span>Lat - </span>
                    <span class="lat-value lat">${latitude}</span>
                </div>
                <div class="long">
                    <span>Long - </span>
                    <span class="long-val">${longitude}</span>
                </div>
            </div>
            <label>
                <textarea class="note-taking" placeholder="Note"></textarea>
            </label>
        </div>
    `
    document.querySelector('.saved-history').insertAdjacentHTML('beforeend', html);
}

search.addEventListener('click', function () {
    dataFetch(latitude.value, longitude.value);
})

saveCoordinates.addEventListener('click', function () {
    counter++;
    saveCoordinate(latitude.value, longitude.value);
})
