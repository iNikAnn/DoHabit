// src/utils/dateUtils.js
export const toYMD = (d) => {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const startOfDay = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getPastDays = (days = 30) => {
  const arr = [];
  const today = startOfDay(new Date());
  for (let i = 0; i < days; i++) {
    const dt = new Date(today);
    dt.setDate(today.getDate() - (days - 1 - i)); // oldest -> newest
    arr.push(toYMD(dt));
  }
  return arr;
};

export const groupCountsByDate = (items = []) => {
  // Accepts ["2025-11-21", ...] or [{date: '2025-11-21', count: 2}, ...]
  const map = new Map();
  items.forEach((it) => {
    if (!it) return;
    if (typeof it === "string") {
      const d = it.slice(0, 10);
      map.set(d, (map.get(d) || 0) + 1);
    } else if (it.date) {
      const d = it.date.slice(0, 10);
      map.set(d, (map.get(d) || 0) + (Number(it.count) || 1));
    } else if (it.completedAt) {
      // fallback shape: { completedAt: ISOstring }
      const d = toYMD(it.completedAt);
      map.set(d, (map.get(d) || 0) + 1);
    }
  });
  return Object.fromEntries(map);
};

export const getWeekRange = (ref = new Date()) => {
  // returns array of YMD strings for current week (Mon-Sun)
  const date = startOfDay(ref);
  const day = date.getDay(); // 0 Sun ... 6 Sat
  // we'll treat week as Mon-Sun: compute Monday
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const mon = new Date(date);
  mon.setDate(date.getDate() + diffToMon);
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    arr.push(toYMD(d));
  }
  return arr;
};

export const computeLongestStreak = (datesSet) => {
  // datesSet: Set of YMD strings of days with >=1 completion
  if (!datesSet || datesSet.size === 0) return 0;
  const arr = Array.from(datesSet).sort();
  // convert to timestamps for continuous checking
  const toTs = (ymd) => new Date(ymd + "T00:00:00").getTime();
  let maxStreak = 0, curStreak = 0, prev = null;
  for (const d of arr) {
    const ts = toTs(d);
    if (prev === null) {
      curStreak = 1;
    } else {
      const diffDays = Math.round((ts - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) curStreak += 1;
      else curStreak = 1;
    }
    prev = ts;
    if (curStreak > maxStreak) maxStreak = curStreak;
  }
  return maxStreak;
};
