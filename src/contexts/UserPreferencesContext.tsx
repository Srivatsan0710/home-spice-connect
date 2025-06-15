
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  spiceLevel: 'mild' | 'medium' | 'hot' | 'very-hot';
  budgetRange: string;
  mealTimes: string[];
  allergens: string[];
  cookingStyle: string[];
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  favoriteCuisines: [],
  spiceLevel: 'medium',
  budgetRange: '',
  mealTimes: [],
  allergens: [],
  cookingStyle: [],
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider value={{
      preferences,
      updatePreferences,
      resetPreferences
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
