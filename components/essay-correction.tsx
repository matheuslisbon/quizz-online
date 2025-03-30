"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function EssayCorrection() {
  const [essay, setEssay] = useState("")
  const [feedback, setFeedback] = useState<null | {
    score: number
    comments: string
    corrections: Array<{ original: string; suggestion: string; reason: string }>
  }>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!essay.trim() || isSubmitting) return

    setIsSubmitting(true)

    // Simulate API call for essay correction
    setTimeout(() => {
      // This is a mock response - in a real app, this would come from an API
      const mockFeedback = {
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        comments:
          "Seu texto apresenta bons argumentos, mas poderia melhorar na estrutura e coesão. Há alguns erros gramaticais que precisam ser corrigidos.",
        corrections: [
          {
            original: essay.includes("porem") ? "porem" : "entretanto",
            suggestion: "porém",
            reason: "Faltou o acento agudo na palavra 'porém'.",
          },
          {
            original: essay.includes("tambem") ? "tambem" : "idéia",
            suggestion: essay.includes("tambem") ? "também" : "ideia",
            reason: essay.includes("tambem")
              ? "Faltou o acento circunflexo na palavra 'também'."
              : "A palavra 'ideia' não leva mais acento de acordo com o novo acordo ortográfico.",
          },
          {
            original: "concerteza",
            suggestion: "com certeza",
            reason: "A expressão correta é 'com certeza' (separado).",
          },
        ].filter((correction) => essay.toLowerCase().includes(correction.original.toLowerCase())),
      }

      // If no corrections were found, add a generic one
      if (mockFeedback.corrections.length === 0) {
        mockFeedback.corrections.push({
          original: "estrutura do texto",
          suggestion: "parágrafos mais curtos e objetivos",
          reason: "Parágrafos muito longos dificultam a leitura e compreensão.",
        })
      }

      setFeedback(mockFeedback)
      setIsSubmitting(false)
    }, 1500)
  }

  const resetForm = () => {
    setEssay("")
    setFeedback(null)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Corretor de Redação</CardTitle>
      </CardHeader>
      <CardContent>
        {!feedback ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Escreva ou cole seu texto abaixo para receber uma análise e correções.
            </p>
            <Textarea
              placeholder="Digite sua redação aqui..."
              className="min-h-[200px]"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Avaliação</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Nota:</span>
                <Badge variant="outline" className="text-lg">
                  {feedback.score}/100
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Comentário Geral:</h4>
                <p className="text-sm text-muted-foreground">{feedback.comments}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Correções Sugeridas:</h4>
                <ul className="space-y-3">
                  {feedback.corrections.map((correction, index) => (
                    <li key={index} className="text-sm border rounded-md p-3">
                      <div className="flex gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p>
                            <span className="line-through text-red-500">{correction.original}</span>
                            {" → "}
                            <span className="text-green-600 font-medium">{correction.suggestion}</span>
                          </p>
                          <p className="text-muted-foreground mt-1">{correction.reason}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!feedback ? (
          <Button onClick={handleSubmit} disabled={!essay.trim() || isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              "Analisar Redação"
            )}
          </Button>
        ) : (
          <Button onClick={resetForm} className="w-full">
            Corrigir Outro Texto
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

