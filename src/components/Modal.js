import React, { Component } from 'react';
import {PlaceConsumer} from '../Context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

class Modal extends Component {
    render() {
        return (
            <PlaceConsumer>
                {(value)=>{
                    const {modalOpen,closeModal} = value;
                    const {img, title, price} = value.modalPlace;

                    if(!modalOpen){
                        return null;
                    }else{
                        return (
                        <ModalContainer>
                            <div className="container">
                                <div id="modal" className="col-8 mx-auto py-2 col-md-6 col-lg-4 text-center text-capitalize">
                                    <h5>Item add To the Cart</h5>
                                    <img src={img} className="img-fluid" alt="place"/>
                                    <h5>{title}</h5>
                                    <h5 className="text-muted">price : Rp. {price}</h5>
                                    <Link to="/" className="mr-3">
                                        <ButtonContainer onClick={()=> closeModal()}>
                                            Back Place
                                        </ButtonContainer>
                                    </Link>
                                    <Link to="/cart">
                                        <ButtonContainer cart onClick={()=> closeModal()}>
                                            Go To Cart
                                        </ButtonContainer>
                                    </Link>
                                </div>
                            </div>
                        </ModalContainer>
                        );
                    }
                }}

            </PlaceConsumer>
        );
    }
}

export default Modal;   

const ModalContainer = styled.div`
position : fixed;
top : 0;
left : 0;
right : 0;
bottom : 0; 
background : rgba(0,0,0,0.3);
display : flex;
align-items : center;
justify-content : center;
#modal{
    background : var(--mainWhite);
}
`;