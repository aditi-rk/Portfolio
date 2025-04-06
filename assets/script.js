//preloader 
document.addEventListener("DOMContentLoaded", function () {
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = j;
            counter3.appendChild(div);
        }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    const loadingScreen = document.querySelector(".loading-screen");

    // Show preloader animation every time the page is loaded
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        delay: 7.5,
        ease: "power1.inOut",
    });

   

    // Set the flag in localStorage (optional, if you want to keep track)
    localStorage.setItem("preloaderShown", "true");

    const runAnimations = () => {
        animate(counter3, 5);
        animate(document.querySelector(".counter-2"), 6);
        animate(document.querySelector(".counter-1"), 2, 4);

        gsap.to(".digit", {
            top: "-150px",
            stagger: {
                amount: 0.25,
            },
            delay: 6,
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.from(".loader-1", {
            width: 0,
            duration: 6,
            ease: "power2.inOut",
        });

        gsap.from(".loader-2", {
            width: 0,
            duration: 6,
            ease: "power2.inOut",
        });

        gsap.to(".loader", {
            background: "none",
            delay: 6,
            duration: 0.1,
        });

        gsap.to(".loader-1", {
            rotate: 90,
            y: -50,
            duration: 0.5,
            delay: 6,
        });

        gsap.to(".loader-2", {
            x: -75,
            y: 75,
            duration: 0.5,
        }, "<");

        gsap.to(".loader", {
            scale: 40,
            duration: 1,
            delay: 7,
            ease: "power2.inOut",
        });

        gsap.to(".loader", {
            rotate: 45,
            y: 500,
            x: 2000,
            duration: 1,
            delay: 7,
            ease: "power2.inOut",
        });
    };

    // Check if animations have already run
    if (!window.animationExecuted) {
        runAnimations(); // Call the animation function
        window.animationExecuted = true; // Set the flag to true
    }
});

function animate(counter, duration, delay = 0) {
    const numHeight = counter.querySelector(".num").clientHeight;
    const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;

    gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
    });
}



//navigation-bar

let elements = document.querySelectorAll(".rolling-text");

elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
        let span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));

    });

elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.classList.remove("play");
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navigation-bar .nav a');
  const transitionOverlay = document.createElement('div');
  transitionOverlay.classList.add('navigation-transition-overlay');
  document.body.appendChild(transitionOverlay);

  // Create symmetrical overlay boxes
  const boxCount = 6;
  const overlayBoxes = [];

  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement('div');
    box.classList.add('transition-box');
    transitionOverlay.appendChild(box);
    overlayBoxes.push(box);
  }

  // Create white accent element
  const whiteAccent = document.createElement('div');
  whiteAccent.classList.add('white-accent');
  transitionOverlay.appendChild(whiteAccent);

  // Create section name element
  const sectionNameElement = document.createElement('div');
  sectionNameElement.classList.add('section-name');
  transitionOverlay.appendChild(sectionNameElement);

  // Create style for transition
  const style = document.createElement('style');
  style.textContent = `
    .navigation-transition-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.6s ease;
      background-color: #000;
      overflow: hidden;
    }

    .navigation-transition-overlay .section-name {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.7);
      color: white;
      font-size: 8vw;
      font-weight: bold;
      opacity: 0;
      text-transform: uppercase;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .navigation-transition-overlay.active .section-name {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .navigation-transition-overlay .white-accent {
      position: absolute;
      width: 200%;
      height: 50px;
      background-color: white;
      transform: rotate(-90deg) scaleX(0);
      transform-origin: center;
      transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
      opacity: 0.7;
    }

    .navigation-transition-overlay .transition-box {
      position: absolute;
      width: 16.666%;
      height: 100%;
      background-color: transparent;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .navigation-transition-overlay .transition-box:nth-child(1) { left: 0%; transform-origin: left; }
    .navigation-transition-overlay .transition-box:nth-child(2) { left: 16.666%; transform-origin: right; }
    .navigation-transition-overlay .transition-box:nth-child(3) { left: 33.332%; transform-origin: left; }
    .navigation-transition-overlay .transition-box:nth-child(4) { left: 49.998%; transform-origin: right; }
    .navigation-transition-overlay .transition-box:nth-child(5) { left: 66.664%; transform-origin: left; }
    .navigation-transition-overlay .transition-box:nth-child(6) { left: 83.33%; transform-origin: right; }

    .navigation-transition-overlay.active {
      opacity: 1;
      pointer-events: all;
    }

    .navigation-transition-overlay.active .white-accent {
      transform: rotate(0deg) scaleX(1);
    }

    .navigation-transition-overlay.active .transition-box:nth-child(odd) {
      transform: scaleX(1);
      transform-origin: left;
    }

    .navigation-transition-overlay.active .transition-box:nth-child(even) {
      transform: scaleX(1);
      transform-origin: right;
    }

    .navigation-transition-overlay.reverse .white-accent {
      transform: rotate(0deg) scaleX(0);
    }

    .navigation-transition-overlay.reverse .transition-box:nth-child(odd) {
      transform: scaleX(0);
      transform-origin: right;
    }

    .navigation-transition-overlay.reverse .transition-box:nth-child(even) {
      transform: scaleX(0);
      transform-origin: left;
    }

    .navigation-transition-overlay.reverse .section-name {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.7);
    }
  `;
  document.head.appendChild(style);

  // Function to handle navigation and transition
  function handleNavigation(link) {
    const targetSectionId = link.getAttribute('href').substring(1);
    
    // Update section name with the ID name (removing the # symbol)
    sectionNameElement.textContent = targetSectionId.toUpperCase();

    // Animate transition overlay
    transitionOverlay.classList.add('active');

    // Stagger the boxes scaling up with symmetry
    overlayBoxes.forEach((box, index) => {
        box.style.transitionDelay = `${Math.abs(3 - index) * 0.1}s`;
    });

    // Hide scrolling by adding overlay
    document.body.style.overflow = 'hidden';

    // Scroll to section after full overlay
    setTimeout(() => {
        if (targetSectionId === 'ARK') {
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
            const targetSection = document.getElementById(targetSectionId);
            targetSection.scrollIntoView({ behavior: 'auto' });
        }
        
        // Remove overlay 
        setTimeout(() => {
            transitionOverlay.classList.add('reverse');
            
            // Reset boxes and show scrolling
            setTimeout(() => {
                transitionOverlay.classList.remove('active', 'reverse');
                overlayBoxes.forEach(box => {
                    box.style.transitionDelay = '0s';
                });
                document.body.style.overflow = '';
            }, 800);
        }, 400);
    }, 600);
  }

  // Add event listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavigation(link);
    });
  });

  // Add animation to ARK icon
  const arkIcon = document.querySelector('.icon a');
  if (arkIcon) {
    arkIcon.addEventListener('click', (e) => {
      e.preventDefault();
      
      const customLink = {
        getAttribute: () => '#ARK',
        textContent: 'ARK' // Using the ID name for consistency
      };
      
      handleNavigation(customLink);
      
      gsap.to(arkIcon, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(arkIcon, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)"
          });
        }
      });
    });
  }
});


// ABOUT  ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT 


document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });


const hightlightWords = [
    "accessible",
    "Product",
    "AI",
    "technology",
    "problems",
    "people",
    "Hello!",
];       

const stickyText = document.querySelector(".sticky p");
const computedStyle = window.getComputedStyle(stickyText);
const fontSize = computedStyle.fontSize;

const splitText = new SplitType(".sticky p", { types: "words" });
const words = [...splitText.words];


const { Engine, Runner, World, Bodies, Body, Events } = Matter;
const engine = Engine.create({
    gravity: { x: 0, y: 0 },
});

const runner = Runner.create();
Runner.run(runner,engine);

const floor = Bodies.rectangle(
    window.innerWidth /2,
    window.innerHeight + 1,
    window.innerWidth,
    20,
    { isStatic : true}
);

World.add(engine.world, floor);

const shuffledWords = [...words];
for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
}

const wordsToHighlight = words.filter((word) =>
    hightlightWords.some(highlight => word.textContent.includes(highlight))
);

console.log("Highlighted words found:", wordsToHighlight.length);

let physicsEnabled = false;
let lastProgress = 0;
const charElements = [];
const charBodies = [];

wordsToHighlight.forEach((word) => {
    const chars = word.textContent.split("");
    const wordRect = word.getBoundingClientRect();
    const stickyRect = document.querySelector(".sticky").getBoundingClientRect();
    
    word.style.opacity = 1;

    chars.forEach((char, charIndex) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = char;
        charSpan.style.position = "absolute";
        charSpan.style.fontSize = fontSize;
        document.querySelector(".sticky").appendChild(charSpan);
        
        const charWidth = word.offsetWidth / chars.length;
        const x = wordRect.left - stickyRect.left + charIndex * charWidth;
        const y = wordRect.top - stickyRect.top;

        charSpan.style.left = `${x}px`;
        charSpan.style.top = `${y}px`;
        charSpan.style.color = getComputedStyle(word).color;
        charElements.push(charSpan);
        
        const body = Bodies.rectangle(
            x + charWidth / 2,
            y + charSpan.offsetHeight / 2,
            charWidth ,
            charSpan.offsetHeight,
            {
                restitution: 0.75,
                friction: 0.5,
                frictionAir: 0.0175,
                isStatic: true,
            }
        );

        World.add(engine.world, body);
        charBodies.push({
            body,
            element: charSpan,
            initialX: x,
            initialY: y,
        });
    });
});

function resetAnimation() {
    engine.world.gravity.y = 0;

    charBodies.forEach(({ body, element, initialX, initialY }) => {
        Body.setStatic(body, true);
        Body.setPosition(body, {
            x: initialX + element.offsetWidth / 2,
            y: initialY + element.offsetHeight / 2,
        });
        Body.setAngle(body, 0);
        Body.setVelocity(body, { x: 0, y: 0});
        Body.setAngularVelocity(body, 0);

        element.style.transform = "none";
        element.style.opacity = 0;
    });

    words.forEach((word) => {
        gsap.to(word, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
        });
    });
}

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sticky",
        start: "top top",
        end: `+=${window.innerHeight * 1.5}px`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
            
            if (self.progress >= 0.6 && !physicsEnabled) {
                console.log("Physics enabled");
                physicsEnabled = true;
                engine.world.gravity.y = 1;
                wordsToHighlight.forEach((word) => {
                    word.style.opacity = 0;
                });
                
                
                charBodies.forEach(({ body, element }) => {
                    element.style.opacity = 1;
                    element.style.color = "#000000";
                    Body.setStatic(body, false);
                    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
                    Body.setVelocity(body, {
                        x: (Math.random() - 0.5) * 5,
                        y: -Math.random() * 5,
                    });
                });

                
                gsap.to(
                    words.filter(
                        (word) =>
                            !hightlightWords.some((hw) => word.textContent.includes(hw))
                    ),
                    {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    }
                );
                } else if (self.progress < 0.6 && physicsEnabled ) {
                    physicsEnabled = false;
                    resetAnimation();
                }
                
            },
            
        },
        
    });

    const phase1 = gsap.timeline();
    shuffledWords.forEach((word) => {
    phase1.to(
        word, 
        {
        color: "#EB4330",
        duration: 0.1,
        ease: "power2.inOut",
        }, 
    Math.random() * 0.9
);
});

    const phase2 = gsap.timeline();
    const shuffledHighlights = [...wordsToHighlight];
    for (let i = shuffledHighlights.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledHighlights[i], shuffledHighlights[j]] = [
        shuffledHighlights[j], 
        shuffledHighlights[i],
    ];
 }

    shuffledHighlights.forEach((word) => {
    phase2.to(
        word, 
        {
        color: "#000000",
        duration: 0.1,
        ease: "power2.inOut",
    }, 
    Math.random() * 0.9
   );
    });

    tl.add(phase1, 0).add(phase2, 1).to({}, { duration: 2 });

    Events.on(engine, "afterUpdate", () => {
    charBodies.forEach(({ body, element, initialX, initialY }) => {
        if (physicsEnabled) {
            const deltaX = body.position.x - (initialX + element.offsetWidth / 2);
            const deltaY = body.position.y - (initialY + element.offsetHeight / 2);
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${body.angle}rad)`;
        }
     });
    });
});


document.addEventListener('DOMContentLoaded', function() {
  // Make sure GSAP and ScrollTrigger are available
  if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Set initial state for animations (cards start invisible)
      gsap.set('.skill-card:not(.skill-card-special)', { opacity: 0, y: 30 });
      gsap.set('.skill-item', { opacity: 0, x: 20 });
      
      // Animate all skill cards on scroll
      const skillCards = document.querySelectorAll('.skill-card:not(.skill-card-special)');
      skillCards.forEach((card, index) => {
          // Animate each card
          gsap.to(card, {
              scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none"
              },
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.1
          });
          
          // Animate skill items inside each card
          const skillItems = card.querySelectorAll('.skill-item');
          skillItems.forEach((item, idx) => {
              gsap.to(item, {
                  scrollTrigger: {
                      trigger: item,
                      start: "top 90%",
                      toggleActions: "play none none none"
                  },
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  delay: 0.2 + (idx * 0.1)
              });
          });
          
          // Animate progress bars if they exist
          const progressBars = card.querySelectorAll('.achievement-progress');
          progressBars.forEach(progressBar => {
              if (progressBar) {
                  const targetWidth = progressBar.getAttribute('data-width');
                  gsap.to(progressBar, {
                      scrollTrigger: {
                          trigger: progressBar,
                          start: "top 90%",
                          toggleActions: "play none none none"
                      },
                      width: `${targetWidth}%`,
                      duration: 1.5,
                      ease: "power2.out",
                      delay: 0.5
                  });
              }
          });
      });
      
      // Animate stats numbers
      const statsNumbers = document.querySelectorAll('.stats-number');
      statsNumbers.forEach((stat) => {
          if (stat.hasAttribute('data-count')) {
              const finalValue = parseInt(stat.getAttribute('data-count'));
              const duration = finalValue > 50 ? 2.5 : 1.5;
              
              gsap.to(stat, {
                  scrollTrigger: {
                      trigger: stat,
                      start: "top 85%",
                      toggleActions: "play none none none"
                  },
                  innerText: finalValue,
                  duration: duration,
                  snap: { innerText: 1 },
                  ease: "power2.out"
              });
          }
      });
      
      // Animate stats cards
      const statsCards = document.querySelectorAll('.stats-card');
      if (statsCards.length > 0) {
          gsap.from(statsCards, {
              scrollTrigger: {
                  trigger: '.skill-card-special',
                  start: "top 85%",
                  toggleActions: "play none none none"
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.2)"
          });
      }
  }
  
  // Set up hover effects manually without relying on GSAP
  // This ensures hover effects work regardless of animation state
  const allCards = document.querySelectorAll('.skill-card, .stats-card');
  allCards.forEach(card => {
      // Add hover effect
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px)';
          this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
          
          // Get the header and change its color if it exists
          const header = this.querySelector('.card-header');
          if (header) {
              header.style.backgroundColor = 'var(--accent-color)';
              
              // Change header text and icon color
              const headerTitle = header.querySelector('h3');
              const headerIcon = header.querySelector('i');
              
              if (headerTitle) headerTitle.style.color = 'var(--card-bg)';
              if (headerIcon) headerIcon.style.color = 'var(--card-bg)';
          }
          
          // Change indicator dots if they exist
          const dots = this.querySelectorAll('.indicator-dot');
          dots.forEach(dot => {
              dot.style.backgroundColor = 'var(--card-bg)';
          });
      });
      
      // Remove hover effect
      card.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.style.boxShadow = '';
          
          // Reset header colors
          const header = this.querySelector('.card-header');
          if (header) {
              header.style.backgroundColor = '';
              
              // Reset header text and icon color
              const headerTitle = header.querySelector('h3');
              const headerIcon = header.querySelector('i');
              
              if (headerTitle) headerTitle.style.color = '';
              if (headerIcon) headerIcon.style.color = '';
          }
          
          // Reset indicator dots
          const dots = this.querySelectorAll('.indicator-dot');
          dots.forEach(dot => {
              dot.style.backgroundColor = '';
          });
      });
  });
});




// Projects Projects Projects Projects Projects Projects Projects Projects Projects Projects Projects Projects 

document.addEventListener("DOMContentLoaded", function () {
    const imageSources = [
        "./assets/bg-1.png",
        "./assets/bg-2.png",
        "./assets/bg-3.png",
        "./assets/bg-4.png",
        "./assets/bg-5.png",
    ];

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
        const copyElements = item.querySelectorAll(".info, .name, .tag");

        copyElements.forEach((div) => {
            const copy = div.querySelector("p");

            if (copy) {
                const duplicateCopy = document.createElement("p");
                duplicateCopy.textContent = copy.textContent;
                div.appendChild(duplicateCopy);
            }
        });
    });

    const appendImages = (src) => {
        const preview1 = document.querySelector(".preview-img-1");
        const preview2 = document.querySelector(".preview-img-2");

        const img1 = document.createElement("img");
        const img2 = document.createElement("img");

        img1.src = src;
        img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        img2.src = src;
        img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        preview1.appendChild(img1);
        preview2.appendChild(img2);

        gsap.to([img1, img2], {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
            onComplete: function () {
                removeExtraImages(preview1);
                removeExtraImages(preview2);
            },
        });
    };

    function removeExtraImages(container) {
        while (container.children.length > 10) {
            container.removeChild(container.firstChild);
        }
    }

    document.querySelectorAll(".menu-item").forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            mouseOverAnimation(item);
            appendImages(imageSources[index]);
        });

        item.addEventListener("mouseout", () => {
            mouseOutAnimation(item);
        });
    });

    const mouseOverAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "-100%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "0%",
            duration: 0.3,
        });
    };

    const mouseOutAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "0%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "100%",
            duration: 0.3,
        });
    };

    document.querySelector(".menu").addEventListener("mouseout", function () {
        gsap.to(".preview-img img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
        });
    });

    document.addEventListener("mousemove", function (e) {
        const preview = document.querySelector(".preview");
        const previewWidth = preview.offsetWidth;
        const previewHeight = preview.offsetHeight;

        gsap.to(preview, {
            x: e.clientX,
            y: e.clientY,
            duration: 1,
            ease: "power2.out",
        });
    });
});



// Contact Contact Contact Contact Contact Contact Contact Contact Contact


// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);




// Animate floating text
gsap.to("#floating-connect", {
  x: "10%",
  y: "5%",
  duration: 10,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to("#floating-create", {
  x: "-10%",
  y: "-5%",
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});



document.getElementById("connect").style.left = "11%";
document.getElementById("connect").style.top = "20%";
document.getElementById("create").style.right = "-30%";
document.getElementById("create").style.bottom = "20%";
// Position floating text
document.getElementById("floating-connect").style.left = "10%";
document.getElementById("floating-connect").style.top = "20%";
document.getElementById("floating-create").style.right = "10%";
document.getElementById("floating-create").style.bottom = "20%";

// Animate social links with staggered effect
gsap.to(".social-links", {
  opacity: 1,
  y: 0,
  delay: 1.5,
  duration: 0.8,
  ease: "power2.out"
});

// Create individual animations for each social icon
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
  // Initial setup
  gsap.set(link, {
    opacity: 0,
    y: 20
  });
  
  // Entrance animation
  gsap.to(link, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 1.5 + (index * 0.1),
    ease: "back.out(1.7)"
  });
  
  // Hover effect with GSAP
  link.addEventListener('mouseenter', () => {
    gsap.to(link, {
      y: -8,
      scale: 1.1,
      duration: 0.4,
      ease: "back.out(1.7)"
    });
    
    gsap.to(link.querySelector('.icon-label'), {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(link.querySelector('i'), {
      rotationY: 360,
      duration: 0.6,
      ease: "power1.inOut"
    });
  });
  
  link.addEventListener('mouseleave', () => {
    gsap.to(link, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(link.querySelector('.icon-label'), {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in"
    });
    
    gsap.to(link.querySelector('i'), {
      rotationY: 0,
      duration: 0.6,
      ease: "power1.inOut"
    });
  });
});

// Form interaction
const formControls = document.querySelectorAll('.form-control');
formControls.forEach(control => {
  control.addEventListener('focus', () => {
    gsap.to(control, {
      duration: 0.3,
      scale: 1.02,
      ease: "power2.out"
    });
  });
  
  control.addEventListener('blur', () => {
    gsap.to(control, {
      duration: 0.3,
      scale: 1,
      ease: "power2.out"
    });
  });
});

// Submit button interaction
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('mouseenter', () => {
  gsap.to(submitBtn, {
    duration: 0.3,
    scale: 1.05,
    ease: "power2.out"
  });
});

submitBtn.addEventListener('mouseleave', () => {
  gsap.to(submitBtn, {
    duration: 0.3,
    scale: 1,
    ease: "power2.out"
  });
});

// Resume button interaction
const resumeBtn = document.querySelector('.resume-btn');
resumeBtn.addEventListener('mouseenter', () => {
  gsap.to(resumeBtn, {
    duration: 0.3,
    scale: 1.05,
    ease: "power2.out"
  });
});

resumeBtn.addEventListener('mouseleave', () => {
  gsap.to(resumeBtn, {
    duration: 0.3,
    scale: 1,
    ease: "power2.out"
  });
});

// Resume download animation
resumeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Animation for click
  gsap.timeline()
    .to(resumeBtn, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in"
    })
    .to(resumeBtn, {
      scale: 1,
      duration: 0.2,
      ease: "back.out(1.5)"
    });
  
  // Simulate download
  const link = document.createElement('a');
  link.href = 'your-resume.pdf'; // Replace with actual resume file path
  link.download = 'ARK-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Button click animation
submitBtn.addEventListener('click', function(e) {
  // Don't prevent default submission yet
  
  // Check if form is valid
  const form = document.querySelector('.contact-form');
  const inputs = form.querySelectorAll('.form-control');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value) isValid = false;
  });
  
  if (isValid) {
    // Only prevent default to show animation first
    e.preventDefault();
    
    // Add quick scale down and up effect 
    const btn = this;
    
    gsap.timeline()
      .to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in"
      })
      .to(btn, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.5)"
      })
      .to(btn, {
        backgroundColor: "#4CAF50",
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: function() {
          // Change text
          btn.innerHTML = '<i class="fas fa-check"></i> Sending...';
          
          // Actually submit the form after animation completes
          setTimeout(function() {
            form.submit();
          }, 800);
        }
      });
  } else {
    // Prevent submission for invalid form
    e.preventDefault();
    
    // Shake animation for invalid form
    gsap.to(submitBtn, {
      x: [-5, 5, -5, 5, -5, 5, 0],
      duration: 0.4,
      ease: "power2.inOut"
    });
  }
});

const container = document.querySelector('.containerc');

// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
  const marqueeContent = document.querySelector('.marquee-content');
  const marqueeContainer = document.querySelector('.marquee-container');
  
  // Speed control based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;
    
    // Adjust speed based on scroll position (slower at the bottom of the page)
    const baseSpeed = 120; // seconds for one full cycle
    const speedFactor = 1 - (scrollPercentage * 0.5); // reduces to 50% speed at bottom
    
    marqueeContent.style.animationDuration = `${baseSpeed * speedFactor}s`;
  });
  
  // Add mouse position interaction
  marqueeContainer.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const containerWidth = marqueeContainer.offsetWidth;
    const mousePosition = mouseX / containerWidth;
    
    // Speed varies based on mouse position (slower in middle, faster at edges)
    const baseSpeed = 900;
    const speedFactor = 0.7 + (Math.abs(mousePosition - 0.5) * 0.6);
    
    // Only adjust if not hovering (which pauses)
    if (!marqueeContainer.matches(':hover')) {
      marqueeContent.style.animationDuration = `${baseSpeed * speedFactor}s`;
    }
  });
  
  // Make it actually circular with JS
  function duplicateMarqueeContent() {
    // Create a true circular effect by duplicating the content when needed
    const contentWidth = marqueeContent.offsetWidth;
    const containerWidth = marqueeContainer.offsetWidth;
    
    if (contentWidth < containerWidth * 3) {
      // Add more content to ensure seamless loop
      marqueeContent.innerHTML += marqueeContent.innerHTML;
    }
  }
  
  // Run once on load and when window resizes
  duplicateMarqueeContent();
  window.addEventListener('resize', duplicateMarqueeContent);
});

// Scroll Reveal Animation System
document.addEventListener("DOMContentLoaded", function() {
  // Make sure GSAP and ScrollTrigger are registered
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // ScrollReveal class to handle different types of reveal animations
    class ScrollReveal {
      constructor() {
        this.defaultOptions = {
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        };
      }
      
      // Initialize animations for all elements with data-reveal attribute
      init() {
        // Find all elements with data-reveal attribute
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        revealElements.forEach(element => {
          const type = element.getAttribute('data-reveal') || 'fade-up';
          const delay = parseFloat(element.getAttribute('data-reveal-delay') || 0);
          const duration = parseFloat(element.getAttribute('data-reveal-duration') || 0.8);
          const stagger = parseFloat(element.getAttribute('data-reveal-stagger') || 0.1);
          
          // Apply animation based on type
          switch(type) {
            case 'fade-up':
              this.fadeUp(element, { delay, duration, stagger });
              break;
            case 'fade-in':
              this.fadeIn(element, { delay, duration, stagger });
              break;
            case 'slide-left':
              this.slideIn(element, { x: 50, delay, duration, stagger });
              break;
            case 'slide-right':
              this.slideIn(element, { x: -50, delay, duration, stagger });
              break;
            case 'scale-up':
              this.scaleUp(element, { delay, duration, stagger });
              break;
            case 'text-reveal':
              this.textReveal(element, { delay, duration, stagger: stagger / 3 });
              break;
          }
        });
      }
      
      // Fade Up animation
      fadeUp(element, options = {}) {
        const children = element.hasAttribute('data-reveal-children') ? 
                       element.querySelectorAll(element.getAttribute('data-reveal-children')) : 
                       [element];
        
        if(children.length === 0) return;
        
        const settings = {...this.defaultOptions, ...options};
        
        gsap.set(children, {
          y: 50,
          opacity: 0
        });
        
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: settings.duration,
          stagger: settings.stagger,
          delay: settings.delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: settings.start,
            toggleActions: settings.toggleActions,
            once: settings.once
          }
        });
      }
      
      // Fade In animation
      fadeIn(element, options = {}) {
        const children = element.hasAttribute('data-reveal-children') ? 
                       element.querySelectorAll(element.getAttribute('data-reveal-children')) : 
                       [element];
        
        if(children.length === 0) return;
        
        const settings = {...this.defaultOptions, ...options};
        
        gsap.set(children, {
          opacity: 0
        });
        
        gsap.to(children, {
          opacity: 1,
          duration: settings.duration,
          stagger: settings.stagger,
          delay: settings.delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: settings.start,
            toggleActions: settings.toggleActions,
            once: settings.once
          }
        });
      }
      
      // Slide In animation
      slideIn(element, options = {}) {
        const children = element.hasAttribute('data-reveal-children') ? 
                       element.querySelectorAll(element.getAttribute('data-reveal-children')) : 
                       [element];
        
        if(children.length === 0) return;
        
        const settings = {...this.defaultOptions, ...options};
        const xValue = settings.x || 50;
        
        gsap.set(children, {
          x: xValue,
          opacity: 0
        });
        
        gsap.to(children, {
          x: 0,
          opacity: 1,
          duration: settings.duration,
          stagger: settings.stagger,
          delay: settings.delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: settings.start,
            toggleActions: settings.toggleActions,
            once: settings.once
          }
        });
      }
      
      // Scale Up animation
      scaleUp(element, options = {}) {
        const children = element.hasAttribute('data-reveal-children') ? 
                       element.querySelectorAll(element.getAttribute('data-reveal-children')) : 
                       [element];
        
        if(children.length === 0) return;
        
        const settings = {...this.defaultOptions, ...options};
        
        gsap.set(children, {
          scale: 0.85,
          opacity: 0
        });
        
        gsap.to(children, {
          scale: 1,
          opacity: 1,
          duration: settings.duration,
          stagger: settings.stagger,
          delay: settings.delay,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: element,
            start: settings.start,
            toggleActions: settings.toggleActions,
            once: settings.once
          }
        });
      }
      
      // Text Reveal animation (word by word)
      textReveal(element, options = {}) {
        if(element.classList.contains('text-processed')) return;
        
        // Split text into words
        const text = element.innerHTML;
        let html = '';
        const words = text.split(' ');
        
        words.forEach(word => {
          html += `<span class="reveal-word"><span class="reveal-word-inner">${word}</span></span> `;
        });
        
        element.innerHTML = html;
        element.classList.add('text-processed');
        
        const wordSpans = element.querySelectorAll('.reveal-word-inner');
        const settings = {...this.defaultOptions, ...options};
        
        gsap.set(wordSpans, {
          y: 20,
          opacity: 0
        });
        
        gsap.to(wordSpans, {
          y: 0,
          opacity: 1,
          duration: settings.duration,
          stagger: settings.stagger,
          delay: settings.delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: settings.start,
            toggleActions: settings.toggleActions,
            once: settings.once
          }
        });
      }
    }
    
    // Create necessary styles for text reveal animation
    function addRevealStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .reveal-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          margin-right: 0.1em;
        }
        .reveal-word-inner {
          display: inline-block;
          will-change: transform, opacity;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Initialize reveal system
    addRevealStyles();
    const revealSystem = new ScrollReveal();
    revealSystem.init();
    
    // Re-initialize reveal system when window resizes
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    });
    
    // Add reveal animations to specific sections without interfering with existing animations
    function addRevealToExistingElements() {
      // Add to headings
      document.querySelectorAll('h1:not([data-reveal]), h2:not([data-reveal]), h3:not([data-reveal])').forEach(heading => {
        heading.setAttribute('data-reveal', 'fade-up');
      });
      
      // Add to paragraphs
      document.querySelectorAll('p:not(.sticky p):not([data-reveal])').forEach(p => {
        p.setAttribute('data-reveal', 'fade-up');
        p.setAttribute('data-reveal-duration', '0.7');
      });
      
      // Add to sections
      document.querySelectorAll('section:not([data-reveal])').forEach(section => {
        section.setAttribute('data-reveal', 'fade-in');
        section.setAttribute('data-reveal-duration', '1');
      });
      
      // Add to menu items in projects section
      document.querySelectorAll('.menu-item:not([data-reveal])').forEach((item, index) => {
        item.setAttribute('data-reveal', 'fade-up');
        item.setAttribute('data-reveal-delay', (index * 0.1).toString());
      });
      
      // Add to social links
      document.querySelectorAll('.social-link:not([data-reveal])').forEach((link, index) => {
        link.setAttribute('data-reveal', 'scale-up');
        link.setAttribute('data-reveal-delay', (index * 0.1).toString());
      });
      
      // Add to form controls
      document.querySelectorAll('.form-control:not([data-reveal])').forEach((control, index) => {
        control.setAttribute('data-reveal', 'slide-left');
        control.setAttribute('data-reveal-delay', (index * 0.1).toString());
      });
      
      // Initialize newly added reveal elements
      revealSystem.init();
    }
    
    // Run after a short delay to ensure all other scripts have initialized
    setTimeout(addRevealToExistingElements, 100);
  } else {
    console.warn('GSAP or ScrollTrigger not loaded. Scroll reveal animations will not work.');
  }
});




