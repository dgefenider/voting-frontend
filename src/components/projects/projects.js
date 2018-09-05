import React, {Component} from 'react'
import axios from 'axios'
import {constants} from '../../config'
import {errorWrapper} from '../../services'
import {stateStore} from '../../store'
import {Project} from './'
import {Container, Row, Col, Button} from 'reactstrap'
import styled from 'styled-components'
import {EditUpdateModal} from '../common'
import _ from 'lodash'

const ContentContainer = styled(Container)`margin-top: 30px;`

class Projects extends Component {
    state = {
        showCreateProject: false,
        projects: [],
        loading: false,
    }
    componentDidMount() {
        this.setState({loading: true})
        axios({
            method: 'get',
            url: constants.serverUrl + 'project',
            headers: {
                Authorization: stateStore.token,
            },
        })
            .then(response => {
                console.log(response)
                this.setState({loading: false, projects: response.data})
            })
            .catch(err => {
                errorWrapper.wrap(err)
            })
    }
    createProject = async project => {
        try {
            const response = await axios({
                method: 'post',
                url: constants.serverUrl + 'project',
                data: {
                    name: project.name.value,
                    description: project.description.value,
                    participant1: project.participant1.value,
                    participant2: project.participant2.value,
                    participant3: project.participant3.value,
                },
                headers: {
                    Authorization: stateStore.token,
                },
            })
            this.setState({
                projects: this.state.projects.concat(response.data),
                showCreateProject: false,
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    deleteProject = async id => {
        try {
            const response = await axios({
                method: 'delete',
                url: constants.serverUrl + 'project/' + id,
                headers: {
                    Authorization: stateStore.token,
                },
            })
            this.setState({
                projects: _.reject(this.state.projects, project => {
                    return project.id === response.data.id
                }),
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    render() {
        const {showCreateProject, projects} = this.state
        const projectsComponents = projects.map(project => {
            return <Project key={project.id} project={project} onDelete={this.deleteProject} />
        })
        return (
            <ContentContainer fluid>
                <Row>
                    <Col md={4}>Проекты</Col>
                    <Col md={2}>
                        <Button
                            block
                            color="success"
                            onClick={() => {
                                this.setState({showCreateProject: true})
                            }}
                        >
                            Добавить
                        </Button>
                    </Col>
                </Row>
                {projectsComponents}
                <EditUpdateModal
                    title="Создать новый проект"
                    type="create"
                    onDone={this.createProject}
                    showModal={showCreateProject}
                    hideModal={() => {
                        this.setState({showCreateProject: false})
                    }}
                    object={{
                        name: {
                            label: 'Название',
                            value: '',
                        },
                        description: {
                            label: 'Описание',
                            value: '',
                        },
                        participant1: {
                            label: 'Участник 1',
                            value: '',
                        },
                        participant2: {
                            label: 'Участник 2',
                            value: '',
                        },
                        participant3: {
                            label: 'Участник 3',
                            value: '',
                        },
                    }}
                />
            </ContentContainer>
        )
    }
}

export default Projects
