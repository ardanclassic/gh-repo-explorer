
import { BrowserRouter as Router } from "react-router-dom";
import RoutePath from './routes';
import PageLayout from 'components/layout';
import './global.scss';

function App() {
  return (
    <Router>
      <PageLayout>
        <RoutePath />
      </PageLayout>
    </Router>
  );
}

export default App;
