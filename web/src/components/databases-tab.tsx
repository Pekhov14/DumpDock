

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trash2, Settings, DatabaseIcon, Eye } from "lucide-react"
import { BackupNowDialog } from "./backup-now-dialog"
import { DatabaseSettingsDialog } from "./database-settings-dialog"

const mockDatabases = [
  {
    id: "1",
    name: "Production DB",
    type: "postgresql",
    host: "prod-db.example.com",
    port: 5432,
    username: "admin",
    lastBackup: "2025-12-29 14:30",
    size: "2.4 GB",
    status: "active",
  },
  {
    id: "2",
    name: "Analytics DB",
    type: "mysql",
    host: "analytics.example.com",
    port: 3306,
    username: "root",
    lastBackup: "2025-12-29 12:00",
    size: "856 MB",
    status: "active",
  },
  {
    id: "3",
    name: "Dev Database",
    type: "sqlite",
    host: "local",
    port: null,
    username: null,
    lastBackup: "2025-12-28 18:45",
    size: "124 MB",
    status: "idle",
  },
]

interface DatabasesTabProps {
  onViewBackups: (databaseId: string) => void
}

export function DatabasesTab({ onViewBackups }: DatabasesTabProps) {
  const [selectedDb, setSelectedDb] = useState<string | null>(null)
  const [settingsDb, setSettingsDb] = useState<string | null>(null)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDatabases.map((db) => (
          <Card key={db.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                    <DatabaseIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{db.name}</CardTitle>
                    <CardDescription className="text-xs">{db.host}</CardDescription>
                  </div>
                </div>
                <Badge variant={db.status === "active" ? "default" : "secondary"}>{db.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-mono font-medium">{db.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-mono font-medium">{db.size}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Last Backup</p>
                  <p className="font-mono text-xs">{db.lastBackup}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => setSelectedDb(db.id)}>
                  <Play className="w-3 h-3 mr-1" />
                  Backup Now
                </Button>
                <Button size="sm" variant="outline" onClick={() => onViewBackups(db.id)} title="View Backups">
                  <Eye className="w-3 h-3" />
                  <span className="sr-only">View Backups</span>
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSettingsDb(db.id)} title="Settings">
                  <Settings className="w-3 h-3" />
                  <span className="sr-only">Settings</span>
                </Button>
                <Button size="sm" variant="outline" title="Delete">
                  <Trash2 className="w-3 h-3" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BackupNowDialog
        open={!!selectedDb}
        onOpenChange={(open) => !open && setSelectedDb(null)}
        database={mockDatabases.find((db) => db.id === selectedDb)}
      />

      <DatabaseSettingsDialog
        open={!!settingsDb}
        onOpenChange={(open) => !open && setSettingsDb(null)}
        database={mockDatabases.find((db) => db.id === settingsDb)}
      />
    </>
  )
}
