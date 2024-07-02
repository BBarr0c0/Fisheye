import { updateTotalLikes } from '../pages/photographer.js'

export class MediaFactory {
    constructor(media) {
        const { photographerId, title, image, video, likes, date } = media;
        const mediaSrc = image ? `assets/images/${photographerId}/${image}` : `assets/images/${photographerId}/${video}`;
        const mediaType = image ? 'image' : 'video';
        
        switch (mediaType) {
            case 'image':
                return new ImageMedia(mediaSrc, title, likes, date);
            case 'video':
                return new VideoMedia(mediaSrc, title, likes, date);
        }
    }
}

class ImageMedia {
    constructor(path, title, likes, date) {
        this.path = path;
        this.title = title;
        this.likes = likes;
        this.liked = false;
        this.date = date;
    }

    toggleLike() {
        this.liked = !this.liked;
        this.likes += this.liked ? 1 : -1;
        this.updateLikesDisplay();
    }

    updateLikesDisplay() {
        const iconClass = this.liked ? 'fa-solid' : 'fa-regular';
        this.mediaLikes.innerHTML = `${this.likes} <i class="${iconClass} fa-heart" tabindex="0" role="button" aria-label="like"></i>`;
        updateTotalLikes();
    }

    create() {
        const article = document.createElement('article');
        

        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', this.path);
        imgElement.setAttribute('alt', this.title);
        imgElement.setAttribute('class', 'image-media');
        imgElement.setAttribute('tabindex', '0');
        imgElement.setAttribute('role', 'img');

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        this.mediaLikes = document.createElement('p');
        this.mediaLikes.classList.add('media-likes');
        this.mediaLikes.innerHTML = `${this.likes} <i class="fa-regular fa-heart" tabindex="0" role="button" aria-label="like"></i>`;
        this.mediaLikes.addEventListener('click', () => this.toggleLike());
        this.mediaLikes.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.toggleLike();
            }
        });

        article.appendChild(imgElement);
        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(this.mediaLikes);

        return { article, mediaElement: imgElement };
    }
}

class VideoMedia {
    constructor(path, title, likes, date) {
        this.path = path;
        this.title = title;
        this.likes = likes;
        this.liked = false;
        this.date = date;
    }

    toggleLike() {
        this.liked = !this.liked;
        this.likes += this.liked ? 1 : -1;
        this.updateLikesDisplay();
    }

    updateLikesDisplay() {
        const iconClass = this.liked ? 'fa-solid' : 'fa-regular';
        this.mediaLikes.innerHTML = `${this.likes} <i class="${iconClass} fa-heart" tabindex="0" role="button" aria-label="like"></i>`;
        updateTotalLikes();
    }

    create() {
        const article = document.createElement('article');
        

        const videoElement = document.createElement('video');
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('class', 'video-media');
        videoElement.setAttribute('tabindex', '0');

        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', this.path);
        sourceElement.setAttribute('type', 'video/mp4');

        videoElement.appendChild(sourceElement);

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        this.mediaLikes = document.createElement('p');
        this.mediaLikes.classList.add('media-likes');
        this.mediaLikes.innerHTML = `${this.likes} <i class="fa-regular fa-heart" tabindex="0" role="button" aria-label="like"></i>`;
        this.mediaLikes.addEventListener('click', () => this.toggleLike());
        this.mediaLikes.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.toggleLike();
            }
        });

        article.appendChild(videoElement);
        article.appendChild(mediaTextContainer);
        mediaTextContainer.appendChild(mediaTitle);
        mediaTextContainer.appendChild(this.mediaLikes);

        return { article, mediaElement: videoElement };
    }
}