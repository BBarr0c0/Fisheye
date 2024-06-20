import { photographerTemplate } from '../templates/photographer.js';
    
async function getPhotographers() {
    try {
        // Récupère les données du fichier JSON
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        const data = await response.json();
        
        // Affiche les données des photographes dans la console
        console.log(data.photographers);
        
        // Retourne les données
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
