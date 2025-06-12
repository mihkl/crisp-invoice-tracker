
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2, Download } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onEdit: () => void;
  onBack: () => void;
  onDelete: () => void;
}

export function InvoiceDetails({ invoice, onEdit, onBack, onDelete }: InvoiceDetailsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    // Download functionality would be implemented here
    console.log("Download invoice:", invoice.id);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invoice Details</h1>
            <p className="text-slate-600">Invoice ID: {invoice.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Invoice
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Customer</label>
                  <p className="text-slate-900 font-medium">{invoice.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Project</label>
                  <p className="text-slate-900 font-medium">{invoice.project}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Amount</label>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Currency</label>
                  <p className="text-slate-900 font-medium">{invoice.currency}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Description</label>
                <p className="text-slate-900">{invoice.description || 'No description provided'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with dates and status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Invoice Date</label>
                <p className="text-slate-900 font-medium">{formatDate(invoice.date)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Due Date</label>
                <p className="text-slate-900 font-medium">{formatDate(invoice.dueDate)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
