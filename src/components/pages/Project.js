import { useEffect, useState } from 'react';
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import Container from '../layout/Container'


function Project() {

    const { id } = useParams();
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

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

    function toogleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
              <Container customClass="column">
                <div className={styles.details_container}>
                    <h1>Project: {project.name}</h1>
                    <button className={styles.btn} onClick={toogleProjectForm}>
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
                            <p>Project Details</p> 
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