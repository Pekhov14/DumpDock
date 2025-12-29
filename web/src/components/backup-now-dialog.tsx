

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database } from "lucide-react"

interface BackupNowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  database?: {
    id: string
    name: string
    type: string
  }
}

export function BackupNowDialog({ open, onOpenChange, database }: BackupNowDialogProps) {
  const handleBackup = () => {
    // Mock backup action
    onOpenChange(false)
  }

  if (!database) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Create Backup
          </DialogTitle>
          <DialogDescription>Create a new backup for {database.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="storage-select">Storage Destination</Label>
            <Select defaultValue="aws">
              <SelectTrigger id="storage-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS S3</SelectItem>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="gdrive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Database:</span>
              <span className="font-medium">{database.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-mono font-medium">{database.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compression:</span>
              <span className="font-medium">gzip</span>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleBackup}>Start Backup</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
