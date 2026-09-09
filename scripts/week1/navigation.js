// Store the selected elements that we are going to use.
const navButton = document.querySelector('#ham-btn');
const navLink = document.querySelector('#nav-bar');

// Toggle the show class off and onn
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLink.classList.toggle('show');
});