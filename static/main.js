let toggleDescriptionBtns = document.querySelectorAll('.link');
let details = document.querySelector(".details");


toggleDescriptionBtns.forEach((el) => {
    el.addEventListener('click', (event) => {
        let menuEl = event.target.nextElementSibling;

        if (menuEl.className == "details details-view") {
            menuEl.className = "details";
        } else {
            openEl(menuEl);
        }
    });
});

function closeEl(el) {
    el.className = "details";
}

function openEl(el) {
    let bounds = el.parentNode.getBoundingClientRect();

    let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let windowHieght = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let testHieght = windowHieght * 0.5;

    if (bounds.y > testHieght)
        el.style.bottom = "0px";

    el.className = "details details-view";
    el.focus();
}