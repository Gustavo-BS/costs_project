import { parse, v4 as uuidv4 } from 'uuid';

import styles from './Project.module.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Message from '../layout/Message';
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';



function Project() {

    const { id } = useParams();

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState()
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log(err))
        }, 300)
    }, [id])
    
    function editPost(project){
        setMessage('')
        if(project.budget < project.cost){
            setMessage('The budget cannot be greater than the cost!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        } )
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Project updated!')
            setType('success')
        })
        .catch()
    }

    function creatService(project){
        setMessage('')
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Budget exceeded, check the value of the service!')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) =>{
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }

    function removeService(){

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
              <Container customClass="column">
                <div className={styles.details_container}>
                    <h1>Project: {project.name}</h1>
                    {message && <Message  type={type} meg={message}/>}
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Edit Project' : 'Close'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Category:</span> {project.category.name}
                            </p> 
                            <p>
                                <span>Budget:</span> ${project.budget}
                            </p>
                            <p>
                                <span>Total Used:</span> ${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm 
                             handleSubmit={editPost} 
                             btnText="Done" 
                             projectData={project}/> 
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Add service:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Add service' : 'Close'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm
                             handleSubmit={creatService}
                             btnText="Add Service"
                             projectData={project}
                            />
                        )}
                    </div>
                </div>
                <h2>Services</h2>
                <Container customClass="start"> 
                    {services.length > 0 &&
                        services.map((services) =>(
                            <ServiceCard 
                             id={services.id}
                             name={services.name}
                             cost={services.cost}
                             description={services.description}
                             key={services.id}
                             handleRemove={removeService}
                            />

                           
                        ))
                    }
                    {services.length === 0 && <p>There are no registered services</p>

                    }
                </Container>
              </Container>  
            </div>
            ) : (
                <Loading />
            )}
    </>
    )
}

export default Project