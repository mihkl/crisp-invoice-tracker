
export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  project: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

export type InvoiceFormData = Omit<Invoice, 'id' | 'invoiceNumber'>;
