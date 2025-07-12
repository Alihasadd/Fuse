import React, { useState, useEffect } from "react";
import {
  Clock,
  Plus,
  Settings,
  Moon,
  Sun,
  Timer,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const PerformanceManagementApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [managerNotes, setManagerNotes] = useState('');
  const [employeeNotes, setEmployeeNotes] = useState('');
  const [updates, setUpdates] = useState([
    { id: 1, text: '', dueDate: '', priority: 'medium', assignedTo: 'employee', project: '' }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [timerVisible, setTimerVisible] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerSettings, setTimerSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  const questions = [
    "What's one thing I could do differently as your manager to better support you?",
    "What aspect of your work energizes you most, and how can we create more of that?",
    "What's something you're avoiding or procrastinating on, and what's holding you back?",
    "If you could change one thing about how our team operates, what would it be?",
    "What feedback have you been wanting to give me but haven't found the right moment?",
    "What's a skill you want to develop that you're worried about admitting you need help with?",
    "What would you do if you were in my position and had to give yourself feedback?",
    "What's something you think I should know about the team that you haven't told me?",
    "What's your biggest frustration with your current role that we haven't addressed?",
    "If you could skip one regular meeting or process, what would it be and why?",
    "What assumption do you think I have about you that might not be accurate?",
    "What's something you've learned recently that changed how you think about your work?",
    "What would make you excited to come to work every day?",
    "What's one thing you wish you could say 'no' to more often?",
    "What feedback from others has been hardest for you to hear lately?"

  ];

  // Timer functionality
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setTimerVisible(true);
    }, 30000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const addUpdate = () => {
    const newUpdate = {
      id: updates.length + 1,
      text: '',
      dueDate: '',
      priority: 'medium',
      assignedTo: 'employee',
      project: ''
    };
    setUpdates([...updates, newUpdate]);
  };

  const updateNote = (id, field, value) => {
    setUpdates(updates.map(update => 
      update.id === id ? { ...update, [field]: value } : update
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColorDark = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900 text-red-200 border-red-700';
      case 'medium':
        return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      case 'low':
        return 'bg-green-900 text-green-200 border-green-700';
      default:
        return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const resetTimer = () => {
    setTimeLeft(customMinutes * 60);
    setTimerActive(false);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const theme = darkMode ? 'dark' : 'light';
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Performance Management 1:1</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${cardClass} border hover:opacity-80 transition-opacity`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Notes Section */}
        <div className={`${cardClass} border rounded-lg p-6 mb-6`}>
          <h2 className="text-xl font-semibold mb-4">Pre-Meeting Notes</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-2 ${secondaryTextClass}`}>
                  Manager Notes
                </label>
                <textarea
                  value={managerNotes}
                  onChange={(e) => setManagerNotes(e.target.value)}
                  placeholder="Add your notes here (aim for 2 sentences)"
                  className={`w-full h-20 p-3 border rounded-lg ${inputClass} resize-none`}
                />
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium mb-2 ${secondaryTextClass}`}>
                  Employee Notes
                </label>
                <textarea
                  value={employeeNotes}
                  onChange={(e) => setEmployeeNotes(e.target.value)}
                  placeholder="Add your notes here (aim for 3 sentences)"
                  className={`w-full h-24 p-3 border rounded-lg ${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Updates Section */}
        <div className={`${cardClass} border rounded-lg p-6 mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Updates & Action Items</h2>
            <button
              onClick={addUpdate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Update
            </button>
          </div>
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <textarea
                      value={update.text}
                      onChange={(e) => updateNote(update.id, 'text', e.target.value)}
                      placeholder="Update or action item..."
                      className={`w-full h-20 p-3 border rounded-lg ${inputClass} resize-none`}
                    />
                  </div>
                  <div className="flex flex-col gap-2 min-w-64">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${secondaryTextClass} w-16`}>Project:</span>
                      <input
                        type="text"
                        value={update.project}
                        onChange={(e) => updateNote(update.id, 'project', e.target.value)}
                        placeholder="Project name"
                        className={`flex-1 p-2 border rounded-lg ${inputClass}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${secondaryTextClass} w-16`}>Due:</span>
                      <input
                        type="date"
                        value={update.dueDate}
                        onChange={(e) => updateNote(update.id, 'dueDate', e.target.value)}
                        className={`flex-1 p-2 border rounded-lg ${inputClass}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${secondaryTextClass} w-16`}>Assigned:</span>
                      <select
                        value={update.assignedTo}
                        onChange={(e) => updateNote(update.id, 'assignedTo', e.target.value)}
                        className={`flex-1 p-2 border rounded-lg ${inputClass}`}
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${secondaryTextClass} w-16`}>Priority:</span>
                      <select
                        value={update.priority}
                        onChange={(e) => updateNote(update.id, 'priority', e.target.value)}
                        className={`flex-1 p-2 border rounded-lg ${darkMode ? getPriorityColorDark(update.priority) : getPriorityColor(update.priority)} font-medium`}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Generator */}
        <div className={`${cardClass} border rounded-lg p-6 mb-6`}>
          <h2 className="text-xl font-semibold mb-4">Conversation Starter</h2>
          <div className="space-y-4">
            <button
              onClick={generateRandomQuestion}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Generate Random Question
            </button>
            {currentQuestion && (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-lg leading-relaxed">{currentQuestion}</p>
              </div>
            )}
          </div>
        </div>

        {/* Timer Popup */}
        {timerVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${cardClass} border rounded-lg p-6 max-w-md w-full mx-4`}>
              <h3 className="text-xl font-semibold mb-4">Start Your 1:1 Timer?</h3>
              <p className={`mb-4 ${secondaryTextClass}`}>
                A 25-minute timer can help keep your meeting focused and productive.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setTimerVisible(false);
                    setTimerActive(true);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Timer
                </button>
                <button
                  onClick={() => setTimerVisible(false)}
                  className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timer Settings */}
        {timerSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${cardClass} border rounded-lg p-6 max-w-md w-full mx-4`}>
              <h3 className="text-xl font-semibold mb-4">Timer Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${secondaryTextClass}`}>
                    Meeting Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 25)}
                    min="1"
                    max="120"
                    className={`w-full p-3 border rounded-lg ${inputClass}`}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setTimerSettings(false);
                      resetTimer();
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setTimerSettings(false)}
                    className={`flex-1 px-4 py-2 border rounded-lg ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timer Control - Bottom Left */}
      <div className="fixed bottom-4 left-4 space-y-2">
        <div className={`${cardClass} border rounded-lg p-4 flex items-center gap-3`}>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="font-mono text-lg font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTimer}
              className={`p-2 rounded-lg ${timerActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
            >
              {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetTimer}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimerSettings(true)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceManagementApp;

