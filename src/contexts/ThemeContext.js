import { createContext, useState, useContext } from 'react';

const themes = {
  default: {
    name: 'Default',
    colors: {
      background: '#FFEEAA',
      primary: '#FFE067',
      text: '#333',
      border: '#333',
      secondary: '#d3d3d3',
      cardBg: '#FFE067',
      inputBg: '#d3d3d3',
      shadow: 'rgba(0,0,0,0.1)',
      buttonHover: '#333',
      textSecondary: '#666',
      sliderTrack: '#d3d3d3',
      sliderThumb: '#333',
      inputText: '#333'
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#222831',
      primary: '#393E46',
      text: '#EEEEEE',
      border: '#00ADB5',
      secondary: '#4F4F4F',
      cardBg: '#2D4059',
      inputBg: '#393E46',
      shadow: 'rgba(0,0,0,0.3)',
      buttonHover: '#00ADB5',
      textSecondary: '#B2B2B2',
      sliderTrack: '#4F4F4F',
      sliderThumb: '#00ADB5',
      inputText: '#EEEEEE'
    }
  },
  light: {
    name: 'Light',
    colors: {
      background: '#FFFFFF',
      primary: '#F8F9FA',
      text: '#212529',
      border: '#DEE2E6',
      secondary: '#E9ECEF',
      cardBg: '#F8F9FA',
      inputBg: '#E9ECEF',
      shadow: 'rgba(0,0,0,0.1)',
      buttonHover: '#0D6EFD',
      textSecondary: '#6C757D',
      sliderTrack: '#DEE2E6',
      sliderThumb: '#0D6EFD',
      inputText: '#212529'
    }
  },
  happy: {
    name: 'Happy',
    colors: {
      background: '#FFF4E0',
      primary: '#FFBF9B',
      text: '#4D4D4D',
      border: '#B46060',
      secondary: '#FFE5CA',
      cardBg: '#FFBF9B',
      inputBg: '#FFE5CA',
      shadow: 'rgba(180,96,96,0.2)',
      buttonHover: '#B46060',
      textSecondary: '#7D7D7D',
      sliderTrack: '#FFE5CA',
      sliderThumb: '#B46060',
      inputText: '#4D4D4D'
    }
  },
  calm: {
    name: 'Calm',
    colors: {
      background: '#E3F4F4',
      primary: '#D2E9E9',
      text: '#2C3333',
      border: '#8CC0DE',
      secondary: '#C4DFDF',
      cardBg: '#D2E9E9',
      inputBg: '#C4DFDF',
      shadow: 'rgba(140,192,222,0.2)',
      buttonHover: '#8CC0DE',
      textSecondary: '#526666',
      sliderTrack: '#C4DFDF',
      sliderThumb: '#8CC0DE',
      inputText: '#2C3333'
    }
  },
  devto: {
    name: 'Dev.to',
    colors: {
      background: '#F5F5F5',
      primary: '#3B49DF',
      text: '#242424',
      border: '#3B49DF',
      secondary: '#D6D6D7',
      cardBg: '#FFFFFF',
      inputBg: '#E5E5E5',
      shadow: 'rgba(59,73,223,0.1)',
      buttonHover: '#2F3AB2',
      textSecondary: '#64707D',
      sliderTrack: '#D6D6D7',
      sliderThumb: '#3B49DF',
      inputText: '#242424'
    }
  },
  github: {
    name: 'GitHub',
    colors: {
      background: '#0D1117',
      primary: '#161B22',
      text: '#F0F6FC', // Brighter text
      border: '#30363D',
      secondary: '#21262D',
      cardBg: '#161B22',
      inputBg: '#0D1117',
      shadow: 'rgba(255,255,255,0.1)',
      buttonHover: '#238636',
      textSecondary: '#8B949E',
      sliderTrack: '#21262D',
      sliderThumb: '#2EA043',
      inputText: '#F0F6FC' // Brighter text
    }
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Export the useTheme hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
