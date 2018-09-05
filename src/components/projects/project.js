import React, {Component} from 'react'
import {Row, Col, Button, Container} from 'reactstrap'
import styled from 'styled-components'
import {EditUpdateModal} from '../common'
import axios from 'axios'
import {constants} from '../../config'
import {stateStore} from '../../store'
import {errorWrapper} from '../../services'

const ProjectRow = styled(Row)`
    margin-top: 10px;
    border: 1px solid;
    padding-top: 5px;
    padding-bottom: 5px;
`
const BreakLineCol = styled(Col)`word-wrap: break-word;`

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdate: false,
            project: props.project,
        }
    }
    updateProject = async project => {
        const {id} = this.props.project
        const updateObject = {
            name: project.name.value,
            description: project.description.value,
            participant1: project.participant1.value,
            participant2: project.participant2.value,
            participant3: project.participant3.value,
        }
        try {
            const response = await axios({
                method: 'put',
                url: constants.serverUrl + 'project/' + id,
                data: updateObject,
                headers: {
                    Authorization: stateStore.token,
                },
            })
            this.setState({
                project: response.data,
                showUpdate: false,
            })
        } catch (err) {
            errorWrapper.wrap(err)
        }
    }
    render() {
        const {name, description, id, participant1, participant2, participant3} = this.state.project
        const {showUpdate} = this.state
        const {onDelete} = this.props
        return (
            <ProjectRow>
                <Container fluid>
                    <Row>
                        <Col md={2}>Название</Col>
                        <BreakLineCol md={6}>{name}</BreakLineCol>
                        <Col md={2}>
                            <Button
                                block
                                color="danger"
                                onClick={() => {
                                    onDelete(id)
                                }}
                            >
                                Удалить
                            </Button>
                        </Col>
                        <Col md={2}>
                            <Button
                                block
                                color="warning"
                                onClick={() => {
                                    this.setState({showUpdate: true})
                                }}
                            >
                                Изменить
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>Описание</Col>
                        <BreakLineCol md={10}>{description}</BreakLineCol>
                    </Row>
                    <Row>
                        <Col md={2}>Участник 1</Col>
                        <Col md={10}>{participant1}</Col>
                    </Row>
                    <Row>
                        <Col md={2}>Участник 2</Col>
                        <BreakLineCol md={10}>{participant2}</BreakLineCol>
                    </Row>
                    <Row>
                        <Col md={2}>Участник 3</Col>
                        <BreakLineCol md={10}>{participant3}</BreakLineCol>
                    </Row>
                </Container>

                <EditUpdateModal
                    title={'Изменить проект ' + name}
                    type="update"
                    onDone={this.updateProject}
                    showModal={showUpdate}
                    hideModal={() => {
                        this.setState({showUpdate: false})
                    }}
                    object={{
                        name: {
                            label: 'Название',
                            value: name,
                        },
                        description: {
                            label: 'Описание',
                            value: description,
                        },
                        participant1: {
                            label: 'Участник 1',
                            value: participant1,
                        },
                        participant2: {
                            label: 'Участник 2',
                            value: participant2,
                        },
                        participant3: {
                            label: 'Участник 3',
                            value: participant3,
                        },
                    }}
                />
            </ProjectRow>
        )
    }
}

export default Project
