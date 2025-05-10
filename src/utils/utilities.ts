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
    if (excluded.includes(key)) continue;
    if (value === undefined || value === null || value.toString().length === 0) {
      return false;
    }
  }
  return true;
}

export function isDateRangeOverlapping(date1: string, date2: string, date3: string, date4: string): boolean {
  if (date3.length == 0 || date4.length == 0) return false;

  console.log(`Date 1: ${date1}`, `Date 2: ${date2}`, `Date 3: ${date3}`, `Date 4: ${date4}`);

  const start1 = new Date(date1);
  const end1 = new Date(date2);
  const start2 = new Date(date3);
  const end2 = new Date(date4);

  console.log(`Start 1: ${start1}`, `End 1: ${end1}`, `Start 2: ${start2}`, `End 2: ${end2}`);

  return start1 <= end2 && start2 <= end1;
}
