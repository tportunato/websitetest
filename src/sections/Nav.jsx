export default function Nav() {
  return (
    <header className="nav">
      <a className="wordmark" href="#top">
        DAA
        <span>Capital Partners</span>
      </a>
      <nav>
        <a href="#market">Market</a>
        <a href="#origination">Origination</a>
        <a href="#assets">Assets</a>
        <a href="#/portfolio">Portfolio</a>
        <a href="#/leadership">Leadership</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="login" href="https://daacap.my.site.com/Investor" target="_blank" rel="noreferrer">
        Investor Login
      </a>
    </header>
  )
}
