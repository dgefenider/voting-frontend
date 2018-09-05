import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {stateStore} from '../../store'
import {Link} from 'react-router-dom'
import {Header} from '../common'
import {Container, Col, Row} from 'reactstrap'
import {ProjectsItem, Project} from './projects'
import styled from 'styled-components'
import axios from 'axios'
import {constants} from '../../config'
import {errorWrapper} from '../../services'
import _ from 'lodash'

const MenuHeader = styled(Row)`
    padding-top: 15px;
    padding-bottom: 15px;
`

const Voting = observer(
    class Voting extends Component {
        state = {
            loading: false,
            projects: [],
            selected: null,
        }
        componentDidMount() {
            this.setState({loading: true})
            axios({
                url: constants.serverUrl + 'project/getprojects',
                method: 'get',
                headers: {
                    Authorization: stateStore.token,
                },
            })
                .then(response => {
                    this.setState({projects: response.data, loading: false})
                })
                .catch(err => {
                    errorWrapper.wrap(err)
                })
        }
        selectProject = id => {
            this.setState({selected: id})
        }
        voteProject = async (id, voting) => {
            const {idea, art, realization, mechanics} = voting
            this.setState({loading: true})
            try {
                const response = await axios({
                    url: constants.serverUrl + 'vote/vote',
                    method: 'post',
                    data: {
                        project: id,
                        idea,
                        art,
                        realization,
                        mechanics,
                    },
                    headers: {
                        Authorization: stateStore.token,
                    },
                })
                console.log(response)
                let {projects} = this.state
                const index = _.findIndex(projects, project => {
                    return project.id === response.data.id
                })
                projects[index] = response.data
                this.setState({projects})
            } catch (err) {
                errorWrapper.wrap(err)
            }
        }
        render() {
            const {projects, selected} = this.state
            const projectsComponents = projects.map(project => {
                return <ProjectsItem project={project} key={project.id} onSelect={this.selectProject} />
            })
            let selectedProject
            if (selected) {
                selectedProject = _.find(projects, project => {
                    return project.id === selected
                })
            }
            return (
                <Container>
                    <Header />
                    <Row>
                        <Col md={3}>
                            <MenuHeader>Меню</MenuHeader>
                            {projectsComponents}
                        </Col>
                        <Col md={9}>{selected && <Project project={selectedProject} vote={this.voteProject} />}</Col>
                    </Row>
                </Container>
            )
        }
    },
)

export default Voting
