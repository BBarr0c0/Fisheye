
export function initLightbox() {
	const carouselModal = document.getElementById('carousel_modal');
	const carouselContainer = document.querySelector('.carousel-container');
	const closeBtn = document.querySelector('.carousel-close');
	const prevBtn = document.querySelector('.carousel-prev');
	const nextBtn = document.querySelector('.carousel-next');

	let currentIndex = 0;
	let mediaItems = [];
	let mediaTitles = [];

	// Variable to store the element that triggered the lightbox
	let triggerElement = null;

	function openCarousel(index) {

		triggerElement = document.activeElement; // Store the element that triggered the lightbox

		currentIndex = index;
		const mediaItem = mediaItems[index];
		const mediaTitle = mediaTitles[index];
		carouselContainer.innerHTML = ''; // Clear previous content

		const mediaElement = mediaItem.cloneNode(true);
		const titleElement = document.createElement('h3');
		titleElement.textContent = mediaTitle;

		carouselContainer.appendChild(mediaElement);
		carouselContainer.appendChild(titleElement);
		carouselModal.classList.remove('hidden');

		closeBtn.focus(); // Set focus on the close button when lightbox is opened
	}

	function closeCarousel() {
		carouselModal.classList.add('hidden');

		if (triggerElement) {
			triggerElement.focus(); // Return focus to the element that triggered the lightbox
		}
	}

	function showNextMedia() {
		currentIndex = (currentIndex + 1) % mediaItems.length;
		openCarousel(currentIndex);
	}

	function showPrevMedia() {
		currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
		openCarousel(currentIndex);
	}

	closeBtn.addEventListener('click', closeCarousel);
	nextBtn.addEventListener('click', showNextMedia);
	prevBtn.addEventListener('click', showPrevMedia);
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeCarousel();
		if (e.key === 'ArrowRight') showNextMedia();
		if (e.key === 'ArrowLeft') showPrevMedia();
	});

	return {
		addMediaItem: (mediaItem, mediaTitle) => {
			const index = mediaItems.length;
			mediaItems.push(mediaItem);
			mediaTitles.push(mediaTitle);
			mediaItem.setAttribute('data-index', index);
			mediaItem.addEventListener('click', (e) => openCarousel(parseInt(e.currentTarget.getAttribute('data-index'))));
            mediaItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
					e.preventDefault();
					openCarousel(parseInt(e.currentTarget.getAttribute('data-index')));
				}
            });
		},
		updateOrder: (sortedMediaElements) => {
            const sortedMediaItems = [];
            const sortedMediaTitles = [];

            sortedMediaElements.forEach((element) => {
                const index = mediaItems.findIndex(item => item.isEqualNode(element.querySelector('.image-media')) || item.isEqualNode(element.querySelector('.video-media')));
                if (index !== -1) {
                    sortedMediaItems.push(mediaItems[index]);
                    sortedMediaTitles.push(mediaTitles[index]);
                }
            });

            mediaItems = sortedMediaItems;
            mediaTitles = sortedMediaTitles;

            // Update data-index for new order
            mediaItems.forEach((item, index) => {
                item.setAttribute('data-index', index);
            });
        },
    };
}

// Save the lightbox instance globally to access in filter.js
window.lightboxInstance = initLightbox();
