export class MediaFactory {
    constructor(media) {
        const { photographerId, title, image, video, likes } = media;
        const mediaSrc = image ? `assets/images/${photographerId}/${image}` : `assets/images/${photographerId}/${video}`;
        const mediaType = image ? 'image' : 'video';
        
        switch (mediaType) {
            case 'image':
                return new ImageMedia(mediaSrc, title, likes);
            case 'video':
                return new VideoMedia(mediaSrc, title, likes);
        }
    }
}

class ImageMedia {
    constructor(path, title, likes) {
        this.path = path;
        this.title = title;
        this.likes = likes;
    }

    create() {
        const article = document.createElement('article');
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', this.path);
        imgElement.setAttribute('alt', this.title);
        imgElement.setAttribute('class', 'image-media');

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        const mediaLikes = document.createElement('p');
        mediaLikes.classList.add('media-likes');
        mediaLikes.innerHTML = `${this.likes} <i class="fa-solid fa-heart"></i>`;

        article.appendChild(imgElement);
        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);

        return article;
    }
}

class VideoMedia {
    constructor(path, title, likes) {
        this.path = path;
        this.title = title;
        this.likes = likes;
    }

    create() {
        const article = document.createElement('article');
        const videoElement = document.createElement('video');
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('class', 'video-media');

        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', this.path);
        sourceElement.setAttribute('type', 'video/mp4');

        videoElement.appendChild(sourceElement);

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        const mediaLikes = document.createElement('p');
        mediaLikes.classList.add('media-likes');
        mediaLikes.innerHTML = `${this.likes} <i class="fa-solid fa-heart"></i>`;

        article.appendChild(videoElement);
        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(mediaLikes);

        return article;
    }
}