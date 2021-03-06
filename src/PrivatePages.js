import React, { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";

import { Switch } from "react-router";
import { HomeNavbar } from "./components/Navs/Navs";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./views/HomePage/HomePage";
import PitchPage from "./views/PitchPage/PitchPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";

const PrivatePages = () => {
  // states
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // other hooks
  const { getUserProfile } = useAuthContext();

  useEffect(() => {
    const unsub = getUserProfile()
      .then((res) => {
        setLoading(false);
        if (res.success) {
          setProfile(res.payload);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err.Error || err);
      });

    return unsub;
  });
  console.log(profile);
  return (
    <div className='user-pages'>
      {profile && !error && (
        <>
          <HomeNavbar payload={profile} />
          <main>
            <Switch>
              <PrivateRoute
                exact
                path='/user'
                component={() => <HomePage payload={profile} />}
              />
              <PrivateRoute
                path='/user/pitch'
                component={() => <PitchPage payload={profile} />}
              />
              <PrivateRoute
                path='/user/profile'
                component={() => <ProfilePage payload={profile} />}
              />
            </Switch>
          </main>
        </>
      )}
    </div>
  );
};

export default PrivatePages;
