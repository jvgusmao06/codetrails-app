import { getAllTracks } from "@/lib/tracks";
import { StatsDashboard } from "@/components/StatsDashboard";

export default function StatsPage() {
  const tracks = getAllTracks();
  return <StatsDashboard tracks={tracks} />;
}
