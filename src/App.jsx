import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './components/pages/Home'
import SqlIntroduction from './components/pages/SqlIntroduction'
import CommandTypes from './components/pages/CommandTypes'
import Constraints from './components/pages/Constraints'
import Crud from './components/pages/Crud'
import SelectFiltering from './components/pages/SelectFiltering'
import Aggregates from './components/pages/Aggregates'
import GroupByHaving from './components/pages/GroupByHaving'
import JoinLab from './components/pages/JoinLab'
import Subqueries from './components/pages/Subqueries'
import WindowFunctions from './components/pages/WindowFunctions'
import ExecutionOrder from './components/pages/ExecutionOrder'
import PlacementPractice from './components/pages/PlacementPractice'
import Triggers from './components/pages/Triggers'
import About from './components/pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="intro" element={<SqlIntroduction />} />
        <Route path="command-types" element={<CommandTypes />} />
        <Route path="constraints" element={<Constraints />} />
        <Route path="crud" element={<Crud />} />
        <Route path="select" element={<SelectFiltering />} />
        <Route path="aggregates" element={<Aggregates />} />
        <Route path="group-by" element={<GroupByHaving />} />
        <Route path="joins" element={<JoinLab />} />
        <Route path="subqueries" element={<Subqueries />} />
        <Route path="window-functions" element={<WindowFunctions />} />
        <Route path="execution-order" element={<ExecutionOrder />} />
        <Route path="placement" element={<PlacementPractice />} />
        <Route path="triggers" element={<Triggers />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App