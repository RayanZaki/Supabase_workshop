import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [full_name, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);

      const { data, error } = await supabase
        .from("accounts")
        .select(`*`)
        .single();

        console.log(data);
      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setFullName(data.full_name)
          setEmail(data.email);
          setId(data.id);
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, []);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);

    const updates = {
      id,
      full_name,
      username,
      avatar_url,
      email,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("accounts").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={email || ""} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          required
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
      <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          type="text"
          required
          value={full_name || ""}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

    </form>
  );
}
