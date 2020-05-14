import React, { Fragment } from 'react';
import Modal from "../UI/Modal/Modal"

const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Fragment>
                <Modal>
                    Something didnt work
                </Modal>
            <WrappedComponent {...props} />
            </Fragment>
        )
    }
} 

export default withErrorHandler;