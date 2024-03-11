"use client";

import { getAccessToken } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();

  const [fetchResult, setFetchResult] = useState<any>(null);

  const fetchApi = async () => {
    const res = await fetch("/api/auth/authorized");

    console.log(res);

    const data = await res.json();

    setFetchResult(data);
  };

  const logUser = () => {
    console.log(user);
  };

  useEffect(() => {
    console.log("Fetch result", fetchResult);
  }, [fetchResult]);

  return (
    <main>
      {user ? (
        <div>
          <button onClick={() => logUser()}>Log user</button>
          <div>{user.name}</div>
          <a href="api/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="api/auth/login">Loginx</a>
      )}
      <div>
        <button onClick={() => fetchApi()}>Fetch api</button>
        <div>{JSON.stringify(fetchResult)}</div>
      </div>
    </main>
  );
}
