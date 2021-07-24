// import "./scroll";
import "./animation.scss";
import "./styles.scss";

const sections = document.querySelectorAll("section")
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0.1) {
            entry.target.classList.add("in-view");
        } else {
            entry.target.classList.remove("in-view");
        }
    })
}, {
    threshold: [0.1, 0.3, 1.0]
})

sections.forEach(section => {
  observer.observe(section)
  console.log(section)

  const div = section.querySelector("div")
  console.log(div)

  const mq = window.matchMedia("(prefers-reduced-motion: no-preference)")

  if(mq.matches) {
      window.addEventListener("mousemove", (e) => {
          const aimX = (e.clientX - (window.innerWidth / 2)) / 15
          const aimY = (e.clientY - (window.innerHeight / 2)) / -10
          div.style.transform = `rotateX(${aimY}deg) rotateY(${aimX}deg)`;
      })
  }
  

})

