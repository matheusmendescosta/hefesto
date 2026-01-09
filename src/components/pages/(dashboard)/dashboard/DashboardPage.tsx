"use client";

import { DashboardChartSection } from "./DasboardChartSection";
import { SectionCards } from "./DashboardSections";

const DashboardPage = () => {
  return (
    <div className="flex flex-col h-screen w-full border-2 overflow-hidden bg-gray-800">
      <main className="flex-1 overflow-auto bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <SectionCards />
          <DashboardChartSection />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
