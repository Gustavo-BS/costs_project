import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
             type='text'
             text ='Service Name'
             name='name'
             placehoulder='Enter the service name'
             handleOnChange={handleChange}
             />
             <Input 
             type='number'
             text ='Service Budget'
             name='cost'
             placehoulder='Enter the value total'
             handleOnChange={handleChange}
             />
             <Input 
             type='text'
             text ='Service Description'
             name='description'
             placehoulder='Enter the service description'
             handleOnChange={handleChange}
             />
             <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm