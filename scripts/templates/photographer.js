function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('target', '_self');
        link.setAttribute('aria-label', `Voir le profil du photographe ${name}`);

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('imgContainer');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo de profil de ${name}`);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.textContent = name;
        h2.setAttribute('aria-label', `Nom du photographe ${name}`);

        const countryCity = document.createElement('p');
        countryCity.classList.add('location');
        countryCity.textContent = `${city}, ${country}`;
        countryCity.setAttribute('aria-label', `Ville et pays du photographe ${name}`);

        const photographerTagline = document.createElement('p');
        photographerTagline.classList.add('description');
        photographerTagline.textContent = tagline;
        photographerTagline.setAttribute('aria-label', `Slogan du photographe ${name}`);

        const dailyPrice = document.createElement('p');
        dailyPrice.classList.add('price');
        dailyPrice.textContent = `${price}€/jour`;
        dailyPrice.setAttribute('aria-label', `Tarif journalier du photographe ${name}`);

        article.appendChild(link);
        link.appendChild(imgContainer);
        imgContainer.appendChild(img);
        link.appendChild(h2);
        article.appendChild(countryCity);
        article.appendChild(photographerTagline);
        article.appendChild(dailyPrice);

        return article;
    }
    return { name, picture, getUserCardDOM };
}