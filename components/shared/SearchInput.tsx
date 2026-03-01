import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchInputProps {
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchInput({ placeholder = "Search...", value, onChange }: SearchInputProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-8 bg-background"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
