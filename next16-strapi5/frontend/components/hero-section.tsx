import { STRAPI_BASE_URL } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";

const styles = {
  header: "relative min-h-[100dvh] w-full overflow-hidden isolate",
  backgroundImage:
    "absolute inset-0 h-full w-full object-cover scale-105",
  backgroundGlow:
    "absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75",
  overlay:
    "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.65))]",
  content:
    "relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-6 py-16 sm:px-10 lg:px-16",
  contentInner:
    "flex max-w-4xl flex-col items-center text-center",
  badge:
    "mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-md",
  heading:
    "max-w-4xl text-balance text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  subheading:
    "mt-6 max-w-2xl text-pretty text-base leading-7 text-white/80 sm:text-lg md:text-xl md:leading-8",
  actions:
    "mt-10 flex flex-col items-center gap-4 sm:flex-row",
  primaryButton:
    "inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_16px_40px_rgba(255,255,255,0.22)]",
  secondaryHint:
    "text-sm text-white/60",
  bottomFade:
    "absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/40 to-transparent",
};

export function HeroSection({
  data,
}: {
  readonly data: {
    heading: string;
    subHeading: string;
    link: { href: string; label: string };
    image: { url: string; alternativeText: string };
  };
}) {
  if (!data) return null;

  const { heading, subHeading, link } = data;

  const imageURL = data.image?.url.startsWith("http")
    ? data.image.url
    : `${STRAPI_BASE_URL}${data.image.url}`;

  return (
    <header className={styles.header}>
      <Image
        alt={data.image?.alternativeText || heading || "Hero background"}
        className={styles.backgroundImage}
        src={imageURL}
        fill
        priority
        sizes="100vw"
      />

      <div className={styles.backgroundGlow} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <span className={styles.badge}>Welcome</span>

          <h1 className={styles.heading}>{heading}</h1>

          <p className={styles.subheading}>{subHeading}</p>

          <div className={styles.actions}>
            <Link className={styles.primaryButton} href={link.href}>
              {link.label}
            </Link>

            <span className={styles.secondaryHint}>
              Build and launch AI products faster
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottomFade} />
    </header>
  );
}
