import SitePage from "@/components/SitePage";

/* The colourway widget shipped, so it is always on. `SitePage` keeps the prop
   because the case study pages render the same footer without it. */
export default function Home() {
  return <SitePage colourway />;
}
