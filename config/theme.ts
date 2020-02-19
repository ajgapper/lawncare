interface ThemeShape {
  breakpoints: string[]
  fontSizes: string[]
  colors: {
    [key: string]: string
  }
  space: string[]
  fontWeights: {
    [key: string]: number
  }
  sidebarWidth: {
    [key: string]: string
  }
}

const theme: ThemeShape = {
  breakpoints: ['600px', '900px', '1200px', '1800px'],
  fontSizes: ['1rem', '1.5rem', '2rem', '2.5rem'],
 // fontSizes: ['75%', '100%', '120%', '144%', '172.8%', '207.4%', '248.8%'],
  colors: {
    active: '#90C03E',
    primary: '#2B2C3E',
    secondary: '#577C38',
    grey: '#58545a',
    shade: '#f5f5f5',
    background: '#2B2C3E',
  },
  space: [
    '0',
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2rem',
    '2.5rem',
    '3rem',
    '4rem',
    '6rem',
    '8rem',
    '12rem',
    '16rem',
  ],
  fontWeights: {
    normal: 300,
    bold: 600,
  },
  sidebarWidth: {
    big: '275px',
    normal: '220px',
  },
}

export default theme