

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, LogOut, Plus, Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { DatabasesTab } from "@/components/databases-tab"
import { BackupsTab } from "@/components/backups-tab"
import { StorageTab } from "@/components/storage-tab"
import { NewDatabaseDialog } from "@/components/new-database-dialog"

export default function DashboardPage() {
  const [showNewDatabase, setShowNewDatabase] = useState(false)
  const [selectedDatabaseFilter, setSelectedDatabaseFilter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("databases")
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    navigate("/login")
  }

  const handleViewBackups = (databaseId: string) => {
    setSelectedDatabaseFilter(databaseId)
    setActiveTab("backups")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DumpDock</h1>
              <p className="text-xs text-muted-foreground">Backup Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance">Database Management</h2>
            <p className="text-muted-foreground mt-1">Manage your databases, backups, and storage configurations</p>
          </div>
          <Button onClick={() => setShowNewDatabase(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Database
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="databases">Databases</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="databases" className="space-y-4">
            <DatabasesTab onViewBackups={handleViewBackups} />
          </TabsContent>

          <TabsContent value="backups" className="space-y-4">
            <BackupsTab
              selectedDatabaseId={selectedDatabaseFilter}
              onClearFilter={() => setSelectedDatabaseFilter(null)}
            />
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <StorageTab />
          </TabsContent>
        </Tabs>
      </main>

      <NewDatabaseDialog open={showNewDatabase} onOpenChange={setShowNewDatabase} />
    </div>
  )
}
