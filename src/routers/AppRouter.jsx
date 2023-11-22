import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../components/App';

const AppRouter = () => {
    return (
    <Router basename='/'>
        <Routes>
            <Route path="*" exact element={<App/>} />
        </Routes>
    </Router>
  );
};

export default AppRouter;