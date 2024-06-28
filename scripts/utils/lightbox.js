// lightbox.js
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

	function openCarousel(index) {
		currentIndex = index;
		const mediaItem = mediaItems[index];
		carouselContainer.innerHTML = ''; // Clear previous content
		const mediaElement = mediaItem.cloneNode(true);
		carouselContainer.appendChild(mediaElement);
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
		addMediaItem: (mediaItem) => {
			const index = mediaItems.length;
			mediaItems.push(mediaItem);
			mediaItem.addEventListener('click', () =>
				openCarousel(index),
			);
		},
	};
}
