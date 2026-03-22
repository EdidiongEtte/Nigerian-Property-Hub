import { useState, useEffect } from 'react';

// Types
export interface Report {
  id: string;
  property: string;
  agent: string;
  agentId?: string;
  reason: string;
  details: string;
  status: 'open' | 'resolved';
  date: string;
  reporter: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  name: string;
  agencyName?: string;
  type: string;
  documents: string[];
  status: 'pending' | 'verified' | 'rejected';
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'warning' | 'success' | 'info' | 'error';
  read: boolean;
  date: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  purpose: string;
  city: string;
  area: string;
  type: string;
  maxPrice: string;
  date: string;
}

// Initial Mock Data
const defaultReports: Report[] = [
  { id: "R1", property: "3 Bedroom Flat in Ikeja", agent: "John Doe", reason: "Suspected Scam", details: "Asked for inspection fee before viewing.", status: "open", date: new Date().toISOString(), reporter: "Anonymous" }
];

const defaultVerifications: VerificationRequest[] = [];
const defaultNotifications: Notification[] = [];
const defaultSavedSearches: SavedSearch[] = [];

// Helper to get from local storage
const getFromStorage = <T>(key: string, defaultData: T): T => {
  if (typeof window === 'undefined') return defaultData;
  const data = localStorage.getItem(`naijahomes_${key}`);
  return data ? JSON.parse(data) : defaultData;
};

// Helper to save to local storage
const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`naijahomes_${key}`, JSON.stringify(data));
    // Dispatch a custom event so other components can listen
    window.dispatchEvent(new Event('storage_updated'));
  }
};

export const useMockDb = () => {
  const [reports, setReports] = useState<Report[]>(() => getFromStorage('reports', defaultReports));
  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => getFromStorage('verifications', defaultVerifications));
  const [notifications, setNotifications] = useState<Notification[]>(() => getFromStorage('notifications', defaultNotifications));
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => getFromStorage('saved_searches', defaultSavedSearches));

  useEffect(() => {
    const handleStorageUpdate = () => {
      setReports(getFromStorage('reports', defaultReports));
      setVerifications(getFromStorage('verifications', defaultVerifications));
      setNotifications(getFromStorage('notifications', defaultNotifications));
      setSavedSearches(getFromStorage('saved_searches', defaultSavedSearches));
    };

    window.addEventListener('storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('storage_updated', handleStorageUpdate);
  }, []);

  // Actions
  const addReport = (report: Omit<Report, 'id' | 'date' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: `R${Date.now()}`,
      status: 'open',
      date: new Date().toISOString()
    };
    const updated = [newReport, ...reports];
    setReports(updated);
    saveToStorage('reports', updated);
  };

  const updateReportStatus = (id: string, status: 'open' | 'resolved') => {
    const updated = reports.map(r => r.id === id ? { ...r, status } : r);
    setReports(updated);
    saveToStorage('reports', updated);
  };

  const addVerification = (req: Omit<VerificationRequest, 'id' | 'date' | 'status'>) => {
    const newReq: VerificationRequest = {
      ...req,
      id: `V${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString()
    };
    // Remove old verification for this user if exists
    const filtered = verifications.filter(v => v.userId !== req.userId);
    const updated = [newReq, ...filtered];
    setVerifications(updated);
    saveToStorage('verifications', updated);
  };

  const updateVerificationStatus = (id: string, status: 'verified' | 'rejected') => {
    const updated = verifications.map(v => v.id === id ? { ...v, status } : v);
    setVerifications(updated);
    saveToStorage('verifications', updated);
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `N${Date.now()}`,
      read: false,
      date: new Date().toISOString()
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveToStorage('notifications', updated);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    saveToStorage('notifications', updated);
  };

  const addSavedSearch = (search: Omit<SavedSearch, 'id' | 'date'>) => {
    const newSearch: SavedSearch = {
      ...search,
      id: `S${Date.now()}`,
      date: new Date().toISOString()
    };
    const updated = [newSearch, ...savedSearches];
    setSavedSearches(updated);
    saveToStorage('saved_searches', updated);
  };

  const deleteSavedSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    saveToStorage('saved_searches', updated);
  };

  const getUserVerifications = (userId: string) => verifications.filter(v => v.userId === userId);
  const getUserNotifications = (userId: string) => notifications.filter(n => n.userId === userId);
  const getUserSavedSearches = (userId: string) => savedSearches.filter(s => s.userId === userId);

  return {
    reports,
    verifications,
    notifications,
    savedSearches,
    addReport,
    updateReportStatus,
    addVerification,
    updateVerificationStatus,
    addNotification,
    markNotificationRead,
    addSavedSearch,
    deleteSavedSearch,
    getUserVerifications,
    getUserNotifications,
    getUserSavedSearches
  };
};
