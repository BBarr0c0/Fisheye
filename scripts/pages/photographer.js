import { MediaFactory } from '../factory/medias.js';
import { sortMedia } from '../utils/filter.js';

// Function to get photographer ID from URL parameters
function getPhotographerId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to retrieve photographer data by ID from a JSON file
async function getPhotographerById(id) {
    try {
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        const data = await response.json();
        const photographer = data.photographers.find(photographer => photographer.id == id);

        // Filter photographer's media
        photographer.media = data.media.filter(media => media.photographerId == id);

        return photographer;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Function to display photographer data on the page
async function displayPhotographerData(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const main = document.querySelector("main");

    const textContainer = document.createElement('div');
    textContainer.classList.add('textContainer');

    const name = document.createElement('h2');
    name.textContent = photographer.name;
    name.setAttribute('tabindex', '0');

    const location = document.createElement('p');
    location.textContent = `${photographer.city}, ${photographer.country}`;
    location.classList.add('location');
    location.setAttribute('tabindex', '0');

    const tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;
    tagline.setAttribute('tabindex', '0');

    const picture = `assets/photographers/${photographer.portrait}`;
    const selfie = document.createElement('img');
    selfie.setAttribute("src", picture);
    selfie.setAttribute("alt", `Photo de profil de ${photographer.name}`);
    selfie.classList.add('selfie');
    
    photographHeader.prepend(textContainer);
    textContainer.appendChild(name);
    textContainer.appendChild(location);
    textContainer.appendChild(tagline);
    photographHeader.appendChild(selfie);

    const titleForm = document.getElementById('modal_title');

    const titleNameForm = document.createElement('span');
    titleNameForm.textContent = `${photographer.name}`;
    titleNameForm.classList.add('titleNameForm');

    titleForm.appendChild(titleNameForm);
    
    const likesPrice = document.querySelector(".likes-price");

    const totalLikes = document.createElement('p');
    totalLikes.classList.add('total-likes');
    totalLikes.setAttribute('tabindex', '0');

    likesPrice.appendChild(totalLikes);

    const dailyPrice = document.createElement('p');
    dailyPrice.classList.add('price');
    dailyPrice.textContent = `${photographer.price}€/jour`;
    dailyPrice.setAttribute('tabindex', '0');

    likesPrice.appendChild(dailyPrice);

    // Display media
    const photographProduction = document.querySelector('.photograph-production');
    main.appendChild(photographProduction);

    const lightbox = window.lightboxInstance;

    // Create and add each media to the DOM
    photographer.media.forEach(media => {
        const mediaModel = mediaFactory(media);
        const { article, mediaElement } = mediaModel.getMediaDOM();
        lightbox.addMediaItem(mediaElement, media.title);
        photographProduction.appendChild(article);
    });

    updateTotalLikes();

    // Apply default sorting
    const defaultOption = 'Popularité';
    sortMedia(defaultOption);
}

// Initialization function to retrieve and display photographer data
async function init() {
    const photographerId = getPhotographerId();
    const photographer = await getPhotographerById(photographerId);
    if (photographer) {
        displayPhotographerData(photographer);
    } else {
        console.error('Photographer data could not be loaded.');
    }
}

init();

// Function to update the total number of likes
export function updateTotalLikes() {
    const totalLikesElement = document.querySelector('.total-likes');
    const allLikes = document.querySelectorAll('.media-likes');
    let totalLikes = 0;

    allLikes.forEach(like => {
        const likesCount = parseInt(like.textContent);
        totalLikes += likesCount;
    });

    totalLikesElement.innerHTML = `${totalLikes} <span class="fa-solid fa-heart"></span>`;
}

// Use the MediaFactory to create media elements
function mediaFactory(media) {
    const factoryInstance = new MediaFactory(media);
    return {
        title: factoryInstance.title,
        mediaSrc: factoryInstance.path,
        mediaType: factoryInstance.mediaType,
        getMediaDOM: () => {
            const { article, mediaElement } = factoryInstance.create();
            article.setAttribute('data-date', media.date);
            mediaElement.setAttribute('tabindex', '0');
            return { article, mediaElement };
        }
    };
}
