import React from 'react';
import {Row,Col,Well,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions';
class BookItem extends React.Component{
  handleCart(){
    const book = [...this.props.cart,{
      _id:this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      quantity: 1
    }]
    if(this.props.cart.length>0){
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id == _id
      })
      if(cartIndex == -1){
        this.props.addToCart(book);
      }
      else{
        this.props.updateCart(_id,1);
      }
    }
    else{
      this.props.addToCart(book)
    }

  }
  render(){
    return(
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <h6>{this.props.description}</h6>
            <h6>{this.props.price}</h6>
            <Button onClick = {this.handleCart.bind(this)} bsStyle = 'primary'>Buy Now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return {
    cart: state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
      addToCart: addToCart,
      updateCart: updateCart
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem)
