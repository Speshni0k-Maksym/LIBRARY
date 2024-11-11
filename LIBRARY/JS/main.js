const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu_box");
let isMenuVisible = false;

burger.addEventListener('click', () => {
    if (isMenuVisible) {
        menu.classList.remove('b_s');
        menu.classList.add('b_h');
        menu.addEventListener('animationend', () => {
            if (!isMenuVisible) {
                menu.classList.remove('show');
            }
        })
    } else {
        menu.classList.remove('b_h');
        menu.classList.add('b_s');
        menu.classList.add('show');
    }
    isMenuVisible = !isMenuVisible;
});
