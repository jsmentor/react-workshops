import AboutPage from '../components/AboutPage';
import Router from 'next/router';
export default () => (
  <div className="app-container">
    <AboutPage />
    <button onClick={() => Router.push('/')}>Home</button>
  </div>
)