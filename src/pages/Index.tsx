import { useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/184dbe41-69bc-440d-9fea-81f965133c73/files/bb4d8d73-1470-4d3b-a24a-e221b87ba096.jpg";
const DOWNLOAD_LINK = "https://disk.yandex.ru/d/Feh_jdX_fTCEsA";

const STATS = [
  { value: "120 000+", label: "Игроков" },
  { value: "8", label: "Серверов" },
  { value: "5", label: "Лет онлайн" },
  { value: "24/7", label: "Поддержка" },
];

const FEATURES = [
  {
    icon: "Shield",
    title: "Уникальная экономика",
    desc: "Реалистичная экономическая система с бизнесом, банками и криминальными структурами",
  },
  {
    icon: "Users",
    title: "Живые персонажи",
    desc: "Создай своего уникального персонажа и проживи настоящую жизнь в мире GTA RP",
  },
  {
    icon: "Sword",
    title: "Криминальный мир",
    desc: "Банды, картели, мафия — присоединяйся или создай свою организацию",
  },
  {
    icon: "Car",
    title: "1000+ транспорта",
    desc: "Огромный автопарк от дешёвых тачек до эксклюзивных суперкаров",
  },
  {
    icon: "Building2",
    title: "Собственный бизнес",
    desc: "Открывай магазины, клубы, заводы и зарабатывай реальные деньги",
  },
  {
    icon: "Trophy",
    title: "Ивенты и турниры",
    desc: "Регулярные мероприятия с денежными призами и уникальными наградами",
  },
];

const NEWS = [
  {
    tag: "Обновление",
    date: "10 МАЯ 2026",
    title: "Крупное обновление 3.5 — Новый район и транспорт",
    desc: "Добавлен новый промышленный район, 40+ новых транспортных средств и переработана система полиции.",
  },
  {
    tag: "Ивент",
    date: "08 МАЯ 2026",
    title: "Турнир по уличным гонкам — призовой фонд 500 000₽",
    desc: "Регистрация открыта. Участвуй в самом масштабном гоночном событии сезона.",
  },
  {
    tag: "Патч",
    date: "05 МАЯ 2026",
    title: "Исправления и балансировка оружия",
    desc: "Оптимизация серверов, исправлено 120+ багов, перебалансировано огнестрельное оружие.",
  },
];

const NAV_LINKS = [
  { label: "О сервере", href: "#features" },
  { label: "Новости", href: "#" },
  { label: "Правила", href: "#" },
  { label: "Донат", href: "#" },
  { label: "Форум", href: "https://whg111513.sampproject.ru/" },
];

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#0d0d0d", fontFamily: "'Roboto', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,20,20,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-bebas text-white text-lg animate-pulse-red"
              style={{ background: "linear-gradient(135deg, #cc1111, #800a0a)" }}
            >
              BR
            </div>
            <span
              className="text-white font-bold tracking-widest text-sm"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.25em" }}
            >
              BRILLIANT<span style={{ color: "#cc1111" }}>RUSSIA</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm transition-colors"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#cc1111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-red items-center gap-2 px-5 py-2 rounded text-white font-bold text-sm"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
          >
            <Icon name="Play" size={14} />
            НАЧАТЬ ИГРАТЬ
          </a>

          <button
            className="md:hidden"
            style={{ color: "rgba(255,255,255,0.7)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-6 pb-4 flex flex-col gap-3"
            style={{ borderTop: "1px solid rgba(200,20,20,0.15)" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="py-2 text-sm"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red text-center py-3 rounded text-white font-bold text-sm mt-2"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
            >
              НАЧАТЬ ИГРАТЬ
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: 64 }}
      >
        {/* BG */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.25) saturate(0.8)",
          }}
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.0) 40%, rgba(13,13,13,0.7) 80%, #0d0d0d 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,20,20,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 mb-6">
            <span className="tag-red">GTA RP Сервер №1 в России</span>
          </div>

          <h1
            className="animate-fade-up delay-200 text-white leading-none mb-2"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(64px, 12vw, 140px)",
              letterSpacing: "0.05em",
            }}
          >
            BRILLIANT
          </h1>
          <h1
            className="animate-fade-up delay-300 leading-none mb-8 red-glow-text animate-flicker"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(64px, 12vw, 140px)",
              letterSpacing: "0.05em",
              color: "#cc1111",
            }}
          >
            RUSSIA
          </h1>

          <p
            className="animate-fade-up delay-400 text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}
          >
            Живи по своим правилам. Строй империю. Стань легендой.
            <br />
            Самый реалистичный GTA RP сервер на платформе SAMP.
          </p>

          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={DOWNLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red flex items-center gap-3 px-10 py-4 rounded text-white font-bold text-lg w-full sm:w-auto justify-center"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.12em" }}
            >
              <Icon name="Download" size={20} />
              НАЧАТЬ ИГРАТЬ
            </a>
            <a
              href="#features"
              className="btn-outline-red flex items-center gap-2 px-8 py-4 rounded font-bold text-sm w-full sm:w-auto justify-center"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.12em" }}
            >
              <Icon name="Info" size={16} />
              О СЕРВЕРЕ
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <span style={{ fontSize: "0.65rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.2em" }}>SCROLL</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ── STATS TICKER ── */}
      <div
        style={{
          background: "#cc1111",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x"
            style={{ divideColor: "rgba(255,255,255,0.2)" }}>
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-5 px-4">
                <span
                  className="font-bebas text-white text-3xl leading-none"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Возможности</p>
            <div className="divider-red w-24 mx-auto mb-6" />
            <h2
              className="text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: "0.06em",
              }}
            >
              ПОЧЕМУ BRILLIANT RUSSIA?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="card-dark rounded-lg p-7"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded mb-5 flex items-center justify-center"
                  style={{ background: "rgba(200,20,20,0.12)", border: "1px solid rgba(200,20,20,0.2)" }}
                >
                  <Icon name={f.icon} size={22} style={{ color: "#cc1111" }} />
                </div>
                <h3
                  className="text-white font-bold mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", letterSpacing: "0.04em" }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-20 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-2">Новости</p>
              <div className="divider-red w-16 mb-4" />
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  letterSpacing: "0.06em",
                }}
              >
                ПОСЛЕДНИЕ СОБЫТИЯ
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm btn-outline-red px-4 py-2 rounded"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
            >
              ВСЕ НОВОСТИ
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {NEWS.map((n) => (
              <article
                key={n.title}
                className="card-dark rounded-lg overflow-hidden cursor-pointer group"
              >
                <div
                  className="h-1"
                  style={{ background: "linear-gradient(90deg, #cc1111, transparent)" }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="tag-red">{n.tag}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.08em" }}>
                      {n.date}
                    </span>
                  </div>
                  <h3
                    className="text-white font-bold mb-3 group-hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", letterSpacing: "0.02em", lineHeight: 1.4 }}
                  >
                    {n.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.83rem", lineHeight: 1.7 }}>
                    {n.desc}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-5 text-xs"
                    style={{ color: "#cc1111", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.1em" }}
                  >
                    ЧИТАТЬ <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(200,20,20,0.08) 0%, transparent 60%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "brightness(0.08) saturate(0.5)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0d0d0d 0%, transparent 30%, transparent 70%, #0d0d0d 100%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">Присоединяйся сейчас</p>
          <div className="divider-red w-20 mx-auto mb-8" />
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 6vw, 76px)",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            ТВОЯ ИСТОРИЯ<br />
            <span style={{ color: "#cc1111" }} className="red-glow-text">НАЧИНАЕТСЯ ЗДЕСЬ</span>
          </h2>
          <p className="mb-10" style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.8 }}>
            Скачай клиент, создай персонажа и окунись в мир, где<br className="hidden md:block" />
            каждое твоё решение меняет историю сервера
          </p>
          <a
            href={DOWNLOAD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red inline-flex items-center gap-3 px-12 py-5 rounded text-white font-bold text-xl"
            style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.15em" }}
          >
            <Icon name="Download" size={22} />
            СКАЧАТЬ И ИГРАТЬ
          </a>
          <p className="mt-4" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
            Бесплатно · Быстрый запуск · Без регистрации
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#090909",
          borderTop: "1px solid rgba(200,20,20,0.12)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded flex items-center justify-center font-bebas text-white text-sm"
                style={{ background: "linear-gradient(135deg, #cc1111, #800a0a)" }}
              >
                BR
              </div>
              <span
                className="text-white font-bold"
                style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.2em", fontSize: "0.85rem" }}
              >
                BRILLIANT<span style={{ color: "#cc1111" }}>RUSSIA</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.75rem",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#cc1111")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem" }}>
              © 2026 BlackRussia. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}