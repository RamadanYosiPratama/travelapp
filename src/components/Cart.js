import React, { Component } from 'react';
import Title from './Title';
import CartColumn from './CartColumn';
import EmptyCart from './EmptyCart';
import {PlaceConsumer} from '../Context';
import CartList from './CartList';
import CartTotal from './CartTotal';

class Cart extends Component {
    render() {
        return (
            <section>
                <PlaceConsumer>
                    {value => {
                        const {cart} = value;
                        if(cart.length>0){
                            return (
                                <React.Fragment>
                                    <Title name="your" title="cart"/>
                                    <CartColumn/>
                                    <CartList value={value}/>
                                    <CartTotal value={value}/>
                                </React.Fragment>
                            );
                        }else{
                            return (<EmptyCart/>);
                        }
                    }}
                </PlaceConsumer> 
            </section>
            
        );
    }
}

export default Cart;