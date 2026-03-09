import { HeroSection } from '@/components/hero-section';
import { getHomePage } from '@/lib/strapi';

export async function generateMetadata() {
  const strapiData = await getHomePage()
  return {
    title: strapiData?.title,
    description: strapiData?.description,
  }
}

export default async function Home() {
  const strapiData = await getHomePage();

  const [heroSection] = strapiData?.sections || []

  return (
    <HeroSection data={heroSection} />
  );
}
