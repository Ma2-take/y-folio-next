'use client';

import { useEffect, useState } from 'react';
import { Download, Printer, X } from 'lucide-react';
import StandardPdfContent from '@/components/preview/StandardPdfContent';
import TablePdfContent from '@/components/preview/TablePdfContent';
import ResumePdfContent from '@/components/preview/ResumePdfContent';
import CareerPdfContent from '@/components/preview/CareerPdfContent';

interface Props {
    pdfFormat: 'standard' | 'table' | 'resume' | 'career';
    setPdfFormat: (format: 'standard' | 'table' | 'resume' | 'career') => void;
    userId: string;
    close: () => void;
    onPrint: () => void;
    onDownload: () => void;
}

export default function PdfPreviewModal({
    pdfFormat,
    setPdfFormat,
    userId,
    close,
    onPrint,
    onDownload
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // コンポーネントのマウント状態を追跡
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        
        // クリーンアップ関数
        return () => {
            setIsMounted(false);
        };
    }, []);

    // 安全な状態更新関数
    const safeSetState = (callback: () => void) => {
        if (isMounted) {
            callback();
        }
    };

    const handleFormatChange = (newFormat: 'standard' | 'table' | 'resume' | 'career') => {
        safeSetState(() => {
            setIsLoading(true);
            setError(null);
            setPdfFormat(newFormat);
        });
    };

    useEffect(() => {
        if (isLoading) {
            // 非同期処理の完了を待つ
            const timer = setTimeout(() => {
                safeSetState(() => {
                    setIsLoading(false);
                });
            }, 500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isLoading]);

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
                                onChange={(e) => handleFormatChange(e.target.value as 'standard' | 'table' | 'resume' | 'career')}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                disabled={isLoading}
                            >
                                <option value="standard">標準形式</option>
                                <option value="table">表形式</option>
                                <option value="resume">履歴書形式</option>
                                <option value="career">職務経歴書形式</option>
                            </select>
                        </div>
                        <button
                            onClick={onPrint}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            disabled={isLoading}
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onDownload}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            disabled={isLoading}
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button
                            onClick={close}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-600 p-4 text-center">{error}</div>
                    ) : (
                        <>
                            {pdfFormat === 'standard' && <StandardPdfContent userId={userId} />}
                            {pdfFormat === 'table' && <TablePdfContent userId={userId} />}
                            {pdfFormat === 'resume' && <ResumePdfContent userId={userId} />}
                            {pdfFormat === 'career' && <CareerPdfContent userId={userId} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}