import { FolderSearch } from "lucide-react"

interface EmptyStateProps {
    title: string
    description?: string
    icon?: React.ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 border border-dashed rounded-lg">
            <div className="bg-muted p-4 rounded-full mb-4">
                {icon || <FolderSearch className="h-8 w-8 text-muted-foreground" />}
            </div>
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    {description}
                </p>
            )}
        </div>
    )
}
