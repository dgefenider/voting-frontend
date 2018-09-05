import React, {Component} from 'react'
import {Row} from 'reactstrap'
import styled from 'styled-components'

const ProjectRow = styled(Row)`
    word-break: break-word;
    cursor: pointer;
    text-align: center;
    border: 1px solid;
    padding: 5px 5px;
    margin-bottom: 10px;
    background: ${props => (props.voted === 'true' ? 'green' : 'white')}

    &:hover {
        background: red;
    }
`

class ProjectsItem extends Component {
    render() {
        const {name, id, votings} = this.props.project
        const voted = votings.length > 0
        return (
            <ProjectRow
                onClick={() => {
                    this.props.onSelect(id)
                }}
                voted={voted.toString()}
            >
                {name}
            </ProjectRow>
        )
    }
}

export default ProjectsItem
