import { PageWrapper } from "@/components/layout/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, Wallet } from "lucide-react";
import Link from "next/link";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { AdvancePayments } from "@/components/billing/AdvancePayments";

export default function BillingPage() {
    return (
        <PageWrapper
            title="Billing & Payments"
            subtitle="Manage invoices, record payments, and track outstanding balances."
            action={
                <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Link href="/billing/new">
                        <Plus className="mr-2 h-4 w-4" /> New Invoice
                    </Link>
                </Button>
            }
        >
            <Tabs defaultValue="invoices" className="w-full flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="bg-white dark:bg-gray-950 border shadow-sm">
                        <TabsTrigger value="invoices" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <Receipt className="w-4 h-4 mr-2" /> Invoices
                        </TabsTrigger>
                        <TabsTrigger value="advance" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <Wallet className="w-4 h-4 mr-2" /> Advance Payments
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="invoices" className="mt-0 outline-none flex-1 min-h-0">
                    <InvoiceList />
                </TabsContent>
                <TabsContent value="advance" className="mt-0 outline-none flex-1 min-h-0">
                    <AdvancePayments />
                </TabsContent>
            </Tabs>
        </PageWrapper>
    );
}
