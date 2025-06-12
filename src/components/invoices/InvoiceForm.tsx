
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, X } from "lucide-react";
import { Invoice, InvoiceFormData } from "@/types/invoice";

interface InvoiceFormProps {
  onSubmit: (invoice: InvoiceFormData) => void;
  onCancel: () => void;
  initialData?: Invoice;
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
    dueDate: initialData?.dueDate || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof InvoiceFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onCancel} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Invoice" : "Create New Invoice"}
          </h1>
          <p className="text-slate-600">
            {isEditing ? "Update invoice details" : "Fill in the details to create a new invoice"}
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Input
                  id="project"
                  value={formData.project}
                  onChange={(e) => handleChange("project", e.target.value)}
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Select value={formData.currency} onValueChange={(value) => handleChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter invoice description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Invoice Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Invoice" : "Create Invoice"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
