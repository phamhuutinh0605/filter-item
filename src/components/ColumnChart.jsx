import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

function ColumnChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = {
      labels: ["Phòng 1", "Phòng 2", "Phòng 3", "Phòng 4"],
      datasets: [
        {
          label: "Giá Thuê (VNĐ)",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: [4500000, 5000000, 2950000, 3000000],
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Giá Thuê (VNĐ)",
          },
        },
      },
    };

    if (chartData) {
      chartData.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    setChartData(newChart);
  }, []);

  return (
    <div>
      <h2>Biểu đồ Giá Thuê Phòng</h2>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
}

export default ColumnChart;
