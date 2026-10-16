import { useState, useEffect, useCallback } from 'react';
import { UserHardwareSetup } from '../types/setup';

const STORAGE_KEY = 'oribius_user_hardware_setup';
const EVENT_NAME = 'oribius_hardware_setup_changed';

export function useUserSetup() {
  const [setup, setSetup] = useState<UserHardwareSetup | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  });

  // Keep state synced across tabs / custom events
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setSetup(saved ? JSON.parse(saved) : null);
      } catch {
        setSetup(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(EVENT_NAME, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(EVENT_NAME, handleStorageChange);
    };
  }, []);

  const saveSetup = useCallback((newSetup: UserHardwareSetup) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSetup));
      setSetup(newSetup);
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (err) {
      console.error('Error saving hardware setup:', err);
    }
  }, []);

  const clearSetup = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSetup(null);
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (err) {
      console.error('Error clearing hardware setup:', err);
    }
  }, []);

  return {
    setup,
    saveSetup,
    clearSetup,
    hasSetup: Boolean(setup && setup.cpu && setup.gpu && setup.ramGb),
  };
}
