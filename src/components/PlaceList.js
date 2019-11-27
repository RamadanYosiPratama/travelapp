import React, { Component } from 'react';
import Place from './Place';
import Title from './Title';
import {PlaceConsumer} from '../Context';

class PlaceList extends Component {
    render() {
        
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Wisata Kalimantan Barat" title="Dayak Culture"/>
                        <div className="row">
                            <PlaceConsumer>
                                {value => {
                                    return value.places.map(place=> {
                                        return <Place key={place.id} place={place}/>
                                    })
                                    
                                }}
                            </PlaceConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>

            // <div>
            //     <Product/>
            // </div>
        );
    }
}

export default PlaceList;