import HeroSection from "@/components/modules/homePage/heroSection/HeroSection";
import Overview from "@/components/modules/homePage/power-overview/Overview";
import UpcomingLoadSheddingSchedule from "@/components/modules/homePage/upcoming-load-shedding-schedule/UpcomingLoadShedding";

export default function PublicHomePage() {
  return (
   <div>

    <HeroSection/>
    <Overview/>
    <UpcomingLoadSheddingSchedule/>
   </div>
  );
}
