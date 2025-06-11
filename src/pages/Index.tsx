
import { useState } from "react";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceDetails } from "@/components/invoices/InvoiceDetails";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, DollarSign, Users, Calendar } from "lucide-react";
import { Invoice } from "@/types/invoice";

const Index = () => {
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Mock data - in a real app this would come from a database
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-001',
      customer: 'Acme Corporation',
      project: 'Website Redesign',
      amount: 5500.00,
      currency: 'USD',
      description: 'Complete website redesign with modern UI/UX',
      date: '2024-06-10',
      status: 'paid',
      dueDate: '2024-07-10'
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      customer: 'Tech Solutions Ltd',
      project: 'Mobile App Development',
      amount: 12000.00,
      currency: 'USD',
      description: 'Native mobile app for iOS and Android platforms',
      date: '2024-06-08',
      status: 'pending',
      dueDate: '2024-07-08'
    },
    {
      id: '3',
      invoiceNumber: 'INV-003',
      customer: 'Digital Marketing Co',
      project: 'SEO Optimization',
      amount: 2800.00,
      currency: 'EUR',
      description: 'Complete SEO audit and optimization for 6 months',
      date: '2024-06-05',
      status: 'overdue',
      dueDate: '2024-06-20'
    }
  ]);

  const handleAddInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, '0')}`
    };
    setInvoices([...invoices, newInvoice]);
    setCurrentView('list');
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setCurrentView('form');
  };

  const handleUpdateInvoice = (updatedInvoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    if (editingInvoice) {
      const updated: Invoice = {
        ...updatedInvoice,
        id: editingInvoice.id,
        invoiceNumber: editingInvoice.invoiceNumber
      };
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? updated : inv));
      setEditingInvoice(null);
      setCurrentView('list');
    }
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    if (selectedInvoice?.id === id) {
      setCurrentView('list');
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCurrentView('details');
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Invoice Management</h1>
              <p className="text-slate-600">Manage your invoices, track payments, and monitor your business finances</p>
            </div>
            {currentView === 'list' && (
              <Button 
                onClick={() => setCurrentView('form')}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Invoice
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {currentView === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">${totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-slate-900">{invoices.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Paid Invoices</p>
                  <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{overdueInvoices.length}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border-0">
          {currentView === 'list' && (
            <InvoiceList 
              invoices={invoices}
              onEdit={handleEditInvoice}
              onDelete={handleDeleteInvoice}
              onView={handleViewInvoice}
            />
          )}
          
          {currentView === 'form' && (
            <InvoiceForm 
              onSubmit={editingInvoice ? handleUpdateInvoice : handleAddInvoice}
              onCancel={() => {
                setCurrentView('list');
                setEditingInvoice(null);
              }}
              initialData={editingInvoice || undefined}
              isEditing={!!editingInvoice}
            />
          )}

          {currentView === 'details' && selectedInvoice && (
            <InvoiceDetails 
              invoice={selectedInvoice}
              onEdit={() => handleEditInvoice(selectedInvoice)}
              onBack={() => setCurrentView('list')}
              onDelete={() => handleDeleteInvoice(selectedInvoice.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
