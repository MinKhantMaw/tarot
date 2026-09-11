import { TarotReadingRecord } from '../types/tarot';

/**
 * Interface contract for reading storage.
 * Easily swappable with PostgreSQL, Cloud SQL, Firebase, or Node REST backend.
 */
export interface ReadingRepository {
  createReading(reading: Omit<TarotReadingRecord, 'id' | 'createdAt'>): Promise<TarotReadingRecord>;
  getReading(id: string): Promise<TarotReadingRecord | null>;
  getReadings(): Promise<TarotReadingRecord[]>;
  updateReading(id: string, updates: Partial<TarotReadingRecord>): Promise<TarotReadingRecord | null>;
  deleteReading(id: string): Promise<boolean>;
  clearAllReadings(): Promise<boolean>;
}

const STORAGE_KEY = 'mystic_tarot_readings_v1';

export class LocalStorageReadingRepository implements ReadingRepository {
  private getStorageData(): TarotReadingRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as TarotReadingRecord[];
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
      return [];
    }
  }

  private setStorageData(readings: TarotReadingRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  }

  async createReading(
    readingData: Omit<TarotReadingRecord, 'id' | 'createdAt'>
  ): Promise<TarotReadingRecord> {
    const newRecord: TarotReadingRecord = {
      ...readingData,
      id: `reading_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const current = this.getStorageData();
    // Prepend so newest is first
    this.setStorageData([newRecord, ...current]);
    return newRecord;
  }

  async getReading(id: string): Promise<TarotReadingRecord | null> {
    const readings = this.getStorageData();
    return readings.find((r) => r.id === id) || null;
  }

  async getReadings(): Promise<TarotReadingRecord[]> {
    return this.getStorageData();
  }

  async updateReading(
    id: string,
    updates: Partial<TarotReadingRecord>
  ): Promise<TarotReadingRecord | null> {
    const readings = this.getStorageData();
    const index = readings.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updated = {
      ...readings[index],
      ...updates,
    };
    readings[index] = updated;
    this.setStorageData(readings);
    return updated;
  }

  async deleteReading(id: string): Promise<boolean> {
    const readings = this.getStorageData();
    const filtered = readings.filter((r) => r.id !== id);
    this.setStorageData(filtered);
    return filtered.length !== readings.length;
  }

  async clearAllReadings(): Promise<boolean> {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }
}

// Default singleton repository instance
export const readingRepository: ReadingRepository = new LocalStorageReadingRepository();
