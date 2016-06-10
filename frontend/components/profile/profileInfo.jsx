'use strict';
var React = require("react");
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ProfileInfo = React.createClass({
    getInitialState: function() {
        return {
            mode: 'read',
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            fullName: function(){
                return [this.state.firstName, this.state.lastName].join(' ')
            }.bind(this)
        };
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            firstName: nextProps.profile.firstName,
            lastName: nextProps.profile.lastName
        });
    },
    componentDidUpdate: function(){
        this.toggleMask();
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    toggleMask: function(){
        this.props.loading ? $(this.refs._panel).mask() : $(this.refs._panel).unmask();
    },
    toggleModeChange: function(){
        this.setState({mode: this.state.mode == 'read' ? 'edit' : 'read'});
    },
    handleOnChange: function(event){
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleSave:function(){
        if(this.props.handleSave != null) {
            var profileEdit = JSON.parse(JSON.stringify(this.props.profile));
            profileEdit.firstName = this.state.firstName;
            profileEdit.lastName = this.state.lastName;
            this.props.handleSave(profileEdit);
        }
        this.toggleModeChange();
    },
    render: function(){
        return (
            <div ref="_panel" className="panel panel-default ch-profileinfo-panel">
            <div className="panel-heading">Profile info<a onClick={this.toggleModeChange} className="glyphicon glyphicon-edit pull-right"></a></div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="input-group form-group">
                            <span className="input-group-addon">Full Name:</span>
                            <span className="form-control" disabled="disabled">{this.state.fullName()}</span>
                        </div>
                        <div className="input-group form-group">
                            <span className="input-group-addon">Email:</span>
                            <span className="form-control" disabled="disabled">{this.props.user.email}</span>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-group form-group">
                            <span className="input-group-addon">First Name:</span>
                            <input className="form-control" disabled={this.state.mode == 'read'} type="text" name="firstName" value={this.state.firstName} onChange={this.handleOnChange}/>
                        </div>
                        <div className="input-group form-group">
                            <span className="input-group-addon">Last Name:</span>
                            <input className="form-control" disabled={this.state.mode == 'read'} type="text" name="lastName" value={this.state.lastName} onChange={this.handleOnChange}/>
                        </div>
                    </div>
                </div>
            </div>
                {
                    this.state.mode == 'edit' ?
                        (<div className="panel-footer clearfix">
                            <div class="pull-right btn-toolbar">
                                <button type="button" onClick={this.handleSave} className="btn btn-sm btn-primary">Save</button>
                                <button type="button" onClick={this.toggleModeChange} className="btn btn-sm btn-default">Cancel</button>
                            </div>
                        </div>)
                    : ('')
                }
        </div>);
    }
});

module.exports = ProfileInfo;


