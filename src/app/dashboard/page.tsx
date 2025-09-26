'use client';

import { testUser } from '@/data/TestUser';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SideBar from '@/components/SideBar';
import { UserHeader } from '@/components/UserHeader';
import { StatsCard } from '@/components/StatsCard';
import Analytics from '@/components/Analytics';
import PortfolioPreview from '@/components/PortfolioPreview';
import PdfPreviewModal from '@/components/PdfPreviewModal';

const DashboardPage = () => {
  const router = useRouter();
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfFormat, setPdfFormat] = useState<'standard' | 'table' | 'resume'>('standard');

  const handlePdfPreview = () => {
    setShowPdfPreview(true);
  };

  const closePdfPreview = () => {
    setShowPdfPreview(false);
  };

  const handleInterviewClick = () => {
    router.push('/interview');
  };

  return (
    <div className="flex bg-gray-50 text-gray-800">
      <SideBar onInterviewClick={handleInterviewClick} />

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <UserHeader user={testUser} />

        <main className="p-6">
          <StatsCard />

          <PortfolioPreview
            user={testUser}
            handleInterviewClick={handleInterviewClick}
            handlePdfPreview={handlePdfPreview}
          />

          <Analytics />
        </main>
      </div>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <PdfPreviewModal
          pdfFormat={pdfFormat}
          setPdfFormat={setPdfFormat}
          close={closePdfPreview}
          onPrint={() => window.print()}
          onDownload={() => alert('ダウンロード機能は未実装です')}
        />
      )}
    </div>
  );
};

export default DashboardPage;