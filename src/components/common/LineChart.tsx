"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = ({ totalCap, tokensSold, initialPrice, lastPrice }: { totalCap: number, tokensSold: number, initialPrice: number, lastPrice: number }) => {
  const [labels, setLabels] = useState<number[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    const newLabels = Array.from({ length: 7 }, (_, i) => {
      if (totalCap > tokensSold) {
        return parseInt(((tokensSold / 6) * i).toString());
      } else {
        return parseInt(((totalCap / 6) * i).toString());
      }
    });
    setLabels(newLabels);

    const newPrices = Array.from({ length: 7 }, (_, i) => {
      if (totalCap > tokensSold) {
        return initialPrice;
      } else {
        if (i == 6) { return lastPrice }
        else return initialPrice;
      }
    });
    setPrices(newPrices);
  }, [totalCap, tokensSold, initialPrice, lastPrice]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "#67e8f9",
        backgroundColor: "rgba(103, 232, 249, 0.1)",
        fill: true,           // Fill area under the line
        tension: 1,         // Increase curve smoothness (0 = straight, 1 = very curved)
        pointRadius: 3,       // Smaller points
        pointHoverRadius: 5,  // Larger points on hover
        borderWidth: 2,       // Thinner line
        pointBackgroundColor: "#67e8f9"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        // beginAtZero: true,    // Start from zero
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)"
        }
      }
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone' as const, // Smoother curve transitions
      }
    }
  };

  return (
    <>
      {lastPrice !== 0 ?
        <div className="border-l border-r border-white  bg-black p-4 mt-2 mb-4 w-full">
          <Line width={"100%"} data={data} options={options} />
        </div> : <></>
      }
    </>
  );
};
