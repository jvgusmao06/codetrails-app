import { getAllTracks } from "@/lib/tracks";
import { TrackStudio } from "@/components/TrackStudio";

export default function CommunityPage() {
  const tracks = getAllTracks();
  return <TrackStudio tracks={tracks} />;
}
