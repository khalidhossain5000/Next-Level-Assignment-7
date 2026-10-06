import HeroSection from "@/components/modules/homePage/heroSection/HeroSection";
import HowWeWorks from "@/components/modules/homePage/how-we-works/HowWeWorks";
import Overview from "@/components/modules/homePage/power-overview/Overview";
import PowerZones from "@/components/modules/homePage/power-zones/PowerZones";
import UpcomingLoadSheddingSchedule from "@/components/modules/homePage/upcoming-load-shedding-schedule/UpcomingLoadShedding";

export default function PublicHomePage() {
  return (
   <div>

    <HeroSection/>
    <Overview/>
    <UpcomingLoadSheddingSchedule/>
    <PowerZones/>
    <HowWeWorks/>
   </div>
  );
}
