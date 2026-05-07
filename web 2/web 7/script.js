const revealItems = document.querySelectorAll(".reveal");
const sectionLinks = Array.from(document.querySelectorAll(".deck-nav a"));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = `#${entry.target.id}`;
      sectionLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === activeId);
      });
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
);

sections.forEach((section) => navObserver.observe(section));
