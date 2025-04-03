import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const Statistics = () => {
  const allProducts = useLoaderData();
  const getPath = (x, y, width, height) =>
    `M${x},${y + height}
         C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
      x + width / 2
    }, ${y}
         C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
         Z`;

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div className="my-4">
      <ResponsiveContainer height={300}>
        <BarChart data={allProducts}>
          <XAxis dataKey="product_title" />
          <YAxis />
          <Tooltip></Tooltip>
          <Bar dataKey="price" fill="#8884d8" shape={<TriangleBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
