"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Bug, CheckCircle, Clock, BarChart3, Plus, Search, Filter } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "developer" | "tester"
}

interface BugReport {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved" | "closed"
  assignedTo?: string
  reportedBy: string
  createdAt: string
  updatedAt: string
  project: string
}

export default function BugTracker() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [bugs, setBugs] = useState<BugReport[]>([
    {
      id: "1",
      title: "Login button not responding on mobile",
      description: "The login button becomes unresponsive on mobile devices after multiple taps.",
      severity: "high",
      status: "open",
      reportedBy: "tester@company.com",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      project: "Web App",
    },
    {
      id: "2",
      title: "Database connection timeout",
      description: "Users experiencing timeout errors when accessing user profiles.",
      severity: "critical",
      status: "in-progress",
      assignedTo: "dev@company.com",
      reportedBy: "tester2@company.com",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-16",
      project: "Backend API",
    },
  ])
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    severity: "medium" as const,
    project: "",
  })

  // Mock users for demo
  const users: User[] = [
    { id: "1", name: "Admin User", email: "admin@company.com", role: "admin" },
    { id: "2", name: "John Developer", email: "dev@company.com", role: "developer" },
    { id: "3", name: "Jane Tester", email: "tester@company.com", role: "tester" },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - find user by email
    const user = users.find((u) => u.email === loginForm.email)
    if (user) {
      setCurrentUser(user)
    }
  }

  const handleCreateBug = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    const bug: BugReport = {
      id: Date.now().toString(),
      title: newBug.title,
      description: newBug.description,
      severity: newBug.severity,
      status: "open",
      reportedBy: currentUser.email,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      project: newBug.project,
    }

    setBugs([...bugs, bug])
    setNewBug({ title: "", description: "", severity: "medium", project: "" })
  }

  const updateBugStatus = (bugId: string, status: BugReport["status"], assignedTo?: string) => {
    setBugs(
      bugs.map((bug) =>
        bug.id === bugId ? { ...bug, status, assignedTo, updatedAt: new Date().toISOString().split("T")[0] } : bug,
      ),
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  // Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Bug className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Enterprise Bug Tracker</CardTitle>
            <CardDescription>Sign in to manage and track bugs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Demo Accounts:</p>
              <p>Admin: admin@company.com</p>
              <p>Developer: dev@company.com</p>
              <p>Tester: tester@company.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bug className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Enterprise Bug Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {currentUser.role}
              </Badge>
              <Avatar>
                <AvatarFallback>
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={() => setCurrentUser(null)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Bugs</p>
                  <p className="text-2xl font-bold text-gray-900">{bugs.filter((b) => b.status === "open").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bugs.filter((b) => b.status === "in-progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bugs.filter((b) => b.status === "resolved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                  <p className="text-2xl font-bold text-gray-900">{bugs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bugs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
            {(currentUser.role === "tester" || currentUser.role === "admin") && (
              <TabsTrigger value="create">Create Bug</TabsTrigger>
            )}
            {currentUser.role === "admin" && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
          </TabsList>

          {/* Bug Reports Tab */}
          <TabsContent value="bugs">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Bug Reports</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search bugs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bugs.map((bug) => (
                    <div key={bug.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(bug.status)}
                            <h3 className="font-semibold text-gray-900">{bug.title}</h3>
                            <Badge className={`${getSeverityColor(bug.severity)} text-white`}>{bug.severity}</Badge>
                            <Badge variant="outline">{bug.project}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{bug.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Reported by: {bug.reportedBy}</span>
                            <span>Created: {bug.createdAt}</span>
                            {bug.assignedTo && <span>Assigned to: {bug.assignedTo}</span>}
                          </div>
                        </div>
                        {(currentUser.role === "developer" || currentUser.role === "admin") && (
                          <div className="flex space-x-2">
                            <Select
                              value={bug.status}
                              onValueChange={(status) => updateBugStatus(bug.id, status as BugReport["status"])}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            {!bug.assignedTo && (
                              <Button
                                size="sm"
                                onClick={() => updateBugStatus(bug.id, "in-progress", currentUser.email)}
                              >
                                Assign to Me
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Bug Tab */}
          {(currentUser.role === "tester" || currentUser.role === "admin") && (
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Bug Report</CardTitle>
                  <CardDescription>Report a new bug or issue found during testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateBug} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Bug Title</Label>
                        <Input
                          id="title"
                          placeholder="Brief description of the bug"
                          value={newBug.title}
                          onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project">Project</Label>
                        <Input
                          id="project"
                          placeholder="Project name"
                          value={newBug.project}
                          onChange={(e) => setNewBug({ ...newBug, project: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select
                        value={newBug.severity}
                        onValueChange={(value) => setNewBug({ ...newBug, severity: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Detailed description of the bug, steps to reproduce, expected vs actual behavior"
                        rows={6}
                        value={newBug.description}
                        onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Bug Report
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Analytics Tab */}
          {currentUser.role === "admin" && (
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bug Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["open", "in-progress", "resolved", "closed"].map((status) => {
                        const count = bugs.filter((b) => b.status === status).length
                        const percentage = bugs.length > 0 ? (count / bugs.length) * 100 : 0
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(status)}
                              <span className="capitalize">{status.replace("-", " ")}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Severity Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["critical", "high", "medium", "low"].map((severity) => {
                        const count = bugs.filter((b) => b.severity === severity).length
                        const percentage = bugs.length > 0 ? (count / bugs.length) * 100 : 0
                        return (
                          <div key={severity} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity)}`} />
                              <span className="capitalize">{severity}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getSeverityColor(severity)}`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
