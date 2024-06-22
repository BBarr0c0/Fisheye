document.addEventListener('DOMContentLoaded', () => {
    const options = ['Popularité', 'Date', 'Titre'];
    const openFilterButton = document.getElementById('open-filter');
    const selectContainer = document.querySelector('.select-container');
    const selectList = document.getElementById('select');
    const buttonText = openFilterButton.querySelector('span');
    const buttonIcon = openFilterButton.querySelector('.chevron');

    // Fonction pour mettre à jour la liste des options
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

    updateOptions(options[0]);
});