import { fetchMetrics } from "utils/stats";
import StatsClient from "./StatsClient";

export default async function Stats() {
  const initialStats = await fetchMetrics();
  return <StatsClient initialStats={initialStats} />;
}
