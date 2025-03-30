"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export default function Pomodoro() {
  // Timer states
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work")
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [cycles, setCycles] = useState(0)

  // Settings states
  const [workDuration, setWorkDuration] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Audio reference
  const alarmSound = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    alarmSound.current = new Audio("/alarm.mp3")
    // Using a default sound URL - in a real app, you'd provide an actual sound file
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause()
        alarmSound.current = null
      }
    }
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval as NodeJS.Timeout)

            // Play sound if enabled
            if (soundEnabled && alarmSound.current) {
              alarmSound.current.play().catch((e) => console.error("Error playing sound:", e))
            }

            // Switch modes
            if (mode === "work") {
              const newCycles = cycles + 1
              setCycles(newCycles)

              // Check if it's time for a long break
              if (newCycles % longBreakInterval === 0) {
                setMode("longBreak")
                setTimeLeft(longBreakDuration * 60)
              } else {
                setMode("shortBreak")
                setTimeLeft(shortBreakDuration * 60)
              }
            } else {
              // After any break, go back to work mode
              setMode("work")
              setTimeLeft(workDuration * 60)
            }

            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, mode, cycles, workDuration, shortBreakDuration, longBreakDuration, longBreakInterval, soundEnabled])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    let totalTime
    switch (mode) {
      case "work":
        totalTime = workDuration * 60
        break
      case "shortBreak":
        totalTime = shortBreakDuration * 60
        break
      case "longBreak":
        totalTime = longBreakDuration * 60
        break
    }

    return 100 - (timeLeft / totalTime) * 100
  }

  // Handle mode change
  const handleModeChange = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsRunning(false)
    setMode(newMode)

    switch (newMode) {
      case "work":
        setTimeLeft(workDuration * 60)
        break
      case "shortBreak":
        setTimeLeft(shortBreakDuration * 60)
        break
      case "longBreak":
        setTimeLeft(longBreakDuration * 60)
        break
    }
  }

  // Handle start/pause
  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  // Handle reset
  const resetTimer = () => {
    setIsRunning(false)

    switch (mode) {
      case "work":
        setTimeLeft(workDuration * 60)
        break
      case "shortBreak":
        setTimeLeft(shortBreakDuration * 60)
        break
      case "longBreak":
        setTimeLeft(longBreakDuration * 60)
        break
    }
  }

  // Apply settings
  const applySettings = () => {
    resetTimer()
    setShowSettings(false)

    // Update current timer based on new settings
    switch (mode) {
      case "work":
        setTimeLeft(workDuration * 60)
        break
      case "shortBreak":
        setTimeLeft(shortBreakDuration * 60)
        break
      case "longBreak":
        setTimeLeft(longBreakDuration * 60)
        break
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pomodoro Timer</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {showSettings ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Work Duration: {workDuration} minutes</Label>
                <Slider
                  value={[workDuration]}
                  min={5}
                  max={60}
                  step={5}
                  onValueChange={(value) => setWorkDuration(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Short Break: {shortBreakDuration} minutes</Label>
                <Slider
                  value={[shortBreakDuration]}
                  min={1}
                  max={15}
                  step={1}
                  onValueChange={(value) => setShortBreakDuration(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Long Break: {longBreakDuration} minutes</Label>
                <Slider
                  value={[longBreakDuration]}
                  min={5}
                  max={30}
                  step={5}
                  onValueChange={(value) => setLongBreakDuration(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Long Break After: {longBreakInterval} pomodoros</Label>
                <Slider
                  value={[longBreakInterval]}
                  min={2}
                  max={6}
                  step={1}
                  onValueChange={(value) => setLongBreakInterval(value[0])}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sound-toggle">Sound Notifications</Label>
                <div className="flex items-center space-x-2">
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <Switch id="sound-toggle" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>
              </div>
            </div>

            <Button onClick={applySettings} className="w-full">
              Apply Settings
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs
              defaultValue="work"
              value={mode}
              onValueChange={(value) => handleModeChange(value as "work" | "shortBreak" | "longBreak")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="work">Pomodoro</TabsTrigger>
                <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
                <TabsTrigger value="longBreak">Long Break</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="text-center">
              <div className="text-6xl font-bold tracking-tighter py-8">{formatTime(timeLeft)}</div>

              <Progress value={calculateProgress()} className="h-2 mb-6" />

              <div className="text-sm text-muted-foreground mb-4">
                {mode === "work" ? "Focus on your task" : "Take a break"}
                {mode === "work" && <> • Cycle {cycles + 1}</>}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" onClick={resetTimer} aria-label="Reset timer">
                <RotateCcw className="h-5 w-5" />
              </Button>

              <Button
                size="lg"
                onClick={toggleTimer}
                className="px-8"
                aria-label={isRunning ? "Pause timer" : "Start timer"}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" /> Start
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {!showSettings && (
        <CardFooter className="flex justify-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            {soundEnabled ? (
              <div className="flex items-center">
                <Volume2 className="h-4 w-4 mr-1" /> Sound notifications enabled
              </div>
            ) : (
              <div className="flex items-center">
                <VolumeX className="h-4 w-4 mr-1" /> Sound notifications disabled
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

