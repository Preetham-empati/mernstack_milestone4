import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/api/students");
      if (!response.ok) {
        throw new Error("Could not fetch the student list from backend.");
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the backend server. Make sure your Express app is running on Port 5001!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="app-container">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <header className="app-header">
        <h1 className="main-title">Student Directory App</h1>
        <p className="subtitle">
          Data fetched directly from an Express server and displayed using React.
        </p>
      </header>

      <main className="dashboard-card">
        <div className="stats-header">
          Total Students Registered: <strong>{students.length}</strong>
        </div>

        {isLoading && (
          <div className="status-container">
            <div className="spinner"></div>
            <p className="status-text">Connecting to Express API and loading profiles...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="status-container error-box">
            <div className="error-icon">⚠️</div>
            <h3>Connection Error</h3>
            <p className="status-text">{error}</p>
            <button type="button" className="action-btn retry-btn" onClick={fetchStudents}>
              🔄 Try Connecting Again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="cards-grid">
            {students.map((student) => (
              <article key={student.id} className="student-card">
                <div className="student-profile-header">
                  <div className="student-avatar">
                    {getInitials(student.name)}
                  </div>
                  <div className="student-profile-meta">
                    <h2 className="student-name">{student.name}</h2>
                    <span className="student-major">{student.major}</span>
                  </div>
                </div>

                <p className="student-bio">{student.bio}</p>

                <div className="student-specs">
                  <div className="spec-item">
                    <span className="spec-label">Age</span>
                    <span className="spec-val">{student.age} years old</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">GPA</span>
                    <span className="spec-val highlight-gpa">⭐ {student.gpa}</span>
                  </div>
                </div>

                <div className="student-skills">
                  {student.skills.map((skill, index) => (
                    <span key={index} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <span className="course-meta">✉️ {student.email}</span>
                  <a href={`mailto:${student.email}`} className="contact-btn">
                    Message ✉️
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
      </footer>
    </div>
  );
}

export default App;
