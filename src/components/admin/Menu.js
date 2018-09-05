import React, {Component} from 'react'
import {Row, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    width: 100%;
    margin-bottom: 15px;
`

class Menu extends Component {
    render() {
        return (
            <div>
                <Row>
                    <StyledLink to="/admin/projects">
                        <Button color="info" block>
                            Проекты
                        </Button>
                    </StyledLink>
                </Row>
                <Row>
                    <StyledLink to="/admin/users">
                        <Button color="warning" block>
                            Пользователи
                        </Button>
                    </StyledLink>
                </Row>
            </div>
        )
    }
}

export default Menu
