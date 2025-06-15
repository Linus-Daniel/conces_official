

type Props = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'danger';
    onClick?: () => void;
}
export default function DashboardCard({ title, value, icon, color = 'primary', onClick }:Props) {
    const colors = {
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800'
    };
  
    return (
      <div 
        className={`dashboard-card ${colors[color]} rounded-lg p-4 shadow-sm cursor-pointer transition-all hover:shadow-md`}
        onClick={onClick}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-2 rounded-full bg-white bg-opacity-50">
            {icon}
          </div>
        </div>
      </div>
    );
  }