const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target || 0);
      const prefix = element.dataset.prefix || "";
      const suffix = element.dataset.suffix || "";
      const duration = 1400;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        const displayValue = target % 1 === 0 ? Math.round(value) : value.toFixed(1);

        element.textContent = `${prefix}${displayValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.5,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));
