import React, { Component } from 'react';
import {storePlace, detailPlace} from './data';

const PlaceContext = React.createContext();

class PlaceProvider extends Component {
    state={
        places:[],
        detailPlace:detailPlace,
        cart : [],
        modalOpen : false,
        modalPlace : detailPlace,
        cartSubtotal : 0,
        cartTax : 0,
        cartTotal : 0
    }

    componentDidMount(){
        this.setPlace();
    }

    setPlace = () => {
        let tempPlaces = [];
        storePlace.forEach(item => {
            const singleItem = {...item};
            tempPlaces = [...tempPlaces, singleItem];
        });
        this.setState(() => {
            return {places:tempPlaces};
        });
        
    }

    getItem = id => {
        const place = this.state.places.find(item=> item.id === id);
        return place;
    }

    handleDetail = id => {
        const place = this.getItem(id);
        this.setState(() => {
            return {detailPlace:place}
        })
        
    }
    addToCart = id => {
        let tempPlaces = [...this.state.places];
        const index = tempPlaces.indexOf(this.getItem(id));
        const place = tempPlaces[index];
        place.inCart = true;
        place.count = 1;
        const price = place.price;
        place.total = price;
        this.setState(()=>{
            return {places:tempPlaces, cart:[...this.state.cart,place]};
        },
        () => {
            this.addTotals();
        }
        )
    }
    openModal = id => {
        const place = this.getItem(id);
        this.setState(()=>{
            return {modalPlace:place, modalOpen:true}
        })
    }
    closeModal = id =>{
        this.setState(()=>{
            return {modalOpen:false}
        })
        
    }
    increase = id => {
        let tempCart = [...this.state.cart];
        const selectedPlace = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedPlace);
        const place = tempCart[index];

        place.count = place.count + 1;
        place.total = place.count * place.price;

        this.setState(()=>{
            return {cart:[...tempCart]}
        },
        ()=>{
            this.addTotals()
        })
        
    }
    decrease = id => {
        let tempCart = [...this.state.cart];
        const selectedPlace = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedPlace);
        const place = tempCart[index];

        place.count = place.count - 1;
        if(place.count===0){
            this.removeItem(id);
        }else{
            place.total = place.count * place.price;
            this.setState(()=>{
                return {cart:[...tempCart]}
            },
            ()=>{
                this.addTotals()
            })
        }
    }
    removeItem = id => {
        let tempPlaces = [...this.state.places];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempPlaces.indexOf(this.getItem(id));
        let removePlace = tempPlaces[index];
        removePlace.inCart = false ;
        removePlace.count = 0 ;
        removePlace.total = 0 ;

        this.setState(()=>{
            return {
                cart : [...tempCart],
                places: [...tempPlaces]
            };
        },() => {
            this.addTotals();
        })

        
    }
    clearCart = () => {
        this.setState(()=>{
            return {cart:[]};
        },()=> {
            this.setPlace();
            this.addTotals();
        });
        
    }
    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total));
        const tempTax = subtotal *0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax ;
        this.setState(()=> {
            return {
                cartSubtotal : subtotal,
                cartTax : tax,
                cartTotal : total
            }
        })
    }
    render() {
        return (
            <PlaceContext.Provider value={{...this.state, handleDetail:this.handleDetail, addToCart:this.addToCart, openModal:this.openModal, closeModal:this.closeModal,
                increase: this.increase,
                decrease : this.decrease,
                removeItem : this.removeItem,
                clearCart : this.clearCart
            }}>
                {this.props.children}
            </PlaceContext.Provider>
        );
    }
}

const PlaceConsumer = PlaceContext.Consumer;

export {PlaceProvider,PlaceConsumer};