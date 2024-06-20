const modal = document.getElementById("contact_modal");
const modalTitle = document.getElementById("modal_title");
const firstFocusableElement = modal.querySelector('input:first-child');
const lastFocusableElement = modal.querySelector('button');
const contactButton = document.querySelector('.contact_button');
const contactClose = document.querySelector('.close-contact');
const formContact = document.querySelector('.form-contact');

contactButton.addEventListener('click', displayModal);

function displayModal() {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.focus();
    document.addEventListener('keydown', trapTabKey);
}

contactClose.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapTabKey);
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
    closeModal();
}