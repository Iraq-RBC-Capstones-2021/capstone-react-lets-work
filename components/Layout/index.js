import Navbar from "./Navbar";

export default function index({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
