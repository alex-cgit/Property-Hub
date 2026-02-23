import { useRef, useState } from "react";
import { UploadCloud, File, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  label: string;
  accept?: string; // ".jpg,.png"
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function FileUploadZone({ 
  label, 
  accept, 
  maxFiles = 5, 
  onFilesChange, 
  className 
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      addFiles(newFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const updated = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer",
          dragActive ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50 hover:bg-muted/30"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-3 stroke-[1.5]" />
        <p className="text-sm font-medium text-foreground text-center">{label}</p>
        <p className="text-xs text-muted-foreground mt-1 text-center">Drag & drop or click to upload</p>
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          multiple 
          accept={accept} 
          onChange={handleChange}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50 border border-border">
              <div className="flex items-center space-x-3 overflow-hidden">
                <File className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs font-medium truncate max-w-[200px]">{file.name}</span>
                <span className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeFile(i)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
