
type CategoryCardProps = {
  title: string;
  count: string | number;
  color: string;
};

const CategoryCard = ({ title, count, color }:CategoryCardProps) => (
    <div className={`p-4 rounded-lg ${color}`}>
      <h4 className="font-medium">{title}</h4>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );

  export default CategoryCard;