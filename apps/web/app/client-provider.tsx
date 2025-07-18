// app/client-provider.tsx
'use client';

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { apiReq } from "./utils/apiReq";
import { logedIn } from "./store/user.slice";

function AppInitializer() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      let token = await getToken();
      if (!token) {token = ""};
      const res = await apiReq('/auth/get-current-user', 'GET', token);
      if (!res.success) return;

      dispatch(logedIn(res.res.data));
    })();
  }, []);

  return null;
}

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AppInitializer />
      {children}
    </Provider>
  );
}
