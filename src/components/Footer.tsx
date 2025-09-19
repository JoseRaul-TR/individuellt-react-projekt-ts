export default function Footer() {
  return (
    <>
      <footer className="footer">
        <p>
          &copy; José Raúl Tenza Ramírez
          <br/>
          F25D – YHBorås
          <br/>
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
