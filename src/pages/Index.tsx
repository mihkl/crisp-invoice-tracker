import { useState } from "react";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceDetails } from "@/components/invoices/InvoiceDetails";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { Invoice } from "@/types/invoice";

const Index = () => {
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string>("v1");

  // Mock data - in a real app this would come from a database
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      customer: 'Acme Corporation',
      project: 'Website Redesign',
      amount: 5500.00,
      currency: 'USD',
      description: 'Complete website redesign with modern UI/UX',
      date: '2024-06-10',
      dueDate: '2024-07-10'
    },
    {
      id: '2',
      customer: 'Tech Solutions Ltd',
      project: 'Mobile App Development',
      amount: 12000.00,
      currency: 'USD',
      description: 'Native mobile app for iOS and Android platforms',
      date: '2024-06-08',
      dueDate: '2024-07-08'
    },
    {
      id: '3',
      customer: 'Digital Marketing Co',
      project: 'SEO Optimization',
      amount: 2800.00,
      currency: 'EUR',
      description: 'Complete SEO audit and optimization for 6 months',
      date: '2024-06-05',
      dueDate: '2024-06-20'
    }
  ]);

  const handleAddInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString()
    };
    setInvoices([...invoices, newInvoice]);
    setCurrentView('list');
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setCurrentView('form');
  };

  const handleUpdateInvoice = (updatedInvoice: Omit<Invoice, 'id'>) => {
    if (editingInvoice) {
      const updated: Invoice = {
        ...updatedInvoice,
        id: editingInvoice.id
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

  const handleAdminPanel = () => {
    // Admin panel functionality will be implemented later
    console.log("Admin panel clicked");
  };

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
            <div className="flex items-center gap-4">
              {currentView === 'list' && (
                <>
                  <Button 
                    onClick={handleAdminPanel}
                    variant="outline"
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Button>
                  <Button 
                    onClick={() => setCurrentView('form')}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                    size="lg"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Invoice
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

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
