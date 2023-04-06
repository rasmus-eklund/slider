const slides = document.getElementsByClassName('slide');
const arrows = document.querySelectorAll('.arrow');
const slider = document.querySelector('#slider');

const stepper = makeStepper(5);

const colors = ['green', 'red', 'blue', 'yellow', 'brown'];
for (let i = 0; i < slides.length; i++) {
    slides[i].style.backgroundColor = colors[i];
    slides[i].childNodes[0].textContent = colors[i];
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', arrow.classList[1] === 'left' ? () => stepper.left(slider) : () => stepper.right(slider))
});

function getOneStep() {
    let position = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--slide-width')
        .split('px')[0]);
    let gap = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--slide-gap')
        .split('px')[0]);
    return position + gap
}

function makeStepper(numberOfSlides) {
    let counter = 0;
    const oneStep = getOneStep();
    const makeOneStep = (element) => element.style.transform = 'translateX(' + oneStep * counter + 'px)';
    return {
        left: (element) => {
            counter++;
            if (counter > 0) counter = -(numberOfSlides - 1);
            makeOneStep(element);
        },
        right: (element) => {
            counter--;
            if (counter < -4) counter = 0;
            makeOneStep(element);
        },
    }
}
