// ПОКАЗАТЬ ИЗОБРАЖЕНИЯ (УБРАТЬ ЗЕЛЕНЫЙ СЛАЙД)

function showHiddenImgs() {

    let allHiddenImgs = document.querySelectorAll('.hide-img');
    let options = {
        rootMargin: '0px 0px 0px 0px',
    };

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-img');
            }
        })
    };
    let observer = new IntersectionObserver(callback, options);
    allHiddenImgs.forEach(img => observer.observe(img));
}

showHiddenImgs();






// BURGER

function setBurger() {

    let burger = document.getElementById('burger');
    let burgerLines = burger.querySelectorAll('div');
    let navMenu = document.getElementById('nav-menu');


    function showNavMenu() {
        navMenu.classList.toggle('show-nav-menu');
        burgerLines[0].classList.toggle('burger-open-line-first');
        burgerLines[1].classList.toggle('burger-open-line-second');
        burgerLines[2].classList.toggle('burger-open-line-third');
    }

    burger.addEventListener('click', showNavMenu);
}

setBurger();







// ВЫЗВАТЬ ФУНКЦИИ В ЗАВИСИМОСТИ ОТ ОТКРЫТОЙ СТРАНИЦЫ

function setFunctions() {

    let page = document.querySelector('.wrapper');
    let pageId = page.getAttribute('id');

    if (pageId === 'index') {
        setSlider();
        showCloseViewer(document.getElementById('products'));
    } else if (pageId === 'treatments') {
        showCloseViewer(document.getElementById('treatments-container'));
    } else if (pageId === 'shop') {
        setChooseCategory();
        showCloseViewer(document.getElementById('shop-container'));
    } else if (pageId === 'contact') {
        setFAQ();
    }
}

setFunctions();





// products caurosel


function setSlider() {

    let arrowRight = document.getElementById('products-arrow-right');
    let arrowLeft = document.getElementById('products-arrow-left');
    let slider = document.getElementById('products-container');
    let productItem = document.querySelector('.products-item');
    let productMargin = parseInt(getComputedStyle(productItem).marginRight);
    let productItemWidth = -(productItem.offsetWidth + productMargin);
    let translateItemProductWidth = 0;




    function moveSlider(direction) {
        if (direction === 'right' && translateItemProductWidth >= productItemWidth * 3) {
            translateItemProductWidth += productItemWidth;
            slider.style.transform = 'translateX(' + translateItemProductWidth + 'px)';
        } else if (direction === 'left' && translateItemProductWidth < 0) {
            translateItemProductWidth -= productItemWidth;
            slider.style.transform = 'translateX(' + translateItemProductWidth + 'px)';
        }
    }

    arrowRight.addEventListener('click', () => moveSlider('right'));
    arrowLeft.addEventListener('click', () => moveSlider('left'));
}







function showCloseViewer(container) {

    let viewer = container.querySelector('.viewer');
    let view = viewer.querySelector('.view');


    function showViewer(e) {
        let item = e.target.closest('.item');
        if (!item) return;
        viewer.classList.add('show-viewer');
        view.classList.add('show-view-window');
        insertContent(view, item);
    }


    function closeViewer(e) {
        if (e.target.classList.contains('cross') || !e.target.closest('.view')) {
            viewer.classList.remove('show-viewer');
            view.classList.remove('show-view-window');
        }
    }

    function insertContent(view, item) {

        let itemElements = item.querySelectorAll('.window-content');
        let viewElements = view.querySelectorAll('.window-content-target');

        itemElements.forEach((item, index) => viewElements[index].textContent = item.textContent);
    }

    container.addEventListener('click', showViewer);
    viewer.addEventListener('click', closeViewer);
}








// SHOP LI CLICK


function setChooseCategory() {

    let shopCategories = document.querySelector('#shop-container-wrapper > ul');

    function switchCategory(e) {

        let clickedElement = e.target;

        if (clickedElement.nodeName === 'LI') {

            if (clickedElement.classList.contains('category-product-active')) return;

            shopCategories.querySelector('.category-product-active').classList.remove('category-product-active');
            clickedElement.classList.add('category-product-active');

            let activeCategoryItems = document.querySelectorAll('.active');
            let choosenCategoryItems = document.querySelectorAll(`.shop-item-${e.target.id}`);

            activeCategoryItems.forEach((item) => {
                item.classList.remove('active')
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            });


            choosenCategoryItems.forEach((item) => {
                setTimeout(() => {
                    item.classList.add('active');
                    item.style.display = 'block';

                }, 600);
            });
        }
    }
    shopCategories.addEventListener('click', switchCategory);
}





// faq


function setFAQ() {

    let faqContainer = document.querySelector('#faq-container');

    function openCloseFAQ(e) {

        let faqItem = e.target.closest('.faq-item');

        faqItem.classList.toggle('faq-add-height');
        faqItem.querySelector('p').classList.toggle('faq-show-answer');
        faqItem.querySelector('span').classList.toggle('faq-rotate-arrow');
    }

    faqContainer.addEventListener('click', openCloseFAQ);
}
