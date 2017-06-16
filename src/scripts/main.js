import React from 'react';
import ReactDOM from 'react-dom';

var CARS = [];
var imageURL = "http://localhost:8888/images/";



class Card extends React.Component {
    render() {
        return (
            <section className="card">
                <figure>
                <img src={imageURL + this.props.car.image} alt={this.props.car.Name}></img>
                    <article>
                    <ul>
                        <li>{this.props.car.name}</li>
                        <li>Top Speed: {this.props.car.top_speed} MPH</li>
                        <li>Zero to Sixty: {this.props.car.zero_to_sixty}</li>
                        <li>Power: {this.props.car.power}</li>
                        <li>Weight: {this.props.car.weight}</li>
                    </ul>
                    </article>
                </figure>
            </section>
        );
    }
}

class Deck extends React.Component {
    render() {
        var cards = [];
        this.props.cars.forEach(function(car) {
        cards.push(<Card car={car} />);
        });
    return (<div>{cards}</div>);    
    }
}

            
class Sort extends React.Component {
            
    sortDeck(field){
        this.props.sortDeckStateBy(field, this.props.cars, this.props.direction);
    }
            
    render() {
    return (
        <div className="sort-section">
        <h2>Sort by</h2>
        <div className="btn" onClick={this.sortDeck.bind(this,'name')} >Name</div>
        <div className="btn" onClick={this.sortDeck.bind(this,'top_speed')} >Top Speed</div>
        <div className="btn" onClick={this.sortDeck.bind(this,'zero_to_sixty')} >Zero to Sixty</div>
        <div className="btn" onClick={this.sortDeck.bind(this,'power')} >Power</div>
        <div className="btn" onClick={this.sortDeck.bind(this,'weight')} >Weight</div>
        </div>
    )
    }
}
                            
                            
class SortableCarTable extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { 'cars': this.props.cars, 'direction': 1 };
        this.sortDeckStateBy = this.sortDeckStateBy.bind(this); 
    }; 

sortDeckStateBy(field, cars, direction){

    cars.sort( (a, b) => { 
        if (a[field] > b[field]) { return -direction; } 
        if (a[field] < b[field]) { return direction; } return 0; 
    })
    console.log(cars);
    this.setState({'cars': cars, 'direction': -direction});
};
      
    render() {   
        return (
        <div>
        <Sort direction={this.state.direction} cars={this.props.cars} sortDeckStateBy={this.sortDeckStateBy}/>        
        <img src="/src/images/banner.jpg" id="banner"></img>
        <Deck cars={this.state.cars}/>
        </div>
        );
    }
}  
    
class LoadCars extends React.Component {
    constructor(props) {

        super(props);
        var ajax = new XMLHttpRequest();
        var temp = [];
        ajax.onload = parse;
        ajax.onerror = error;

        ajax.open("GET", "http://localhost:8888/supercars", false);
        ajax.send();
        function parse() {

        console.log(this); // log the response
        if (this.status == 200) { // request succeeded
            CARS = JSON.parse(this.responseText);
            console.log(CARS); //for testing 
        } 
        }
        function error(e) {
            console.log(this);
            console.error(e);
        } 
    }; 

    render() {   
        return (
            <div>
            <SortableCarTable cars={CARS} />
            </div>
        );
    }
}    
    
                            
ReactDOM.render(
    <LoadCars/>,
    document.getElementById('app')
);