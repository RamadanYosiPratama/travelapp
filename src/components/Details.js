import React, { Component } from 'react';
import {PlaceConsumer} from '../Context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

class Details extends Component {
    render() {
        return (
            <PlaceConsumer>
                {value => {
                    const {id, company, img, info, price, title, inCart} =  value.detailPlace;
                return (
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3 text-center">
                                <img src={img} className="img-fluid" alt="Product" />
                            </div>
                            <div className="col-10 mx-auto text-center text-slanted text-capitalize text-blue my-5">
                                <h1>Model : {title}</h1> 
                            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by :
                            <span className="text-uppercase">
                                {company}
                            </span>
                            </h4>
                            <h4 className="text-blue"><strong>
                                price : <span>Rp.
                                </span>
                                {price}
                            </strong>
                            </h4>
                            <p className="text-capitalize font-weight-bold mt-3 mb-0">Some Info about Place : </p>
                            <p className="text-muted lead">{info}</p>
                            <div>
                            <Link to="/">
                                <ButtonContainer className="mr-3">Back To Place</ButtonContainer>
                            </Link>
                            <ButtonContainer
                            cart
                                disabled = {inCart?true:false}
                                onClick={() => {
                                    value.addToCart(id);
                                    value.openModal(id);
                                }}
                                >
                                {inCart?"in cart":"add To Cart"}
                            </ButtonContainer>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                )
               }}

            </PlaceConsumer>
        );
    }
}

export default Details;