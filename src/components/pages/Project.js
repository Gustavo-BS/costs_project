import styles from './Project.module.css'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Message from '../layout/Message';
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'


function Project() {

    const { id } = useParams();
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
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
                    console.log(data)
                    setProject(data)
                })
                .catch(err => console.log(err))
        }, 300)
    }, [id])
    
    function editPost(project){
        //budget validation
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

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
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
              </Container>  
            </div>
            ) : (
                <Loading />
            )}
    </>
    )
}

export default Project