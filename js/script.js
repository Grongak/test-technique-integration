//Menu burger en dessous de 700px

const bars = document.querySelector('.fa-bars');
console.log(bars);
const menu = document.querySelector('.navbar-mobile .modalMenu');
console.log(menu);
bars.addEventListener("click", () => {
    console.log("click");
    menu.classList.toggle('displayMenuMobile');
    bars.classList.toggle('fa-close');
    bars.classList.toggle('fa-bars');
});

//Chanement de couleur du bg du Header au scroll

const header = document.querySelector("header");
const windowHeight = window.innerHeight;

window.addEventListener("scroll", () => {
    const triggerHeight = windowHeight / 2;
    
    if (window.scrollY >= triggerHeight) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//Gestion des onglets avec ajouts et suppression de classe pour rendre visible
const tabButtons = document.querySelectorAll(".tablinks");
const tabContents = document.querySelectorAll(".tabcontent");
const resetTabs = () => {
    tabContents.forEach(tabContent => {
        tabContent.style.display = "none";
    });
    tabButtons.forEach(tabButton => {
        tabButton.classList.remove("active");
    });
};

for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", () => {
        resetTabs();
        tabContents[i].style.display = "flex";
        tabButtons[i].classList.add("active");
    });
}

// Sliders avec des éléments de contrôle (pouce, barre de défilement, étiquettes de valeur),
// gestionnaires d'événements pour le déplacement des thumbs
// mise à jour l'interface utilisateur en fonction des valeurs sélectionnées.

document.addEventListener("DOMContentLoaded", () => {
    const sliders = [
        {
            thumb: [document.querySelector('#thumb1'), document.querySelector('#thumb2')],
            sliderBar: document.querySelector('#sliderBar'),
            valueLabels: [document.querySelector('#valueLabel1'), document.querySelector('#valueLabel2')],
            slider: document.querySelector('#slider'),
            initialValue: [2000, 2023],
            minValue: 1995,
            maxValue: 2050
        },
        {
            thumb: [document.querySelector('#thumb3'), document.querySelector('#thumb4')],
            sliderBar: document.querySelector('#sliderBar2'),
            valueLabels: [document.querySelector('#valueLabel3'), document.querySelector('#valueLabel4')],
            slider: document.querySelector('#slider2'),
            initialValue: [200000, 1300000],
            minValue: 100000,
            maxValue: 2000000
        },
        {
            thumb: [document.querySelector('#thumb5'), document.querySelector('#thumb6')],
            sliderBar: document.querySelector('#sliderBar3'),
            valueLabels: [document.querySelector('#valueLabel5'), document.querySelector('#valueLabel6')],
            slider: document.querySelector('#slider3'),
            initialValue: [22000, 48000],
            minValue: 20000,
            maxValue: 80000
        }
    ];

    sliders.forEach(slider => {
        const [thumb1, thumb2] = slider.thumb;
        const [valueLabel1, valueLabel2] = slider.valueLabels;
        const sliderRect = slider.slider.getBoundingClientRect();

        let [value1, value2] = slider.initialValue;

        const updateValues = () => {
            valueLabel1.textContent = value1; // Update left thumb label
            valueLabel2.textContent = value2; // Update right thumb label
        };

        const updateThumbPosition = (thumb, value) => {
            const thumbPosition = (value - slider.minValue) / (slider.maxValue - slider.minValue) * (sliderRect.width - 20);
            thumb.style.left = `${thumbPosition}px`;
        };

        const updateSliderBar = () => {
            const thumb1Position = parseFloat(thumb1.style.left);
            const thumb2Position = parseFloat(thumb2.style.left);
            slider.sliderBar.style.left = thumb1Position + 'px';
            slider.sliderBar.style.width = (thumb2Position - thumb1Position) + 'px';
        };

        const moveThumb = (event, thumb, setValue) => {
            const mouseX = event.clientX - sliderRect.left;
            const percentage = mouseX / sliderRect.width;
            let newValue = Math.round(slider.minValue + percentage * (slider.maxValue - slider.minValue));

            if (newValue < slider.minValue) {
                newValue = slider.minValue;
            } else if (newValue > slider.maxValue) {
                newValue = slider.maxValue;
            }

            setValue(newValue);
            updateThumbPosition(thumb, newValue);
            updateValues();
            updateSliderBar();
        };

        const mousemove1 = (event) => {
            moveThumb(event, thumb1, (newValue) => {
                value1 = newValue;
                if (value1 > value2) value1 = value2;
            });
        };

        const mouseup1 = () => {
            document.removeEventListener('mousemove', mousemove1);
            document.removeEventListener('mouseup', mouseup1);
        };

        const mousemove2 = (event) => {
            moveThumb(event, thumb2, (newValue) => {
                value2 = newValue;
                if (value2 < value1) value2 = value1;
            });
        };

        const mouseup2 = () => {
            document.removeEventListener('mousemove', mousemove2);
            document.removeEventListener('mouseup', mouseup2);
        };

        thumb1.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', mousemove1);
            document.addEventListener('mouseup', mouseup1);
        });

        thumb2.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', mousemove2);
            document.addEventListener('mouseup', mouseup2);
        });

        // Update UI with initial values
        updateValues();
        updateThumbPosition(thumb1, value1);
        updateThumbPosition(thumb2, value2);
        updateSliderBar();
    });
});

// Incrémente les compteurs dans .counter-value à partir de 0 lorsque la section devient visible au scroll


const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterSpans = entry.target.querySelectorAll('.counter-value span');
            counterSpans.forEach(span => {
                const targetValue = parseInt(span.getAttribute('data-target'));
                const increment = Math.ceil(targetValue / 100);
                let currentValue = 0;
                const updateValue = () => {
                    if (currentValue <= targetValue) {
                        span.textContent = currentValue;
                        currentValue += increment;
                        requestAnimationFrame(updateValue);
                    } else {
                        span.textContent = targetValue;
                    }
                };
                updateValue();
            });
            counterObserver.unobserve(entry.target);
        }
    });
});

const counterSections = document.querySelectorAll('.counter-value');
counterSections.forEach(section => {
    counterObserver.observe(section);
});

// Gestion des boutons pour un carrousel :
// Lorsque le bouton précédent est cliqué, tous les sections (sliderSections) sont déplacées vers la gauche (0%).
// Lorsque le bouton suivant est cliqué, tous les sections sont déplacées vers la droite (-100%).

const prevBtns = document.querySelectorAll('.prevBtn');
const nextBtns = document.querySelectorAll('.nextBtn');
const sliderSections = document.querySelectorAll('.slide');

prevBtns.forEach(prevBtn => {
    prevBtn.addEventListener("click", () => {
        sliderSections.forEach(section => {
            section.style.transform = 'translateX(0%)';
        });
    });
});

nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener("click", () => {
        sliderSections.forEach((section) => {
            section.style.transform = `translateX(-100%)`;
        });
    });
});

