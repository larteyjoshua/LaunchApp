import React,  { useState, useEffect, useContext, useMemo  }  from 'react';
import apiServices from "../../services/apiServices";
import AuthContext from '../../context/AuthContext';
import './History.css'
import MaterialReactTable from 'material-react-table';
import { Box } from '@mui/material';

function History() {
    const [orders, setOrders] = useState([]);
    const {auth } = useContext(AuthContext);
    const access_Token = auth.access_Token;
    
    const config = {
        headers:{
            'Authorization': 'Bearer ' + access_Token
        }
      };

      
function createData(
    id,
    orderDate, 
    foodName, 
    price, 
    totalNumber, 
    cost, 
    riderName, 
    destination, 
    trackingStage, 
    imagePath) {
return {
    id,
    orderDate, 
    foodName, 
    price, 
    totalNumber, 
    cost, 
    riderName, 
    destination, 
    trackingStage,
    imagePath };
          }

    useEffect(() => {
        apiServices
        .get("/user/order/",config)
        .then((response) => {
            console.log(response);
            const arData = newOrders(response.data)
            setOrders(arData);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function newOrders(orders){
        const newOrder = orders.map((order) => {
        return createData(
            order.Order.id,
            order.Order.orderDate,
            order.Food.name|| '',
            order.Food.price,
            order.Order.totalNumber,
            order.Order.cost,
            order?.Rider?.name || '',
            order.Order.destination,
           order.Order.trackingStage,
           order.Food.imagePath
        ) 
           });

           return newOrder;
        }
         

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: 'Order Id',
          },
          {
            Cell: ({ cell }) => cell.getValue()?.toLocaleString?.(), //transform data to readable format for cell render
            Header: () => <em>Order Date</em>, //custom header markup
            accessorFn: (row) => new Date(row.orderDate), //transform data before processing so sorting works
            accessorKey: 'orderDate',
            header: 'order Date',
            muiTableHeadCellFilterTextFieldProps: {
              type: 'date',
            },
            sortingFn: 'datetime',
          },
          {
            accessorFn: (row) => `${row.foodName}`, //accessorFn used to join multiple data into a single cell
            id: 'name', //id is still required when using accessorFn instead of accessorKey
            enableClickToCopy: false,
            header: 'Food Name',
            Cell: ({ cell }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt="avatar"
                  width={30}
                  height={30}
                  src={cell.row.original.imagePath}
                  style={{ borderRadius: '50%', paddingRight: '10' }}
                />
               {cell.getValue()}
              </Box>
            ),
          },
          {
            accessorKey: 'price',
            header: 'Price',
          },
          {
            accessorKey: 'totalNumber',
            header: 'Total Number',
          },
          {
            accessorKey: 'cost',
            header: 'Cost',
          },
          {
            accessorKey: 'riderName',
            header: 'Rider Name',
          },
          {
            accessorKey: 'destination',
            header: 'Destination',
          },
          {
            accessorKey: 'trackingStage',
            enableEditing: true,
            header: 'Tracking Stage',
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === 'shipped'
                      ? theme.palette.warning.light
                      : cell.getValue() ==='confirm'
                      ? theme.palette.primary.light
                      : cell.getValue() ==='cancel'
                      ? theme.palette.error.light
                      : cell.getValue() ==='pending confirmation'
                      ? theme.palette.info.light
                      : cell.getValue() ==='withRider'
                      ? theme.palette.warning.main

                      : theme.palette.success.light,
                  borderRadius: '0.25rem',
                  color: '#FFFF',
                  minWidth: '9ch',
                  p: '0.25rem',
                  alignContent:'center',
                })}
              >
             {cell.getValue()}
              </Box>
            ),
            size: 60
          },
        ],
        [],
      );
  return (
    
    <MaterialReactTable 
    columns={columns} 
    data={orders}
    enableColumnOrdering
    enablePinning
    enableGrouping
    enablePagination
    
     />
 
  );
}

export default History;
