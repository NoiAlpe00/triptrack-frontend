import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { DoughnutChartDataProps } from "../utils/TypesIndex";
import { Col } from "react-bootstrap";

// Registering necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function CustomDoughnutChart({ requests }: { requests: DoughnutChartDataProps[] }) {
  // Count the occurrences of each request status
  const statusCounts = requests.reduce(
    (acc, request) => {
      acc[request.requestStatus] = (acc[request.requestStatus] || 0) + 1;
      return acc;
    },
    { Approved: 0, Waiting: 0, Declined: 0 }
  );

  // Prepare chart data
  const chartData = {
    labels: ["Approved", "Waiting", "Declined"],
    datasets: [
      {
        data: [statusCounts.Approved, statusCounts.Waiting, statusCounts.Declined],
        backgroundColor: ["#C9FFCC", "#FFFCA1", "#FFB9B5"],
        hoverOffset: 4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const, // Correctly typing the position
        labels: {
          boxWidth: 20, // Customize the size of the legend's box
          padding: 15, // Space between the legend and chart
        },
      },
    },
    maintainAspectRatio: false, // Disable maintaining aspect ratio to allow for custom size
  };

  return (
    <Col style={{ position: "relative", width: "350px", height: "300px" }}>
      <Doughnut data={chartData} options={chartOptions} />
    </Col>
  );
}
