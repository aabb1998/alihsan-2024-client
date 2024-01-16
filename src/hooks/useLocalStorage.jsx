import { useState, useEffect } from 'react';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const useLocalStorageEncrypted = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? decrypt(item) : initialValue;
    } catch (error) {
      console.error('Error loading encrypted item from localStorage:', error);
      return initialValue;
    }
  });

  const generateKey = async () => {
    const encoder = new TextEncoder();
    const subtleKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(ENCRYPTION_KEY),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
    return subtleKey;
  };

  const encrypt = async (text, subtleKey) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      subtleKey,
      data
    );
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedString = [...iv, ...encryptedArray].map((byte) =>
      String.fromCharCode(byte)
    ).join('');
    return encryptedString;
  };

  const decrypt = async (encryptedText, subtleKey) => {
    const decoder = new TextDecoder();
    const data = new Uint8Array([...encryptedText].map((c) => c.charCodeAt(0)));
    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      subtleKey,
      ciphertext
    );
    return decoder.decode(decrypted);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subtleKey = await generateKey();
        const encryptedValue = await encrypt(storedValue, subtleKey);
        localStorage.setItem(key, encryptedValue);
      } catch (error) {
        console.error('Error saving encrypted item to localStorage:', error);
      }
    };

    fetchData();
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorageEncrypted;
