# MMO For Free

Trang web tĩnh (static, không backend) chia sẻ kiến thức kiếm tiền online (MMO), song ngữ **Tiếng Việt / English**. Xây bằng **SolidJS + Vite + Tailwind CSS v4**, deploy trên **Vercel**.

- Chỉ 2 loại trang: **Trang chủ** (danh sách bài viết, tìm kiếm, lọc theo tag) và **Trang chi tiết bài viết**.
- Nội dung là file Markdown tĩnh, build ra site tĩnh hoàn toàn — không CMS, không database, không server.
- Responsive đầy đủ Mobile / Tablet / Desktop, hỗ trợ light/dark theo hệ thống.

## Chạy thử local

```bash
npm install
npm run dev
```

Mở `http://localhost:5173/vi` (hoặc `/en`).

```bash
npm run build     # build ra thư mục dist/
npm run preview   # xem thử bản build
```

## Thêm bài viết mới

Mỗi bài viết là 1 file Markdown trong `src/content/vi/*.md` (bản tiếng Việt) và `src/content/en/*.md` (bản tiếng Anh), với phần front matter ở dạng **JSON** giữa hai dòng `---`:

```markdown
---
{
  "id": "ten-bai-viet-dung-chung-2-ngon-ngu",
  "slug": "duong-dan-rieng-cho-ngon-ngu-nay",
  "title": "Tiêu đề bài viết",
  "excerpt": "Mô tả ngắn hiển thị ở trang chủ.",
  "date": "2026-03-01",
  "tags": ["tag1", "tag2"],
  "accent": "violet"
}
---

## Nội dung Markdown bình thường ở đây...
```

- **`id`**: giữ **giống nhau** giữa bản VI và bản EN của cùng một bài — dùng để nút chuyển ngôn ngữ nhảy đúng sang bản dịch tương ứng.
- **`slug`**: có thể khác nhau giữa 2 ngôn ngữ (nên đặt theo ngôn ngữ đó cho đẹp URL/SEO).
- **`accent`**: một trong `violet | cyan | amber | rose | emerald` — quyết định màu gradient của card.
- Nếu một bài chỉ có bản VI (chưa dịch sang EN), site sẽ tự hiển thị bản VI kèm cảnh báo nhỏ "chưa có bản dịch" khi người dùng xem ở chế độ EN — không bị lỗi 404.
- Không cần đụng vào code: cứ thêm file `.md` mới, chạy lại `npm run dev` / `npm run build` là bài viết tự xuất hiện trên trang chủ (sắp xếp theo `date` mới nhất lên đầu).

## Cấu trúc thư mục chính

```
src/
  content/vi/*.md     # Bài viết tiếng Việt
  content/en/*.md     # Bài viết tiếng Anh
  i18n/                # Chuỗi dịch giao diện (translations.ts) + context
  lib/content.ts       # Loader đọc & parse markdown (import.meta.glob)
  components/          # Header, Footer, ArticleCard, LanguageSwitch
  pages/                # Home.tsx, Article.tsx, NotFound.tsx
  App.tsx               # Định tuyến /:lang, /:lang/bai-viet/:slug
```

## Deploy lên Vercel

1. Push code lên GitHub (repo `nhockool1002/mmo-for-free`).
2. Trên Vercel: **New Project** → import repo này.
3. Framework Preset: **Vite**. Build command: `npm run build`. Output: `dist` (đã cấu hình sẵn trong `vercel.json`, bao gồm rewrite SPA về `index.html` để các URL như `/vi/bai-viet/...` không bị 404 khi truy cập trực tiếp).
4. Không cần biến môi trường — site hoàn toàn tĩnh, không gọi API nào.
5. **Sau khi có domain thật** (Vercel tự cấp hoặc domain riêng), cập nhật `SITE_URL` trong [`src/lib/seo.ts`](src/lib/seo.ts), các URL tuyệt đối trong [`public/sitemap.xml`](public/sitemap.xml) và [`public/robots.txt`](public/robots.txt) — hiện đang để tạm `https://mmo-for-free.vercel.app`.

## Ghi chú thiết kế

Giao diện dùng thang màu OKLCH, typography/spacing co giãn (fluid, `clamp()`), hiệu ứng chuyển động chỉ trên `transform`/`opacity`, tôn trọng `prefers-reduced-motion` và `prefers-color-scheme`, kích thước chạm tối thiểu 44px — theo tinh thần "modern web design" hiện đại, tối giản, không hiệu ứng thừa.

Nội dung mẫu trong repo chỉ mang tính minh hoạ cấu trúc — nên thay bằng nội dung thật trước khi public chính thức.
