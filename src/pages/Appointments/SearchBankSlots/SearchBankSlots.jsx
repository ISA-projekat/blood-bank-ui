import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { scheduleAppointment, searchFreeSlots } from '../../../services/appointments/AppointmentService';
import AuthContext from '../../../store/bloodbank/login/login-context';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import './SearchBankSlots.scss';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { getPage } from '../../../services/appointments/AppointmentService';

const SearchBankSlots = () => {

    const context = useContext(AuthContext);
    const [slots, setSlots] = useState([]);
    const [pagez, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [requestData, setRequestData] = useState(new Date());
    const [value, setValue] = React.useState([null, null]);
    const [order, setOrder] = useState("asc");
    const [sortActive, setSortActive] = useState(false)
    const [sortState, setSortState] = useState("")

    useEffect(() => {
        handleSearch();
    }, [pagez, perPage])

    const setupSort = (sortParam) => {
        let sort = sortParam + ","
        sort += order === "asc" ? "desc" : "asc"
        setSortState(sort)
        setSortActive(true);

        return sort;
    }

    const onSortByRating = async () => {
        const sort = setupSort("bloodBank.rating")
        const response = await getPage(pagez, perPage, sort)

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setSlots(response.data.content);
    }

    const getDate = (dateArray) => {
        let date = new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], 0);
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    const handleSearch = async () => {
        let dateRange = {
            start: value[0].$d.toISOString(),
            end: value[1].$d.toISOString()
        } 

        console.log(dateRange.start)
        console.log(dateRange.end);

        const response = await searchFreeSlots({start: dateRange.start, end: dateRange.end, size: perPage, page: pagez});

        setTotalElements(response.data.totalElements);
        setSlots(response.data.content);
    }

    const scheduleAppSlot = async (event, id) => {
        await scheduleAppointment({appointmentSlotId: id, userId: context.user.id}).then((response) => {
            if (!response || !response.ok) {
                return;
            }
            toast.success("Appointment succesffuly scheduled!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRequestData(new Date());
        })
    }

    const handlePageChange = async (event, number) => {
        setPage(number);
    }

    const handleRowsPerPageChange = async (event) => {
        setPage(0);
        setPerPage(event.target.value);
    }

    const renderAddress = (address) => {
        return address.street + " " + address.number + ", " + address.city
    } 

    const renderTableRows = () => {
        let result = [];

        if (!slots) {
        return <TableRow />;
        }

        if (slots.length === 0) {
        return <TableRow />;
        }
        
        for(let slot of slots) {
            result.push(
                <TableRow
                    key={slot.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="table-row-class"
                >
                    <TableCell component="th" scope="row" align='left'>
                        {format(getDate(slot.dateRange.start), "dd.MM.yyyy HH:mm")}
                    </TableCell>
                    <TableCell align="left">{format(getDate(slot.dateRange.end), "dd.MM.yyyy HH:mm")}</TableCell>
                    <TableCell align="left">{slot.bloodBank.name}</TableCell>
                    <TableCell align="left">{renderAddress(slot.bloodBank.address)}</TableCell>
                    <TableCell align="left">{slot.bloodBank.rating}</TableCell>
                    <TableCell align="right"><button className='button-small bg-orange' onClick={(event) => scheduleAppSlot(event, slot.id)}>schedule</button></TableCell>
                </TableRow>
      );
        }

        return result;
    }

    return (
       <div className='slots'>
        <div className='slots__header'>
            Find available slot
        </div>
        <div className='slots__form'>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: 'From', end: 'To' }}>
                <DateRangePicker
                    className='slots__form-picker'
                    value={value}
                    onChange={(newValue) => { setValue(newValue); }}
                    renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField size="small" {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField size="small" {...endProps} />
                    </React.Fragment>
                )}/>
            </LocalizationProvider>
                <button className='button-small bg-orange' onClick={handleSearch}>submit</button>
        </div>
        <div className='slots__content'>
            <TableContainer className='slots__content-container'>
                <Table className='slots__content-container-table' sx={{fontSize: '2rem'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left' className='table-cell'>
                                Start Date
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                End Date
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                Blood Bank
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                Address
                            </TableCell>
                            <TableCell align='left' className='table-cell' onClick={onSortByRating}>
                                Rating
                            </TableCell>
                            <TableCell align='right' className='table-cell'>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableRows()}
                    </TableBody>
                </Table>
                <TablePagination
                        className='slots__content-container-pagination'
                        count={totalElements}
                        rowsPerPage={perPage}
                        onPageChange={handlePageChange}
                        page={pagez}
                        rowsPerPageOptions={[5,10,15]}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        />
            </TableContainer>
        </div>
    </div> 
    )
}

export default SearchBankSlots;