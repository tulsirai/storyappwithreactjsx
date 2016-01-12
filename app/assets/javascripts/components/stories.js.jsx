//stories.js.jsx

var Stories = React.createClass({
	getInitialState: function(){
		return{
			stories: this.props.stories,
			categories: this.props.categories
		}
	},

	handleCategoryClick: function(category, e){
	  	var self = this;
	  	$.getJSON('/all_stories.json', function(allStories){
	  		self.setState({stories: allStories});
	  		var categoryStories = _.where(self.state.stories, { 'category_id' : category.id})
	  		self.setState({ stories: categoryStories.slice(0,26) });
	  	}.bind(this));
	},

	addRecord: function(story){
		var records = React.addons.update(this.state.stories, { $unshift: [story] })
		if(records.length > 25){
			records.pop();
		}
		this.setState({ stories: records });
	},

	deleteRecord: function(story){
		var index = this.state.stories.indexOf(story);
		var records = React.addons.update(this.state.stories, { $splice: [[index, 1]] });
		this.setState({ stories: records });
	},

	render: function(){
    var self = this;
    return (
      <div className="container">
      	<button className="btn btn-primary" id="submit_scary_story">Submit your scary story</button>
      	<br />
      	<StoryForm handleNewRecord={ this.addRecord } />
      	<br />
        <div className="row">
          <div className="col-md-8 col-sm-12">
            { this.state.stories.map(function(story){
              return (
                <Story key={ story.id } 
                       story={ story } 
                       handleDeleteRecord={ self.deleteRecord } />
              )
            })}
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading text-center">Categories</div>
              <ul className="list-group">
				  { this.state.categories.map(function(category){
				    return (
				      <Category key={ category.id }
				        category={ category }
				        handleAllCategories={ self.handleCategoryClick } /> //adding this line
				    )
				  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

