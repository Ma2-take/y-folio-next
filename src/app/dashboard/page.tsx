'use client';

import { testUser } from '@/data/TestUser';
import { useState } from 'react';

import SideBar from '@/components/SideBar';
import { UserHeader } from '@/components/UserHeader';
import { StatsCard } from '@/components/StatsCard';
import Analytics from '@/components/Analytics';
import PortfolioPreview from '@/components/PortfolioPreview';
import PdfPreviewModal from '@/components/PdfPreviewModal';
import { ShareModal } from '@/components/ShareModal';

const DashboardPage = () => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfFormat, setPdfFormat] = useState<'standard' | 'table' | 'resume'>('standard');

  const handlePdfPreview = () => {
    setShowPdfPreview(true);
  };

  const closePdfPreview = () => {
    setShowPdfPreview(false);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://y-folio.com/portfolio/tanaka-taro');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex bg-gray-50 text-gray-800">
      <SideBar onShareClick={handleShareClick} />

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <UserHeader user={testUser} />

        <main className="p-6">
          <StatsCard />

          <PortfolioPreview handleShareClick={handleShareClick} handlePdfPreview={handlePdfPreview} />

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

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          closeShareModal={closeShareModal}
          copied={copied}
          handleCopyUrl={handleCopyUrl}
        />
      )}
    </div>
  );
};

export default DashboardPage;