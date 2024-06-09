function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const divImg = document.createElement('div');
        divImg.classList.add('profile');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.classList.add('name');
        h2.textContent = name;
        const pCity = document.createElement('p');
        pCity.textContent = `${city}, ${country}`;
        pCity.classList.add('location');
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('description');
        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.classList.add('price');
        article.appendChild(divImg);
        divImg.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return article;
    }
    return { name, picture, getUserCardDOM };
}