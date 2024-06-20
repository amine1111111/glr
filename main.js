// let url = "https://api.adviceslip.com/advice";


// async function getData(){
//   let response = await fetch(url)
//   console.log(response.headers)

// }

// getData()

























































// gsap.registerPlugin(ScrollTrigger);

// window.addEventListener("load", () => {
//     let slides = gsap.utils.toArray(".slide");
//     let activeSlideImages = gsap.utils.toArray(".active-slide img");

//     function getInitialTranslateZ(slide) {
//         let style = window.getComputedStyle(slide);
//         let matrix = style.transform.match(/matrix3d\((.+)\)/);
//         if (matrix) {
//             let values = matrix[1].split(", ");
//             return parseFloat(values[14]) || 0;
//         }
//         return 0;
//     }

//     function mapRange(value, inMin, inMax, outMin, outMax) {
//         return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
//     }

//     slides.forEach((slide, i) => {
//         let initialZ = getInitialTranslateZ(slide);

//         ScrollTrigger.create({
//             trigger: ".container-fluid",
//             start: "top top",
//             end: "bottom bottom",
//             scrub: true,
//             onUpdate: (self) => {
//                 let progress = self.progress;
//                 let zIncrement = progress * 22500;
//                 let currentZ = initialZ + zIncrement;
//                 let opacity;

//                 if (currentZ > -2500) {
//                     opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
//                 } else {
//                     opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
//                 }

//                 slide.style.opacity = opacity;
//                 slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

//                 if (currentZ < 100) {
//                     gsap.to(activeSlideImages[i], {
//                         opacity: 1,
//                         ease: "power3.out",
//                         duration: 1.5,
//                     });
//                 } else {
//                     gsap.to(activeSlideImages[i], {
//                         opacity: 0,
//                         ease: "power3.out",
//                         duration: 1.5,
//                     });
//                 }
//             }
//         });
//     });
// });







document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const activeSlideImages = document.querySelectorAll(".active-slide img");

    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(", ");
            return parseFloat(values[14]) || 0;
        }
        return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    const initialZValues = Array.from(slides).map(slide => getInitialTranslateZ(slide));

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = scrollPosition / maxScroll;

        slides.forEach((slide, i) => {
            const initialZ = initialZValues[i];
            const zIncrement = progress * 22500;
            const currentZ = initialZ + zIncrement;
            let opacity;

            if (currentZ > -22500 && currentZ <= 0) {
                opacity = mapRange(currentZ, -22500, 0, 0, 1);
            } else if (currentZ > 0) {
                opacity = 1;
            } else {
                opacity = 0;
            }

            slide.style.opacity = opacity;
            slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

            if (currentZ < 100) {
                activeSlideImages[i].style.opacity = 1;
                activeSlideImages[i].style.transition = "opacity 1.5s ease-out";
            } else {
                activeSlideImages[i].style.opacity = 0;
                activeSlideImages[i].style.transition = "opacity 1.5s ease-out";
            }
        });
    });
});
