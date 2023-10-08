import { Doughnut } from 'react-chartjs-2';

const likelihood = ({data}) => {
  return (
    <Doughnut
        data={{
        labels: data.map(item => item._id ? item._id : '0'),
        datasets: [{
            label: 'Articles',
            data: data.map(item => item.count),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            hoverOffset: 4
        }]
        }}
    />
  )
}

export default likelihood