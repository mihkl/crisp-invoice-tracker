
export interface Invoice {
  id: string;
  customer: string;
  project: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  dueDate: string;
}

export type InvoiceFormData = Omit<Invoice, 'id'>;
