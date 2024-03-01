/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '968px',
      'lg': '1440px',
    },
    fontFamily: {
      'Montserrat': ['Montserrat', 'sans-serif'],
      'Inter': ['Inter', 'sans-serif'],
      'Tajawal': ['Tajawal', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.688rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      md: ['1rem', '1.25rem'],
      lg: ['1.125rem', '1.5rem'],
      xl: ['1.5rem', '1.75rem'],

      'heading-1': ['3.5rem', { //56px
        lineHeight: '4rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      'heading-2': ['2.5rem', { //40px
        lineHeight: '3rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      'heading-3': ['2rem', { //32px
        lineHeight: '2.5rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      'heading-4': ['1.75rem', { //28px
        lineHeight: '2rem',
        letterSpacing: '-0.02em',
        fontWeight: '500',
      }],
      'heading-5': ['1.5rem', { //24px
        lineHeight: '1.75rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      'heading-6': ['1.25rem', { //20px
        lineHeight: '1.5rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
      'heading-7': ['1.125rem', { //18px
        lineHeight: '1.5rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],

      'button-lg': ['1rem', { //16px
        lineHeight: '1.25rem',
        letterSpacing: '-0.01em',
        fontWeight: '700',
      }],

      'button-md': ['0.875rem', { //14px
        lineHeight: '1.25rem',
        letterSpacing: '-0.01em',
        fontWeight: '700',
      }],

      'button-sm': ['0.6875rem', { //11px
        lineHeight: '1rem',
        letterSpacing: '-0.01em',
        fontWeight: '700',
      }],

    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      blue: '#2980F5',
      primary: {
        100: '#F1F5FF',
        200: '#D0DEFF',
        300: '#244180',
        400: '#16274D',
        500: '#0B1426',
        600: '#04070D',
      },
      accent: {
        100: '#FFFBE6',
        200: '#FFEF99',
        300: '#FFD600',
        400: '#998000',
        500: '#4D4000',
      },
      neutral: {
        100: '#FFFFFF',
        200: '#EFEFEF',
        300: '#D3D4D8',
        400: '#B7B9C0',
        500: '#9A9BA5',
        600: '#71737F',
        700: '#555765',
        800: '#393B4B',
        900: '#1C1F32',
        1000: '#000318',
        1100: '#1A0B00',
      },
      green: {
        100: '#E6FCF2',
        200: '#99F2CD',
        300: '#01DE81',
        400: '#01854D',
        500: '#004327',
      },
      yellow: {
        100: '#FFFBE6',
        200: '#FDEF99',
        300: '#FAD800',
        400: '#968200',
        500: '#4B4100',
      },
      red: {
        100: '#FEE9EE',
        200: '#FAA5BA',
        300: '#F31E53',
        400: '#921232',
        500: '#490919',
      },


    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
    },

    boxShadow: {
      'sm': '0 14px 60px 0px rgba(28, 31, 50, 0.1)',
      'card': '0px 8px 60px 0px rgba(28, 31, 50, 0.08)',
      'none': '0 0 #0000'
    },

    extend: {
      // fontSize: {
      //   '2.5xl': ['1.75rem', {
      //     lineHeight: '2rem',
      //     fontWeight: '700',
      //   }]
      // },
      lineHeight: {
        '12': '3rem',
        '16': '4rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '1.5xl': '1.25rem',
        '2.5xl': '1.25rem',
        '30': '1.875rem'
      },
      borderWidth: {
        '20': '1.25rem',
        '24': '1.5rem',
      },
      // margin: {
      //   '7.5': '1.875rem',
      //   '15': '3.75rem',
      // },
      // padding: {
      //   '7.5': '1.875rem',
      //   '15': '3.75rem',
      // },
      spacing: {
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
      },
      width: {
        '18': '4.5rem',
        '23': '5.75rem',
        '8.5': '2.125rem',
        '35': '8.75rem',
        '41': '10.375rem',
        '51': '12.75rem',
        '55': '13.75rem',
        '85': '21.25rem',
        '113': '28.25rem',

      },
      height: {
        '18': '4.5rem',
        '21': '5.25rem',
        '45': '11.25rem',
        '76': '19rem',


      },
      zIndex: {
        '1': '1',
      },
      gap: {
        '7.5': '1.875rem',
        '95': '23.75rem',
      },
      maxWidth: {
        '51': '12.75rem',
        'modal': '33.75rem',
        'widget': '33.75rem',
        '25': '25rem',
        '1/4': '25%',
        'modal-sm': '38.75rem',
        'modal-md': '57.5rem',
        '38.75': '38.75rem',
      },
      minWidth: {
        'modal-sm': '40rem',
        'modal-md': '57.5rem',
        '35': '8.75rem',
        'xs': '20rem',
      },
      minHeight: {
        '40': '10rem',
        '45': '11.25rem',

      },
      backgroundPosition: {
        'ramadan-logo': 'center top 6.5rem',
        'ramadan-logo-sm': 'center top 25.5rem',
      },

      backgroundImage: {
        'choose-cover': "url('./images/background/choose-cover.png')",
        'btn-close': "url('./images/icons/btn-close.svg')",
        'chevron-left': "url('./images/icons/chevron-left.svg')",
        'ramadan-bg': "url('./images/background/ramadan-bg.svg')",

      },
      // backgroundImage: {
      //  'our-story-pattern': "url('/images/background/pattern.svg')",
      // },
      transitionDuration: {
        '800': '800ms',
      },
      keyframes: {
        pulse: {
          '0%': {
            transform: 'scale(0.8);  box-shadow: 0 0 0 0 rgba(229, 62, 62, 1)'
          },

          '70%': {
            transform: 'scale(1); box-shadow: 0 0 0 60px rgba(229, 62, 62, 0)'
          },
          '100%': {
            transform: 'scale(0.8)'
          },
        }
      },
      listStyleType: {
        roman: 'lower-roman',
        alpha: 'lower-alpha',
      }

    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

