import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
} from "recharts";
import ReusableBanner from "../components/ReusableBanner";

const Statistics = () => {
  const allProducts = useLoaderData();

  // Function to generate the custom path for the Triangle Bar shape
  const getPath = (x, y, width, height) =>
    `M${x},${y + height}
         C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
      x + width / 2
    }, ${y}
         C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
         Z`;

  // Custom TriangleBar for the bars
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="">
      <ReusableBanner>
        <div className="text-center bg-[#9538E2] text-white space-y-4 py-5">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-3xl">
            Statistics
          </h2>
          <p>
            Explore the latest gadgets that will take your experience to the
            next level. From smart devices to the coolest accessories, we have
            it all!
          </p>
        </div>
      </ReusableBanner>

      <div className="mt-7">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={allProducts}>
            <XAxis dataKey="product_title" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="price" fill="#8884d8" shape={<TriangleBar />} />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#ff7300"
              fill="#ff7300"
              fillOpacity={0.3}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
