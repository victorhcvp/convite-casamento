import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../entities/User";
import { Family } from "../entities/User";

type AuthData = {
  loadFamily: (email: string) => Promise<boolean>;
  logout: () => void;
  user: User;
  family: Family;
  updateFamily: (family: Family) => Family;
};

type AuthProviderProps = {
  children: ReactNode;
};

let loadingFamily = false;

const AuthContext = createContext<AuthData>({} as AuthData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [family, setFamily] = useState<Family>({} as Family);
  const { data, data: session, status } = useSession();

  const updateFamily = useCallback((family: Family) => {
    setFamily(family);
    localStorage.setItem("@family", JSON.stringify(family));
    return family;
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      if (!family.data && data && data.user && data.user.email) {
        if (!window.location.pathname.includes("/admin"))
          loadFamily(data.user.email);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function loadFamily(email: string) {
    if (loadingFamily) return false;

    loadingFamily = true;
    console.log("Loading family members");

    if (typeof window !== undefined) {
      const cacheExpired = localStorage.getItem("@cache-expires");
      if (Number(cacheExpired) > new Date().getTime()) {
        const userStored = localStorage.getItem("@user");

        if (userStored) {
          console.log("Loaded user from cache");
          setUser(JSON.parse(userStored));
        }

        const familyStored = localStorage.getItem("@family");

        if (familyStored) {
          console.log("Loaded family from cache");
          setFamily({ data: JSON.parse(familyStored) });
        }

        if (userStored && familyStored) {
          console.log("Family members loaded");
          return true;
        }
      } else {
        console.log("Cache expired - loading from DB");
      }
    }

    try {
      const res = await fetch(`/api/invite/listFamily`, {
        method: "POST",
        body: JSON.stringify({
          relation: session?.relation,
          password: "jorge_1234_vaila_cleison",
        }),
      });

      const familyMembers = (await await res.json()) as Family;

      localStorage.setItem("@family", JSON.stringify(familyMembers.data));
      setFamily(familyMembers);

      const userAccessing = familyMembers.data.find(
        (member) => member.email === email
      );
      setUser(userAccessing ? userAccessing : ({} as User));
      localStorage.setItem("@user", JSON.stringify(userAccessing));

      const expiresAt = new Date().getTime() + 1000 * 60 * 5;
      localStorage.setItem("@cache-expires", expiresAt.toString());
      console.log("Cache will expire at", new Date(expiresAt));

      console.log("Family members loaded");

      loadingFamily = false;
      return true;
    } catch (error) {
      loadingFamily = false;
    }

    return false;
  }

  const logout = useCallback(() => {
    localStorage.removeItem("@family");
    localStorage.removeItem("@user");
    localStorage.removeItem("@cache-expires");
    setUser({} as User);
    setFamily({} as Family);
  }, []);

  return (
    <AuthContext.Provider
      value={{ loadFamily, logout, user, family, updateFamily }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
