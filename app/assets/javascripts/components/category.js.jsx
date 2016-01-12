
var Category = React.createClass({
  getInitialState: function(){
    return {
      name: ''
    }
  },

  handleLinkClick: function(e){
  	this.props.handleAllCategories(this.props.category);
  },

  render: function(){
    return (
      <li className="list-group-item">
        <a href={'#' + this.props.category.name } 
        	onClick={ this.handleLinkClick }>{ this.props.category.name }</a>
      </li>
    )
  }
})