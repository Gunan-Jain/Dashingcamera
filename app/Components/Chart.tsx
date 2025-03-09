import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle, G } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

const Chart = ({ type = "line", title = "Chart" }) => {
  const chartData = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2];

  const pieData = [
    { name: "No Alarm", value: 100, color: "#007AFF" },
  ];

  const drawLineChart = () => {
    const width = screenWidth - 40;
    const height = 200;
    const maxValue = Math.max(...chartData);
    
    const points = chartData
      .map((value, index) => {
        const x = (index / (chartData.length - 1)) * width;
        const y = height - (value / maxValue) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Svg width={width} height={height}>
        <Path d={`M${points}`} stroke="#007AFF" strokeWidth="2" fill="none" />
        {chartData.map((value, index) => {
          const x = (index / (chartData.length - 1)) * width;
          const y = height - (value / maxValue) * height;
          return <Circle key={index} cx={x} cy={y} r="3" fill="#007AFF" />;
        })}
      </Svg>
    );
  };

  const drawPieChart = () => {
    const size = 200;
    const radius = size / 2;
    const center = radius;
    const total = pieData.reduce((sum, slice) => sum + slice.value, 0);
    let startAngle = 0;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G transform={`translate(${center}, ${center})`}>
          {pieData.map((slice, index) => {
            const angle = (slice.value / total) * 2 * Math.PI;
            const x = Math.cos(startAngle + angle / 2) * radius;
            const y = Math.sin(startAngle + angle / 2) * radius;
            const path = `M0,0 L${radius},0 A${radius},${radius} 0 ${
              angle > Math.PI ? 1 : 0
            },1 ${x},${y} Z`;

            startAngle += angle;

            return <Path key={index} d={path} fill={slice.color} />;
          })}
        </G>
      </Svg>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {type === "line" ? drawLineChart() : drawPieChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3, // Shadow effect
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Chart;
