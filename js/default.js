document.addEventListener("DOMContentLoaded", function () {
  // Ajouter l'année à l'élément avec l'ID 'year'
  document.getElementById('year').textContent = new Date().getFullYear();

  // Effet de halo lors du survol de la barre de navigation
  const navbarHover = document.querySelector('.bg-navbar');
  if (navbarHover) {
    navbarHover.addEventListener('mousemove', function (e) {
      const x = e.clientX - this.offsetLeft;
      const y = e.clientY - this.offsetTop;
      this.style.setProperty('--x', `${x}px`);
      this.style.setProperty('--y', `${y}px`);
    });
  }

  const contactButton = document.getElementById('contact-button');

  if (contactButton !== null) {
    contactButton.addEventListener('click', function () {
      gsap.timeline()
        .to(contactButton, {
          duration: 0.2,
          opacity: 0,
          onComplete: () => {
            contactButton.innerHTML = '<svg id="eye-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>';
            gsap.set(contactButton, {opacity: 1});
          }
        })
        .to(contactButton, {
          duration: 0.25,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          ease: "power2.out",
          onStart: () => {
            gsap.set("#eye-svg", {opacity: 1});
          }
        })
        .to("#eye-svg", {
          duration: 0.25,
          scale: 1.5,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut",
          onComplete: () => {
            scrollToContact();
          }
        });
    });
  }

  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({behavior: 'smooth'});

    gsap.timeline()
      .to(contactButton, {
        duration: 0.5,
        width: '164px',
        height: '51px',
        borderRadius: '20px',
        ease: "power2.out",
        onComplete: () => {
          contactButton.innerHTML = 'Nous contacter';
        }
      });
  }

  gsap.registerPlugin(ScrollTrigger);

  // IRIS FLOTTANT
  const body = document.querySelector("body");
  const mainContainer = body.querySelector(".main-container");
  const extraLongContainer = mainContainer.querySelector(".extra-long-container");

  let scrollTween = gsap.to(".extra-long-container", {
    xPercent: -100,
    x: () => window.innerWidth,
    ease: "none",
    scrollTrigger: {
      pin: ".main-container",
      trigger: ".main-container",
      start: "top left",
      end: () => `+=${extraLongContainer.offsetWidth - window.innerWidth}`,
      scrub: 1,
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".iris-flottant",
      start: "left right",
      end: () => `right -${extraLongContainer.offsetWidth} `,
      scrub: 1,
      containerAnimation: scrollTween
    },
  });

  // Démarre la rotation avant l'apparition
  tl.to(".iris-flottant", {
    scale: 2,
    rotation: 830,
    duration: 10
  });

  // SOCIAL PARALLAXE
  // Ajouter l'écouteur d'événements à chaque icône dans la section #contact
  document.querySelectorAll('#contact .social-icon img').forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
      const rect = icon.getBoundingClientRect(); // Obtenir les dimensions et la position de l'icône
      const centerX = rect.left + rect.width / 2; // Calculer le centre X de l'icône
      const centerY = rect.top + rect.height / 2; // Calculer le centre Y de l'icône

      // Calculer le déplacement basé sur la position de la souris par rapport au centre de l'icône
      const moveX = (e.clientX - centerX) * -0.1; // Déplacer horizontalement dans la direction opposée
      const moveY = (e.clientY - centerY) * -0.1; // Déplacer verticalement dans la direction opposée

      // Appliquer l'effet de parallaxe à l'icône
      gsap.to(icon, {
        x: moveX,
        y: moveY,
        ease: 'none',
        duration: 0.5
      });
    });

    // Remettre l'icône en position initiale lorsque la souris quitte
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        x: 0,
        y: 0,
        ease: 'power1.out',
        duration: 0.5
      });
    });
  });


  // REVIEW
  // Création d'une timeline avec ScrollTrigger
  if (window.innerWidth > 768) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#avis",
        start: "top 7%",
        end: "bottom+=50% center",
        pin: true,
        pinSpacing: false,
        scrub: true
      }
    });

    tl.to(".box", {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
      ease: "none",
      stagger: 0.1
    }, 0);
    // Ajout d'une séquence pour fixer #confiance à #contact quand il arrive
    tl.to("#contact", {
      onStart: () => {
        // #contact vient coller à #confiance avant de remonter ensemble
        document.querySelector("#contact").style.top = `${document.querySelector("#confiance").getBoundingClientRect().bottom}px`;
      },
      y: 0,
      ease: "none",
    }); // Commence après un léger délai après les animations précédentes

    gsap.timeline({
      scrollTrigger: {
        trigger: "#avis",
        start: "left 10%", // Commence l'épinglage lorsque le haut de #avis est en haut du viewport
        endTrigger: "#contact", // Définit #contact comme le déclencheur de fin
        end: "top bottom", // Désépingle #avis quand le haut de #contact touche le bas du viewport
        pin: true, // Épingle #avis durant l'animation
        pinSpacing: false, // Désactive l'espacement automatique ajouté lors de l'épinglage
        onLeave: () => gsap.set("#avis", {pin: false}) // Désépingle #avis lorsque #contact touche le bas
      }
    });
  }


  // REVIEW
  // if (window.innerWidth < 768) {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#avis",
  //       start: "top 7%",
  //       end: "bottom+=50% center",
  //       pin: true,
  //       pinSpacing: false,
  //       scrub: true,
  //       markers: true,
  //     }
  //   });

  // const details = gsap.utils.toArray(".avis:not(:first-child)")
  // const photos = gsap.utils.toArray(".box:not(:first-child)")
  //
  //
  // gsap.set(photos, {yPercent: 101})
  //
  // const allPhotos = gsap.utils.toArray(".box")
  //
  //
  // ScrollTrigger.create({
  //   trigger: "#avis",
  //   start: "top top",
  //   end: "bottom bottom",
  //   pin: ".box"
  // })
  //
  // //create scrolltrigger for each details section
  // //trigger photo animation when headline of each details section
  // //reaches 80% of window height
  // details.forEach((detail, index) => {
  //
  //   let headline = detail.querySelector("h1")
  //   let animation = gsap.timeline()
  //     .to(photos[index], {yPercent: 0})
  //     .set(allPhotos[index], {autoAlpha: 0})
  //
  //   ScrollTrigger.create({
  //     trigger: headline,
  //     start: "top 80%",
  //     end: "top 50%",
  //     animation: animation,
  //     scrub: true,
  //     markers: false
  //   })
  // })
  // }
});
