
type Props = {
    title: string;
    count: string | number;
    icon: React.ReactNode;
    link: string;
}
const DashboardCard = ({ title, count, icon, link }:Props) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="mr-4 p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
        <a href={link} className="text-sm text-conces-blue hover:underline">
          View all
        </a>
      </div>
    </div>
  );

export default DashboardCard;