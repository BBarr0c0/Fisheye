// Importing the photographer template creation function
import { photographerTemplate } from '../templates/photographer.js';
    
// Function to retrieve photographers data from JSON file
async function getPhotographers() {
    try {
        // Get data from JSON file
        const response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du fichier JSON');
        }
        const data = await response.json();
        
        // Displays photographer data in the console
        console.log(data.photographers);
        
        // Return data
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Function to display photographers' data on the page
async function displayData(photographers) {
    // Selection of the section where the photographers will be displayed
    const photographersSection = document.querySelector(".photographer_section");

    // Creation and addition of each photographer's card to the section
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialization function
async function init() {
    // Retrieve photographers’ data
    const { photographers } = await getPhotographers();
    // Display data on the page
    displayData(photographers);
}

// Call the initialization function
init();
    
