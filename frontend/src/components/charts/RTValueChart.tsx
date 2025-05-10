import { useEffect, useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { useMobile } from "../../utils/hooks"

interface ChartDataProps {
  time: string
  buyValue: number
  sellValue: number
}

interface DataPoint {
  time: string
  buyValue: number
  sellValue: number
}


export const LiveChart: React.FC<ChartDataProps> = ({ time, buyValue, sellValue }) => {
  const [data, setData] = useState<DataPoint[]>([])

  const isMobile = useMobile()

  useEffect(() => {
    setData(prev => [...prev, { time, buyValue, sellValue }])
  }, [time, buyValue, sellValue])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString()
      const fakeBuy = Math.random() * 1000
      const fakeSell = Math.random() * 1000

      setData(prev => [...prev.slice(-29), { time: now, buyValue: fakeBuy, sellValue: fakeSell }])
    }, 3600000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300} style={{ pointerEvents: 'none', marginTop: isMobile ? 50 : 0 }}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
        tickFormatter={(value) => `AR$${(value * 0.01).toFixed(2)}`}
        />
        <Tooltip 
        formatter={(value: number) => [`AR$${(value * 0.01).toFixed(2)}`, 'Value']}
        />
        <Line type="monotone" dataKey="buyValue" stroke="#166534" dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="sellValue" stroke="#d97706" dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
