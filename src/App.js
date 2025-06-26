import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageQuizzes from './pages/Admin/ManageQuizzes';
import ViewResults from './pages/Admin/ViewResults';
import TrainerDashboard from './pages/Trainer/TrainerDashboard';
import ManageQuizz from './pages/Trainer/ManageQuizz';
import ManageQuestions from './pages/Trainer/ManageQuestions';
import ReviewResults from './pages/Trainer/ReviewResults';
import UploadNotes from './pages/Trainer/UploadNotes';
import StudentDashboard from './pages/Student/StudentDashboard';
import AvailableQuizzes from './pages/Student/AvailableQuizzes';
import StartQuiz from './pages/Student/StartQuiz';
import ViewMyResults from './pages/Student/ViewMyResults';
import ViewQuizAttempt from './pages/Student/viewQuizAttempt';

function App() {
   const userRole = 'admin';
  return (
    
    <Router>
    
      <Routes>
     <Route path='/' element={<LoginPage/>}></Route>
     <Route path='/Register' element={<RegisterPage/>}></Route>
     <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
    <Route path='/admin/manage-users'element ={<ManageUsers/>}></Route>
    <Route path='/admin/manage-quizzes' element={<ManageQuizzes/>}></Route>
    <Route path='/admin/view-results' element={<ViewResults/>}></Route>
    <Route path='/trainer/dashboard' element={<TrainerDashboard/>}></Route>
    < Route path='/trainer/manage-quiz' element={<ManageQuizz/>} ></Route>
    <Route path='/trainer/manage-questions' element={<ManageQuestions/>}></Route>
    <Route path='/trainer/view-result' element={<ReviewResults/>}></Route>
   <Route path='/trainer/upload-notes' element={<UploadNotes/>}></Route>
    <Route path='/student/dashboard' element={<StudentDashboard/>}></Route>
      <Route path='/student/quizzes' element={<AvailableQuizzes/>}></Route>
      <Route path='/student/start-quiz/:quizId' element={<StartQuiz/>}></Route>
      <Route path='/student/results' element={<ViewMyResults/>}></Route>
      <Route path='/student/quiz-result/:quizId' element={<ViewQuizAttempt/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
