import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isNewUser: boolean;
  hasClaimedFreeServer: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [hasClaimedFreeServer, setHasClaimedFreeServer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Check if user exists in Firestore, if not create them
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          let role = 'user';
          let claimed = false;
          if (currentUser.email === 'ghoshsima874@gmail.com') {
            role = 'admin';
          }

          if (!userSnap.exists()) {
            setIsNewUser(true);
            await setDoc(userRef, {
              email: currentUser.email,
              name: currentUser.displayName || '',
              role: role,
              hasClaimedFreeServer: false,
              createdAt: serverTimestamp()
            });
          } else {
            setIsNewUser(false);
            const data = userSnap.data();
            role = data.role || 'user';
            claimed = data.hasClaimedFreeServer || false;
          }
          
          setIsAdmin(role === 'admin');
          setHasClaimedFreeServer(claimed);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAdmin(currentUser.email === 'ghoshsima874@gmail.com');
          setHasClaimedFreeServer(false);
        }
      } else {
        setIsAdmin(false);
        setIsNewUser(false);
        setHasClaimedFreeServer(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isNewUser, hasClaimedFreeServer, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
