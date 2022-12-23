import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { deleteSlot, getAppointmentsForBloodBank, getAppointmentSlotsForBloodBank, getFreeAppointmentSlotsForBloodBank, scheduleAppointment } from '../../../services/appointments/AppointmentService';
import AuthContext from '../../../store/bloodbank/login/login-context'
import {format} from 'date-fns';
import './BloodBankSlots.scss';
import { RepeatOneSharp } from '@mui/icons-material';
import { toast } from 'react-toastify';

const BloodBankSlots = () => {

    const context = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [requestData, setRequestData] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, [page, perPage, requestData])

    const fetchData = async () => {
        let response;
        if (context.user.role === 'ROLE_REGISTERED') {
            response = await getFreeAppointmentSlotsForBloodBank({id: params.id, page: page,size: perPage})
        } else {
            response = await getAppointmentsForBloodBank({id: params.id, page: page,size: perPage})
        }
         
        console.log(response.data)
        setTotalElements(response.data.totalElements);
        setSlots(response.data.content);
    }

    const getDate = (dateArray) => {
        let date = new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], 0);
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    const handleRowsPerPageChange = async (event) => {
        setPage(0);
        setPerPage(event.target.value);
    }

    const handlePageChange = async (event, number) => {
        setPage(number);
    }

    const renderActionButton = (status, id) => {
        if (context.user.role === 'ROLE_REGISTERED'){
            return (<button className='button-small bg-orange' onClick={(event) => scheduleAppSlot(event, id)}>schedule</button>)
        }

        return (<button className='button-small bg-red' disabled={ status === 'TAKEN' } onClick={(event) => deleteAppSlot(event, id)}>delete</button>)
    }

    const deleteAppSlot = async (event, id) => {
        await deleteSlot(id).then((response) => {
            toast.success("Slot deleted!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setRequestData(new Date())
        })
    }

    const scheduleAppSlot = async (event, id) => {
        await scheduleAppointment({appointmentSlotId: id, userId: context.user.id}).then((response) => {
            if (!response || !response.ok) {
                return;
            }
            toast.success("Appointment successfully scheduled!", {
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

    const navigateTo = () => {
        navigate('/new-slot');
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
          <TableCell align="left">{slot.status}</TableCell>
          <TableCell align="right">{renderActionButton(slot.status, slot.id)}</TableCell>
        </TableRow>
      );
        }

        return result;
    }

    if (!slots || slots.length === 0) {
        return <div className="message">There are no appointments available...</div>;
    }

    return (<div className='slots'>
        <div className='slots__header'>
            Appointment Slots
        </div>
        {context.user.role === 'ROLE_BLOOD_BANK_ADMIN' && <div className='slots__button'>
            <button className='button-small bg-orange' onClick={navigateTo}>Schedule</button>
        </div>}
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
                                Status
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
                        page={page}
                        rowsPerPageOptions={[5,10,15]}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        onPageChange={handlePageChange}/>
            </TableContainer>
        </div>
    </div>)
}

export default BloodBankSlots;