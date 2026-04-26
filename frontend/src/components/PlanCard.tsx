type Plan = {
  name: string;
  price: number;
  duration: number;
};

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold">{plan.name}</h2>

      <p className="text-2xl font-bold mt-2">
        KES {plan.price}
      </p>

      <p className="text-gray-500 mt-1">
        {plan.duration} days
      </p>
    </div>
  );
}