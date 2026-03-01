"use client"

import { useState, useCallback } from "react"
import { UploadCloud, X, File } from "lucide-react"

interface FileUploadProps {
    onFileSelect: (file: File) => void
    accept?: string
    maxSizeMB?: number
}

export function FileUpload({ onFileSelect, accept = "*", maxSizeMB = 5 }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0])
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0])
        }
    }

    const validateAndSetFile = (selectedFile: File) => {
        setError(null)
        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds ${maxSizeMB}MB limit.`)
            return
        }
        setFile(selectedFile)
        onFileSelect(selectedFile)
    }

    const clearFile = () => {
        setFile(null)
        setError(null)
    }

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center 
        ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'} 
        ${file ? 'bg-muted/50' : 'hover:bg-muted/50 transition-colors'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept={accept}
                className="hidden"
                id="file-upload"
                onChange={handleChange}
            />

            {file ? (
                <div className="flex items-center justify-between p-2 bg-background border rounded-md">
                    <div className="flex items-center space-x-2 truncate">
                        <File className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                    </div>
                    <button type="button" onClick={clearFile} className="p-1 hover:bg-muted rounded-full">
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
            ) : (
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm">
                        <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                    </div>
                    <div className="text-xs text-muted-foreground pb-2">
                        Max file size: {maxSizeMB}MB
                    </div>
                </label>
            )}

            {error && <div className="text-sm text-destructive mt-2">{error}</div>}
        </div>
    )
}
