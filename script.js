function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function loadingAnimation() {
    var h1 = document.querySelector("#loader h1");
    h1.textContent = "0";
    var count = 1;
    var int = setInterval(() => {
        h1.textContent = count;
        count++;

        if (count == 101) {
            clearInterval(int)
        }
    }, 10)

    var tl = gsap.timeline();

    tl.to("#loader", {
        y: "-100vh",
        // opacity: 0.3,
        duration: 1.3,
        ease: "power1.inOut",
        delay: 0.4,
    })
    tl.to("#loader", {
        display: "none"
    })
    // tl.from("#main", {
    //     opacity: 0
    // })

    tl.from("#page1-container h1", {
        y: 124,
        duration: 0.9
    })

    tl.from("#nav h4", {
        y: -42,
        duration: 0.5
    })

    gsap.from("#page1-img-container", {
        opacity: 0,
        delay: 3,
        duration: 1.3
    })

}


function gsapWithScroll() {

    gsap.to("#page1-img-container img", {
        scale: 1,
        scrollTrigger: {
            trigger: "#page1-img-container img",
            scroller: "#main",
            // markers: true,
            start: "top 50%",
            end: "top 25%",
            scrub: 2
        }
    })

    gsap.to("#page6-img img", {
        scale: 1.5,
        scrollTrigger: {
            trigger: "#page6-img img",
            scroller: "#main",
            // markers: true,
            start: "top 140%",
            end: "top 90%",
            scrub: 1
        }
    })
}

locomotiveAnimation();
loadingAnimation();

gsapWithScroll();