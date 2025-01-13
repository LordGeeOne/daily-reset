import './App.css';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Charts from './components/Charts';
import { BsFillPersonFill, BsFillHouseFill, BsGraphUpArrow } from 'react-icons/bs';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';  // Add useTheme to import

function App() {
  // Remove the basename logic for now
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// Make ThemeSelector available for import in other components
export function ThemeSelector() {
  const { theme, setCurrentTheme, themes } = useTheme();
  
  return (
    <select 
      className="theme-selector"
      value={theme.name}
      onChange={(e) => setCurrentTheme(
        Object.keys(themes).find(key => themes[key].name === e.target.value)
      )}
    >
      {Object.values(themes).map(t => (
        <option key={t.name} value={t.name}>{t.name}</option>
      ))}
    </select>
  );
}

function Home() {
  const [dateTime, setDateTime] = useState(new Date());
  const [messageIndex, setMessageIndex] = useState(0);
  const [journalEntry, setJournalEntry] = useState('');
  const [ratings, setRatings] = useState({
    productivity: 5,
    day: 5,
    mood: 5
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const messages = [
    "Hey, how was your day?",
    "Are you ready for tomorrow?",
    "Lets Reflect, Reset, and Recharge!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Changed to 4000ms to match animation duration
    return () => clearInterval(messageTimer);
  }, []);

  const handleRatingChange = (type, value) => {
    setRatings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmit = () => {
    setShowCelebration(true);
    // Reset values after submission
    setRatings({
      productivity: 5,
      day: 5,
      mood: 5
    });
    setJournalEntry('');
    
    // Hide celebration after 3 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const productivityLabels = {
    0: "No work done",
    1: "Barely productive",
    2: "Very little done",
    3: "Below average",
    4: "Could be better",
    5: "Moderate",
    6: "Decent progress",
    7: "Good progress",
    8: "Very productive",
    9: "Excellent work",
    10: "Incredibly productive"
  };

  const dayRatingLabels = {
    0: "Terrible day",
    1: "Very bad",
    2: "Bad day",
    3: "Not great",
    4: "Below average",
    5: "Average day",
    6: "Pretty good",
    7: "Good day",
    8: "Great day",
    9: "Fantastic day",
    10: "Perfect day"
  };

  const moodLabels = {
    0: { emoji: "😭", text: "Terrible" },
    1: { emoji: "😢", text: "Very Sad" },
    2: { emoji: "☹️", text: "Sad" },
    3: { emoji: "😕", text: "Worried" },
    4: { emoji: "😐", text: "Neutral" },
    5: { emoji: "🙂", text: "Okay" },
    6: { emoji: "😊", text: "Good" },
    7: { emoji: "😃", text: "Happy" },
    8: { emoji: "😄", text: "Very Happy" },
    9: { emoji: "🤗", text: "Great" },
    10: { emoji: "🥳", text: "Ecstatic" }
  };

  const { theme } = useTheme();

  return (
    <div className={`container ${theme.name.toLowerCase()}-theme`} style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <header className="header" style={{ backgroundColor: theme.colors.primary }}>
        <nav className="nav-links">
          <Link to="/" className="nav-link active">
            <BsFillHouseFill className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/charts" className="nav-link">
            <BsGraphUpArrow className="nav-icon" />
            <span>Charts</span>
          </Link>
          <ThemeSelector />
        </nav>
        <div className="header-right">
          <div className="datetime">
            <div className="date">
              {dateTime.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </div>
            <div className="time">{dateTime.toLocaleTimeString()}</div>
          </div>
          <div className="profile">
            <BsFillPersonFill className="profile-icon" />
          </div>
        </div>
      </header>
      <div className="message">
        {messages[messageIndex]}
      </div>
      <div className="rectangles">
        <div className="rectangle" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`,
          color: theme.colors.text
        }}>
          <h3>Productivity</h3>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={ratings.productivity}
            onChange={(e) => handleRatingChange('productivity', e.target.value)}
            className="slider"
          />
          <div className="slider-value">{productivityLabels[ratings.productivity]}</div>
        </div>
        <div className="rectangle" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`,
          color: theme.colors.text
        }}>
          <h3>Rate your day</h3>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={ratings.day}
            onChange={(e) => handleRatingChange('day', e.target.value)}
            className="slider"
          />
          <div className="slider-value">{dayRatingLabels[ratings.day]}</div>
        </div>
        <div className="rectangle" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`,
          color: theme.colors.text
        }}>
          <h3>How's your mood?</h3>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={ratings.mood}
            onChange={(e) => handleRatingChange('mood', e.target.value)}
            className="slider mood-slider"
            style={{
              '--emoji': `"${moodLabels[ratings.mood].emoji}"`,
              '--value': ratings.mood * 10
            }}
          />
          <div className="slider-value mood-value">
            <span className="mood-text">{moodLabels[ratings.mood].text}</span>
          </div>
        </div>
      </div>
      <div className="journal-section">
        <textarea
          className="journal-textarea"
          placeholder="Write about your day..."
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          style={{ 
            backgroundColor: theme.colors.cardBg,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }}
        />
      </div>
      <button 
        className="submit-button" 
        onClick={handleSubmit}
        style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          color: theme.colors.text
        }}
      >
        Submit Entry
      </button>
      {showCelebration && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
          />
          <div className="celebration" />
        </>
      )}
    </div>
  );
}

export default App;
