import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {format} from 'date-fns';
import { getFinishedAppointments } from '../../../services/appointments/AppointmentService';
import PageLayout from '../../../components/Layout/MainLayout/PageLayout';
import AuthContext from '../../../store/bloodbank/login/login-context'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import './AppointmentHistoryPage.scss';

const AppointmentHistoryPage = () => {

    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [requestData, setRequestData] = useState(new Date());
    const [sort, setSort] = useState('');
    const [asc, setAsc] = useState(true)

    useEffect(() => {
        fetchData();
    }, [requestData, page, perPage])

    const fetchData = async () => {
        let response;
        response = await getFinishedAppointments({id: context.user.id, page:page, size: perPage, sort: sort})
         
        console.log(response.data)
        setTotalElements(response.data.totalElements);
        setAppointments(response.data.content);
    }

    const handleRowsPerPageChange = async (event) => {
        setPage(0);
        setPerPage(event.target.value);
    }

    const handlePageChange = async (event, number) => {
        setPage(number);
    }

    const getDate = (dateArray) => {
        let date = new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], 0);
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    const sortByDescription = () => {
        let stringovic = 'details.description,'
        if (asc) {
            stringovic += 'asc'
        } else {
            stringovic += 'desc'
        }
        setAsc(!asc)
        setSort(stringovic)
        setRequestData(new Date());
    }

    const renderTableRows = () => {
        let result = [];

        if (!appointments) {
        return <TableRow />;
        }

        if (appointments.length === 0) {
        return <TableRow />;
        }

        for(let app of appointments) {
            result.push(
        <TableRow
          key={app.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 }, minHeight: "5rem"}}
          className="table-row-class"
        >
          <TableCell component="th" scope="row" align='left'>
            {app.appointmentSlot.bloodBank.name}
          </TableCell>
          <TableCell component="th" scope="row" align='left'>
            {format(getDate(app.appointmentSlot.dateRange.start), "dd.MM.yyyy HH:mm")}
          </TableCell>
          <TableCell align="left">{format(getDate(app.appointmentSlot.dateRange.end), "dd.MM.yyyy HH:mm")}</TableCell>
          <TableCell align="left">{app.status}</TableCell>
          <TableCell align="right">{app.details.description}</TableCell>
        </TableRow>)
        }

        return result;
    }

    return (<PageLayout class={'history'}>
        <div className='history__header'>
            Appointment History
        </div>
        <div className='history__content'>
            <TableContainer className='history__content-container'>
                <Table className='history__content-container-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left' className='table-cell'>
                                Blood Bank
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                Start Date
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                End Date
                            </TableCell>
                            <TableCell align='left' className='table-cell'>
                                Status
                            </TableCell>
                            <TableCell align='right' className='table-cell' onClick={sortByDescription}>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableRows()}
                    </TableBody>
                </Table>
                <TablePagination
                        className='history__content-container-pagination'
                        count={totalElements}
                        rowsPerPage={perPage}
                        page={page}
                        rowsPerPageOptions={[5,10,15]}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        onPageChange={handlePageChange}/>
            </TableContainer>
        </div>
    </PageLayout>)
}

export default AppointmentHistoryPage;