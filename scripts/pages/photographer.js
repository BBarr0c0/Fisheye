function getPhotographerId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getPhotographerById(id) {
    try {
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        const data = await response.json();
        const photographer = data.photographers.find(photographer => photographer.id == id);

        photographer.media = data.media.filter(media => media.photographerId == id);

        console.log(photographer);
        return photographer;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function displayPhotographerData(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const likesPrice = document.querySelector(".likes-price");

    const h2 = document.createElement('h2');
    h2.textContent = photographer.name;
    h2.setAttribute('aria-label', `Nom du photographe ${photographer.name}`);

    const location = document.createElement('p');
    location.textContent = `${photographer.city}, ${photographer.country}`;
    location.setAttribute('aria-label', `Ville et pays du photographe ${photographer.name}`);

    const tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;
    tagline.setAttribute('aria-label', `Slogan du photographe ${photographer.name}`);

    const dailyPrice = document.createElement('p');
    dailyPrice.classList.add('price');
    dailyPrice.textContent = `${photographer.price}€/jour`;
    dailyPrice.setAttribute('aria-label', `Tarif journalier du photographe ${photographer.name}`);

    photographHeader.prepend(h2, location, tagline);
    likesPrice.appendChild(dailyPrice);
}

async function init() {
    const photographerId = getPhotographerId();
    const photographer = await getPhotographerById(photographerId);
    displayPhotographerData(photographer);
}

init();