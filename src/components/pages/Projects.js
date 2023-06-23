import { useLocation } from "react-router-dom"
import Message from "../layout/Message"

import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"

import styles from './Projects.module.css'

function Projects (){

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Create Project"/>
            </div> 
                <Container customClass="start">
                    <p>Projects...</p>    
                </Container>
            
            
            {message && <Message type="success" msg={message} />}
        </div>
    )
}

export default Projects