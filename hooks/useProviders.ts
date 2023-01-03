import { BuiltInProviderType } from "next-auth/providers";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";

export const useProviders = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    getProviders().then((data) => {
      setProviders(data);
    });

    return () => {};
  }, []);

  return providers;
};
