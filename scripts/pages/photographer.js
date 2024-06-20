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
    const main = document.querySelector("main");

    const textContainer = document.createElement('div');
    textContainer.classList.add('textContainer');

    const name = document.createElement('h2');
    name.textContent = photographer.name;
    name.setAttribute('aria-label', `Nom du photographe ${photographer.name}`);

    const location = document.createElement('p');
    location.textContent = `${photographer.city}, ${photographer.country}`;
    location.setAttribute('aria-label', `Ville et pays du photographe ${photographer.name}`);
    location.classList.add('location');

    const tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;
    tagline.setAttribute('aria-label', `Slogan du photographe ${photographer.name}`);

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

    const titleNameForm = document.createElement('p');
    titleNameForm.textContent = `${photographer.name}`;
    titleNameForm.classList.add('titleNameForm');

    titleForm.appendChild(titleNameForm);
    
    const likesPrice = document.querySelector(".likes-price");

    const totalLikes = document.createElement('p');
    totalLikes.classList.add('total-likes');

    likesPrice.appendChild(totalLikes);

    const dailyPrice = document.createElement('p');
    dailyPrice.classList.add('price');
    dailyPrice.textContent = `${photographer.price}€/jour`;
    dailyPrice.setAttribute('aria-label', `Tarif journalier du photographe ${photographer.name}`);

    likesPrice.appendChild(dailyPrice);

    // Display media
    const photographProduction = document.querySelector('.photograph-production');
    main.appendChild(photographProduction);

    photographer.media.forEach(media => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaDOM();
        photographProduction.appendChild(mediaCardDOM);
    });

    updateTotalLikes();
}

async function init() {
    const photographerId = getPhotographerId();
    const photographer = await getPhotographerById(photographerId);
    displayPhotographerData(photographer);
}

init();


/* CHANGE CHEVRON DIRECTION */

document.addEventListener('DOMContentLoaded', function() {
    const selectContainer = document.querySelector('.select-container');
    const chevron = document.querySelector('.chevron');
    const select = document.querySelector("#select");
    

    document.addEventListener('click', function(event) {
      if (select.contains(event.target)) {
        // Toggle open class when clicking on the select element
        selectContainer.classList.toggle('open');
      } else {
        // Remove open class when clicking outside the select element
        selectContainer.classList.remove('open');
      }

      // Update chevron icon based on the open state
      if (selectContainer.classList.contains('open')) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
      } else {
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
      }
    });

});


/* HIDE SELECTED OPTION */
function hideSelectedOption() {
    const select = document.querySelector("#select");
    const options = select.options;
    const selectedValue = select.value;
    
    
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        // Masquer l'option sélectionnée
        if (option.value === selectedValue) {
        option.style.display = "none";
        } else {
        option.style.display = ""; // Afficher les autres options
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    hideSelectedOption();
});


function updateTotalLikes() {
    const totalLikesElement = document.querySelector('.total-likes');
    const allLikes = document.querySelectorAll('.media-likes');
    let totalLikes = 0;

    allLikes.forEach(like => {
        const likesCount = parseInt(like.textContent);
        totalLikes += likesCount;
    });

    totalLikesElement.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
}