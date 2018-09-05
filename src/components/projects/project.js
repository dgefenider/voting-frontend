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
        const {name, description, id, participant1, participant2, participant3, votings} = this.state.project
        let idea = {total: 0, average: 0}
        let art = {total: 0, average: 0}
        let mechanics = {total: 0, average: 0}
        let realization = {total: 0, average: 0}
        votings.forEach(vote => {
            idea.total += vote.idea
            art.total += vote.art
            mechanics.total += vote.mechanics
            realization.total += vote.realization
        })
        idea.average = idea.total / votings.length || 0
        art.average = art.total / votings.length || 0
        mechanics.average = mechanics.total / votings.length || 0
        realization.average = realization.total / votings.length || 0
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
                    <Row>
                        <Col md={4}>Оценки (всего оценок {votings.length})</Col>
                    </Row>
                    <Row>
                        <Col md={4}>Идея (сумма/средний балл)</Col>
                        <Col md={8}>
                            {idea.total}/{idea.average}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>Техническая реализация (сумма/средний балл)</Col>
                        <Col md={8}>
                            {realization.total}/{realization.average}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>Художественное исполнение (сумма/средний балл)</Col>
                        <Col md={8}>
                            {art.total}/{art.average}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>Механика и взаимодействие (сумма/средний балл)</Col>
                        <Col md={8}>
                            {mechanics.total}/{mechanics.average}
                        </Col>
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
