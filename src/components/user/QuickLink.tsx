
type QuickLinkItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
const QuickLinkItem = ({ title, description, icon }:QuickLinkItemProps) => (
    <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-conces-blue">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
export default QuickLinkItem;  