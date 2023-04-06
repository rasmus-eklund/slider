const slides = document.getElementsByClassName('slide');
const arrows = document.querySelectorAll('.arrow');
const slider = document.querySelector('#slider');
const dots = document.querySelectorAll('.dots div')
const stepper = makeStepper(5, slider);

setInterval(stepper.right, 5000);

const colors = ['green', 'red', 'blue', 'yellow', 'brown'];
for (let i = 0; i < slides.length; i++) {
    slides[i].style.backgroundColor = colors[i];
    slides[i].childNodes[0].textContent = colors[i];
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', arrow.classList[1] === 'left' ? stepper.left : stepper.right)
});

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        stepper.goTo(-i);
        stepper.setPosition(-i);
        setSelected(i);
    });
}

function getOneStep() {
    let position = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--slide-width')
        .split('px')[0]);
    return position
}

function setSelected(selected) {
    dots.forEach(i => i.classList.remove('selected'));
    dots[selected].classList.add('selected');
    
}

function makeStepper(numberOfSlides, element) {
    let position = 0;
    const oneStep = getOneStep();
    const goTo = (position) => {
        element.style.transform = 'translateX(' + position * oneStep + 'px)';
        dots[position]
    };
    const left = () => {
        position++;
        if (position > 0) position = -(numberOfSlides - 1);
        goTo(position);
        setSelected(-position);
    }
    const right = () => {
        position--;
        if (position < -4) position = 0;
        goTo(position);
        setSelected(-position);
    }
    const setPosition = (i) => position = i;
    return {
        left,
        right,
        setPosition,
        goTo,
    }
}
