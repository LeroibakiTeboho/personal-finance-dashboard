import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard 
          title="Monthly Overview" 
          description="Track income and expenses over time"
          href="/reports/monthly"
        />
        <ReportCard 
          title="Category Breakdown" 
          description="See where your money is going"
          href="/reports/category"
        />
        <ReportCard 
          title="Income vs Expenses" 
          description="Compare your earnings and spending"
          href="/reports/income-expenses"
        />
      </div>
    </div>
  );
}

function ReportCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 hover:shadow-md transition cursor-pointer h-full">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}