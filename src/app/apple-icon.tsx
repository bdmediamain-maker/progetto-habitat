import { ImageResponse } from 'next/og';

export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     '#1E1E1E',
        }}
      >
        {/* "PH" monogram — larger for home-screen tap target */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          140,
            height:         140,
            background:     '#DB4A2B',
          }}
        >
          <span
            style={{
              fontFamily:    'sans-serif',
              fontWeight:    700,
              fontSize:      56,
              color:         '#E4E2DD',
              letterSpacing: '-2px',
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
