import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { SlSocialDropbox } from "react-icons/sl";
import PopUp from "./PopUp";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSnackbar } from "notistack";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Select from "@mui/material/Select";
import SubCategoryEdit from "./SubCategoryEdit";
import Createcontext from "../../Hooks/Context/Context";
import SubCategoryDelete from "./SubCategoryDelete";
import Tooltip from "@mui/material/Tooltip";
import useStyles from "../../Style";
import { SectionCard } from "../../molecules/SectionCard/Index";
export default function SubCategory() {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Createcontext);
  const [pageSize, setPageSize] = React.useState(10)
  const CustomFontTheme = createTheme({
    typography: {
      fontSize: 25,
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            fontSize: 24,
          },
        },
      },
    },
  });
 const classes = useStyles()
  const [totel, setTotal] = React.useState([]);
  React.useEffect(() => {
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");
    axios("https://api.cannabaze.com/AdminPanel/Get-SubCategory/", {
      headers: {
        Authorization: `Bearer ${token_data}`,
      },
    }).then((response) => {
      setTotal(response.data);
    });
  }, [state]);
  const Submit = (params) => {
    const cookies = new Cookies();
    const token_data = cookies.get("Token_access");

    const config = {
      headers: { Authorization: `Bearer ${token_data}` },
    };

    const data = {
      id: params.row.id,
      name: params.row.name.toUpperCase(),
      category_id: params.row.Category_id,
      Status: params.row.Status === "Active" ? "Hide" : "Active",
    };
    axios.post(
        `https://api.cannabaze.com/AdminPanel/update-SubCategory/${data.id}`,
        data,
        config
      )
      .then(() => {
        dispatch({ type: "api", api: true });
        enqueueSnackbar("Edit Sub-Category  success !", { variant: "success" });
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 90,
      flex: 1,
      sortable: false,
      editable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "category_name",
      headerName: "Category",
      minWidth: 90,
      sortable: false,
      flex: 1,
      type: "text",
      editable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
    },
    {
      field: "Status",
      headerName: "Status",
      type: "action",
      minWidth: 80,
      sortable: false,
      flex: 1,
      editable: false,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        if (params.formattedValue === "Active") {
          return (
            <Tooltip
              title="Active"
              enterDelay={300}
              leaveDelay={200}
              arrow
              placement="right-start"
            >
              <p
                style={{ color: "#31B665 ", fontSize: 25, cursor: "pointer" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  state.Roles.EditSubcategory &&
                  Submit(params);
                }}
              >
                <AiFillEye />{" "}
              </p>
            </Tooltip>
          );
        }
        return (
          <Tooltip
            title="Hide"
            enterDelay={300}
            leaveDelay={200}
            arrow
            placement="right-start"
          >
            <p
              style={{ color: "red ", fontSize: 25, cursor: "pointer" }}
              variant="contained"
              color="primary"
              onClick={() => {
                Submit(params);
              }}
            >
              <AiOutlineEyeInvisible />
            </p>
          </Tooltip>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      type: "button",
      sortable: false,
      minWidth: 90,
      flex: 1,
      headerClassName: "super-app-theme--header",
      cellClassName: "Edit",
      renderCell: (params) => (
        <>
        { (state.Roles.EditSubcategory ||  state.Roles.DeleteSubcategory) &&
          <Box
              sx={{
                "&.MuiBox-root":{
                   display:'flex',
                   justifyContent:'center',
                   alignItems:'center',
                   gap:'10px'
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderWidth: "1px",
                        borderColor: 'black',
                    },
                },
                '& . MuiDataGrid-root .MuiDataGrid-cell:focus': {
                    outline: "#e0e0e0"
                }
            }}
          >
           
                { state.Roles.EditSubcategory &&  <SubCategoryEdit data={params.row}></SubCategoryEdit>}
                { state.Roles.DeleteSubcategory &&  <SubCategoryDelete data={params.row}></SubCategoryDelete>}
           
          </Box>
        }
        </>
      ),
    },
  ];

  const rows = totel;
  return (
    <SectionCard>
      <div className="row">
        <div className='col-12  mb-3'>
             <h2 className="pagetitle"><SlSocialDropbox color='#31B655' size={25}/> SubCategory</h2>
          
            <div className="col text-end">
            { state.Roles.AddSubcategory && 
              <span > <h2>  <PopUp></PopUp> </h2> </span>
            }
            </div>
        </div>

        <div className="col-12">
          <Box
           className={classes.DataTableBoxStyle}
          >
            <ThemeProvider theme={CustomFontTheme}>
              <div style={{ width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  disableColumnMenu
                  disableColumnFilter
                  disableColumnSelector
                  autoHeight
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[ 10, 20]}
                  pagination
                className={classes.DataTableStyle}
                disableSelectionOnClick 
                />
              </div>
            </ThemeProvider>
          </Box>
        </div>
      </div>
    </SectionCard>
  );
}
