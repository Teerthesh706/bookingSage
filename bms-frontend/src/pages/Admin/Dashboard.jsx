import { useEffect, useState } from "react";
import API from "../../apis";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#1c1c1c] p-6 rounded">
          Movies: {stats.movieCount}
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded">
          Theaters: {stats.theaterCount}
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded">Shows: {stats.showCount}</div>
      </div>
    </div>
  );
};

export default Dashboard;
