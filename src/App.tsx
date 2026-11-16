import { Header } from './components/Header';
import { TaskProvider } from './context/TaskProvider';
import { LocalPlanner } from './pages/LocalPlanner';
import './components/TaskList.scss';
import './App.scss';
export default function App() {
 return <div className="app"><Header/><main className="app__main"><section className="app__intro"><span className="app__eyebrow">ЛАБОРАТОРНА РОБОТА №9</span><h1>Крок за кроком до мети<span>.</span></h1><p>Планувальник зі збереженням даних та скасуванням видалення.</p></section><TaskProvider><LocalPlanner/></TaskProvider><footer className="app__footer">Study Planner · Лабораторна №9<span>Дані зберігаються у localStorage.</span></footer></main></div>;
}
