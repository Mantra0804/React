import React, { Component } from 'react';
import DishDetails  from './DishDetailsComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Home from './HomeComponet';
import About from './AboutComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {  postFeedback,postComment ,fetchDishes,fetchComments,fetchPromos,fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments : () =>{dispatch(fetchComments())},
  fetchPromos : () =>{dispatch(fetchPromos())},
  fetchLeaders : () =>{dispatch(fetchLeaders())},
  postFeedback : (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))

});

  


class Main  extends Component {

  constructor(props){
    super(props);

    
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  } 
 

render(){
  
  const HomePage = () =>{
    return(
      <Home  dish={this.props.dishes.dishes.filter((dish)=> dish.featured === true)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo)=> promo.featured === true)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader)=> leader.featured === true)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
      />
    )
  }
   const DishWithId=({match}) =>{
     return(
      <DishDetails dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                   comments={this.props.comments.comments.filter((comments)=> comments.dishId === parseInt(match.params.dishId,10))}
                   postComment={this.props.postComment}
                   commentsErrMess={this.props.comments.errMess}
                   isLoading={this.props.dishes.isLoading}
                   errMess={this.props.dishes.errMess}
            
                  
      />
     );
   
   }
  
  return (
    <div>
      <Header/>
      <TransitionGroup>
      <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
      <Switch location={this.props.location}>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} /> }/>
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
        <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm= {this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
        <Redirect to="/home"/>
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer/>
    </div>
    
  );
 }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
