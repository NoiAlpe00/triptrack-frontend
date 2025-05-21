import jwt from "jwt-decode";
import { TokenData } from "./TypesIndex";

export function formatISOString(isoString: string): string {
  const date = new Date(isoString);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // hour 0 should be 12

  const hh = String(hours).padStart(2, "0");

  return `${mm}/${dd}/${yyyy} (${hh}:${minutes} ${ampm})`;
}

export function formatISOStringActualData(isoString: string): string {
  const date = new Date(isoString);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  hours = hours % 12;
  hours = hours ? hours : 12; // hour 0 should be 12

  const hh = String(hours).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${minutes}:00`;
}

export function formatISOStringDateOnly(isoString: string): string {
  const date = new Date(isoString);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  let hours = date.getHours();

  hours = hours % 12;
  hours = hours ? hours : 12; // hour 0 should be 12

  return `${mm}/${dd}/${yyyy}`;
}

export function decodeToken(token: string): TokenData {
  return jwt(token);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function requestGuard<T extends Record<string, any>>(formData: T, excluded: string[]): boolean {
  for (const [key, value] of Object.entries(formData)) {
    if (key.toLowerCase().includes("email")) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (isValidEmail) {
        continue;
      } else {
        return false;
      }
    }
    if (excluded.includes(key)) continue;
    if (value === undefined || value === null || value.toString().length === 0) {
      return false;
    }
  }
  return true;
}

export function isDateRangeOverlapping(date1: string, date2: string, date3: string, date4: string): boolean {
  if (date3.length == 0 || date4.length == 0) return false;

  const start1 = new Date(date1);
  const end1 = new Date(date2);
  const start2 = new Date(date3);
  const end2 = new Date(date4);

  return start1 <= end2 && start2 <= end1;
}

export function getLocalISOString(date: Date): string {
  // Convert the date to PH time (UTC+8)
  const phOffset = 8 * 60; // in minutes
  const local = new Date(date.getTime() + phOffset * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  const yyyy = local.getUTCFullYear();
  const mm = pad(local.getUTCMonth() + 1);
  const dd = pad(local.getUTCDate());
  const hh = pad(local.getUTCHours());
  const min = pad(local.getUTCMinutes());
  const ss = pad(local.getUTCSeconds());
  const ms = String(local.getUTCMilliseconds()).padStart(3, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.${ms}`;
}

export function isDatePast(date1: string, date2: string): boolean {
  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);

  return dateOne >= dateTwo;
}
