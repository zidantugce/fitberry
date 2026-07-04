import { assets, gallery, reviews, services, site, team } from "./data.mjs";

const ASSET_VERSION = "20260704-2";

export function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function asset(path, prefix = "") {
  return `${prefix}${path}`;
}

export function url(path = "", prefix = "") {
  if (!path) return prefix || "./";
  return `${prefix}${path.replace(/^\/+/, "").replace(/\/?$/, "/")}`;
}

export function image(path, alt, prefix = "", className = "", loading = "lazy") {
  return `<img src="${asset(path, prefix)}" alt="${esc(alt)}" class="${esc(className)}" loading="${loading}" decoding="async">`;
}

export function list(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

export function buttonLink(label, href, variant = "primary", extra = "") {
  return `<a class="btn btn-${variant} ${extra}" href="${esc(href)}">${esc(label)}</a>`;
}

export function todoNote(text) {
  return `<div class="todo-note"><strong>TODO:</strong> ${esc(text.replace(/^TODO:\s*/i, ""))}</div>`;
}

export function layout({ title, description, prefix = "", current = "", children = "" }) {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="theme-color" content="#315f4f">
    <link rel="icon" type="image/png" href="${asset(assets.favicon, prefix)}">
    <link rel="preload" as="image" href="${asset(gallery[2].file, prefix)}">
    <link rel="stylesheet" href="${asset(`assets/styles.css?v=${ASSET_VERSION}`, prefix)}">
  </head>
  <body data-current="${esc(current)}">
    <a class="skip-link" href="#main">İçeriğe geç</a>
    ${header(prefix, current)}
    <main id="main">
      ${children}
    </main>
    ${lightboxMarkup()}
    ${footer(prefix)}
    ${floatingWhatsapp()}
    <script src="${asset(`assets/main.js?v=${ASSET_VERSION}`, prefix)}" defer></script>
  </body>
</html>`;
}

export function header(prefix = "", current = "") {
  const nav = [
    ["Ana Sayfa", "", "home"],
    ["Hakkımızda", "hakkimizda", "about"],
    ["Ekibimiz", "ekibimiz", "team"],
    ["Galeri", "galeri", "gallery"],
    ["Danışan Yorumları", "yorumlar", "reviews"],
    ["İletişim", "iletisim", "contact"],
  ];

  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${url("", prefix)}" aria-label="Fit Berry ana sayfa">
        ${image(assets.logo, "Fit Berry logosu", prefix, "brand-logo", "eager")}
      </a>
      <button class="nav-toggle" type="button" aria-controls="site-menu" aria-expanded="false" data-menu-toggle>
        <span class="sr-only">Menüyü aç veya kapat</span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="site-menu" aria-label="Ana menü">
        ${nav
          .slice(0, 2)
          .map(([label, path, key]) => navLink(label, path, prefix, current === key))
          .join("")}
        <details class="nav-dropdown" ${current === "services" ? "open" : ""}>
          <summary>Hizmetler</summary>
          <div class="dropdown-panel">
            <a href="${url("hizmetler", prefix)}">Tüm Hizmetler</a>
            ${services
              .map((service) => `<a href="${url(`hizmetler/${service.slug}`, prefix)}">${esc(service.title)}</a>`)
              .join("")}
          </div>
        </details>
        ${nav
          .slice(2)
          .map(([label, path, key]) => navLink(label, path, prefix, current === key))
          .join("")}
      </nav>
      <a class="header-cta" href="${site.whatsappUrl}">WhatsApp</a>
    </div>
  </header>`;
}

function navLink(label, path, prefix, active = false) {
  return `<a href="${url(path, prefix)}" ${active ? 'aria-current="page"' : ""}>${esc(label)}</a>`;
}

export function footer(prefix = "") {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <section class="footer-brand" aria-label="Fit Berry">
        ${image(assets.logo, "Fit Berry logosu", prefix, "footer-logo")}
        <p>Beslenme, pilates ve barre hizmetlerini bilimsel, kişiye özel ve sürdürülebilir yaklaşımla sunan sağlıklı yaşam merkezi.</p>
        <div class="social-links" aria-label="Sosyal medya bağlantıları">
          <a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a>
        </div>
      </section>
      <section>
        <h2>Menü</h2>
        <nav class="footer-links" aria-label="Alt menü">
          <a href="${url("", prefix)}">Ana Sayfa</a>
          <a href="${url("hakkimizda", prefix)}">Hakkımızda</a>
          <a href="${url("hizmetler", prefix)}">Hizmetler</a>
          <a href="${url("ekibimiz", prefix)}">Ekibimiz</a>
          <a href="${url("galeri", prefix)}">Galeri</a>
          <a href="${url("yorumlar", prefix)}">Danışan Yorumları</a>
          <a href="${url("iletisim", prefix)}">İletişim</a>
        </nav>
      </section>
      <section>
        <h2>Hizmetler</h2>
        <nav class="footer-links" aria-label="Hizmet bağlantıları">
          ${services.map((service) => `<a href="${url(`hizmetler/${service.slug}`, prefix)}">${esc(service.title)}</a>`).join("")}
        </nav>
      </section>
      <section>
        <h2>İletişim</h2>
        <address>
          <a href="${site.mapUrl}" target="_blank" rel="noopener">${esc(site.address)}</a>
          <a href="${site.phoneHref}">${site.phoneDisplay}</a>
          <a href="${site.emailHref}">${site.email}</a>
        </address>
        <div class="footer-hours">
          ${site.hours.map((hour) => `<span>${esc(hour)}</span>`).join("")}
        </div>
      </section>
    </div>
    <div class="container footer-bottom">
      <p>© ${new Date().getFullYear()} Fit Berry Sağlıklı Yaşam Merkezi. Tüm hakları saklıdır.</p>
      <a href="${site.mapUrl}" target="_blank" rel="noopener">Google Haritalar</a>
    </div>
  </footer>`;
}

export function floatingWhatsapp() {
  return `<a class="floating-whatsapp" href="${site.whatsappUrl}" aria-label="WhatsApp'tan bilgi al">WhatsApp</a>`;
}

export function pageHero({ kicker = "", title, text = "", imagePath = gallery[2].file, prefix = "", compact = false }) {
  return `<section class="page-hero ${compact ? "page-hero-compact" : ""}" style="--hero-image: url('${asset(imagePath, prefix)}')">
    <div class="hero-shade"></div>
    <div class="container page-hero-content">
      ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ""}
      <h1>${esc(title)}</h1>
      ${text ? `<p>${esc(text)}</p>` : ""}
    </div>
  </section>`;
}

export function sectionHeader(kicker, title, text = "") {
  return `<div class="section-header">
    ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ""}
    <h2>${esc(title)}</h2>
    ${text ? `<p>${esc(text)}</p>` : ""}
  </div>`;
}

export function serviceCard(service, prefix = "") {
  return `<article class="service-card">
    <a class="card-image" href="${url(`hizmetler/${service.slug}`, prefix)}">
      ${image(service.image, `${service.title} hizmet görseli`, prefix)}
    </a>
    <div class="card-body">
      <span class="pill">${esc(service.type)}</span>
      <h3>${esc(service.title)}</h3>
      <p>${esc(service.summary)}</p>
      ${buttonLink("Detaylı Bilgi", url(`hizmetler/${service.slug}`, prefix), "outline")}
    </div>
  </article>`;
}

export function serviceGrid(prefix = "") {
  return `<div class="service-grid">${services.map((service) => serviceCard(service, prefix)).join("")}</div>`;
}

export function reasonGrid(items) {
  return `<div class="reason-grid">${items
    .map(
      (item, index) => `<article class="reason-item">
        <span class="reason-number">${String(index + 1).padStart(2, "0")}</span>
        <h3>${esc(item)}</h3>
      </article>`,
    )
    .join("")}</div>`;
}

export function teamCard(member, prefix = "") {
  return `<article class="team-card">
    <a class="team-image" href="${url(`ekibimiz/${member.slug}`, prefix)}">
      ${image(member.image, `${member.name} profesyonel fotoğrafı`, prefix)}
    </a>
    <div class="team-copy">
      <p class="eyebrow">${esc(member.title)}</p>
      <h3>${esc(member.name)}</h3>
      <p>${esc(member.intro)}</p>
      ${buttonLink("Detaylı İncele", url(`ekibimiz/${member.slug}`, prefix), "outline")}
    </div>
  </article>`;
}

export function teamGrid(prefix = "") {
  return `<div class="team-grid">${team.map((member) => teamCard(member, prefix)).join("")}</div>`;
}

export function galleryPreview(prefix = "", limit = 6) {
  return galleryGrid(gallery.slice(0, limit), prefix, "gallery-preview-grid");
}

export function galleryGrid(items = gallery, prefix = "", className = "gallery-grid", id = "") {
  return `<div ${id ? `id="${esc(id)}"` : ""} class="${className}" data-lightbox-group="gallery">
    ${items
      .map(
        (item, index) => `<button class="gallery-item" type="button" data-category="${esc(item.category)}" data-lightbox-index="${index}" data-src="${asset(item.file, prefix)}" data-caption="${esc(item.title)} - ${esc(item.category)}">
          ${image(item.file, item.alt, prefix)}
          <span>
            <strong>${esc(item.title)}</strong>
            <small>${esc(item.category)}</small>
          </span>
        </button>`,
      )
      .join("")}
  </div>`;
}

export function reviewGrid(prefix = "", limit = reviews.length, className = "review-grid") {
  const items = reviews.slice(0, limit);
  return `<div class="${className}" data-lightbox-group="reviews">
    ${items
      .map(
        (review, index) => `<button class="review-card" type="button" data-lightbox-index="${index}" data-src="${asset(review.file, prefix)}" data-caption="Danışan yorumu ${index + 1}">
          ${image(review.file, review.alt, prefix)}
        </button>`,
      )
      .join("")}
  </div>`;
}

export function ctaBand(prefix = "") {
  return `<section class="cta-band">
    <div class="container cta-inner">
      <div>
        <p class="kicker">İletişime geçin</p>
        <h2>Sağlıklı yaşam yolculuğunuza Fit Berry ile başlayın.</h2>
        <p>Beslenme, pilates ve barre hizmetleri hakkında bilgi almak için bize doğrudan ulaşabilirsiniz.</p>
      </div>
      <div class="cta-actions">
        ${buttonLink("WhatsApp'tan Bilgi Al", site.whatsappUrl, "light")}
        ${buttonLink("Bizi Arayın", site.phoneHref, "dark")}
        ${buttonLink("Yol Tarifi Al", site.mapUrl, "outline-light")}
      </div>
    </div>
  </section>`;
}

export function statStrip() {
  return `<div class="stat-strip" aria-label="Fit Berry öne çıkan bilgiler">
    <div><strong>${site.foundingYear}</strong><span>Kuruluş yılı</span></div>
    <div><strong>4</strong><span>Ana hizmet alanı</span></div>
    <div><strong>Online</strong><span>ve yüz yüze seçenekler</span></div>
  </div>`;
}

export function profileList(title, items) {
  if (!items?.length) return "";
  return `<section class="profile-block">
    <h2>${esc(title)}</h2>
    ${list(items)}
  </section>`;
}

export function lightboxMarkup() {
  return `<div class="lightbox" data-lightbox hidden>
    <button type="button" class="lightbox-close" data-lightbox-close aria-label="Görseli kapat">×</button>
    <button type="button" class="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="Önceki görsel">‹</button>
    <figure>
      <img src="" alt="">
      <figcaption></figcaption>
    </figure>
    <button type="button" class="lightbox-nav lightbox-next" data-lightbox-next aria-label="Sonraki görsel">›</button>
  </div>`;
}
