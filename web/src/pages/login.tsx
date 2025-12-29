

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">DumpDock</h1>
            <p className="text-muted-foreground mt-2">Database Backup Manager</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your backup dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
