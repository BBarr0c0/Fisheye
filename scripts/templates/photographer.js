// Photographer template creation function
export function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    // Function to create and return a photographer's DOM map
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('role', 'article');
        article.setAttribute('tabindex', '0');

        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('target', '_self');
        link.setAttribute('aria-label', `Voir le profil du photographe ${name}`);
        link.setAttribute('tabindex', '-1');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('imgContainer');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil de ${name}`);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.textContent = name;

        const countryCity = document.createElement('p');
        countryCity.classList.add('location');
        countryCity.textContent = `${city}, ${country}`;

        const photographerTagline = document.createElement('p');
        photographerTagline.classList.add('description');
        photographerTagline.textContent = tagline;

        const dailyPrice = document.createElement('p');
        dailyPrice.classList.add('price');
        dailyPrice.textContent = `${price}€/jour`;

        article.appendChild(link);
        link.appendChild(imgContainer);
        imgContainer.appendChild(img);
        link.appendChild(h2);
        article.appendChild(countryCity);
        article.appendChild(photographerTagline);
        article.appendChild(dailyPrice);

        // Add event listener to handle Enter key press
        article.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                link.click();
            }
        });

        return article;
    }
    return { getUserCardDOM };
}
