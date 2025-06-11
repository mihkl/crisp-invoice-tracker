
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Download, 
  Send,
  Calendar,
  User,
  Briefcase,
  FileText,
  DollarSign
} from "lucide-react";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-sm px-3 py-1">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-sm px-3 py-1">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-sm px-3 py-1">Overdue</Badge>;
      default:
        return <Badge variant="secondary" className="text-sm px-3 py-1">{status}</Badge>;
    }
  };

  const calculateDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="p-2 hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Invoice Details</h2>
            <p className="text-slate-600">Invoice {invoice.invoiceNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
          <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={onDelete}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Invoice Information</h3>
              {getStatusBadge(invoice.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Customer</p>
                    <p className="text-lg font-semibold text-slate-900">{invoice.customer}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Project</p>
                    <p className="text-lg font-semibold text-slate-900">{invoice.project}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Amount</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Due Date</p>
                    <p className="text-lg font-semibold text-slate-900">{formatDate(invoice.dueDate)}</p>
                    <p className="text-sm text-slate-600">{calculateDaysUntilDue()}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <FileText className="h-5 w-5 text-slate-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900">Description</h4>
              </div>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
                {invoice.description}
              </p>
            </div>
          </Card>
        </div>

        {/* Summary Card */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Invoice Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Invoice Number:</span>
                <span className="font-medium text-slate-900">{invoice.invoiceNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Issue Date:</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.date)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Due Date:</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.dueDate)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Currency:</span>
                <span className="font-medium text-slate-900">{invoice.currency}</span>
              </div>

              <Separator className="my-4" />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-slate-900">Total Amount:</span>
                <span className="font-bold text-slate-900">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-slate-200 hover:bg-slate-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-slate-200 hover:bg-slate-50"
              >
                <Send className="mr-2 h-4 w-4" />
                Send to Customer
              </Button>
              
              <Button 
                onClick={onEdit}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
