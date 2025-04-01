interface GameMetric {
  id: number;
  name: string;
  playing: number;
  visits: number;
  favoritedCount: number;
}

interface GroupMetric {
  id: string;
  displayName: string;
  memberCount: number;
}

export interface Metrics {
  games: GameMetric[];
  group: GroupMetric;
}

export async function fetchMetrics() {
  try {
    const res = await fetch(
      "https://mysverse-engagement-metrics.yan3321.workers.dev/"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch metrics");
    }
    const data: Metrics = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching metrics:", err);
  }
}
