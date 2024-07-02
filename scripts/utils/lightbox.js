
export function initLightbox() {
	const carouselModal = document.getElementById('carousel_modal');
	const carouselContainer = document.querySelector(
		'.carousel-container',
	);
	const closeBtn = document.querySelector('.carousel-close');
	const prevBtn = document.querySelector('.carousel-prev');
	const nextBtn = document.querySelector('.carousel-next');

	let currentIndex = 0;
	let mediaItems = [];
	let mediaTitles = [];

	function openCarousel(index) {
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
	}

	function closeCarousel() {
		carouselModal.classList.add('hidden');
	}

	function showNextMedia() {
		currentIndex = (currentIndex + 1) % mediaItems.length;
		openCarousel(currentIndex);
	}

	function showPrevMedia() {
		currentIndex =
			(currentIndex - 1 + mediaItems.length) %
			mediaItems.length;
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
			mediaItem.addEventListener('click', () => openCarousel(index));
            mediaItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') openCarousel(index);
            });
		},
	};
}
