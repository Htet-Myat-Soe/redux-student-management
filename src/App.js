import Student from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="container py-5">
      <Router>
        <Switch>
          <Route exact path='/' component={Student} />
          <Route path='/add-students' component={AddStudent} />
          <Route path='/edit-students/:id' component={EditStudent} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
