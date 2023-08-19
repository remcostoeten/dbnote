import { HomeBanners } from "@/components/HomeBanners"
import { HomeFeatures } from "@/components/HomeFeatures"
import { HomeIntroduction } from "@/components/HomeIntroduction"
import { IconCarousel } from "@/components/core/Carousel/IconCarousel"

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
