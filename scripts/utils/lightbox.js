// Main function to initialize the lightbox
function initLightbox() {
	// Selection of the DOM elements necessary for the lightbox to function
	const carouselModal = document.getElementById('carousel_modal');
	const carouselContainer = document.querySelector('.carousel-container');
	const closeBtn = document.querySelector('.carousel-close');
	const prevBtn = document.querySelector('.carousel-prev');
	const nextBtn = document.querySelector('.carousel-next');

	// Initialize current index and arrays to store media items and their titles
	let currentIndex = 0;
	let mediaItems = [];
	let mediaTitles = [];

	// Variable to store the element that triggered the lightbox
	let triggerElement = null;

	// Function to open the carousel at a specific index
	function openCarousel(index) {

		if (!triggerElement) {
			// Store the active element that triggered the lightbox to open
			triggerElement = document.activeElement;
		}

		currentIndex = index;
		const mediaItem = mediaItems[index];
		const mediaTitle = mediaTitles[index];
		carouselContainer.innerHTML = ''; // Clear previous content

		// Clone the selected media element and create a title element
		const mediaElement = mediaItem.cloneNode(true);
		mediaElement.removeAttribute('role');
		const titleElement = document.createElement('h3');
		titleElement.textContent = mediaTitle;
		titleElement.setAttribute('id', `media-title-${index}`);
        titleElement.setAttribute('aria-label', `Titre du média : ${mediaTitle}`);

		mediaElement.setAttribute('tabindex', '0');
        mediaElement.setAttribute('aria-describedby', `media-title-${index}`);

		carouselContainer.appendChild(mediaElement);
		carouselContainer.appendChild(titleElement);
		carouselModal.classList.remove('hidden');
		carouselModal.setAttribute('aria-hidden', 'false');
        carouselModal.setAttribute('tabindex', '0');
		carouselModal.setAttribute('aria-modal', 'true');

		// Put the focus on the close button when the lightbox is open
		closeBtn.focus();
	}

	// Function to close the carousel
	function closeCarousel() {
		carouselModal.classList.add('hidden');
		carouselModal.setAttribute('aria-hidden', 'true');
        carouselModal.setAttribute('tabindex', '-1');
		carouselModal.removeAttribute('aria-modal');

		// Return focus to the element that triggered the lightbox
		if (triggerElement) {
			triggerElement.focus();
			triggerElement = null;
		}
	}

	// Function to display the next media
	function showNextMedia() {
		currentIndex = (currentIndex + 1) % mediaItems.length;
		openCarousel(currentIndex);
		nextBtn.focus();
	}

	// Function to display previous media
	function showPrevMedia() {
		currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
		openCarousel(currentIndex);
		prevBtn.focus();
	}

	// Added click events for close, next and previous buttons
	closeBtn.addEventListener('click', closeCarousel);
	nextBtn.addEventListener('click', showNextMedia);
	prevBtn.addEventListener('click', showPrevMedia);

	// Added keyboard events to handle the Escape, Right Arrow and Left Arrow keys
	document.addEventListener('keydown', (e) => {
        if (!carouselModal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeCarousel();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                showNextMedia();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                showPrevMedia();
            }
        }
    });

	return {
		// Function to add a media element and its title to the lightbox
		addMediaItem: (mediaItem, mediaTitle) => {
			const index = mediaItems.length;
			mediaItems.push(mediaItem);
			mediaTitles.push(mediaTitle);
			mediaItem.setAttribute('data-index', index);
            mediaItem.setAttribute('tabindex', '0');
            mediaItem.setAttribute('aria-label', `${mediaTitle}`);
			
			// Added click and keyboard events to open the carousel when the element is activated
			mediaItem.addEventListener('click', (e) => openCarousel(parseInt(e.currentTarget.getAttribute('data-index'))));
            mediaItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
					e.preventDefault();
					openCarousel(parseInt(e.currentTarget.getAttribute('data-index')));
				}
            });
		},
		// Function to update the order of media elements after a sort
		updateOrder: (sortedMediaElements) => {
            const sortedMediaItems = [];
            const sortedMediaTitles = [];

			// Updates the mediaItems and mediaTitles arrays based on the new order
            sortedMediaElements.forEach((element) => {
                const index = mediaItems.findIndex(item => item.isEqualNode(element.querySelector('.image-media')) || item.isEqualNode(element.querySelector('.video-media')));
                if (index !== -1) {
                    sortedMediaItems.push(mediaItems[index]);
                    sortedMediaTitles.push(mediaTitles[index]);
                }
            });

            mediaItems = sortedMediaItems;
            mediaTitles = sortedMediaTitles;

            // Updates the data-index attribute of media elements to reflect the new order
            mediaItems.forEach((item, index) => {
                item.setAttribute('data-index', index);
            });
        },
    };
}

// Save the lightbox instance globally to access in filter.js
window.lightboxInstance = initLightbox();
