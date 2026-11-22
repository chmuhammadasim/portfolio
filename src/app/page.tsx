import HomeClient from "./HomeClient";
import { getGitHubData } from "@/lib/github";
import { ProfilePageJsonLd } from "@/components/JsonLd";

export const revalidate = 3600; // ISR: refresh GitHub telemetry hourly

export default async function Home() {
  const github = await getGitHubData();
  return (
    <>
      <ProfilePageJsonLd />
      <HomeClient github={github} />
    </>
  );
}
