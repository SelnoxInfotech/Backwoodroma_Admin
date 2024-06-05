import React, { useContext, useState, useEffect } from 'react'
import StatusBarCard from './StatusBarCard'
import ReactApexChart from 'react-apexcharts';
import Createcontext from '../Hooks/Context/Context'
import Productstorelist from './Productstorelist';
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { createTheme } from "@mui/material/styles";
import './dashboard.css';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import TotalSales from './TotalSales'
import Areagraph from './Areagraph'
import Recentorder from './Recentorder';
import {SectionCard} from '../molecules/SectionCard/Index'
import axios from 'axios';
import Cookies from 'universal-cookie'
import useStyles from '../Style';
export default function AdminPanel() {
  const classes = useStyles()
  const { state } = useContext(Createcontext)
  const cookies = new Cookies();
  const [pendingstore, setPendingStore] = useState([])
  const [pageSize, setPageSize] = React.useState(10)
  const token_data = cookies.get('Token_access')
  const [recentorder, setRecentorder] = React.useState([])
  const [locationdata, setlocationdat]= React.useState([])
  const [topdata, settopdata]= React.useState({})
  const [locationgrapgdata, setlocationgrapgdata]= React.useState([])
  const [locationgrapglabel, setlocationgrapglabel]= React.useState([])
  const columns = [

    {
      field: 'UserName',
      headerName: 'Name',
      minWidth: 150,
      editable: false,
      sortable: false,
      headerAlign: 'left',
    },
    {
      field: 'MobileNo',
      headerName: 'Contact',
      minWidth: 200,
      editable: false,
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'StoreName',
      headerName: 'Store Name',
      type: 'number',
      minWidth: 150,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'StoreType',
      headerName: 'Store Type',

      editable: false,
      sortable: false,
      minWidth: 150,

    },
    {
      field: 'StoreStatus',
      headerName: 'Store Status',
      type: 'number',
      minWidth: 120,
      editable: false,
      sortable: false,
      // renderCell: (params) => {
      //     return <div className='padmingbtn'>
      //       <span className='pandingDot'></span>
      //       Pending
      //     </div>
      // }
    },
  ];

  const rows = pendingstore

  const CustomFontTheme = createTheme({
    typography: {
      fontSize: 25
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            fontSize: 24,

          }
        }
      },
    },

  });
  const locationchart = {

    series: locationgrapgdata,
    options: {
      colors: ["#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
      labels: locationgrapglabel,
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff']
      },
      legend: {
        show: false,
        position: 'bottom'
      },
      fill: {
        opacity: 1
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false,
            position: 'bottom'
          }
        }
      }]
    },
  };
  const [Data1, SetData1] = React.useState([])
  //  Months//////////////////
  const [TopStore, SetTopStore] = React.useState([])
  const [Data, SetData] = useState({})

  let date = new Date()
  const TodayDate = date.getFullYear() + "-" +String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const monthStartDate = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0]
  const monthlastDate = TodayDate
  const lastmonthStartDate = new Date(date.getFullYear(), date.getMonth() - 1, 2).toISOString().split('T')[0]
  const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastmonthLastDate = new Date(firstDayOfCurrentMonth - 1).toISOString().split('T')[0]
  const WeekCalculate = date.getDate() - date.getDay() + (date.getDay() === 0 ? - 6 : 1);
  const StartDateWeek = new Date(date.setDate(WeekCalculate)).toISOString().split('T')[0]
  function GetpreviousWeekDate(d, j) {
    //   const today = new Date();
    const dayOfWeek = date.getDay();  // 0 (Sunday) to 6 (Saturday)
    const diff = dayOfWeek + d - j;
    const startOfPreviousWeek = new Date(date);
    startOfPreviousWeek.setDate(date.getDate() - diff);
    return startOfPreviousWeek.toISOString().split('T')[0];
  }

  let yesterday = new Date(TodayDate)

  yesterday.setDate(yesterday.getDate() - 1)
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  function CalculateDays(date1) {
    if (date1 === "first") {
      const datefirst = new Date(state.CustomeStartDate)
      const datesecond = new Date(state.CustomeEndDate)
      const diffTime = Math.abs(datesecond - datefirst);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      var StartEndDate = new Date(state.CustomeEndDate);
      StartEndDate.setDate(StartEndDate.getDate() - diffDays - 1);
      var EndStartDate = new Date(state.CustomeStartDate);
      EndStartDate.setDate(EndStartDate.getDate() - diffDays - 1);
      return convert(EndStartDate.toString())
    }
    else {
      const datefirst = new Date(state.CustomeStartDate)
      const datesecond = new Date(state.CustomeEndDate)
      const diffTime = Math.abs(datesecond - datefirst);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      var StartEndDate = new Date(state.CustomeEndDate);
      StartEndDate.setDate(StartEndDate.getDate() - diffDays - 1);
      var EndStartDate = new Date(state.CustomeStartDate);
      EndStartDate.setDate(EndStartDate.getDate() - diffDays - 1);
   
      return convert(StartEndDate.toString())
    }



  }
  React.useEffect(() => {
    if (state.datesSelect === "Customize") {
      if (state.CustomeStartDate !== "" && state.CustomeEndDate !== "") {
        SetData({
          "SelectTime": state.datesSelect === "Year" ? "ThisYear" : state.datesSelect === "Months" ? 'ThisMonth' : state.datesSelect === "Today" ? 'Today' : state.datesSelect === "week" ? "week" : state.datesSelect === "Customize" && "costume",
          "StartDate": state.datesSelect === "Year" ? `${date.getFullYear()}-01-01` : state.datesSelect === "Months" ? monthStartDate : state.datesSelect === "week" ? StartDateWeek : state.datesSelect === "Today" ? TodayDate : state.datesSelect === "Customize" && state.CustomeStartDate,
          "EndDate": state.datesSelect === "Year" ? TodayDate : state.datesSelect === "Months" ? monthlastDate : state.datesSelect === "week" ? TodayDate : state.datesSelect === "Today" ? TodayDate : state.datesSelect === "Customize" && state.CustomeEndDate,
          "LastStartDate": state.datesSelect === "Year" ? `${lastYear}-01-01` : state.datesSelect === "Months" ? lastmonthStartDate : state.datesSelect === "week" ? GetpreviousWeekDate(7, 1) : state.datesSelect === "Today" ? yesterday.toISOString().split('T')[0] : state.datesSelect === "Customize" && CalculateDays('first'),  //yesterday.toISOString().split('T')[0]
          "EndStartDate": state.datesSelect === "Year" ? `${lastYear}-12-31` : state.datesSelect === "Months" ? lastmonthLastDate : state.datesSelect === "week" ? GetpreviousWeekDate(0, 0) : state.datesSelect === "Today" ? yesterday.toISOString().split('T')[0] : state.datesSelect === "Customize" && CalculateDays('Second')
        })
      }
    }
    else {
      SetData({
        "SelectTime": state.datesSelect === "Year" ? "ThisYear" : state.datesSelect === "Months" ? 'ThisMonth' : state.datesSelect === "Today" ? 'Today' : state.datesSelect === "week" ? "week" : state.datesSelect === "Customize" && "costume",
        "StartDate": state.datesSelect === "Year" ? `${date.getFullYear()}-01-01` : state.datesSelect === "Months" ? monthStartDate : state.datesSelect === "week" ? StartDateWeek : state.datesSelect === "Today" ? TodayDate : state.datesSelect === "Customize" && state.CustomeStartDate,
        "EndDate": state.datesSelect === "Year" ? TodayDate : state.datesSelect === "Months" ? monthlastDate : state.datesSelect === "week" ? TodayDate : state.datesSelect === "Today" ? TodayDate : state.datesSelect === "Customize" && state.CustomeEndDate,
        "LastStartDate": state.datesSelect === "Year" ? `${lastYear}-01-01` : state.datesSelect === "Months" ? lastmonthStartDate : state.datesSelect === "week" ? GetpreviousWeekDate(7, 1) : state.datesSelect === "Today" ? yesterday.toISOString().split('T')[0] : state.datesSelect === "Customize" && CalculateDays('first'),  //yesterday.toISOString().split('T')[0]
        "EndStartDate": state.datesSelect === "Year" ? `${lastYear}-12-31` : state.datesSelect === "Months" ? lastmonthLastDate : state.datesSelect === "week" ? GetpreviousWeekDate(0, 0) : state.datesSelect === "Today" ? yesterday.toISOString().split('T')[0] : state.datesSelect === "Customize" && CalculateDays('Second')
      })
    }
  }, [state.datesSelect, state.CustomeStartDate, state.CustomeEndDate])

  useEffect(() => {
    if (Object.keys(Data)?.length !== 0) {
        axios.post('https://api.cannabaze.com/AdminPanel/AllPendingStores/',
        Data
        , {
          headers: {
            'Authorization': `Bearer ${token_data}`
          }
        }).then((res) => {
          setPendingStore((previous) => res.data)
        })

        axios.post("https://api.cannabaze.com/AdminPanel/TopProduct/",
        Data,
        {
          headers: {
            'Authorization': `Bearer ${token_data}`
          }
        }).then(response => {
          SetData1(response.data)
  
        })


        axios.post("https://api.cannabaze.com/AdminPanel/TopStore/",
        Data,
        {
          headers: {
            'Authorization': `Bearer ${token_data}`
          }
        }).then(response => {
          SetTopStore(response.data)
  
        })


        axios.get('https://api.cannabaze.com/AdminPanel/AllRecentOrder/', {
          headers: {
            'Authorization': `Bearer ${token_data}`
          }
        }).then((res) => {
          setRecentorder(res.data.slice(0,6))
        })
    }
  }, [Data])
  useEffect(()=>{
    axios.post('https://api.cannabaze.com/AdminPanel/PopularLocationGraphPage/',
    {"SelectTime":"Year","StartDate":"2024-01-07","EndDate":"2024-02-06","LastStartDate":"2023-02-07","EndStartDate":"2024-01-07"},
    {
      headers: {
        'Authorization': `Bearer ${token_data}`
      }
    }
    ).then((res)=>{
     
        let b= []
        let c= []
        let a = res.data.map((item , index)=>{
        
          return {
            ...item, id : index+1
          }
        })
  
       let lastdata =  a.pop()
       
       settopdata(lastdata)
     setlocationdat(a)
     setlocationgrapgdata(b)
     setlocationgrapglabel(c)
     a.forEach((item , index)=>{
      c.push(item.State)
      b.push(item.TotalSale)
  
    })
    })



  },[])
  return (
    <div className='row dashboardSection'>

      <SectionCard className='col-12 StatusCardBorder' >
        <StatusBarCard  title={"dashboard"}></StatusBarCard>
      </SectionCard>
      <div className='col-12'>
        <div className='dashboardHerosection'>
          <SectionCard className='totalUser bg-white'>
            <Areagraph title={"Total User"} />
          </SectionCard>
          <SectionCard className='topProducts'><Productstorelist link={'/topproduct'} title={"Top Product"} Data1={Data1} /></SectionCard>
          <SectionCard className='topProducts'><Productstorelist link={'/topstorelist'} title={"Top Store"} Data1={TopStore} /></SectionCard>
          <SectionCard className='topProducts'><Productstorelist title={"Visited Store"} /></SectionCard>
          <SectionCard className='topProducts'>
            <TotalSales  type={'dashboard'} />
          </SectionCard>
        </div>

      </div>
      <div className='col-12 d-flex justify-content-between flex-md-nowrap flex-wrap gap-5'>
        <SectionCard className='storeOwnerTable'>
          <div className='ownerlist'>
            <Box className={classes.DataTableBoxStyle}>
              <ThemeProvider theme={CustomFontTheme}>
                <div style={{ width: '100%' }}>
                  <DataGrid rows={rows} columns={columns}
                    getRowId={(row) => row.UserName}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[ 10, 20]}
                    pagination
                    autoHeight
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableSelectionOnClick 
                    className={classes.DataTableStyle}
                    
                  />
                </div>
              </ThemeProvider>
            </Box>
          </div>
          <div className='viewButton'>
            <Link to={'/'}> <span>View All</span></Link>
          </div>
        </SectionCard>
        <SectionCard className='locationGraph'>
          <div className='locationGraph_header'>
            <h3 className='locationGraph_headertitle'>Popular Location</h3>
            <Link to={'/populerlocation'}><span>View Details</span></Link>
          </div>
          <div className='locationContent'>
            <div className='locationList'>
              <div className='locationListHeader'>
                <span>Location</span>
                <span>Amount</span>
              </div>
              {/* <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#1E40AF' }}></span> New York</span>
                <span className='locationAmount'>6,806</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#1D4ED8' }}></span> Phoenix</span>
                <span className='locationAmount'>6,806</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#2563EB' }}></span> Chicago</span>
                <span className='locationAmount'>2000</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#3B82F6' }}></span> Philadelphia </span>
                <span className='locationAmount'>1600</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#60A5FA' }}></span>  Los Angeles </span>
                <span className='locationAmount'>806</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#93C5FD' }}></span> Dallas</span>
                <span className='locationAmount'>566</span>
              </div>
              <div className='locationListItem'>

                <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#BFDBFE' }}></span> Oklahoma City </span>
                <span className='locationAmount'>566</span>
              </div> */}
              {
                        locationdata.map((item , index)=>{
                         return    <div className='locationListItem'>
                         <span className='locationName'>   <span className='colorCircle' style={{ backgroundColor: '#BFDBFE' }}></span> {item.State} </span>
                         <span className='locationAmount'>{item.TotalSale}</span>
                       </div>
                        })
                      } 
            </div>
            <div className='locationGrapharea'>
              <ReactApexChart options={locationchart.options} series={locationchart.series} type="polarArea" />
            </div>
          </div>
        </SectionCard>
      </div>
      <div className='col-12 my-3'>
        <Recentorder title={"Recent Order"}  order={recentorder}/>
      </div>

    </div>
  )
}
