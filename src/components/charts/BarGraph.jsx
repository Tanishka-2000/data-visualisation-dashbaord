import { Bar } from "react-chartjs-2";

const Barchart = ({ data }) => {

  return (
      <Bar
        data={{
            labels: data.map(item => item._id ? item._id : '0'),
            datasets: [{
              label: 'Articles',
              data: data.map(item => item.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'
              ]
            }]
        }}
    />
  )
}

export default Barchart