"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth.store';
import { useLogin } from '@/lib/hooks/useAuth';
import { toast } from 'sonner';
import { Eye, EyeOff, Building2, Loader2 } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.login);
    const loginMutation = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await loginMutation.mutateAsync(values);
            // Assuming the API returns { token: "..." } or { data: { token: "..." } }
            // Let's use any response structure that works based on standard axios.
            // Client API returns response.data in axios, but let's see. The fetcher is mostly returning the data.
            const token = (response as any).token || (response as any).data?.token;
            if (!token) throw new Error("No token received from backend");

            setAuth(token);
            toast.success('Successfully logged in');
            router.push('/dashboard');

        } catch (err: any) {
            toast.error(err.message || 'Failed to login');
        }
    }

    return (
        <div className="w-full max-w-md mx-4">
            <div className="flex flex-col items-center mb-8 space-y-2">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/40 rounded-full">
                    <Building2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">DentalCloud</h1>
                <p className="text-muted-foreground text-sm">Sign in to manage your clinic</p>
            </div>

            <Card className="w-full border-0 shadow-lg dark:bg-gray-900/60 dark:border dark:border-gray-800">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Enter your email and password to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="doctor@clinic.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className="sr-only">
                                                        {showPassword ? "Hide password" : "Show password"}
                                                    </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Powered by <span className="font-semibold text-teal-600 dark:text-teal-400">DentalCloud</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
