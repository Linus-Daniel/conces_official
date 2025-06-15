
type AnnouncementItemProps = {
  title: string;
  content: string;
  date: string;
  category: string;
};
const AnnouncementItem = ({ title, content, date, category }:AnnouncementItemProps) => (
    <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
      <h4 className="font-medium text-conces-blue">{title}</h4>
      <p className="text-sm text-gray-600 my-2">{content}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{date}</span>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
          {category}
        </span>
      </div>
    </div>
  );

  export default AnnouncementItem;