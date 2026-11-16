import { Header } from './components/Header';
import { ApiPlanner } from './pages/ApiPlanner';
import './components/TaskList.scss';
import './App.scss';
export default function App() {
 return <div className="app"><Header/><main className="app__main"><section className="app__intro"><span className="app__eyebrow">ЛАБОРАТОРНА РОБОТА №10</span><h1>Крок за кроком до мети<span>.</span></h1><p>Навчальні завдання з REST API.</p></section><ApiPlanner/><footer className="app__footer">Study Planner · Лабораторна №10<span>Дані API та зміни поточної сесії.</span></footer></main></div>;
}
