function mediaFactory(media) {
    const { photographerId, title, image, video, likes } = media;

    const mediaSrc = image ? `assets/images/${photographerId}/${image}` : `assets/images/${photographerId}/${video}`;
    const mediaType = image ? 'image' : 'video';

    function getMediaDOM() {
        const article = document.createElement('article');
        
        let mediaElement;
        if (mediaType === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute('src', mediaSrc);
            mediaElement.setAttribute('alt', title);
        } else {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('controls', '');
            const source = document.createElement('source');
            source.setAttribute('src', mediaSrc);
            source.setAttribute('type', 'video/mp4');
            mediaElement.appendChild(source);
        }

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = title;

        const mediaLikes = document.createElement('p');
        mediaLikes.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

        article.appendChild(mediaElement);
        article.appendChild(mediaTextContainer)
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);

        return article;
    }

    return { title, mediaSrc, mediaType, getMediaDOM };
}