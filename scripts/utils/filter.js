document.addEventListener('DOMContentLoaded', () => {
    const options = ['Popularité', 'Date', 'Titre'];
    const openFilterButton = document.getElementById('open-filter');
    const selectContainer = document.querySelector('.select-container');
    const selectList = document.getElementById('select');
    const buttonText = openFilterButton.querySelector('span');
    const buttonIcon = openFilterButton.querySelector('.chevron');

    // Function to update the list of options
    const updateOptions = (selectedOption) => {
        selectList.innerHTML = '';
        options.forEach(option => {
            if (option !== selectedOption) {
                const listItem = document.createElement('li');
                listItem.textContent = option;
                listItem.setAttribute('role', 'option');
                listItem.setAttribute('tabindex', '0');

                const hr = document.createElement('hr');

                const selectOption = () => {
                    buttonText.textContent = option;
                    selectContainer.classList.remove('active');
                    openFilterButton.style.borderRadius = '5px';
                    updateOptions(option);
                    buttonIcon.classList.remove('fa-chevron-up');
                    buttonIcon.classList.add('fa-chevron-down');
                    openFilterButton.setAttribute('aria-expanded', 'false');
                    sortMedia(option);
                };

                listItem.addEventListener('click', selectOption);

                listItem.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        selectOption();
                    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        navigateOptions(e, listItem);
                    }
                });

                selectList.appendChild(hr);
                selectList.appendChild(listItem);
            }
        });

        // Ensure all items are tab accessible
        const items = selectList.querySelectorAll('li[role="option"]');
        items.forEach(item => item.setAttribute('tabindex', '0'));
    };

    const navigateOptions = (e, currentItem) => {
        e.preventDefault();
        let nextItem;
        const items = [openFilterButton, ...Array.from(selectList.querySelectorAll('li[role="option"]'))];
        const currentIndex = items.indexOf(currentItem);

        if (e.key === 'ArrowDown') {
            nextItem = items[(currentIndex + 1) % items.length];
        } else if (e.key === 'ArrowUp') {
            nextItem = items[(currentIndex - 1 + items.length) % items.length];
        }

        if (nextItem) {
            items.forEach(item => item.classList.remove('active'));
            nextItem.classList.add('active');
            nextItem.focus();
        }
    };

    openFilterButton.addEventListener('click', () => {
        const expanded = selectContainer.classList.toggle('active');
        openFilterButton.setAttribute('aria-expanded', expanded);
        if (expanded) {
            buttonIcon.classList.remove('fa-chevron-down');
            buttonIcon.classList.add('fa-chevron-up');
            openFilterButton.style.borderRadius = '5px 5px 0 0';
            // Focus on the first item in the list when expanded
            const firstItem = selectList.querySelector('li[role="option"]');
            if (firstItem) {
                firstItem.classList.add('active');
                firstItem.focus();
            }
        } else {
            buttonIcon.classList.remove('fa-chevron-up');
            buttonIcon.classList.add('fa-chevron-down');
            openFilterButton.style.borderRadius = '5px';
        }
    });

    openFilterButton.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            navigateOptions(e, openFilterButton);
        }
    });

    // Initialization with default option
    const defaultOption = options[0];
    buttonText.textContent = defaultOption;
    updateOptions(defaultOption);
    sortMedia(defaultOption);
});

export function sortMedia(option) {
    const mediaContainer = document.querySelector('.photograph-production');
    let mediaElements = Array.from(mediaContainer.children);

    switch(option) {
        case 'Popularité':
            mediaElements.sort((a, b) => {
                const likesA = parseInt(a.querySelector('.media-likes').textContent);
                const likesB = parseInt(b.querySelector('.media-likes').textContent);
                return likesB - likesA;
            });
            break;
        case 'Date':
            mediaElements.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateB - dateA;
            });
            break;
        case 'Titre':
            mediaElements.sort((a, b) => {
                const titleA = a.querySelector('h3').textContent.toLowerCase();
                const titleB = b.querySelector('h3').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            });
            break;
    }

    // Clear and re-append sorted media elements to the media container
    mediaContainer.innerHTML = '';
    mediaElements.forEach(el => mediaContainer.appendChild(el));

    // Update lightbox items order
    const lightbox = window.lightboxInstance;
    if (lightbox) {
        lightbox.updateOrder(mediaElements);
    }
}
