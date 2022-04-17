const $main = document.querySelector('#main');
const $sections = Array.from(document.querySelectorAll('[scroll-spy]'));
const $navLi = Array.from(
    document.querySelectorAll("nav[role='navigation'] .menu-list > *")
);

/**
 * Observer
 */
window.onload = () => {
    const ratio = 0.8;
    let observer = null;

    const activateCurrentNav = (el) => {
        const id = el.getAttribute('id');
        $navLi.forEach((li) => li.firstChild.removeAttribute('aria-current'));
        document
            .querySelector(`a[href="/#${id === 'top' ? '' : id}"]`)
            .setAttribute('aria-current', 'page');
    };

    // Observer parameters
    const handleIntersect = entries => {
        entries.forEach((entry) => {
            // entry.intersectionRatio > 0
            if (entry.isIntersecting) activateCurrentNav(entry.target);
        });
    };

    const observe = (sections) => {
        if (observer !== null) sections.forEach((section) => observer.unobserve(section));

        const y = Math.round(window.innerHeight * ratio);
        const options = {
            // root: null,
            rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`,
            threshold: 0,
        };

        // Observer init
        observer = new IntersectionObserver(handleIntersect, options);
        sections.forEach((section) => observer.observe(section));
    };

    const debounce = (callback, delay) => {
        let timer;
        return function () {
            const args = arguments;
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, delay);
        };
    };

    let windowH = window.innerHeight;

    observe($sections);
    window.onresize = debounce(() => {
        if (window.innerHeight !== windowH) {
            observe($sections);
            windowH = window.innerHeight;
        }
    }, 500);
};

const $scroll = document.querySelector('#scroll');
const $footer = document.querySelector('#footer');
const footerObserver = new IntersectionObserver(
    entries => entries.forEach((entry) => $scroll.style.display = entry.isIntersecting ? 'none' : 'block')
);

footerObserver.observe($footer);


/**
 * Scroll to top
 */
const scrollToTop = () => {
    $main.scrollTo(0, 0);
}