import React from 'react';

function CustomBlock({ icon: IconComponent }) {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                {IconComponent && (
                    <div className="h-12 w-12 fill-current">
                        <IconComponent />
                    </div>
                )}
                <div className="space-y-2">
                    <h3 className="font-bold">Components</h3>
                    <p className="text-sm text-muted-foreground">
                        UI components built using Radix UI and styled with Tailwind CSS.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CustomBlock;
