// Retrieves the DOM elements necessary for managing the contact form
const modal = document.getElementById("contact_modal");
const contactButton = document.querySelector('.contact_button');
const contactClose = document.querySelector('.close-contact');
const formContact = document.querySelector('.form-contact');

const successModal = document.getElementById("success_modal");
const successCloseButtons = document.querySelectorAll('.close-success');
const successMessage = document.getElementById("success_message");

let formSubmitted = false;

// Add an event to display the contact modal when the contact button is clicked
contactButton.addEventListener('click', displayModal);

// Function to display the contact modal and manage accessibility
function displayModal() {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.focus();

    // Select focusable elements after displaying the modal
    const firstFocusableElement = modal.querySelector('input, button, textarea, select');
    const focusableElements = modal.querySelectorAll('input, button, textarea, select');
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    document.addEventListener('keydown', (event) => handleKeydown(event, firstFocusableElement, lastFocusableElement));
}

// Add an event to close the contact modal when the close button is clicked
contactClose.addEventListener('click', closeModal);

contactClose.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        closeModal();
    }
});

// Function to close the contact modal and restore accessibility
function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);

    // If the form has not been submitted, return the focus to the contact button
    if (!formSubmitted) {
        contactButton.focus();
    }
}

// Manage keyboard interactions for the contact modal
function handleKeydown(event, firstFocusableElement, lastFocusableElement) {
    if (event.key === 'Tab') {
        trapTabKey(event, firstFocusableElement, lastFocusableElement);
    } else if (event.key === 'Escape') {
        // Close the success modal if it is open
        if (!successModal.classList.contains('success_hidden')) {
            closeSuccessModal();
        } else {
            closeModal();
        }
    }
}

// Function to trap the Tab key and manage cyclical focus in the modal
function trapTabKey(event, firstFocusableElement, lastFocusableElement) {
    if (event.key === 'Tab') {
        // Returns focus to the first element if Tab is pressed on the last element
        if (document.activeElement === lastFocusableElement && !event.shiftKey) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
        // Returns focus to the last element if Shift + Tab is pressed on the first element
        if (document.activeElement === firstFocusableElement && event.shiftKey) {
            event.preventDefault();
            lastFocusableElement.focus();
        }
    }
}

formContact.addEventListener('submit', submitForm);

// Function to manage form submission
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

// Function to display the success modal and manage accessibility
function displaySuccessModal() {
    successModal.classList.remove('success_hidden');
    successModal.setAttribute('aria-hidden', 'false');
    successModal.setAttribute('tabindex', '-1');
    successMessage.focus();
    document.addEventListener('keydown', handleKeydown);
}

// Add events to close the success modal when close buttons are clicked
successCloseButtons.forEach(button => {
    button.addEventListener('click', closeSuccessModal);
});

// Function to close the success modal and restore accessibility
function closeSuccessModal() {
    successModal.classList.add('success_hidden');
    successModal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    contactButton.focus();
}