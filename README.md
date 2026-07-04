# Fit Berry Sağlıklı Yaşam Merkezi Web Sitesi

Bu klasör Fit Berry için hazırlanmış statik, çok sayfalı frontend web sitesini içerir.

## Yapı

- `src/data.mjs`: Marka bilgileri, hizmetler, ekip profilleri, galeri ve yorum içerikleri.
- `src/components.mjs`: Header, footer, kartlar, CTA, galeri, yorum ve layout componentleri.
- `src/build.mjs`: Tüm HTML sayfalarını üretir.
- `assets/`: Optimize edilmiş WebP görseller, CSS ve JavaScript.
- `index.html` ve klasör bazlı sayfalar: Yayına hazır statik çıktı.

## Komutlar

```bash
npm run build
npm run serve
```

`npm run serve` sonrası site `http://localhost:4173` adresinden görüntülenebilir.
