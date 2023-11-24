import "./App.css";
import Account from "./Account";
import ETCLogo from "./assets/etc_logo.svg";

function App() {
  return (
    <>
      <div className="w-full flex flex-start">
        <img src={ETCLogo} width={150} />
      </div>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {<Account />}
      </div>
    </>
  );
}

export default App;
