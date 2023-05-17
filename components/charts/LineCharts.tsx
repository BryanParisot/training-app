import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DataItem {
  date: string;
  bras: number;
}

interface LineChartsProps {
  mensuration: DataItem[];
}

const LineCharts: React.FC<LineChartsProps> = ({ mensuration }) => {
  const [chartData, setChartData] = useState<{ date: string; bras: number }[]>([]);

  useEffect(() => {
    const transformedData = mensuration?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(({ date, bras }) => ({ date: format(new Date(date), 'dd/MM/yyyy'), bras }));
    setChartData(transformedData);
  }, [mensuration]);

  return (
    <div className='w-3/6 h-96 bg-white rounded-lg shadow-md px-4 py-2'>
      <div className='text-center text-lg text-gray-600'>Graphique bras</div>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={chartData} margin={{ top: 0, right: 12, bottom: 24, left: 12 }} >
          <XAxis
            axisLine={false}
            tickLine={false}
            dy={10}
            dataKey="date"
            padding={{ left: 10, right: 10 }}
            tick={{
              fontSize: 12,
              fontWeight: 500,
            }}
            hide={true}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <YAxis domain={[0, "dataMax + 30"]} stroke="rgb(209 213 219)" axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={{
            stroke: "rgba(0, 0, 0, 0.1)",
            strokeWidth: 32,
          }} />
          <Line dot={false}
            type="monotone"
            dataKey="bras"
            stroke="blue"
            strokeWidth={2}
            activeDot={{
              stroke: "rgba(255,255,255, 0.6)",
              strokeWidth: 10,
              r: 5,
            }} />

        </LineChart >
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;