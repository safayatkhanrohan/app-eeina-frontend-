import Bookappointments from "./component/Nutritionist/Bookappointments";
import NutritionistInfo from "./component/Nutritionist/NutritionistInfo";
import ServicesprovidedInfo from "./component/Nutritionist/ServicesprovidedInfo";
import ServicesprovidedSidebar from "./component/Nutritionist/ServicesprovidedSidebar";
import StatisticsInfo from "./component/Nutritionist/statisticsInfo";
import StatisticsSideBar from "./component/Nutritionist/statisticsSideBar";


const Nutritionist = () => {
  return (
    <div className="max-w-6xl xl2:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <NutritionistInfo />
      <div className="grid grid-cols-12  gap-5">
        <StatisticsSideBar />
        <StatisticsInfo />
      </div>
      <div className="grid grid-cols-12 gap-5 my-5 items-stretch">
        <ServicesprovidedSidebar />
        <ServicesprovidedInfo />
      </div>
      <Bookappointments />
    </div>
  );
};

export default Nutritionist;
