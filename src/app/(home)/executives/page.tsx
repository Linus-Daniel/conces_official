import { executives } from "@/constant"
import ExecutiveCard from "@/components/ExecutivesCard";

export default function ExecutivesPage() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive) => (
            <ExecutiveCard key={executive.id} executive={executive} />
          ))}
        </div>
      </div>
    </section>
  );
}
