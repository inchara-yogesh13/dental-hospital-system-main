import { PageWrapper } from "@/components/layout/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, PackageSearch, FlaskConical } from "lucide-react";
import { StockTable } from "@/components/inventory/StockTable";
import { LabCaseTable } from "@/components/inventory/LabCaseTable";

export default function InventoryPage() {
    return (
        <PageWrapper
            title="Inventory & Stock"
            subtitle="Manage clinic supplies, track low stock, and manage lab cases."
            action={
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                        New Lab Case
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add Stock Item
                    </Button>
                </div>
            }
        >
            <Tabs defaultValue="stock" className="w-full flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="bg-white dark:bg-gray-950 border shadow-sm w-full sm:w-auto">
                        <TabsTrigger value="stock" className="flex-1 sm:flex-none data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <PackageSearch className="w-4 h-4 mr-2" /> Stock Items
                        </TabsTrigger>
                        <TabsTrigger value="lab" className="flex-1 sm:flex-none data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <FlaskConical className="w-4 h-4 mr-2" /> Lab Cases
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="stock" className="mt-0 outline-none flex-1 min-h-0">
                    <StockTable />
                </TabsContent>
                <TabsContent value="lab" className="mt-0 outline-none flex-1 min-h-0">
                    <LabCaseTable />
                </TabsContent>
            </Tabs>
        </PageWrapper>
    );
}
