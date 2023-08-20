import { HomeBanners } from "@/components/HomeBanners"
import { HomeFeatures } from "@/components/HomeFeatures"
import { IconCarousel } from "@/components/core/Carousel/IconCarousel"
import HomeIntroduction from "@/components/core/home/HomeIntroduction"

export default async function IndexPage() {
  return (
    <>
      <HomeIntroduction title="Showcasing various UI's and features i've built." />
      <HomeFeatures />
      <HomeBanners />
      <IconCarousel />
    </>
  )
}
