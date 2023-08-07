'use client'; import React from 'react'
import ToolCard from '@/components/CardComponent'
import { banners } from '@/components/CardContainer'

export const HomeBanners = () => {
  return (
    <div className="container">
      <div className="grid mx-auto gap-4 selection:grid col-span-3 gap-3 grid-cols-3 content-center items-center justify-items-center m-0">
        {banners.map((banner, index) => (
          <div key={index}>
            <ToolCard title={banner.title} description={banner.description} icon={banner.icon} />
          </div>
        ))}
      </div>

    </div>
  )
}