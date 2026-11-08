import "./Header.scss";
export function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#">
        <span className="header__logo">S</span> Study Planner
      </a>
      <span className="header__label">НАВЧАЙСЯ У СВОЄМУ ТЕМПІ</span>
    </header>
  );
}
