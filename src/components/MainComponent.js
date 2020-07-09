import React, { Component } from 'react';
import DishDetails  from './DishDetailsComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactCompnent';
import Footer from './FooterComponent';
import Home from './HomeComponet';
import {Switch,Route,Redirect} from 'react-router-dom';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';


class Main  extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes : DISHES,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS
          };
  }
 

render(){
  
  const HomePage = () =>{
    return(
      <Home  dish={this.state.dishes.filter((dish)=> dish.featured === true)[0]}
            promotion={this.state.promotions.filter((promo)=> promo.featured === true)[0]}
            leader={this.state.leaders.filter((leader)=> leader.featured === true)[0]}
      />
    )
  }
   const DishWithId=({match}) =>{
     return(
      <DishDetails dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                   comments={this.state.comments.filter((comments)=> comments.dishId === parseInt(match.params.dishId,10))}
      />
     );
   
   }
  
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} /> }/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route exact path="/contactus" component={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
    
  );
 }
}

export default Main;
