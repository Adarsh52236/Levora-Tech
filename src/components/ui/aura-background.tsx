'use client'

import AuraBackgroundFramer from './AuraBackgroundFramer'

export function AuraBackground({ 
  className,
  appearance,
  colors,
  ...props 
}: { 
  className?: string;
  appearance?: any;
  colors?: any;
  [key: string]: any;
}) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <AuraBackgroundFramer 
        appearance={appearance}
        colors={colors}
        style={{ width: '100%', height: '100%' }}
        {...props} 
      />
    </div>
  )
}
