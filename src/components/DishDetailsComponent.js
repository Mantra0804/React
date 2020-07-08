import React  from 'react';
import { Card,CardBody,CardImg,CardText,CardTitle } from 'reactstrap';

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
                                <RenderComments comments={dish.comments}/>
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