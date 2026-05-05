import { ImageResponse } from 'next/og';

export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          background:      '#1E1E1E',
        }}
      >
        {/* "PH" monogram */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          26,
            height:         26,
            background:     '#DB4A2B',
          }}
        >
          <span
            style={{
              fontFamily:    'sans-serif',
              fontWeight:    700,
              fontSize:      11,
              color:         '#E4E2DD',
              letterSpacing: '-0.5px',
            }}
          >
            PH
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
