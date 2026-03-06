import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './website/pages/Home';
import About from './website/pages/About';
import Give from './website/pages/Give';
import Sermons from './website/pages/Sermons';
import Events from './website/pages/Events';
import Contact from './website/pages/Contact';
import Portal from './Portal/pages/Portal';
import PortalLayout from './Portal/layout/PortalLayout';
import Dashboard from './Portal/pages/Dashboard';
import CellsDashboard from './Portal/pages/CellsDashboard';
import AssignMembersDashboard from './Portal/pages/AssignMembersDashboard';
import MyCellDashboard from './Portal/pages/MyCellDashboard';
import MeetingsDashboard from './Portal/pages/MeetingsDashboard';
import EventsDashboard from './Portal/pages/EventsDashboard';
import AttendanceDashboard from './Portal/pages/AttendanceDashboard';
import MembersDashboard from './Portal/pages/MembersDashboard';
import UsersDashboard from './Portal/pages/UsersDashboard';
import MyAccountDashboard from './Portal/pages/MyAccountDashboard';
import MediaDashboard from './Portal/pages/MediaDashboard';
// import PrayersDashboard from './Portal/pages/PrayersDashboard'; // Deprecated
import FastingCommitment from './Portal/pages/prayers/FastingCommitment';
import PropheticInstructions from './Portal/pages/prayers/PropheticInstructions';
import PrayerCommunications from './Portal/pages/prayers/PrayerCommunications';
import { ThemeProvider } from './context/ThemeContext';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import EventRegistration from './website/pages/EventRegistration';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder Pages
const Placeholder = ({ title }) => <h1 style={{ color: 'white' }}>{title}</h1>;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <Router>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId/register" element={<EventRegistration />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Portal />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/give" element={<Give />} />

              {/* Authenticated Portal Routes */}
              <Route path="/portal" element={
                <ProtectedRoute>
                  <PortalLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cells" element={<CellsDashboard />} />
                <Route path="cells/assign" element={<AssignMembersDashboard />} />
                <Route path="my-cell" element={<MyCellDashboard />} />
                <Route path="meetings" element={<MeetingsDashboard />} />
                <Route path="meetings/events" element={<EventsDashboard />} />
                <Route path="meetings/attendance" element={<AttendanceDashboard />} />
                <Route path="members" element={<MembersDashboard />} />

                {/* Prayer Module Routes */}
                <Route path="prayers/fasting" element={<FastingCommitment />} />
                <Route path="prayers/prophetic" element={<PropheticInstructions />} />
                <Route path="prayers/communications" element={<PrayerCommunications />} />
                <Route path="media" element={<MediaDashboard />} />
                <Route path="giving" element={<Placeholder title="Contributions" />} />
                <Route path="users" element={<UsersDashboard />} />
                <Route path="users/account" element={<MyAccountDashboard />} />
                <Route path="roles" element={<Placeholder title="Roles & Permissions" />} />
              </Route>
            </Routes>
          </Router>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
