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
                    }
                });

                selectList.appendChild(hr);
                selectList.appendChild(listItem);
            }
        });
    };

    openFilterButton.addEventListener('click', () => {
        const expanded = selectContainer.classList.toggle('active');
        openFilterButton.setAttribute('aria-expanded', expanded);
        if (expanded) {
            buttonIcon.classList.remove('fa-chevron-down');
            buttonIcon.classList.add('fa-chevron-up');
            openFilterButton.style.borderRadius = '5px 5px 0 0';
        } else {
            buttonIcon.classList.remove('fa-chevron-up');
            buttonIcon.classList.add('fa-chevron-down');
            openFilterButton.style.borderRadius = '5px';
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

    mediaContainer.innerHTML = '';
    mediaElements.forEach(el => mediaContainer.appendChild(el));
}