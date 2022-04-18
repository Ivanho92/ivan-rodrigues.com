// Script related to the nav menu states
const hamburgerSVG =
    'M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z';
const closeSVG =
    'M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z';

const $hamburgerBtn = document.querySelector('#hamburger');
const $hamburgerIcon = document.querySelector('.hamburger-icon');
const $hamburgerContainer = document.querySelector('.hamburger-container');
const $nav = document.querySelector('nav[role="navigation"]');
const $menu = document.querySelector('.menu-list');

const $form = document.querySelector('#contact-form');

const openMenu = () => {
    $hamburgerIcon.setAttribute('opened', '');

    $menu.classList.add('show');
    $hamburgerContainer.classList.add('show');
    $nav.classList.add('show');
};
const closeMenu = () => {
    $hamburgerIcon.removeAttribute('opened');

    $menu.classList.remove('show');
    $hamburgerContainer.classList.remove('show');
    $nav.classList.remove('show');
};
const toggleIcon = () => {
    $hamburgerIcon.firstElementChild.firstElementChild.setAttribute(
        'd',
        $hamburgerIcon.hasAttribute('opened') ? closeSVG : hamburgerSVG
    );
};

$hamburgerBtn.addEventListener('click', () => {
    if ($hamburgerIcon.hasAttribute('opened')) closeMenu();
    else openMenu();
    toggleIcon();
});

$menu.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('menu-el') ||
        e.target.firstChild.classList.contains('menu-el')
    ) {
        closeMenu();
        toggleIcon();
    }
});

// Back button on individual project page
const $goBackBtn = document.querySelector('#go-back') || null;
if ($goBackBtn)
    $goBackBtn.addEventListener('click', () => {
        if (
            document.referrer.includes('localhost') ||
            document.referrer.includes('ivan-rodrigues')
        ) return history.back();
        
        window.location.href = '/';
    });
