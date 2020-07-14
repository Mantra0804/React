import React ,{Component} from 'react';
import { Card,CardBody,CardImg,CardText,CardTitle ,Breadcrumb,BreadcrumbItem,Modal,Button,ModalBody,ModalHeader,
            Row,Col,Label} from 'reactstrap';
import {Link} from 'react-router-dom';

import {Errors,Control,LocalForm} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state ={
            isNavOpen :false,
            
            isModalOpen:false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    };

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.yourname,values.comment)
        
    }

    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen
        })
    }
    
    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil"> Submit Comment</span>
        </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                           <Row className="form-group">
                           <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row> 
                         
                          <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" value="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
            </Modal>     
            </div>        
        );
    }

}

function DishDetails (props){
    

   function RenderComments({comments}){
        if(comments!=null){
        return(
            
           comments.map(comment=>
            <div>
                <ul key={comment.id} className="list-unstyled">
                    <li>
                        <p>{comment.comment}</p>
                    <p>-- {comment.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                </ul>
            </div>    
            
            )
            
            
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    
        const dish=props.dish;
        
            if (dish != null){
                 
               return(     
                   <div className="container">
                       <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                     <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div>
            </div>
                        <div className="row">
                        <div className="col-12 col-md-5 m-1">
                        <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name} />  
                                <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                            <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComments comments={props.comments}/>
                                <CommentForm  dishId={dish.id} addComment={props.addComment}/>
                            </div>
                            </div>
                     </div>  
                     );
            }
            else{
                return(
                    <div></div>
                );

            }   
            
     
            
     
        
    
}
export default DishDetails;