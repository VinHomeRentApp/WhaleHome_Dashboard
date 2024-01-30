// function RecentOrders() {
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getOrders().then((res) => {
//       setDataSource(res.products.splice(0, 3));
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <>
//       <Typography.Text>Recent Orders</Typography.Text>
//       <Table
//         columns={[
//           {
//             title: 'Title',
//             dataIndex: 'title'
//           },
//           {
//             title: 'Quantity',
//             dataIndex: 'quantity'
//           },
//           {
//             title: 'Price',
//             dataIndex: 'discountedPrice'
//           }
//         ]}
//         loading={loading}
//         dataSource={dataSource}
//         pagination={false}
//       ></Table>
//     </>
//   );
// }

import React from 'react'
import { Table, Typography } from 'antd'

const RecentPost: React.FC = () => {
  return (
    <>
      <Typography.Text strong>Recent Post</Typography.Text>
      <Table
        columns={[
          {
            title: 'Title',
            dataIndex: 'title'
          },
          {
            title: 'createBy',
            dataIndex: 'createBy'
          },
          {
            title: 'createDate',
            dataIndex: 'createDate'
          }
        ]}
        loading={true}
        pagination={false}
      ></Table>
    </>
  )
}

export default RecentPost
