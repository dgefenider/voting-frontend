import React, {Component} from 'react'
import {Container, Row, Col, Button} from 'reactstrap'
import styled from 'styled-components'
import StarRatingComponent from 'react-star-rating-component'

const ContentCol = styled(Col)`
    position: relative;
    display: block;
    padding: 0.4em 0.4em 0.4em 0.8em;
    background: #d3d4da;
    color: #444;
    text-decoration: none;
    transition: all 0.3s ease-out;
    word-break: break-word;
`

const TitleRow = styled(Row)`
    margin-top: 15px;
    margin-bottom: 15px;
    word-break: break-word;
`

class Project extends Component {
    constructor(props) {
        super(props)
        if (props.project.votings.length > 0) {
            const {idea, realization, art, mechanics} = this.props.project.votings[0]
            this.state = {
                idea,
                realization,
                art,
                mechanics,
                voted: true,
            }
        } else {
            this.state = {
                idea: 0,
                realization: 0,
                art: 0,
                mechanics: 0,
                voted: false,
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.project.votings.length > 0) {
            const {idea, realization, art, mechanics} = nextProps.project.votings[0]
            this.setState({
                idea,
                realization,
                art,
                mechanics,
                voted: true,
            })
        } else {
            this.setState({
                idea: 0,
                realization: 0,
                art: 0,
                mechanics: 0,
                voted: false,
            })
        }
    }
    starClick = (nextValue, prevValue, name) => {
        let starObject = {}
        starObject[name] = nextValue
        this.setState(starObject)
    }
    render() {
        const {id, name, participant1, participant2, participant3, description, votings} = this.props.project
        const {idea, realization, art, mechanics, voted} = this.state
        return (
            <Container fluid>
                <TitleRow>
                    <h1>Проект {name}</h1>
                </TitleRow>
                <Row>
                    <Col md={2}>Описание проекта:</Col>
                    <ContentCol md={10}>{description}</ContentCol>
                </Row>
                <Row>
                    <Col md={2}>Участник 1:</Col>
                    <ContentCol md={10}>{participant1}</ContentCol>
                </Row>
                <Row>
                    <Col md={2}>Участник 2:</Col>
                    <ContentCol md={10}>{participant2}</ContentCol>
                </Row>
                <Row>
                    <Col md={2}>Участник 3:</Col>
                    <ContentCol md={10}>{participant3}</ContentCol>
                </Row>
                <TitleRow>
                    <h3>Оценка</h3>
                </TitleRow>
                <Row>
                    <Col md={4}>Идея</Col>
                    <Col md={8}>
                        <StarRatingComponent name="idea" value={idea} starCount={5} onStarClick={this.starClick} />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>Техническая реализация</Col>
                    <Col md={8}>
                        <StarRatingComponent
                            name="realization"
                            value={realization}
                            starCount={5}
                            onStarClick={this.starClick}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>Художественное исполнение</Col>
                    <Col md={8}>
                        <StarRatingComponent name="art" value={art} starCount={5} onStarClick={this.starClick} />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>Механика и взаимодействие</Col>
                    <Col md={8}>
                        <StarRatingComponent
                            name="mechanics"
                            value={mechanics}
                            starCount={5}
                            onStarClick={this.starClick}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        {!voted && (
                            <Button
                                color="primary"
                                block
                                onClick={() => {
                                    this.props.vote(id, {realization, art, mechanics, idea})
                                }}
                            >
                                Оценить
                            </Button>
                        )}
                        {voted && <h3>Вы оценили проект!</h3>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Project
