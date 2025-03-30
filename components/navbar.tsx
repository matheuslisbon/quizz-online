"use client"

import { Brain, FileEdit, MessageSquare, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: "quiz", label: "Quiz", icon: <Brain className="h-5 w-5 mr-2" /> },
    { id: "essay", label: "Corretor de Redação", icon: <FileEdit className="h-5 w-5 mr-2" /> },
    { id: "pomodoro", label: "Pomodoro", icon: <Clock className="h-5 w-5 mr-2" /> },
    { id: "contact", label: "Contato", icon: <MessageSquare className="h-5 w-5 mr-2" /> },
  ]

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-2xl font-bold">Trivia Challenge</h1>
        </div>

        <nav className="flex items-center space-x-1 md:space-x-2 w-full md:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                activeTab === tab.id ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

