"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ClinicProfileSettings() {
    return (
        <div className="space-y-6 max-w-4xl pt-4">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Clinic Information</CardTitle>
                    <CardDescription>Update your clinic's public-facing details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Clinic Name</Label>
                            <Input defaultValue="DentalCloud Core Clinic" />
                        </div>
                        <div className="space-y-2">
                            <Label>Registration Number</Label>
                            <Input defaultValue="REG-98765432" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Address</Label>
                            <Textarea defaultValue="123 Health Avenue, Med City, 40001" className="resize-none" rows={3} />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input defaultValue="+91 99999 00000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input defaultValue="contact@dentalcloud.com" />
                        </div>
                    </div>

                    <div className="pt-4 border-t mt-6">
                        <h4 className="text-sm font-medium mb-4">Branding</h4>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center border text-muted-foreground border-dashed">
                                Logo
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline" size="sm">Upload Logo</Button>
                                <p className="text-xs text-muted-foreground">Recommended size: 256x256px</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Save Changes</Button>
            </div>
        </div>
    );
}
