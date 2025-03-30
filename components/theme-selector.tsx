"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, FlaskRoundIcon as Flask, BookOpen, Globe, Film } from "lucide-react"

interface Theme {
  name: string
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: string
  }>
}

interface ThemeSelectorProps {
  onSelectTheme: (theme: string) => void
  themes: Record<string, Theme>
}

export default function ThemeSelector({ onSelectTheme, themes }: ThemeSelectorProps) {
  // Theme icons mapping
  const themeIcons = {
    general: <Brain className="h-10 w-10 mb-4" />,
    science: <Flask className="h-10 w-10 mb-4" />,
    history: <BookOpen className="h-10 w-10 mb-4" />,
    geography: <Globe className="h-10 w-10 mb-4" />,
    entertainment: <Film className="h-10 w-10 mb-4" />,
  }

  // Theme colors mapping
  const themeColors = {
    general: "bg-blue-100 border-blue-300 hover:bg-blue-200",
    science: "bg-green-100 border-green-300 hover:bg-green-200",
    history: "bg-amber-100 border-amber-300 hover:bg-amber-200",
    geography: "bg-purple-100 border-purple-300 hover:bg-purple-200",
    entertainment: "bg-pink-100 border-pink-300 hover:bg-pink-200",
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Escolha um Tema</h2>
        <p className="text-muted-foreground">Selecione uma categoria para começar o quiz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(themes).map(([themeKey, theme]) => (
          <Card
            key={themeKey}
            className={`cursor-pointer border-2 transition-all duration-200 transform hover:scale-105 ${themeColors[themeKey as keyof typeof themeColors]}`}
            onClick={() => onSelectTheme(themeKey)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              {themeIcons[themeKey as keyof typeof themeIcons]}
              <h3 className="text-xl font-bold mb-2">{theme.name}</h3>
              <p className="text-sm text-muted-foreground">{theme.questions.length} perguntas</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

