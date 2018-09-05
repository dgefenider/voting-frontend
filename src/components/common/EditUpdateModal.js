import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

class EditUpdateModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.object,
        }
    }
    changeHandler = e => {
        let changed = {}
        changed[e.target.id] = {label: this.state[e.target.id].label, value: e.target.value}
        this.setState(changed)
    }
    render() {
        const {title, type, onDone, showModal, hideModal} = this.props
        let fields = []
        for (let key in this.state) {
            fields.push(
                <FormGroup key={key}>
                    <Label for={key}>{this.state[key].label}</Label>
                    <Input
                        type="text"
                        name={key}
                        id={key}
                        value={this.state[key].value}
                        onChange={this.changeHandler}
                    />
                </FormGroup>,
            )
        }
        return (
            <Modal isOpen={showModal} toggle={hideModal}>
                <ModalHeader toggle={hideModal}>{title}</ModalHeader>
                <ModalBody>
                    <Form>{fields}</Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            onDone(this.state)
                        }}
                    >
                        {type === 'create' ? 'Создать' : 'Сохранить'}
                    </Button>
                    <Button color="secondary" onClick={hideModal}>
                        Отмена
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default EditUpdateModal
