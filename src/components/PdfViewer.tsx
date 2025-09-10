// components/PDFViewer.tsx
"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* PDF Controls */}
      <div className="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>

          <span className="text-sm font-medium">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>

          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaExpand className="mr-1" />
          Open Fullscreen
        </a>
      </div>

      {/* PDF Document */}
      <div className="flex justify-center overflow-auto max-h-96">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center py-8">Loading PDF...</div>}
          error={
            <div className="text-center py-8 text-red-600">
              Failed to load PDF.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<div className="text-center py-8">Loading page...</div>}
          />
        </Document>
      </div>
    </div>
  );
}
