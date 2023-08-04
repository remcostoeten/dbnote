import React from 'react';

export default function ToolCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <>
      <div className="card relative overflow-hidden rounded-lg border bg-background p-2">
        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
          {icon}
          <div className="space-y-2">
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
