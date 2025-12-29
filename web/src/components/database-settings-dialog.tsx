

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatabaseSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  database?: {
    id: string
    name: string
    type: string
    host: string
    port: number | null
    username: string | null
  }
}

export function DatabaseSettingsDialog({ open, onOpenChange, database }: DatabaseSettingsDialogProps) {
  const [name, setName] = useState(database?.name || "")
  const [host, setHost] = useState(database?.host || "")
  const [port, setPort] = useState(database?.port?.toString() || "")
  const [username, setUsername] = useState(database?.username || "")

  if (!database) return null

  const handleSave = () => {
    console.log("[v0] Saving database settings:", { name, host, port, username })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Database Settings</DialogTitle>
          <DialogDescription>Configure your database connection settings</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="db-name">Database Name</Label>
            <Input id="db-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Production DB" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="db-type">Database Type</Label>
            <Select defaultValue={database.type}>
              <SelectTrigger id="db-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="db-host">Host</Label>
            <Input id="db-host" value={host} onChange={(e) => setHost(e.target.value)} placeholder="localhost" />
          </div>

          {database.type !== "sqlite" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="db-port">Port</Label>
                <Input
                  id="db-port"
                  type="number"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="5432"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-username">Username</Label>
                <Input
                  id="db-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-password">Password</Label>
                <Input id="db-password" type="password" placeholder="••••••••" />
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
