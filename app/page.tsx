"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import TriviaGame from "@/components/trivia-game"
import EssayCorrection from "@/components/essay-correction"
import Contact from "@/components/contact"
import Pomodoro from "@/components/pomodoro"

export default function Home() {
  const [activeTab, setActiveTab] = useState("quiz")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container flex-1 px-4 py-6 md:px-6 md:py-12">
        {activeTab === "quiz" && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Test Your Knowledge</h2>
            <p className="text-muted-foreground">
              Answer the questions correctly to earn points. See how high you can score!
            </p>
            <TriviaGame />
          </section>
        )}

        {activeTab === "essay" && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Essay Correction</h2>
            <p className="text-muted-foreground">Submit your essay below for feedback and corrections.</p>
            <EssayCorrection />
          </section>
        )}

        {activeTab === "pomodoro" && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Pomodoro Timer</h2>
            <p className="text-muted-foreground">
              Use the Pomodoro technique to boost your productivity and study effectively.
            </p>
            <Pomodoro />
          </section>
        )}

        {activeTab === "contact" && <Contact />}
      </main>

      <footer className="border-t py-6 mt-auto">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Trivia Challenge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

