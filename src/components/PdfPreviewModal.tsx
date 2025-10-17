'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Printer, X } from 'lucide-react';
import StandardPdfContent from '@/components/preview/StandardPdfContent';
import TablePdfContent from '@/components/preview/TablePdfContent';
import ResumePdfContent from '@/components/preview/ResumePdfContent';
import CareerPdfContent from '@/components/preview/CareerPdfContent';
import { fetchPortfolioPdfData } from '@/lib/api/portfolio';
import { PortfolioPdfData } from '@/types/PortfolioPdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { converter, parse } from 'culori';

const rgbConverter = converter('rgb');

const clampChannel = (value: number): number => {
    if (Number.isNaN(value)) return 0;
    if (value <= 0) return 0;
    if (value >= 1) return 1;
    return value;
};

const formatRgbString = (value: string): string =>
    value.replace(/oklch\(([^)]+)\)/g, (match) => {
        const parsed = parse(match);
        if (!parsed) {
            return '#000000';
        }
        const rgb = rgbConverter(parsed);
        if (!rgb) {
            return '#000000';
        }
        const r = Math.round(clampChannel(rgb.r) * 255);
        const g = Math.round(clampChannel(rgb.g) * 255);
        const b = Math.round(clampChannel(rgb.b) * 255);
        const alpha = typeof rgb.alpha === 'number' ? clampChannel(rgb.alpha) : 1;

        if (alpha < 1) {
            return `rgba(${r}, ${g}, ${b}, ${Number(alpha.toFixed(3))})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
    });

const applyColorFallbacks = (source: Element, target: Element): void => {
    if (!(target instanceof HTMLElement || target instanceof SVGElement)) {
        return;
    }

    const computed = window.getComputedStyle(source);
    const properties = Array.from(computed);

    properties.forEach((property) => {
        const value = computed.getPropertyValue(property);
        if (!value || !value.includes('oklch')) {
            return;
        }

        const fallback = formatRgbString(value);
        if (!fallback || fallback === value) {
            return;
        }

        const priority = computed.getPropertyPriority(property);

        if (target instanceof HTMLElement) {
            target.style.setProperty(property, fallback, priority);
        } else if (target instanceof SVGElement) {
            target.setAttribute(property, fallback);
        }
    });

    const sourceChildren = Array.from(source.children);
    const targetChildren = Array.from(target.children);

    const childCount = Math.min(sourceChildren.length, targetChildren.length);
    for (let i = 0; i < childCount; i += 1) {
        applyColorFallbacks(sourceChildren[i], targetChildren[i]);
    }
};

const createNormalizedClone = (source: HTMLElement | null) => {
    if (!source) {
        return null;
    }

    const copyRootStyles = (origin: HTMLElement, clone: HTMLElement) => {
        const computed = window.getComputedStyle(origin);
        const layoutProperties = [
            'box-sizing',
            'display',
            'flex-direction',
            'align-items',
            'justify-content',
            'gap',
            'row-gap',
            'column-gap',
            'margin',
            'padding',
            'border',
            'border-radius',
            'box-shadow',
            'background',
            'background-color',
            'max-width',
            'min-width',
            'width',
            'min-height',
            'max-height',
            'color',
            'font-family',
            'font-size',
            'line-height',
            'letter-spacing',
            'text-align',
        ];

        layoutProperties.forEach((property) => {
            const value = computed.getPropertyValue(property);
            if (!value) return;
            const priority = computed.getPropertyPriority(property);
            clone.style.setProperty(property, value, priority);
        });
    };

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-10000px';
    wrapper.style.top = '0';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '-1';
    wrapper.style.backgroundColor = '#ffffff';
    wrapper.style.visibility = 'visible';
    wrapper.style.opacity = '1';

    const clone = source.cloneNode(true) as HTMLElement;
    const rect = source.getBoundingClientRect();
    const width = rect.width || source.offsetWidth || source.scrollWidth;
    const height = rect.height || source.offsetHeight || source.scrollHeight;

    clone.style.width = `${width}px`;
    clone.style.minHeight = `${height}px`;
    clone.style.maxWidth = `${width}px`;
    clone.style.boxSizing = 'border-box';
    clone.style.backgroundColor = '#ffffff';
    clone.removeAttribute('id');

    copyRootStyles(source, clone);

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    applyColorFallbacks(source, clone);

    return {
        wrapper,
        clone,
        cleanup: () => {
            if (wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
        },
    } as const;
};

interface Props {
    pdfFormat: 'standard' | 'table' | 'resume' | 'career';
    setPdfFormat: (format: 'standard' | 'table' | 'resume' | 'career') => void;
    userId: string;
    close: () => void;
    onPrint: () => void;
    onDownload?: () => void;
}

export default function PdfPreviewModal({
    pdfFormat,
    setPdfFormat,
    userId,
    close,
    onPrint,
    onDownload
}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioPdfData | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const hasPortfolio = Boolean(portfolioData?.portfolio);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleFormatChange = (newFormat: 'standard' | 'table' | 'resume' | 'career') => {
        setPdfFormat(newFormat);
    };

    const handleDownload = async () => {
        if (isLoading || isDownloading) return;

        const cloneResult = createNormalizedClone(previewRef.current);

        if (!cloneResult) {
            alert('ダウンロード対象のプレビューを取得できませんでした');
            return;
        }

        try {
            setIsDownloading(true);
            try {
                await document.fonts?.ready;
            } catch {
                // フォントの読み込み失敗は無視
            }

            const captureElement = cloneResult.clone;
            const captureWidth = Math.max(
                1,
                captureElement.scrollWidth,
                captureElement.offsetWidth,
                captureElement.clientWidth
            );
            const captureHeight = Math.max(
                1,
                captureElement.scrollHeight,
                captureElement.offsetHeight,
                captureElement.clientHeight
            );

            const canvas = await html2canvas(captureElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: captureWidth,
                height: captureHeight,
                windowWidth: captureWidth,
                windowHeight: captureHeight,
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const pageHeightPx = Math.floor((canvasWidth * pageHeight) / pageWidth);

            let renderedHeight = 0;
            let pageIndex = 0;

            while (renderedHeight < canvasHeight) {
                const sliceHeight = Math.min(pageHeightPx, canvasHeight - renderedHeight);
                const sliceCanvas = document.createElement('canvas');
                sliceCanvas.width = canvasWidth;
                sliceCanvas.height = sliceHeight;

                const ctx = sliceCanvas.getContext('2d');
                if (!ctx) {
                    throw new Error('Canvas 2D context is not available');
                }

                ctx.drawImage(
                    canvas,
                    0,
                    renderedHeight,
                    canvasWidth,
                    sliceHeight,
                    0,
                    0,
                    canvasWidth,
                    sliceHeight
                );

                const sliceImgData = sliceCanvas.toDataURL('image/png');
                const sliceHeightMm = (sliceHeight * pageWidth) / canvasWidth;

                if (pageIndex > 0) {
                    pdf.addPage();
                }

                pdf.addImage(sliceImgData, 'PNG', 0, 0, pageWidth, sliceHeightMm);

                renderedHeight += sliceHeight;
                pageIndex += 1;
            }

            pdf.save('portfolio.pdf');
            onDownload?.();
        } catch (downloadError) {
            console.error('PDF download failed:', downloadError);
            alert('PDFのダウンロードに失敗しました');
        } finally {
            cloneResult.cleanup();
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        if (!userId) {
            setPortfolioData(null);
            setIsLoading(false);
            setError('ユーザーIDが見つかりません');
            return;
        }

        let isActive = true;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchPortfolioPdfData(userId);
                if (!isActive) return;
                setPortfolioData(data);
            } catch (err) {
                if (!isActive) return;
                const message = err instanceof Error ? err.message : 'ポートフォリオ情報の取得に失敗しました';
                setError(message);
                setPortfolioData(null);
            } finally {
                if (!isActive) return;
                setIsLoading(false);
            }
        };

        void load();

        return () => {
            isActive = false;
        };
    }, [userId]);

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
                            onClick={handleDownload}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            disabled={isLoading || isDownloading}
                        >
                            <Download className={`w-5 h-5 ${isDownloading ? 'animate-pulse' : ''}`} />
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
                    ) : !portfolioData || !hasPortfolio ? (
                        <div className="text-gray-500 p-4 text-center">ポートフォリオ情報が見つかりませんでした。</div>
                    ) : (
                        <div ref={previewRef} id="pdf-preview">
                            {pdfFormat === 'standard' && <StandardPdfContent data={portfolioData} />}
                            {pdfFormat === 'table' && <TablePdfContent data={portfolioData} />}
                            {pdfFormat === 'resume' && <ResumePdfContent data={portfolioData} />}
                            {pdfFormat === 'career' && <CareerPdfContent data={portfolioData} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}