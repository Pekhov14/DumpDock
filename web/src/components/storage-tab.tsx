

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cloud, HardDrive, Settings, Plus } from "lucide-react"

const mockStorages = [
  {
    id: "1",
    name: "AWS S3",
    type: "s3",
    provider: "Amazon Web Services",
    used: "12.4 GB",
    capacity: "100 GB",
    status: "connected",
  },
  {
    id: "2",
    name: "Local Storage",
    type: "local",
    provider: "Server Disk",
    used: "4.2 GB",
    capacity: "50 GB",
    status: "connected",
  },
  {
    id: "3",
    name: "Google Drive",
    type: "gdrive",
    provider: "Google",
    used: "2.1 GB",
    capacity: "15 GB",
    status: "connected",
  },
  {
    id: "4",
    name: "Dropbox",
    type: "dropbox",
    provider: "Dropbox Inc.",
    used: "0 GB",
    capacity: "10 GB",
    status: "inactive",
  },
]

export function StorageTab() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Storage
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockStorages.map((storage) => (
          <Card key={storage.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                    {storage.type === "local" ? (
                      <HardDrive className="w-5 h-5 text-primary" />
                    ) : (
                      <Cloud className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{storage.name}</CardTitle>
                    <CardDescription className="text-xs">{storage.provider}</CardDescription>
                  </div>
                </div>
                <Badge variant={storage.status === "connected" ? "default" : "secondary"}>{storage.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Storage Used</span>
                  <span className="font-medium">
                    {storage.used} / {storage.capacity}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${(Number.parseFloat(storage.used) / Number.parseFloat(storage.capacity)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Settings className="w-3 h-3 mr-1" />
                  Configure
                </Button>
                <Button size="sm" variant="outline" disabled={storage.status === "inactive"}>
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
