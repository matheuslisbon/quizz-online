"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import ThemeSelector from "@/components/theme-selector"

// Sample trivia questions organized by themes
const triviaQuestions = {
  general: {
    name: "Conhecimentos Gerais",
    questions: [
      {
        id: 1,
        question: "Qual é a capital do Brasil?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correctAnswer: "Brasília",
      },
      {
        id: 2,
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Jorge Amado"],
        correctAnswer: "Machado de Assis",
      },
      {
        id: 3,
        question: "Qual é o maior planeta do Sistema Solar?",
        options: ["Terra", "Marte", "Júpiter", "Saturno"],
        correctAnswer: "Júpiter",
      },
      {
        id: 4,
        question: "Em que ano o Brasil foi descoberto?",
        options: ["1500", "1492", "1550", "1450"],
        correctAnswer: "1500",
      },
      {
        id: 5,
        question: "Qual é o maior oceano do mundo?",
        options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        correctAnswer: "Pacífico",
      },
    ],
  },
  science: {
    name: "Ciências",
    questions: [
      {
        id: 1,
        question: "Qual é o símbolo químico do ouro?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au",
      },
      {
        id: 2,
        question: "Qual é a unidade básica da hereditariedade?",
        options: ["Célula", "DNA", "Gene", "Cromossomo"],
        correctAnswer: "Gene",
      },
      {
        id: 3,
        question: "Qual é o osso mais longo do corpo humano?",
        options: ["Fêmur", "Úmero", "Tíbia", "Fíbula"],
        correctAnswer: "Fêmur",
      },
      {
        id: 4,
        question: "Qual é a velocidade da luz no vácuo?",
        options: ["300.000 km/s", "150.000 km/s", "200.000 km/s", "250.000 km/s"],
        correctAnswer: "300.000 km/s",
      },
      {
        id: 5,
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Vênus", "Terra", "Marte", "Mercúrio"],
        correctAnswer: "Mercúrio",
      },
    ],
  },
  history: {
    name: "História",
    questions: [
      {
        id: 1,
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Deodoro da Fonseca", "Dom Pedro I", "Juscelino Kubitschek"],
        correctAnswer: "Deodoro da Fonseca",
      },
      {
        id: 2,
        question: "Em que ano começou a Primeira Guerra Mundial?",
        options: ["1914", "1918", "1939", "1945"],
        correctAnswer: "1914",
      },
      {
        id: 3,
        question: "Qual foi o império que construiu o Coliseu?",
        options: ["Grego", "Egípcio", "Romano", "Persa"],
        correctAnswer: "Romano",
      },
      {
        id: 4,
        question: "Quem pintou a Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
      },
      {
        id: 5,
        question: "Qual evento marcou o início da Idade Moderna?",
        options: ["Queda de Constantinopla", "Descobrimento da América", "Revolução Francesa", "Revolução Industrial"],
        correctAnswer: "Queda de Constantinopla",
      },
    ],
  },
  geography: {
    name: "Geografia",
    questions: [
      {
        id: 1,
        question: "Qual é o maior país do mundo em área territorial?",
        options: ["China", "Estados Unidos", "Canadá", "Rússia"],
        correctAnswer: "Rússia",
      },
      {
        id: 2,
        question: "Qual é o rio mais longo do mundo?",
        options: ["Amazonas", "Nilo", "Mississipi", "Yangtzé"],
        correctAnswer: "Nilo",
      },
      {
        id: 3,
        question: "Qual é a capital da Austrália?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra",
      },
      {
        id: 4,
        question: "Qual é o ponto mais alto do Brasil?",
        options: ["Pico da Neblina", "Pico da Bandeira", "Monte Roraima", "Pico das Agulhas Negras"],
        correctAnswer: "Pico da Neblina",
      },
      {
        id: 5,
        question: "Qual é o menor país do mundo?",
        options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"],
        correctAnswer: "Vaticano",
      },
    ],
  },
  entertainment: {
    name: "Entretenimento",
    questions: [
      {
        id: 1,
        question: "Qual filme ganhou o Oscar de Melhor Filme em 2020?",
        options: ["1917", "Coringa", "Parasita", "Era Uma Vez em Hollywood"],
        correctAnswer: "Parasita",
      },
      {
        id: 2,
        question: "Quem interpretou Harry Potter nos filmes?",
        options: ["Daniel Radcliffe", "Rupert Grint", "Tom Felton", "Eddie Redmayne"],
        correctAnswer: "Daniel Radcliffe",
      },
      {
        id: 3,
        question: "Qual banda britânica lançou o álbum 'Abbey Road'?",
        options: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Queen"],
        correctAnswer: "The Beatles",
      },
      {
        id: 4,
        question: "Qual é o personagem principal da série de jogos 'The Legend of Zelda'?",
        options: ["Zelda", "Link", "Ganon", "Mario"],
        correctAnswer: "Link",
      },
      {
        id: 5,
        question: "Qual série de TV tem como protagonistas os irmãos Winchester?",
        options: ["The Walking Dead", "Supernatural", "Stranger Things", "Game of Thrones"],
        correctAnswer: "Supernatural",
      },
    ],
  },
}

export default function TriviaGame() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme)
    setGameStarted(true)
    resetGame()
  }

  const currentQuestion = selectedTheme
    ? triviaQuestions[selectedTheme as keyof typeof triviaQuestions].questions[currentQuestionIndex]
    : null

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
  }

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswered || !currentQuestion) return

    setIsAnswered(true)

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 10)
    }
  }

  const handleNextQuestion = () => {
    if (!selectedTheme) return

    const themeQuestions = triviaQuestions[selectedTheme as keyof typeof triviaQuestions].questions

    if (currentQuestionIndex < themeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setGameOver(false)
  }

  const startNewGame = () => {
    setSelectedTheme(null)
    setGameStarted(false)
    resetGame()
  }

  if (!gameStarted) {
    return <ThemeSelector onSelectTheme={handleThemeSelect} themes={triviaQuestions} />
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              {selectedTheme && triviaQuestions[selectedTheme as keyof typeof triviaQuestions].name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Pergunta {currentQuestionIndex + 1} de{" "}
              {selectedTheme ? triviaQuestions[selectedTheme as keyof typeof triviaQuestions].questions.length : 0}
            </p>
          </div>
          <Badge variant="outline" className="text-lg">
            Pontuação: {score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {!gameOver && currentQuestion ? (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  variant={
                    isAnswered
                      ? option === currentQuestion.correctAnswer
                        ? "default"
                        : option === selectedOption
                          ? "destructive"
                          : "outline"
                      : selectedOption === option
                        ? "default"
                        : "outline"
                  }
                  className="justify-start h-auto py-3 px-4 text-left"
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-center w-full">
                    <span className="flex-1">{option}</span>
                    {isAnswered && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <h3 className="text-2xl font-bold">Fim do Jogo!</h3>
            <p className="text-xl">Sua pontuação final: {score} pontos</p>
            {selectedTheme && (
              <p className="text-muted-foreground">
                Você acertou {score / 10} de{" "}
                {triviaQuestions[selectedTheme as keyof typeof triviaQuestions].questions.length} perguntas.
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!gameOver ? (
          <>
            {!isAnswered ? (
              <Button onClick={handleSubmitAnswer} disabled={!selectedOption} className="w-full">
                Confirmar Resposta
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="w-full">
                Próxima Pergunta
              </Button>
            )}
          </>
        ) : (
          <div className="w-full flex gap-4">
            <Button onClick={resetGame} className="flex-1">
              Jogar Novamente
            </Button>
            <Button onClick={startNewGame} variant="outline" className="flex-1">
              Escolher Outro Tema
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

