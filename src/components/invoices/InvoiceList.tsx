
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Filter
} from "lucide-react";

interface InvoiceListProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
  onView: (invoice: Invoice) => void;
}

export function InvoiceList({ invoices, onEdit, onDelete, onView }: InvoiceListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [columnFilters, setColumnFilters] = useState({
    invoiceNumber: "",
    customer: "",
    project: "",
    amount: "",
    date: "",
  });

  const handleColumnFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    const matchesColumnFilters = 
      invoice.invoiceNumber.toLowerCase().includes(columnFilters.invoiceNumber.toLowerCase()) &&
      invoice.customer.toLowerCase().includes(columnFilters.customer.toLowerCase()) &&
      invoice.project.toLowerCase().includes(columnFilters.project.toLowerCase()) &&
      (columnFilters.amount === "" || invoice.amount.toString().includes(columnFilters.amount)) &&
      (columnFilters.date === "" || invoice.date.includes(columnFilters.date));
    
    return matchesSearch && matchesStatus && matchesColumnFilters;
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
              <Filter className="mr-2 h-4 w-4" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("paid")}>
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("overdue")}>
              Overdue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">
                <div className="space-y-2">
                  <div>Invoice #</div>
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.invoiceNumber}
                    onChange={(e) => handleColumnFilterChange("invoiceNumber", e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                <div className="space-y-2">
                  <div>Customer</div>
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.customer}
                    onChange={(e) => handleColumnFilterChange("customer", e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                <div className="space-y-2">
                  <div>Project</div>
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.project}
                    onChange={(e) => handleColumnFilterChange("project", e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                <div className="space-y-2">
                  <div>Amount</div>
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.amount}
                    onChange={(e) => handleColumnFilterChange("amount", e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">
                <div className="space-y-2">
                  <div>Date</div>
                  <Input
                    placeholder="Filter..."
                    value={columnFilters.date}
                    onChange={(e) => handleColumnFilterChange("date", e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-slate-50 transition-colors duration-150">
                <TableCell className="font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell className="text-slate-700">{invoice.customer}</TableCell>
                <TableCell className="text-slate-700">{invoice.project}</TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </TableCell>
                <TableCell className="text-slate-600">{formatDate(invoice.date)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onView(invoice)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(invoice)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(invoice.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-2">
            <Search className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No invoices found</h3>
          <p className="text-slate-500">
            {searchTerm || statusFilter !== "all" || Object.values(columnFilters).some(filter => filter !== "")
              ? "Try adjusting your search or filter criteria" 
              : "Create your first invoice to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
