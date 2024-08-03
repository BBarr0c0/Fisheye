import { updateTotalLikes } from '../pages/photographer.js'

// Factory class to create Media objects (ImageMedia or VideoMedia)
export class MediaFactory {
    constructor(media) {
        // Extracting properties from the media object
        const { photographerId, title, image, video, likes, date } = media;

        // Determining the media source and media type (image or video)
        const mediaSrc = image ? `assets/images/${photographerId}/${image}` : `assets/images/${photographerId}/${video}`;
        const mediaType = image ? 'image' : 'video';
        
        // Depending on the media type, return an instance of ImageMedia or VideoMedia
        switch (mediaType) {
            case 'image':
                return new ImageMedia(mediaSrc, title, likes, date);
            case 'video':
                return new VideoMedia(mediaSrc, title, likes, date);
        }
    }
}

// Class to manage images
class ImageMedia {
    constructor(path, title, likes, date) {
        this.path = path;
        this.title = title;
        this.likes = likes;
        this.liked = false;
        this.date = date;
    }

    // Method to toggle the like state
    toggleLike() {
        this.liked = !this.liked;
        this.likes += this.liked ? 1 : -1;
        this.updateLikesDisplay();
    }

    // Method to update the display of likes
    updateLikesDisplay() {
        const iconClass = this.liked ? 'fa-solid' : 'fa-regular';
        this.mediaLikes.innerHTML = `${this.likes} <span class="${iconClass} fa-heart"></span>`;
        updateTotalLikes();
    }

    // Method to create the HTML element of the image
    create() {
        const article = document.createElement('article');
        
        // Creation and configuration of the img element
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', this.path);
        imgElement.setAttribute('alt', this.title);
        imgElement.classList.add('image-media');

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        // Creation and configuration of the element for likes
        this.mediaLikes = document.createElement('p');
        this.mediaLikes.classList.add('media-likes');
        this.mediaLikes.innerHTML = `${this.likes} <span class="fa-regular fa-heart"></span>`;
        this.mediaLikes.setAttribute('aria-label', `${this.likes} like`);
        this.mediaLikes.setAttribute('tabindex', '0');
        this.mediaLikes.setAttribute('role', 'button');

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

// Class to manage video
class VideoMedia {
    constructor(path, title, likes, date) {
        this.path = path;
        this.title = title;
        this.likes = likes;
        this.liked = false;
        this.date = date;
    }

    // Method to toggle the like state
    toggleLike() {
        this.liked = !this.liked;
        this.likes += this.liked ? 1 : -1;
        this.updateLikesDisplay();
    }

    // Method to update the display of likes
    updateLikesDisplay() {
        const iconClass = this.liked ? 'fa-solid' : 'fa-regular';
        this.mediaLikes.innerHTML = `${this.likes} <span class="${iconClass} fa-heart"></span>`;
        updateTotalLikes();
    }

    // Method to create the HTML element of the video
    create() {
        const article = document.createElement('article');
        
        // Creation and configuration of the video element
        const videoElement = document.createElement('video');
        videoElement.setAttribute('controls', '');
        videoElement.classList.add('video-media');

        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', this.path);
        sourceElement.setAttribute('type', 'video/mp4');

        videoElement.appendChild(sourceElement);

        const mediaTextContainer = document.createElement('div');
        mediaTextContainer.classList.add('mediaTextContainer');

        const mediaTitle = document.createElement('h3');
        mediaTitle.textContent = this.title;

        // Creation and configuration of the element for likes
        this.mediaLikes = document.createElement('p');
        this.mediaLikes.classList.add('media-likes');
        this.mediaLikes.innerHTML = `${this.likes} <span class="fa-regular fa-heart"></span>`;
        this.mediaLikes.setAttribute('aria-label', `${this.likes} like`);
        this.mediaLikes.setAttribute('tabindex', '0');
        this.mediaLikes.setAttribute('role', 'button');

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