// story_form.js.jsx
var StoryForm = React.createClass({
  getInitialState: function(){
    return {
      body: '',
      category_id: 1
    }
  },

  handleBodyChange: function(e){
    var name = e.target.name;
    var nextState = {};
    nextState[name] = e.target.value; 
    this.setState(nextState);
  },

  handleCategoryChange: function(e){
    var name = e.target.name;
    var nextState = {};
    nextState[name] = e.target.value;
    this.setState(nextState);
  },

  handleSubmit: function(e){
    var self = this;
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/stories',
      data: { story: this.state },
      success: function(data){
        self.setState(self.getInitialState());
        self.props.handleNewRecord(data);
      }.bind(this)
    })
  },

  render: function(){
    return (
      <form className="new_story"
            id="new_story"
            onSubmit={ this.handleSubmit } >
        <div className="form-group">
          <label>Tell us your scary story</label>
          <textarea className="form-control"
                    id="story_body"
                    name="body"
                    value={ this.state.body}
                    onChange={ this.handleBodyChange } /> 
        </div>
        <div className="form-group">
          <div className="form-group">
            <label>Category</label>
            <select className="form-control"
                    id="select"
                    name="category_id"
                    value={ this.state.category_id }
                    onChange={ this.handleCategoryChange } > 
              <option value="1">Ghost</option>
              <option value="2">Witch</option>
              <option value="3">Monster</option>
              <option value="4">Stalker</option>
              <option value="5">Night</option>
              <option value="6">Children</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary"
                type="submit">Create</button>
      </form>
    )
  }
})