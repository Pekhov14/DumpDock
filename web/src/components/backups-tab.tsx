

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, RotateCcw, Trash2, Clock, HardDrive, X } from "lucide-react"

const mockBackups = [
  {
    id: "1",
    databaseId: "1",
    database: "Production DB",
    version: "v2025.12.29-143052",
    date: "2025-12-29 14:30:52",
    size: "2.4 GB",
    storage: "AWS S3",
    status: "completed",
  },
  {
    id: "2",
    databaseId: "2",
    database: "Analytics DB",
    version: "v2025.12.29-120015",
    date: "2025-12-29 12:00:15",
    size: "856 MB",
    storage: "Local",
    status: "completed",
  },
  {
    id: "3",
    databaseId: "1",
    database: "Production DB",
    version: "v2025.12.28-143021",
    date: "2025-12-28 14:30:21",
    size: "2.3 GB",
    storage: "AWS S3",
    status: "completed",
  },
  {
    id: "4",
    databaseId: "3",
    database: "Dev Database",
    version: "v2025.12.28-184532",
    date: "2025-12-28 18:45:32",
    size: "124 MB",
    storage: "Google Drive",
    status: "completed",
  },
]

interface BackupsTabProps {
  selectedDatabaseId?: string | null
  onClearFilter?: () => void
}

export function BackupsTab({ selectedDatabaseId, onClearFilter }: BackupsTabProps) {
  const filteredBackups = useMemo(() => {
    if (!selectedDatabaseId) return mockBackups
    return mockBackups.filter((backup) => backup.databaseId === selectedDatabaseId)
  }, [selectedDatabaseId])

  const selectedDatabase = selectedDatabaseId
    ? mockBackups.find((b) => b.databaseId === selectedDatabaseId)?.database
    : null

  return (
    <div className="space-y-4">
      {selectedDatabaseId && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <span className="text-sm">
            Showing backups for: <strong>{selectedDatabase}</strong>
          </span>
          <Button size="sm" variant="ghost" onClick={onClearFilter}>
            <X className="w-4 h-4" />
            Clear Filter
          </Button>
        </div>
      )}

      {filteredBackups.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">No backups found</CardContent>
        </Card>
      ) : (
        filteredBackups.map((backup) => (
          <Card key={backup.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{backup.database}</h3>
                    <Badge variant="outline" className="font-mono text-xs">
                      {backup.version}
                    </Badge>
                    <Badge variant="secondary">{backup.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-xs">{backup.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HardDrive className="w-4 h-4" />
                      <span>{backup.size}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                      <span className="text-xs">Storage: {backup.storage}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Restore
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-3 h-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
