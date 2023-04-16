import "./Footer.css"

function Footer() {
  return (
    <footer className="d-flex flex-column text-white">
      <div
        className="d-flex flex-column mb-1 mt-auto align-items-center px-3">
        <div className="text-center">
          Designed, developed, hosted by RO Department India
        </div>
        <div className="text-center">All Rights Reserved</div>
        <div className="text-end">Copyright &copy; RO.com</div>
      </div>
    </footer>
  );
}

export default Footer;
