import { useEffect } from "react"
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar/Index.jsx";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, [])
  return (
    <div className="bg-gray-background" >
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
