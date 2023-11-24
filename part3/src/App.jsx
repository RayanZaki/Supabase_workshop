import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import ETCLogo from "./assets/etc_logo.svg";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <div className="w-full flex flex-start">
        <img src={ETCLogo} width={150} />
      </div>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </>
  );
}

export default App;
