import { Line } from "react-chartjs-2";

function Published ({ data }) {
  return (
    <Line
        data={{
        labels: data.map(item => item._id ? item._id : 'unknown'),
        datasets: [{
          label: 'published',
          data: data.map(item => item.count)
          }]
        }}
    />
  )
}

export default Published