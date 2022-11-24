import React, {useState, useEffect} from 'react'
import BloodBankTable from '../../components/BloodBank/BloodBankTable';
import './BloodBanksPages.scss'
import { getBloodBanks, search } from '../../services/blood-bank/BloodBankService';
import { FormProvider, useForm } from 'react-hook-form';
import TextFieldControl from '../../components/forms/controls/TextFieldControl';
import FormRules from '../../components/forms/rules/FormRules';
import { Button } from "@mui/material";

const BloodBanksPage = () => {

    const [bloodBanks, setBloodBanks] = useState([]);
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
            
        const response = await getBloodBanks();
        
        setBloodBanks(response.data);
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

    const onSearch = async (dto) => {
        console.log(dto)
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

    const onSortByName = () => {
        const table = [...bloodBanks].sort((a, b) =>
            a.name.toString().localeCompare(b.name.toString()) * (order === "asc" ? 1 : -1)
        );

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(table);
    }

    const onSortByCity = () => {
        const table = [...bloodBanks].sort((a, b) =>
            a.address.city.toString().localeCompare(b.address.city.toString()) * (order === "asc" ? 1 : -1)
        );

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(table);
    }

    const onSortByStreet = () => {
        const table = [...bloodBanks].sort((a, b) =>
            a.address.street.toString().localeCompare(b.address.street.toString()) * (order === "asc" ? 1 : -1)
        );

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(table);
    }

    const onSortByGrade = () => {
        const table = [...bloodBanks].sort((a, b) =>
            a.rating.toString().localeCompare(b.rating.toString(), { numeric: true}) * (order === "asc" ? 1 : -1)
        );

        const value = order === "asc" ? "desc" : "asc"
        setOrder(value);
        setBloodBanks(table);
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
                    <BloodBankTable rows = {bloodBanks} sortByName={onSortByName} sortByCity={onSortByCity} sortByStreet={onSortByStreet} sortByGrade={onSortByGrade}/>
                </div>
            </div>
        </div>
    )
}

export default BloodBanksPage;