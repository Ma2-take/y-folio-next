'use client';

import { Download, Printer, X } from 'lucide-react';
import StandardPdfContent from '@/components/preview/StandardPdfContent';
import TablePdfContent from '@/components/preview/TablePdfContent';
import ResumePdfContent from '@/components/preview/ResumePdfContent';

interface Props {
    pdfFormat: 'standard' | 'table' | 'resume';
    setPdfFormat: (format: 'standard' | 'table' | 'resume') => void;
    close: () => void;
    onPrint: () => void;
    onDownload: () => void;
}

export default function PdfPreviewModal({
    pdfFormat,
    setPdfFormat,
    close,
    onPrint,
    onDownload
}: Props) {
    {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">PDFプレビュー</h3>
                            <p className="text-sm text-gray-600">印刷用ポートフォリオのプレビュー</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 mr-4">
                                <label className="text-sm font-medium text-gray-700">形式:</label>
                                <select
                                    value={pdfFormat}
                                    onChange={(e) => setPdfFormat(e.target.value as 'standard' | 'table' | 'resume')}
                                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="standard">標準形式</option>
                                    <option value="table">表形式</option>
                                    <option value="resume">履歴書形式</option>
                                </select>
                            </div>
                            <button onClick={onPrint} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                <Printer className="w-4 h-4 mr-2" />
                                印刷
                            </button>
                            <button onClick={onDownload} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                <Download className="w-4 h-4 mr-2" />
                                ダウンロード
                            </button>
                            <button onClick={close} className="p-2 text-gray-400 hover:text-gray-600 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* コンテンツ表示領域 */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        {pdfFormat === 'standard' && <StandardPdfContent />}
                        {pdfFormat === 'table' && <TablePdfContent />}
                        {pdfFormat === 'resume' && <ResumePdfContent />}
                    </div>
                </div>
            </div>
        );
    };
}