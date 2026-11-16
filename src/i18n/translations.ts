export type Locale = "vi" | "en";

export const locales: Locale[] = ["vi", "en"];

export const defaultLocale: Locale = "vi";

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const dict = {
  vi: {
    siteName: "MMO For Free",
    tagline: "Kiến thức kiếm tiền online, chia sẻ miễn phí & minh bạch",
    nav_home: "Trang chủ",
    nav_github: "GitHub",
    hero_title: "Kiếm tiền online, bắt đầu từ kiến thức đúng.",
    hero_subtitle:
      "Tổng hợp kinh nghiệm thực tế về MMO (Make Money Online): affiliate, freelance, content, airdrop... Không bán khoá học, không mời đầu tư, chỉ chia sẻ miễn phí.",
    search_placeholder: "Tìm bài viết theo tên, chủ đề...",
    filter_all: "Tất cả",
    read_more: "Đọc tiếp",
    reading_time: "{n} phút đọc",
    published_on: "Đăng ngày",
    back_home: "Về trang chủ",
    all_articles: "Toàn bộ bài viết",
    no_results: "Không tìm thấy bài viết phù hợp.",
    not_found_title: "Không tìm thấy trang",
    not_found_desc: "Bài viết hoặc trang bạn tìm không còn tồn tại.",
    related_title: "Bài viết liên quan",
    footer_disclaimer:
      "Nội dung mang tính chia sẻ kinh nghiệm cá nhân, không phải lời khuyên tài chính hay đầu tư.",
    footer_madeby: "Mã nguồn mở trên",
    toggle_lang: "Chuyển ngôn ngữ",
    article_unavailable_in_lang: "Bài viết này chưa có bản dịch, đang xem bản gốc.",
    article_count: "{n} bài viết",
  },
  en: {
    siteName: "MMO For Free",
    tagline: "Make-money-online knowledge, shared free & transparent",
    nav_home: "Home",
    nav_github: "GitHub",
    hero_title: "Make money online, starting with the right knowledge.",
    hero_subtitle:
      "Practical write-ups on MMO (Make Money Online): affiliate, freelancing, content, airdrops and more. No paid courses, no investment pitches — just free knowledge.",
    search_placeholder: "Search articles by title, topic...",
    filter_all: "All",
    read_more: "Read more",
    reading_time: "{n} min read",
    published_on: "Published",
    back_home: "Back to home",
    all_articles: "All articles",
    no_results: "No matching articles found.",
    not_found_title: "Page not found",
    not_found_desc: "The article or page you're looking for no longer exists.",
    related_title: "Related articles",
    footer_disclaimer:
      "Content reflects personal experience and is not financial or investment advice.",
    footer_madeby: "Open-sourced on",
    toggle_lang: "Switch language",
    article_unavailable_in_lang: "No translation yet — showing the original.",
    article_count: "{n} articles",
  },
} as const;

export type DictKey = keyof typeof dict.vi;

export function translate(locale: Locale, key: DictKey, vars?: Record<string, string | number>) {
  let str: string = dict[locale][key] ?? dict[defaultLocale][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
  }
  return str;
}
