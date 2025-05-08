import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"


interface ChartData {
    time: string
    value: number
}


export const LiveChart: React.FC<ChartData> = ({time, value}) => {
  const [data, setData] = useState<{ time: string; value: number }[]>([])

  useEffect(() => {
    setData((prev) => {
        return [...prev, { time, value }]
    })
  },[time, value])  

  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.random() * 1000 // Replace with real value
      }

      setData((prev) => [...prev.slice(-29), newPoint]) // Keep last 30 points
    }, 3600000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300} style={{pointerEvents: 'none'}}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
