

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewDatabaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewDatabaseDialog({ open, onOpenChange }: NewDatabaseDialogProps) {
  const [dbType, setDbType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Database</DialogTitle>
          <DialogDescription>Configure a new database connection for automatic backups</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="db-name">Database Name</Label>
            <Input id="db-name" placeholder="My Database" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="db-type">Database Type</Label>
            <Select value={dbType} onValueChange={setDbType} required>
              <SelectTrigger id="db-type">
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="host">Host</Label>
            <Input id="host" placeholder="localhost:5432" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="admin" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storage">Default Storage</Label>
            <Select required>
              <SelectTrigger id="storage">
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS S3</SelectItem>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="gdrive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Database</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
