import React, {useState, useEffect} from 'react'
import BloodBankTable from '../../components/BloodBank/BloodBankTable';
import './BloodBanksPages.scss'
import { getBloodBanks, getPage, search } from '../../services/blood-bank/BloodBankService';
import { FormProvider, useForm } from 'react-hook-form';
import TextFieldControl from '../../components/forms/controls/TextFieldControl';
import FormRules from '../../components/forms/rules/FormRules';
import { Button } from "@mui/material";

const BloodBanksPage = () => {

    const [bloodBanks, setBloodBanks] = useState([]);
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState({})
    const [sortActive, setSortActive] = useState(false)
    const [sortState, setSortState] = useState("")

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
            
        const response = await getPage(0,2);
        
        setPage(response.data)
        setBloodBanks(response.data.content);
    };

    const form = useForm();
    const form2 = useForm();

    const {
        watch,
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onPageChange = async (event, newPage) => {
        const sortParam = sortActive ? sortState : ""
        const response = await getPage(newPage, 2, sortParam)
        if (!response || !response.ok){
            alert('There is an error')
        }
        setPage(response.data)
        setBloodBanks(response.data.content);
    }

    const onSearch = async (dto) => {
        const response = await search(dto);
        if (!response || !response.ok){
            alert('There is an error')
        }

        setBloodBanks(response.data)
    }

    const handleFilter = (rating) => {
        let result = []
        if (rating.start_time === "") { rating.start_time = 0; }
        if (rating.end_time === "") { rating.end_time = 24; }
        if (rating.rating === "") {rating.rating = 0; }

        bloodBanks.forEach((bb) => {
            var start_hours = Number(bb.startTime.split(":")[0]);
            var end_hours = Number(bb.endTime.split(":")[0]);
            console.log(bb);
            if ((bb.rating >= rating.rating) && (start_hours >= rating.start_time) && (end_hours <= rating.end_time)) {
                result.push(bb);
        }
        });

        setBloodBanks(result)
    }

    const handleReset = () => {
        fetchData();
    }

    const onSortByName = async () => {
        const sort = setupSort("name")
        const response = await getPage(0, 2, sort)


        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(response.data.content);
    }

    const onSortByCity = async () => {
        const sort = setupSort("address.city")
        const response = await getPage(0, 2, sort)

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(response.data.content);
    }

    const onSortByStreet = async () => {
        const sort = setupSort("address.street")
        const response = await getPage(0, 2, sort)

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(response.data.content);
    }

    const onSortByGrade = async () => {
        
        const sort = setupSort("rating")
        const response = await getPage(0, 2, sort)

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(response.data.content);
    }

    const setupSort = (sortParam) => {
        let sort = sortParam + ","
        sort += order === "asc" ? "desc" : "asc"
        setSortState(sort)
        setSortActive(true);

        return sort;
    }

    return (
        <div className='pages-wrapper'>
            <div className='blood-banks'>
                <div className='blood-banks__header'>
                    <h1>Blood bank overview</h1>
                </div>
                <div className='blood-banks__filter'>
                    <div className='blood-banks__filter-search'>
                    <FormProvider {...form}>
                        <div className='form-align'>
                            <div className='search-form-item'>
                                <TextFieldControl
                                label={"Name"}
                                name={"name"}
                                control={control}
                                defaultValue=""/>
                            </div>
                            <div className='search-form-item'>
                                <TextFieldControl
                                label={"City"}
                                name={"city"}
                                control={control}
                                defaultValue=""
                                />
                            </div>
                            <div className="search-submit-container">
                            <Button onClick={handleSubmit(onSearch)}
                                    className="orange-button btn-submit mr-5"
                            > Search</Button>
                            </div>
                        </div>
                    </FormProvider>
                    </div>
                    <div className='blood-banks__filter-filter'>
                        <FormProvider {...form2}>
                        <div className='search-form-item'>
                                <TextFieldControl
                                label={"Rating"}
                                name={"rating"}
                                control={control}
                                type={'number'}
                                defaultValue=""/>
                        </div>
                        <div className='search-form-item'>
                                <TextFieldControl
                                label={"Opening Hour"}
                                name={"start_time"}
                                control={control}
                                type={'number'}
                                defaultValue=""/>
                        </div>
                        <div className='search-form-item'>
                                <TextFieldControl
                                label={"Closing Hour"}
                                name={"end_time"}
                                control={control}
                                type={'number'}
                                defaultValue=""/>
                        </div>
                        <div className="search-submit-container">
                            <Button onClick={handleSubmit(handleFilter)}
                                    className="orange-button btn-submit"
                            > Filter</Button>
                        </div>
                        <div className="search-submit-container">
                            <Button onClick={handleReset}
                                    className="orange-button btn-submit"
                            > Reset</Button>
                        </div>
                        </FormProvider>
                    </div>
                </div>
                <div className='blood-banks__table'>
                    <BloodBankTable rows = {bloodBanks} sortByName={onSortByName} sortByCity={onSortByCity} sortByStreet={onSortByStreet} sortByGrade={onSortByGrade} onPageChange={onPageChange} page={page}/>
                </div>
            </div>
        </div>
    )
}

export default BloodBanksPage;