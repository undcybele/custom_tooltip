import React, { useState, MouseEvent } from 'react';

const Tooltip: React.FC<{ description: string; children: React.ReactNode }> = ({
       description,
       children,
   }) => {
    const [tooltipData, setTooltipData] = useState<{
        visible: boolean;
        position: { x: number; y: number };
    }>({
        visible: false,
        position: { x: 0, y: 0 },
    });

    const handleMouseEnter = (event: MouseEvent<HTMLSpanElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipData({
            visible: true,
            position: {
                x: event.clientX - rect.left + rect.width + 50,
                y: event.clientY - rect.bottom + rect.height + 20,
            },
        });
    };

    const handleMouseLeave = () => {
        setTooltipData((prevState) => ({
            ...prevState,
            visible: false,
        }));
    };

    const tooltipStyle: React.CSSProperties = {
        position: 'absolute',
        top: `${tooltipData.position.y}px`,
        left: `${tooltipData.position.x}px`,
        backgroundColor: '#94ec6d',
        color: '#000000',
        padding: '15px',
        borderRadius: '50px',
        zIndex: 1000,
        whiteSpace: 'nowrap',
        display: tooltipData.visible ? 'block' : 'none',
    };

    return (
        <div style={{ position: 'relative' }}>
            <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
              </span>
            <div style={tooltipStyle}>{description}</div>
        </div>
    );
};

export default Tooltip;
