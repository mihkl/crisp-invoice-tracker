
import { useState } from "react";
import { InvoiceFormData } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, X } from "lucide-react";

interface InvoiceFormProps {
  onSubmit: (invoice: InvoiceFormData) => void;
  onCancel: () => void;
  initialData?: InvoiceFormData;
  isEditing?: boolean;
}

export function InvoiceForm({ onSubmit, onCancel, initialData, isEditing = false }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    customer: initialData?.customer || "",
    project: initialData?.project || "",
    amount: initialData?.amount || 0,
    currency: initialData?.currency || "USD",
    description: initialData?.description || "",
    date: initialData?.date || new Date().toISOString().split('T')[0],
    dueDate: initialData?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: initialData?.status || "pending",
  });

  const [errors, setErrors] = useState<Partial<InvoiceFormData>>({});

  const handleInputChange = (field: keyof InvoiceFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<InvoiceFormData> = {};

    if (!formData.customer.trim()) newErrors.customer = "Customer is required";
    if (!formData.project.trim()) newErrors.project = "Project is required";
    if (formData.amount <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onCancel} className="p-2 hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </h2>
          <p className="text-slate-600">
            {isEditing ? "Update invoice details" : "Fill in the invoice information below"}
          </p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer and Project Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customer" className="text-sm font-medium text-slate-700">
                Customer Name *
              </Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
                placeholder="Enter customer name"
                className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.customer ? "border-red-500" : ""
                }`}
              />
              {errors.customer && (
                <p className="text-sm text-red-600">{errors.customer}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project" className="text-sm font-medium text-slate-700">
                Project Name *
              </Label>
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
                placeholder="Enter project name"
                className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.project ? "border-red-500" : ""
                }`}
              />
              {errors.project && (
                <p className="text-sm text-red-600">{errors.project}</p>
              )}
            </div>
          </div>

          {/* Amount and Currency Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.amount ? "border-red-500" : ""
                }`}
              />
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium text-slate-700">
                Currency
              </Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the work performed or services provided"
              rows={4}
              className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Dates and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-slate-700">
                Invoice Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium text-slate-700">
                Due Date *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className={`border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.dueDate ? "border-red-500" : ""
                }`}
              />
              {errors.dueDate && (
                <p className="text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-slate-200 hover:bg-slate-50"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
