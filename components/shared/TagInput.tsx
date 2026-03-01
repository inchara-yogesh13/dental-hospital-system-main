"use client"

import { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TagInputProps {
    placeholder?: string
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagInput({ placeholder = "Type and press enter...", tags, setTags }: TagInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            const newTag = inputValue.trim()
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag])
            }
            setInputValue("")
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            // Remove last tag if backspace pressed on empty input
            setTags(tags.slice(0, -1))
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                removeTag(tag)
                            }}
                            className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-full p-0.5"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : "Add another..."}
            />
        </div>
    )
}
