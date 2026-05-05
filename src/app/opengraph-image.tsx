import { ImageResponse } from 'next/og';

export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:         '100%',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          background:    '#E4E2DD',
          padding:       '64px 80px',
          position:      'relative',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display:    'flex',
            position:   'absolute',
            top:        0,
            left:       0,
            width:      '100%',
            height:     8,
            background: '#DB4A2B',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          64,
            height:         64,
            background:     '#1E1E1E',
            marginBottom:   48,
          }}
        >
          <span
            style={{
              fontFamily:    'sans-serif',
              fontWeight:    700,
              fontSize:      24,
              color:         '#E4E2DD',
              letterSpacing: '-1px',
            }}
          >
            PH
          </span>
        </div>

        {/* Studio name — flex column replaces <br /> */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            fontFamily:    'sans-serif',
            fontWeight:    700,
            fontSize:      72,
            lineHeight:    0.9,
            color:         '#1E1E1E',
            letterSpacing: '-3px',
            textTransform: 'uppercase',
            marginBottom:  24,
          }}
        >
          <span>Progetto</span>
          <span>Habitat</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display:       'flex',
            fontFamily:    'sans-serif',
            fontWeight:    400,
            fontSize:      24,
            color:         'rgba(30,30,30,0.55)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop:     'auto',
          }}
        >
          Architecture &amp; Bioarchitecture Studio — Verona
        </div>
      </div>
    ),
    { ...size },
  );
}
