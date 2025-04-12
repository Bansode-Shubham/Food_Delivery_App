


import { supabase } from "@/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState, useCallback } from "react";

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
});

/**
 * Provider component that manages authentication state and user profile data.
 * 
 * This component handles:
 * - Authentication session state
 * - User profile data fetching and management
 * - Admin status tracking
 * - Authentication state changes
 * 
 * @param {PropsWithChildren} props - Component props containing child elements
 * @returns {JSX.Element} AuthContext.Provider wrapping child components
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchProfile = useCallback(async (userId: string) => {
        try {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();
            
            setProfile(data || null);
            setIsAdmin(data?.group === "ADMIN");
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }, []);

    const handleAuthStateChange = useCallback(async (_event: string, newSession: Session | null) => {
        setSession(newSession);
        if (newSession?.user?.id) {
            await fetchProfile(newSession.user.id);
        } else {
            setProfile(null);
            setIsAdmin(false);
        }
    }, [fetchProfile]);

    useEffect(() => {
        let isMounted = true;

        const initialize = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession();
                
                if (isMounted) {
                    if (currentSession?.user?.id) {
                        setSession(currentSession);
                        await fetchProfile(currentSession.user.id);
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initialize();

        const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

        return () => {
            isMounted = false;
            authListener.subscription.unsubscribe();
        };
    }, [fetchProfile, handleAuthStateChange]);

    const value = {
        session,
        profile,
        loading,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);




// import { supabase } from "@/lib/superbase";
// import { Session } from "@supabase/supabase-js";
// import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// type AuthData = {
//   session: Session | null;
//   profile: any;
//   loading: boolean;
//   isAdmin: boolean;
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   profile: null,
//   loading: true,
//   isAdmin: false,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin

//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setSession(session);
//       console.log(session);

//       if (session) {
//         // fetch profile
//         const { data } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', session.user.id)
//           .single();
//         setProfile(data || null);
//         setIsAdmin(data?.group === "ADMIN");
//       }
//       setLoading(false);
//     };

//     fetchSession();

//     const { data: authListener } = supabase.auth.onAuthStateChange(async(_event, session) => {
//       setSession(session);
//       if (session) {
//         const { data } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', session.user.id)
//           .single();
//         setProfile(data || null);
//         setIsAdmin(data?.group === "ADMIN");
//       }
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   console.log(profile);

//   return (
//     <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// import { supabase } from "@/lib/superbase";
// import { Session } from "@supabase/supabase-js";
// import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// type AuthData = {
//   session: Session | null;
//   profile: any;
//   loading: boolean;
//   isAdmin: boolean;
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   profile: null,
//   loading: true,
//   isAdmin: false,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const fetchProfile = async (userId: string) => {
//       try {
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", userId)
//           .single();
        
//         if (mounted) {
//           setProfile(data || null);
//           setIsAdmin(data?.isAdmin || false);
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     const initialize = async () => {
//       try {
//         const { data: { session: currentSession } } = await supabase.auth.getSession();
        
//         if (mounted) {
//           setSession(currentSession);
//           if (currentSession?.user?.id) {
//             await fetchProfile(currentSession.user.id);
//           }
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error initializing auth:', error);
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     initialize();

//     const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
//       if (mounted) {
//         setSession(newSession);
//         if (newSession?.user?.id) {
//           await fetchProfile(newSession.user.id);
//         } else {
//           setProfile(null);
//           setIsAdmin(false);
//         }
//       }
//     });

//     return () => {
//       mounted = false;
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, profile, loading, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// import { supabase } from "@/lib/superbase";
// import { Session } from "@supabase/supabase-js";
// import { createContext, PropsWithChildren, useContext, useEffect, useState, useCallback } from "react";

// type AuthData = {
//   session: Session | null;
//   profile: any;
//   loading: boolean;
//   isAdmin: boolean;
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   profile: null,
//   loading: true,
//   isAdmin: false,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const fetchProfile = useCallback(async (userId: string) => {
//     try {
//       const { data } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();
      
//       setProfile(data || null);
//       setIsAdmin(data?.isAdmin || false);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   }, []);

//   const handleAuthStateChange = useCallback(async (_event: string, newSession: Session | null) => {
//     setSession(newSession);
//     if (newSession?.user?.id) {
//       await fetchProfile(newSession.user.id);
//     } else {
//       setProfile(null);
//       setIsAdmin(false);
//     }
//   }, [fetchProfile]);

//   useEffect(() => {
//     let isMounted = true;

//     const initialize = async () => {
//       try {
//         const { data: { session: currentSession } } = await supabase.auth.getSession();
        
//         if (isMounted) {
//           if (currentSession?.user?.id) {
//             setSession(currentSession);
//             await fetchProfile(currentSession.user.id);
//           }
//         }
//       } catch (error) {
//         console.error('Error initializing auth:', error);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     initialize();

//     const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

//     return () => {
//       isMounted = false;
//       authListener.subscription.unsubscribe();
//     };
//   }, [fetchProfile, handleAuthStateChange]);

//   const value = {
//     session,
//     profile,
//     loading,
//     isAdmin
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// import { supabase } from "@/lib/superbase";
// import { Session } from "@supabase/supabase-js";
// import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// type AuthData = {
//   session: Session | null;
//   profile: any;
//   loading: boolean;
//   isAdmin: boolean;
// };

// const AuthContext = createContext<AuthData>({
//   session: null,
//   profile: null,
//   loading: true,
//   isAdmin: false,
// });

// export default function AuthProvider({ children }: PropsWithChildren) {
//   const [session, setSession] = useState<Session | null>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfile = async (userId: string) => {
//       try {
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", userId)
//           .single();

//         if (isMounted) {
//           setProfile(data || null);
//           setIsAdmin(data?.isAdmin || false);
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     const initialize = async () => {
//       try {
//         const { data: { session: currentSession } } = await supabase.auth.getSession();
        
//         if (isMounted) {
//           setSession(currentSession);
//           if (currentSession?.user?.id) {
//             await fetchProfile(currentSession.user.id);
//           }
//         }
//       } catch (error) {
//         console.error('Error initializing auth:', error);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     initialize();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (_event, newSession) => {
//         if (isMounted) {
//           setSession(newSession);
//           if (newSession?.user?.id) {
//             await fetchProfile(newSession.user.id);
//           } else {
//             setProfile(null);
//             setIsAdmin(false);
//           }
//         }
//       }
//     );

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   const value = {
//     session,
//     profile,
//     loading,
//     isAdmin
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);