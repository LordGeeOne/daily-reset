import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BsFillPersonFill, BsFillHouseFill, BsGraphUpArrow } from 'react-icons/bs';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeSelector } from '../App'; // Add this import

function Charts() {
  const { theme } = useTheme();

  const moodEmojis = {
    0: "😭",
    1: "😢",
    2: "☹️",
    3: "😕",
    4: "😐",
    5: "🙂",
    6: "😊",
    7: "😃",
    8: "😄",
    9: "🤗",
    10: "🥳"
  };

  // Updated data to include journal entries
  const data = [
    { 
      date: '2024-12-14', 
      productivity: 7, 
      mood: 8, 
      dayRating: 7,
      journal: "Had a productive day at work. Made progress on the main project. Managed to complete all planned tasks and even started on tomorrow's work."
    },
    { 
      date: '2024-12-17', 
      productivity: 5, 
      mood: 6, 
      dayRating: 5,
      journal: "Felt a bit overwhelmed today, but managed to stay focused. Had some challenges with the new task but learned a lot in the process."
    },
    { 
      date: '2024-12-20', 
      productivity: 8, 
      mood: 9, 
      dayRating: 8,
      journal: "Great day! Everything went smoothly. Team meeting was productive and got positive feedback on recent work. Evening workout was energizing."
    },
    { 
      date: '2024-12-23', 
      productivity: 6, 
      mood: 7, 
      dayRating: 6,
      journal: "Holiday preparations taking up some focus, but still managed to get essential work done. Looking forward to the break."
    },
    { 
      date: '2024-12-26', 
      productivity: 9, 
      mood: 8, 
      dayRating: 9,
      journal: "Excellent focus today! Completed a major milestone in the project. The team's enthusiasm really helped maintain momentum."
    },
    { 
      date: '2024-12-29', 
      productivity: 4, 
      mood: 5, 
      dayRating: 4,
      journal: "Tough day with technical issues. Spent most of the time troubleshooting. Tomorrow will be better, planning to start fresh."
    },
    { 
      date: '2025-01-01', 
      productivity: 7, 
      mood: 8, 
      dayRating: 7,
      journal: "Good start to the new year! Set clear goals for the month and made initial progress. Feeling optimistic about upcoming challenges."
    },
    { 
      date: '2025-01-04', 
      productivity: 8, 
      mood: 9, 
      dayRating: 8,
      journal: "Sunday planning session went well. Prepared everything for the week ahead and caught up on some reading. Feeling prepared!"
    },
    { 
      date: '2025-01-07', 
      productivity: 6, 
      mood: 7, 
      dayRating: 7,
      journal: "Mid-week slump but pushed through. Team collaboration helped maintain motivation. Made decent progress on secondary tasks."
    },
    { 
      date: '2025-01-10', 
      productivity: 5, 
      mood: 6, 
      dayRating: 5,
      journal: "Bit of a scattered day. Many interruptions but managed to stay somewhat on track. Need to work on focus strategies."
    },
    { 
      date: '2025-01-13', 
      productivity: 9, 
      mood: 9, 
      dayRating: 9,
      journal: "Outstanding day! Everything clicked. Breakthrough on the project's challenging component. Team celebration boosted everyone's spirits!"
    }
  ];

  // Enhanced tooltip component to show journal entries
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dayData = data.find(d => d.date === label);
      return (
        <div className="custom-tooltip">
          <p className="date">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }}>
              {item.name}: {item.name === 'mood' ? moodEmojis[item.value] : item.value}
            </p>
          ))}
          {dayData?.journal && (
            <div className="journal-preview">
              <h4>Journal Entry:</h4>
              <p>{dayData.journal}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const averages = {
    productivity: (data.reduce((acc, day) => acc + day.productivity, 0) / data.length).toFixed(1),
    mood: (data.reduce((acc, day) => acc + day.mood, 0) / data.length).toFixed(1),
    dayRating: (data.reduce((acc, day) => acc + day.dayRating, 0) / data.length).toFixed(1)
  };

  return (
    <div className={`charts-page ${theme.name.toLowerCase()}-theme`} style={{ backgroundColor: theme.colors.background }}>
      <header className="header charts-header" style={{ backgroundColor: theme.colors.primary }}>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <BsFillHouseFill className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/charts" className="nav-link active">
            <BsGraphUpArrow className="nav-icon" />
            <span>Charts</span>
          </Link>
          <ThemeSelector />
        </nav>
        <div className="header-right">
          <div className="datetime">
            <div className="date">
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </div>
            <div className="time">{new Date().toLocaleTimeString()}</div>
          </div>
          <div className="profile">
            <BsFillPersonFill className="profile-icon" />
          </div>
        </div>
      </header>
      
      <div className="charts-container">
        <div className="chart-section" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`
        }}>
          <div className="chart-header">
            <h2>Overview Statistics</h2>
            <div className="averages">
              <div className="average-item">
                <span className="label">Average Productivity:</span>
                <span className="value">{averages.productivity}</span>
              </div>
              <div className="average-item">
                <span className="label">Average Mood:</span>
                <span className="value">{averages.mood}</span>
              </div>
              <div className="average-item">
                <span className="label">Average Day Rating:</span>
                <span className="value">{averages.dayRating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`
        }}>
          <div className="chart-info">
            <h3>Monthly Overview</h3>
            <p>Track your daily progress from December 2024 to January 2025</p>
          </div>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="productivity" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="mood" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="dayRating" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </div>

        <div className="chart" style={{ 
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
          color: theme.colors.text,
          boxShadow: `0 2px 4px ${theme.colors.shadow}`
        }}>
          <div className="chart-info">
            <h3>Productivity vs Mood Correlation</h3>
            <p>See how your productivity levels relate to your daily mood</p>
          </div>
          <LineChart width={800} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="productivity" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="mood" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Charts;
