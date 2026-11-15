import React from 'react';

/**
 * BrushDivider: Authentic organic torn-paper / brush-stroke divider
 * replicating the signature editorial edge seen in the design reference.
 * 
 * @param {string} color - Fill color (e.g., '#FAFAF7' for cream, '#0B2019' for dark forest)
 * @param {'top' | 'bottom'} position - Whether this divider sits at the top or bottom of a section
 * @param {1 | 2 | 3} variant - Distinct organic torn profiles for visual variety
 * @param {boolean} flipX - Horizontally flip path for extra asymmetry
 * @param {string} className - Optional container styling
 */
export default function BrushDivider({
  color = '#FAFAF7',
  position = 'bottom',
  variant = 1,
  flipX = false,
  className = '',
}) {
  // Variant 1: Ripped deckle-edge paper with organic teeth and fiber peaks
  const pathV1 = "M0,0 L0,22 C45,35 78,12 120,38 C165,18 198,42 245,26 C290,44 330,16 380,48 C435,22 470,40 520,18 C570,42 615,20 660,35 C710,12 755,44 800,28 C850,46 890,20 940,36 C990,14 1030,42 1080,24 C1130,46 1175,18 1220,38 C1270,16 1315,40 1360,26 C1405,42 1430,22 1440,30 L1440,0 Z";

  // Variant 2: Wide sweeping painterly brush stroke with bold dynamic serrations
  const pathV2 = "M0,0 L0,32 C35,14 80,44 135,20 C185,46 230,16 280,38 C335,18 385,48 440,24 C490,46 540,14 590,40 C645,22 690,48 740,16 C795,44 845,20 900,42 C950,18 1000,46 1055,22 C1110,48 1160,16 1210,38 C1265,18 1315,44 1370,22 C1410,40 1430,28 1440,34 L1440,0 Z";

  // Variant 3: Deep textured torn paper with fine ragged micro-indentations
  const pathV3 = "M0,0 L0,18 C50,40 95,14 140,32 C190,48 235,22 285,42 C330,16 375,38 425,20 C475,44 520,18 570,36 C615,12 660,46 710,24 C760,42 805,16 850,38 C900,20 945,44 995,18 C1045,46 1090,22 1140,40 C1190,14 1235,46 1285,28 C1335,44 1380,20 1440,36 L1440,0 Z";

  const selectedPath = variant === 2 ? pathV2 : variant === 3 ? pathV3 : pathV1;

  // If position is 'top', rotate 180 degrees so teeth face downwards into the section
  const transform = [
    position === 'top' ? 'rotate(180deg)' : '',
    flipX ? 'scaleX(-1)' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none z-10 ${className}`}
      style={{
        transform: transform || undefined,
        transformOrigin: 'center center'
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full block h-8 sm:h-12 md:h-16 lg:h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={selectedPath}
          fill={color}
        />
      </svg>
    </div>
  );
}
