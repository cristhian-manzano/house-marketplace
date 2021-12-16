import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [authWasListened, setAuthWasListened] = useState(false);

  const getUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (usr) => {
      if (usr) setUser(usr);
      else setUser(null);

      setAuthWasListened(true);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {authWasListened ? (
        <h1>{user?.displayName ?? "No existe"}</h1>
      ) : (
        <div>waiting for auth...</div>
      )}
    </>
  );
}

export default Profile;
