// return new Chart(moneyCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//         labels,
//         datasets: [{
//             data: costsForTypes,
//             backgroundColor: `#1E90FF`,
//             hoverBackgroundColor: `#B0E0E6`,
//             anchor: `start`,
//         }],
//     },
//     options: {
//         plugins: {
//             datalabels: {
//                 font: {
//                     size: 13,
//                 },
//                 color: `#000000`,
//                 anchor: `end`,
//                 align: `start`,
//                 formatter: (val) => `€ ${val}`,
//             },
//         },
//         title: {
//             display: true,
//             text: `MONEY`,
//             fontColor: `#000000`,
//             fontSize: 23,
//             position: `left`,
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     fontColor: `#000000`,
//                     padding: 5,
//                     fontSize: 13,
//                 },
//                 gridLines: {
//                     display: false,
//                     drawBorder: false,
//                 },
//                 barThickness: 44,
//             }],
//             xAxes: [{
//                 ticks: {
//                     display: false,
//                     beginAtZero: true,
//                 },
//                 gridLines: {
//                     display: false,
//                     drawBorder: false,
//                 },
//                 minBarLength: 50,
//             }],
//         },
//         legend: {
//             display: false,
//         },
//         tooltips: {
//             enabled: false,
//         },
//     },
// });

