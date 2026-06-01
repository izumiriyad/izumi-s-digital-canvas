import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SecurityPostureChartProps {
  before?: Record<string, number>;
  after?: Record<string, number>;
}

const defaultBefore = {
  AuthN: 4, AuthZ: 3, 'API Hygiene': 5, 'Input Validation': 4, Logging: 3, 'Patch Mgmt': 5,
};
const defaultAfter = {
  AuthN: 9, AuthZ: 9, 'API Hygiene': 9, 'Input Validation': 8, Logging: 8, 'Patch Mgmt': 9,
};

const SecurityPostureChart = ({ before = defaultBefore, after = defaultAfter }: SecurityPostureChartProps) => {
  const data = Object.keys(before).map((key) => ({
    metric: key,
    Before: before[key],
    After: after[key],
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1">Security Posture · Before vs After</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Maturity score 0–10 across six pillars</p>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Radar name="Before" dataKey="Before" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.25} />
            <Radar name="After" dataKey="After" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SecurityPostureChart;
