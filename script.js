const content = {
  name: "Садовская Ирина Николаевна",
  heroDescription:
    "Провожу групповые и индивидуальные занятия по методике Aplomb. Мы развиваем гибкость, силу и устойчивость через мягкую физиологичную нагрузку.",
  telegramLink: "https://t.me/your_username",
  patents: [
    "Заявка Nº2015138401. ПАТЕНТ Nº2616992: способ тренировки мышц (19 апреля 2017 г.).",
    "ПАТЕНТ Nº2772530: способ выполнения дыхательной гимнастики (23 мая 2022 г.)."
  ],
  audience: [
    "Для профессионалов и любителей",
    "Для улучшения осанки и подвижности",
    "Для развития гибкости и силы",
    "Для людей без спортивного опыта",
    "Для восстановления в щадящем режиме",
    "Для повышения качества жизни"
  ],
  benefits: [
    "Расслабление тела и снижение стресса.",
    "Улучшение координации движений.",
    "Снижение отечности и застойных явлений.",
    "Профилактика снижения подвижности суставов.",
    "Улучшение питания суставных поверхностей и межпозвонковых дисков.",
    "Расширение амплитуды и доступности движений.",
    "Подготовка тела к физическим нагрузкам.",
    "Профилактика травм и мышечных перегрузок.",
    "Улучшение концентрации внимания на теле."
  ],
  galleryImages: [
    { src: "images/photo2.jpg", alt: "Занятие Aplomb: фото 2" },
    { src: "images/photo3.jpg", alt: "Занятие Aplomb: фото 3" },
    { src: "images/photo4.jpg", alt: "Занятие Aplomb: фото 4" },
    { src: "images/photo5.jpg", alt: "Занятие Aplomb: фото 5" },
    { src: "images/photo6.jpg", alt: "Занятие Aplomb: фото 6" },
    { src: "images/photo7.jpg", alt: "Занятие Aplomb: фото 7" },
    { src: "images/photo8.jpg", alt: "Занятие Aplomb: фото 8" },
    { src: "images/photo9.jpg", alt: "Занятие Aplomb: фото 9" },
    { src: "images/photo10.jpg", alt: "Занятие Aplomb: фото 10" }
  ]
};

function fillList(containerId, items) {
  const root = document.getElementById(containerId);
  if (!root) return;
  root.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    root.appendChild(li);
  });
}

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  content.galleryImages.forEach(({ src, alt }) => {
    const base = src.replace(/\.(jpe?g)$/i, "");
    const figure = document.createElement("figure");
    figure.className = "gallery-item";

    const picture = document.createElement("picture");

    const avifSource = document.createElement("source");
    avifSource.srcset = `${base}.avif`;
    avifSource.type = "image/avif";

    const webpSource = document.createElement("source");
    webpSource.srcset = `${base}.webp`;
    webpSource.type = "image/webp";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";

    picture.append(avifSource, webpSource, img);
    figure.appendChild(picture);
    grid.appendChild(figure);
  });
}

function wireTelegramLinks() {
  const linkIds = ["hero-cta", "contact-cta", "footer-cta"];
  linkIds.forEach((id) => {
    const node = document.getElementById(id);
    if (node) {
      node.href = content.telegramLink;
    }
  });

  if (content.telegramLink.includes("your_username")) {
    console.warn("Укажите реальную Telegram-ссылку в script.js -> content.telegramLink");
  }
}

function wireMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

function wireReveal() {
  const sections = document.querySelectorAll("[data-reveal]");
  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 50}ms`;
    io.observe(section);
  });
}

function init() {
  document.getElementById("hero-title").textContent = content.name;
  document.getElementById("footer-name").textContent = content.name;
  document.getElementById("hero-description").textContent = content.heroDescription;

  fillList("patents-list", content.patents);
  fillList("audience-list", content.audience);
  fillList("benefits-list", content.benefits);

  buildGallery();
  wireTelegramLinks();
  wireMobileNav();
  wireReveal();
}

init();
