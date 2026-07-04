import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  asset,
  buttonLink,
  ctaBand,
  esc,
  galleryGrid,
  galleryPreview,
  image,
  layout,
  list,
  pageHero,
  profileList,
  reasonGrid,
  reviewGrid,
  sectionHeader,
  serviceGrid,
  statStrip,
  teamGrid,
  todoNote,
  url,
} from "./components.mjs";
import {
  assets,
  foundingStory,
  gallery,
  introText,
  mission,
  pages,
  reasons,
  reviews,
  services,
  site,
  team,
  values,
  vision,
} from "./data.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function prefixFor(route = "") {
  if (!route) return "";
  return "../".repeat(route.split("/").length);
}

async function writePage(route, html) {
  const file = route ? join(root, route, "index.html") : join(root, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
}

function page(route, meta, current, children) {
  return layout({
    title: meta.title,
    description: meta.description,
    current,
    prefix: prefixFor(route),
    children,
  });
}

function homePage() {
  const prefix = "";
  const children = `
    <section class="home-hero" style="--hero-image: url('${asset(gallery[2].file, prefix)}')">
      <div class="hero-shade"></div>
      <div class="container hero-content">
        ${image(assets.logoWide, "Fit Berry logosu", prefix, "hero-logo", "eager")}
        <p class="kicker">Beslenme, pilates ve barre</p>
        <h1>Beslenme ve hareketi aynı çatı altında buluşturan sağlıklı yaşam merkezi.</h1>
        <p>Beslenme, pilates ve barreyi bilimsel, kişiye özel ve sürdürülebilir yaklaşımla bir araya getiriyoruz.</p>
        <div class="hero-actions">
          ${buttonLink("Hizmetleri İncele", url("hizmetler", prefix), "primary")}
          ${buttonLink("WhatsApp'tan Bilgi Al", site.whatsappUrl, "light")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container intro-grid">
        <div>
          ${sectionHeader("Kısa tanıtım", "Bilimsel, kişiye özel ve sürdürülebilir yaklaşım", introText)}
          ${statStrip()}
        </div>
        <figure class="intro-image">
          ${image(gallery[8].file, "Fit Berry diyetisyen görüşme odası", prefix)}
        </figure>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        ${sectionHeader("Hizmetlerimiz", "Beslenme, pilates ve barre hizmetleri", "Fit Berry'de yüz yüze ve online hizmet seçenekleri bir arada sunulur.")}
        ${serviceGrid(prefix)}
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${sectionHeader("Neden Fit Berry?", "Güven veren, yakın takipli ve özenli hizmet", "Fit Berry yaklaşımı beslenme ve hareketi birlikte ele alan profesyonel bir deneyim üzerine kurulur.")}
        ${reasonGrid(reasons)}
      </div>
    </section>

    <section class="section section-warm">
      <div class="container">
        ${sectionHeader("Ekibimiz", "Fit Berry'nin arkasındaki iki güçlü profil", "Kurucu yönetim ve uzman hizmet yaklaşımı aynı marka çatısında buluşur.")}
        ${teamGrid(prefix)}
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${sectionHeader("Ofisimizden", "Ferah, sade ve özenli bir çalışma ortamı", "Pilates ve barre salonu, diyetisyen odası, bekleme alanı ve ofis detaylarından seçilmiş görseller.")}
        ${galleryPreview(prefix, 6)}
        <div class="hero-actions">
          ${buttonLink("Galeriyi İncele", url("galeri", prefix), "outline")}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        ${sectionHeader("Danışan yorumları", "Danışanlarımız Fit Berry deneyimini anlatıyor", "Google yorum ekran görüntülerinden seçilen yorumlar.")}
        ${reviewGrid(prefix, 4, "review-strip")}
        <div class="hero-actions">
          ${buttonLink("Yorumları İncele", url("yorumlar", prefix), "outline")}
        </div>
      </div>
    </section>

    ${ctaBand(prefix)}
  `;

  return page("", pages.home, "home", children);
}

function aboutPage() {
  const route = "hakkimizda";
  const prefix = prefixFor(route);
  const children = `
    ${pageHero({
      kicker: "Hakkımızda",
      title: "Fit Berry Hakkında",
      text: "Beslenme ve hareketi aynı çatı altında buluşturan Fit Berry'nin kuruluş hikayesi, değerleri ve marka yaklaşımı.",
      imagePath: gallery[4].file,
      prefix,
    })}
    <section class="section">
      <div class="container intro-grid">
        <div>
          ${sectionHeader("Kuruluş hikayemiz", "Fit Berry, 2024 yılında İskenderun'da kuruldu", foundingStory)}
          ${statStrip()}
        </div>
        <figure class="intro-image">
          ${image(assets.logoWide, "Fit Berry kurumsal logo görseli", prefix)}
        </figure>
      </div>
    </section>
    <section class="section section-soft">
      <div class="container content-grid">
        <article class="content-panel">
          <h2>Misyonumuz</h2>
          <p>${esc(mission)}</p>
        </article>
        <article class="content-panel">
          <h2>Vizyonumuz</h2>
          <p>${esc(vision)}</p>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHeader("Değerlerimiz", "Güven veren hizmet anlayışı", "Fit Berry'nin çalışma yaklaşımı kalite, disiplin ve danışan memnuniyeti etrafında şekillenir.")}
        <div class="values-grid">
          ${values.map((value) => `<article class="value-card"><h3>${esc(value)}</h3></article>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section-warm">
      <div class="container certificate-layout" data-lightbox-group="certificate">
        <button class="certificate-button" type="button" data-src="${asset(assets.certificate, prefix)}" data-caption="Fit Berry marka tescil belgesi">
          ${image(assets.certificate, "Fit Berry marka tescil belgesi", prefix)}
        </button>
        <div>
          ${sectionHeader("Marka tescili", "Fit Berry marka tescil belgesi", "Marka tescil belgesi sade ve kurumsal bir bölümde gösterilmiştir. Görseli büyütmek için belgeye tıklayabilirsiniz.")}
        </div>
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, pages.about, "about", children);
}

function servicesPage() {
  const route = "hizmetler";
  const prefix = prefixFor(route);
  const children = `
    ${pageHero({
      kicker: "Hizmetler",
      title: "Fit Berry hizmetleri",
      text: "Yüz yüze ve online beslenme danışmanlığı, barre & mat pilates ve ücretsiz ön görüşme seçenekleri.",
      imagePath: gallery[2].file,
      prefix,
    })}
    <section class="section">
      <div class="container">
        ${sectionHeader("Tüm hizmetler", "Size uygun hizmeti seçin", "Hizmet metinleri kaynak dosyalardaki kapsam korunarak düzenlenmiştir.")}
        ${serviceGrid(prefix)}
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, pages.services, "services", children);
}

function serviceDetailPage(service) {
  const route = `hizmetler/${service.slug}`;
  const prefix = prefixFor(route);
  const meta = {
    title: `${service.title} | Fit Berry Sağlıklı Yaşam Merkezi`,
    description: service.summary,
  };
  const packageMarkup = service.packageInfo.startsWith("TODO:")
    ? todoNote(service.packageInfo)
    : `<span>${esc(service.packageInfo)}</span>`;
  const processItems = service.process
    .map((item) => (item.startsWith("TODO:") ? todoNote(item) : `<li>${esc(item)}</li>`))
    .join("");
  const children = `
    ${pageHero({
      kicker: service.type,
      title: service.title,
      text: service.summary,
      imagePath: service.image,
      prefix,
      compact: true,
    })}
    <section class="section">
      <div class="container service-detail-grid">
        <div class="detail-stack">
          <figure class="service-main-image">
            ${image(service.image, `${service.title} görseli`, prefix)}
          </figure>
          <article class="detail-card">
            <h2>Kısa tanıtım</h2>
            <p>${esc(service.summary)}</p>
          </article>
          <article class="detail-card">
            <h2>Kimler için uygun?</h2>
            ${list(service.suitableFor)}
          </article>
          <article class="detail-card">
            <h2>Hizmet süreci</h2>
            <ul class="check-list">${processItems}</ul>
          </article>
          <article class="detail-card">
            <h2>Temel faydalar</h2>
            ${list(service.benefits)}
          </article>
          <article class="detail-card">
            <h2>Sık sorulan kısa sorular</h2>
            <div class="faq-list">
              ${service.faqs
                .map(
                  (faq) => `<details>
                    <summary>${esc(faq.q)}</summary>
                    <p>${esc(faq.a)}</p>
                  </details>`,
                )
                .join("")}
            </div>
          </article>
        </div>
        <aside class="detail-stack">
          <div class="detail-card">
            <h2>Hizmet bilgileri</h2>
            <div class="detail-meta">
              <div><strong>Sunum şekli</strong><span>${esc(service.format)}</span></div>
              <div><strong>Bireysel / grup</strong><span>${esc(service.audience)}</span></div>
              <div><strong>Seans / paket</strong>${packageMarkup}</div>
            </div>
          </div>
          <div class="detail-card">
            <h2>Bilgi alın</h2>
            <p>Hizmet hakkında detaylı bilgi almak için Fit Berry ile doğrudan iletişime geçebilirsiniz.</p>
            <div class="contact-actions">
              ${buttonLink("WhatsApp'tan Bilgi Al", site.whatsappUrl, "primary")}
              ${buttonLink("Bizi Arayın", site.phoneHref, "outline")}
            </div>
          </div>
        </aside>
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, meta, "services", children);
}

function teamPage() {
  const route = "ekibimiz";
  const prefix = prefixFor(route);
  const children = `
    ${pageHero({
      kicker: "Ekibimiz",
      title: "Fit Berry ekibi",
      text: "Beslenme, hareket, marka yönetimi ve operasyonel kaliteyi bir araya getiren iki ayrı profil.",
      imagePath: gallery[5].file,
      prefix,
    })}
    <section class="section">
      <div class="container">
        ${sectionHeader("Profiller", "Kurucu yönetim ve uzman hizmet yaklaşımı", "Her profil kendi uzmanlık alanı, deneyimi ve Fit Berry yaklaşımıyla tanıtılmıştır.")}
        ${teamGrid(prefix)}
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, pages.team, "team", children);
}

function memberProfilePage(member) {
  const route = `ekibimiz/${member.slug}`;
  const prefix = prefixFor(route);
  const meta = {
    title: `${member.name} | ${member.title} | Fit Berry`,
    description: member.intro,
  };

  const sidebar =
    member.slug === "cansu-zidanoglu"
      ? `
        ${profileList("Eğitim bilgileri", member.education)}
        ${profileList("Sertifikalar", member.certificates)}
        ${profileList("Uzmanlık alanları", member.expertise)}
        ${profileList("Sunduğu hizmetler", member.services)}
      `
      : `
        ${profileList("Eğitim bilgileri", member.education)}
        ${profileList("İş deneyimi", member.experience)}
        ${profileList("Yönettiği alanlar", member.managedAreas)}
      `;

  const extra =
    member.slug === "cansu-zidanoglu"
      ? `
        <article class="content-panel">
          <h2>Beslenme ve hareket yaklaşımı</h2>
          <p>${esc(member.approach)}</p>
        </article>
      `
      : `
        <article class="content-panel">
          <h2>Fit Berry'nin kuruluşundaki rolü</h2>
          <p>${esc(member.role)}</p>
        </article>
        <article class="content-panel">
          <h2>Marka vizyonu</h2>
          <p>${esc(member.vision)}</p>
        </article>
        <article class="content-panel">
          <h2>Yönetim yaklaşımı</h2>
          <p>${esc(member.approach)}</p>
        </article>
      `;

  const children = `
    <section class="profile-hero">
      <div class="container profile-hero-grid">
        <figure class="profile-photo">
          ${image(member.image, `${member.name} profesyonel fotoğrafı`, prefix, "", "eager")}
        </figure>
        <div>
          <p class="kicker">${esc(member.title)}</p>
          <h1>${esc(member.name)}</h1>
          <p>${esc(member.intro)}</p>
          <div class="hero-actions">
            ${buttonLink("WhatsApp'tan Bilgi Al", site.whatsappUrl, "primary")}
            ${buttonLink("Ekibi Gör", url("ekibimiz", prefix), "outline")}
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container profile-layout">
        <div class="profile-copy">
          <article class="content-panel">
            <h2>Biyografi</h2>
            ${member.bio.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
          </article>
          ${extra}
        </div>
        <aside class="profile-sidebar">
          ${sidebar}
        </aside>
      </div>
    </section>
    ${ctaBand(prefix)}
  `;

  return page(route, meta, "team", children);
}

function galleryPage() {
  const route = "galeri";
  const prefix = prefixFor(route);
  const categories = ["Tümü", ...new Set(gallery.map((item) => item.category))];
  const children = `
    ${pageHero({
      kicker: "Galeri",
      title: "Fit Berry ofisinden",
      text: "Pilates ve barre salonu, diyetisyen odası, yönetici odası, bekleme alanı ve ofis detayları.",
      imagePath: gallery[0].file,
      prefix,
    })}
    <section class="section">
      <div class="container">
        ${sectionHeader("Ofis fotoğrafları", "Modern ve özenli çalışma ortamı", "Fotoğraflar kategorilere ayrılmıştır. Görsele tıklayarak büyütebilir, sağ ve sol geçişleri kullanabilirsiniz.")}
        <div class="category-tabs" data-gallery-filter data-target="#gallery-grid">
          ${categories
            .map(
              (category, index) => `<button type="button" data-filter="${esc(category)}" aria-pressed="${index === 0 ? "true" : "false"}">${esc(category)}</button>`,
            )
            .join("")}
        </div>
        ${galleryGrid(gallery, prefix, "gallery-grid", "gallery-grid")}
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, pages.gallery, "gallery", children);
}

function reviewsPage() {
  const route = "yorumlar";
  const prefix = prefixFor(route);
  const children = `
    ${pageHero({
      kicker: "Danışan yorumları",
      title: "Danışanlarımız Fit Berry deneyimini anlatıyor.",
      text: "Google yorum ekran görüntüleri estetik ve mobil uyumlu kart düzeninde gösterilir.",
      imagePath: gallery[8].file,
      prefix,
    })}
    <section class="section">
      <div class="container">
        ${sectionHeader("Google yorumları", "Güven veren danışan deneyimleri", "Yorum görsellerine tıklayarak büyütebilir ve tüm yorumlar arasında gezinebilirsiniz.")}
        ${reviewGrid(prefix, reviews.length, "review-grid")}
        <div class="hero-actions">
          ${buttonLink("Google Haritalar'da Gör", site.mapUrl, "outline")}
        </div>
      </div>
    </section>
    ${ctaBand(prefix)}
  `;
  return page(route, pages.reviews, "reviews", children);
}

function contactPage() {
  const route = "iletisim";
  const prefix = prefixFor(route);
  const children = `
    ${pageHero({
      kicker: "İletişim",
      title: "Fit Berry ile iletişime geçin",
      text: "Telefon, WhatsApp, e-posta, sosyal medya ve Google Haritalar bağlantıları üzerinden bize ulaşabilirsiniz.",
      imagePath: gallery[13].file,
      prefix,
    })}
    <section class="section">
      <div class="container contact-grid">
        <div class="contact-stack">
          <article class="contact-card">
            <h2>İletişim bilgileri</h2>
            <address>
              <a href="${site.mapUrl}" target="_blank" rel="noopener">${esc(site.address)}</a>
              <a href="${site.phoneHref}">${site.phoneDisplay}</a>
              <a href="${site.emailHref}">${site.email}</a>
              <a href="${site.whatsappUrl}">WhatsApp'tan Bilgi Al</a>
            </address>
            <div class="contact-actions">
              ${buttonLink("WhatsApp'tan Bilgi Al", site.whatsappUrl, "primary")}
              ${buttonLink("Bizi Arayın", site.phoneHref, "outline")}
              ${buttonLink("Yol Tarifi Al", site.mapUrl, "outline")}
            </div>
          </article>
          <article class="contact-card">
            <h2>Çalışma günleri ve saatleri</h2>
            <div class="hours-list">
              ${site.hours.map((hour) => `<span>${esc(hour)}</span>`).join("")}
            </div>
          </article>
          <article class="contact-card">
            <h2>Sosyal medya</h2>
            <address>
              <a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a>
              <a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a>
            </address>
            ${todoNote("Diğer sosyal medya bağlantıları için kaynak dosyalarda ek bağlantı bulunmuyor.")}
          </article>
        </div>
        <div class="map-frame" aria-label="Google Haritalar konumu">
          <iframe src="${site.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Fit Berry Google Haritalar konumu"></iframe>
        </div>
      </div>
    </section>
  `;
  return page(route, pages.contact, "contact", children);
}

async function build() {
  await writePage("", homePage());
  await writePage("hakkimizda", aboutPage());
  await writePage("hizmetler", servicesPage());
  for (const service of services) {
    await writePage(`hizmetler/${service.slug}`, serviceDetailPage(service));
  }
  await writePage("ekibimiz", teamPage());
  for (const member of team) {
    await writePage(`ekibimiz/${member.slug}`, memberProfilePage(member));
  }
  await writePage("galeri", galleryPage());
  await writePage("yorumlar", reviewsPage());
  await writePage("iletisim", contactPage());
}

build();
