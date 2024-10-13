import React, { useRef, useEffect } from "react";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  ChartConfiguration,
} from "chart.js";

interface SkillsDataProps {
  skillsData: number[];
}

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);

const RadarChart = ({ skillsData }: SkillsDataProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const maxVal = Math.max(...skillsData);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const data = {
          labels: ["Languages", "Models", "Frameworks", "APIs", "Others"],
          datasets: [
            {
              label: "Skills",
              data: skillsData,
              backgroundColor: "rgba(0, 123, 128, 0.2)",
              borderColor: "rgba(0, 123, 128, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(0, 123, 128, 1)",
            },
          ],
        };

        const config: ChartConfiguration<"radar"> = {
          type: "radar",
          data: data,
          options: {
            scales: {
              r: {
                beginAtZero: true,
                suggestedMax: maxVal,
              },
            },
            elements: {
              line: {
                tension: 0,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        };

        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="skillRadarChart"
      width="400"
      height="400"
    ></canvas>
  );
};

export default RadarChart;
