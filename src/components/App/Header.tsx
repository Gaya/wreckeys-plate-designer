import logo from './wreckeys-logo.svg';

function Header() {
  return (
    <header>
      <h1>
        <img height={22} width={60} src={logo} alt="Wreckey's" title="Wreckey's" />
        Plate Designer - DXF cutting generator
      </h1>
      <a href="https://wreckeys.com">← Back to Wreckey's</a>
    </header>
  );
}

export default Header;
