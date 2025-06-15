type ActivityMetricProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const ActivityMetric = ({ title, value, icon }:ActivityMetricProps) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
    <div className="mr-3 p-2 bg-conces-blue bg-opacity-10 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default ActivityMetric
