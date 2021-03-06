var Story = React.createClass({
	getInitialState: function() {
	  return {
	    storyLink: '/stories/' + this.props.story.id,
	    upvotes: this.props.story.cached_votes_up,
	    downvotes: this.props.story.cached_votes_down,
	    categoryName: '',
	    userName: '',
	    commentCount: ''
	  };
	},

	componentDidMount: function(){
		$.getJSON('/stories/' + this.props.story.id + '/category.json', function(storyCategoryData){
			if(this.isMounted()){
				this.setState({
					categoryName: storyCategoryData.name
				})
			}
		}.bind(this));

		$.getJSON('/stories/' + this.props.story.id + '/user.json', function(storyUserData){
			if(this.isMounted()){
				this.setState({
					userName: storyUserData.name	
				})				
			}
		}.bind(this));

		$.getJSON('/stories/' + this.props.story.id + '/comments.json', function(storyUserData){
			if(this.isMounted()){
				this.setState({
					commentCount: storyUserData.length	
				})				
			}
		}.bind(this));
	},

	handleUpvote: function(e){
	  e.preventDefault();
	  $.ajax({
	    method: 'PUT',
	    url: '/stories/' + this.props.story.id + '/like',
	    success: function(e){
	      this.setState({
	        upvotes: e.cached_votes_up,
	        downvotes: e.cached_votes_down
	      })
	    }.bind(this)
	  })
	},

	handleDownvote: function(e){
	  e.preventDefault();
	  $.ajax({
	    method: 'PUT',
	    url: '/stories/' + this.props.story.id + '/dislike',
	    success: function(e){
	      this.setState({
	        downvotes: e.cached_votes_down,
	        upvotes: e.cached_votes_up
	      })
	    }.bind(this)
	  })
	},

	handleDelete: function(e){
	  e.preventDefault();
	  $.ajax({
	    method: 'DELETE',
	    url: '/stories/' + this.props.story.id,
	    dataType: 'JSON',
	    success: function(){
	      this.props.handleDeleteRecord(this.props.story)
	    }.bind(this)
	  })
	},

	render: function(){
	  return (
	    <div className="well">
	      { this.props.story.body }
	      <br />
	      <br />
	      <a className="btn btn-warning btn-xs"
	         onClick={ this.handleUpvote }>That scared me</a>
	      <span className="text-warning"> ({ this.state.upvotes })</span>
	      <a className="btn btn-success btn-xs"
	         onClick={ this.handleDownvote }>You Wimp!</a>
	     <span className="text-success"> ({ this.state.downvotes })</span>
	      <a className="btn btn-link btn-xs"
	         href={ this.state.storyLink }>Comments
	      </a>
	      <small><em>({ this.state.commentCount })</em></small>
	      <a className="btn btn-danger btn-xs"
         		onClick={ this.handleDelete }>Delete
          </a>
	      <span className="text-muted pull-right"><small>Created by { this.state.userName }</small></span>
	      <br />
	      <span className="text-muted pull-right"><small>Category: { this.state.categoryName }</small></span>
	    </div>
	  )
	}
})