import dayjs from 'dayjs';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(date: string | Date): string {
    return dayjs(date).format('DD MMM YYYY');
}

export function formatDateTime(date: string | Date): string {
    return dayjs(date).format('DD MMM YYYY, hh:mm A');
}

export function formatPhone(phone: string): string {
    if (!phone) return '';
    // Assuming 10 digit Indian number for standard formatting or pre-formatted +91
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
        const last10 = cleanPhone.slice(-10);
        return `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
    }
    return phone;
}

export function formatTime(time: string): string {
    if (!time) return '';
    // handles "10:30", "14:00"
    const [hours, minutes] = time.split(':');
    if (!hours || !minutes) return time;

    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function getStatusColor(status: string): string {
    switch (status.toUpperCase()) {
        case 'SCHEDULED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'CONFIRMED': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
        case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'COMPLETED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'CANCELLED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'NO_SHOW': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';

        // Billing specific
        case 'PAID': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'PARTIALLY_PAID':
        case 'PARTIAL': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'DRAFT': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        case 'ISSUED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';

        // Inventory specific
        case 'LOW': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'OK': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';

        // Lab case specific
        case 'SENT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'RECEIVED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'FITTED': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
        case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
}
