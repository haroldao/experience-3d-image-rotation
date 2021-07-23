import "./styles.scss";
// import "./scroll";

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
    threshold: [0.1, 0.3]
})

sections.forEach(section => {
  observer.observe(section)
  console.log(section)
})