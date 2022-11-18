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

        bloodBanks.forEach((bb) => {
            if (bb.rating >= rating.rating) {
                result.push(bb);
        }
        });

        setBloodBanks(result)
    }

    const handleReset = () => {
        fetchData();
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
                    <BloodBankTable rows = {bloodBanks}/>
                </div>
            </div>
        </div>
    )
}

export default BloodBanksPage;