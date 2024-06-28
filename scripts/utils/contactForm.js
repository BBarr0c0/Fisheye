const modal = document.getElementById("contact_modal");
const modalTitle = document.getElementById("modal_title");
const firstFocusableElement = modal.querySelector('input:first-child');
const lastFocusableElement = modal.querySelector('button');
const contactButton = document.querySelector('.contact_button');
const contactClose = document.querySelector('.close-contact');
const formContact = document.querySelector('.form-contact');

const successModal = document.getElementById("success_modal");
const successCloseButtons = document.querySelectorAll('.close-success');

let formSubmitted = false;

contactButton.addEventListener('click', displayModal);

function displayModal() {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.focus();
    modalTitle.focus();
    document.addEventListener('keydown', handleKeydown);
}

contactClose.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);

    if (!formSubmitted) {
        contactButton.focus();
    }
}

function handleKeydown(event) {
    if (event.key === 'Tab') {
        trapTabKey(event);
    } else if (event.key === 'Escape') {
        if (!successModal.classList.contains('success_hidden')) {
            closeSuccessModal();
        } else {
            closeModal();
        }
    }
}

function trapTabKey(event) {
    if (event.key === 'Tab') {
        if (document.activeElement === lastFocusableElement && !event.shiftKey) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
        if (document.activeElement === firstFocusableElement && event.shiftKey) {
            event.preventDefault();
            lastFocusableElement.focus();
        }
    }
}

formContact.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Données du formulaire :', data);

    // Display the confirmation message
    formSubmitted = true;
    closeModal();
    displaySuccessModal();
}

function displaySuccessModal() {
    successModal.classList.remove('success_hidden');
    successModal.setAttribute('aria-hidden', 'false');
    successModal.setAttribute('tabindex', '-1');
    successModal.focus();
    document.addEventListener('keydown', handleKeydown);
}

successCloseButtons.forEach(button => {
    button.addEventListener('click', closeSuccessModal);
});

function closeSuccessModal() {
    successModal.classList.add('success_hidden');
    successModal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    contactButton.focus();
}