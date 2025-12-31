import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Invoice } from '../types';
import { Download, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import DataTable from '@/components/Shared/DataTable';

interface BillingHistoryProps {
  invoices: Invoice[];
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({ invoices }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const headers = ['Invoice', 'Date', 'Amount', 'Status', 'Actions'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable headers={headers}>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {invoice.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {formatDate(invoice.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {invoice.currency.toUpperCase()} {invoice.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 capitalize text-gray-700">
                  {getStatusIcon(invoice.status)}
                  {invoice.status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 ml-auto text-primary hover:text-primary/80"
                  onClick={() => window.open(invoice.pdfUrl, '_blank')}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No invoices found.
              </td>
            </tr>
          )}
        </DataTable>
      </CardContent>
    </Card>
  );
};
