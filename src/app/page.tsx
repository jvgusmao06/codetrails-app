import { getAllTracks } from "@/lib/tracks";
import { SkillTree } from "@/components/SkillTree";

export default function HomePage() {
  const tracks = getAllTracks();
  return <SkillTree tracks={tracks} />;
}
