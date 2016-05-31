'use strict';
var React = require("react");
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ProfileInfo = React.createClass({
    getInitialState: function() {
        return { mode: 'read' };
    },
    componentDidUpdate: function(){
        switch(this.props.loading){
            case true:
                $(this.refs._panel).mask();
                break;
            case false:
                $(this.refs._panel).unmask();
                break;
        }
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    handleModeChange: function(){
        if(this.state.mode == 'read') {
            this.setState({profileEdit: JSON.parse(JSON.stringify(this.props.profile))});
            this.setState({mode: 'edit'});
        } else {
            this.setState({mode: 'read'});
        }
    },
    handleOnChange: function(event){
        this.state.profileEdit[event.target.name] = event.target.value;
        this.forceUpdate();
    },
    handleSave:function(){
        if(this.props.handleSave != null) {
            this.props.handleSave(this.state.profileEdit);
        }
        this.handleModeChange();
    },
    render: function(){
        return (
            <div ref="_panel" className="panel panel-default ch-profileinfo-panel">
            <div className="panel-heading">Profile info<a onClick={this.handleModeChange} className="glyphicon glyphicon-edit pull-right"></a></div>
            <div className="panel-body">
                {
                    this.state.mode == 'edit' ?
                    (<div className="row">
                        <div className="col-lg-4">
                            <div className="input-group form-group">
                                <span className="input-group-addon">Full Name:</span>
                                <span className="form-control" disabled="disabled">{this.state.profileEdit.firstName} {this.state.profileEdit.lastName}</span>
                            </div>
                            <div className="input-group form-group">
                                <span className="input-group-addon">Email:</span>
                                <span className="form-control" disabled="disabled">{this.props.user.email}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-group form-group">
                                <span className="input-group-addon">First Name:</span>
                                <input type="text" name="firstName" className="form-control" value={this.state.profileEdit.firstName} onChange={this.handleOnChange}/>
                            </div>
                            <div className="input-group form-group">
                                <span className="input-group-addon">Last Name:</span>
                                <input type="text" name="lastName" className="form-control" value={this.state.profileEdit.lastName} onChange={this.handleOnChange}/>
                            </div>
                        </div>
                    </div>
                    )
                :
                    (<div className="row">
                        <div className="col-lg-4">
                            <div className="input-group form-group">
                                <span className="input-group-addon">Full Name:</span>
                                <span className="form-control" disabled="disabled">{this.props.profile.fullName}</span>
                            </div>
                            <div className="input-group form-group">
                                <span className="input-group-addon">Email:</span>
                                <span className="form-control" disabled="disabled">{this.props.user.email}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-group form-group">
                                <span className="input-group-addon">First Name:</span>
                                <span className="form-control" disabled="disabled">{this.props.profile.firstName}</span>
                            </div>
                            <div className="input-group form-group">
                                <span className="input-group-addon">Last Name:</span>
                                <span className="form-control" disabled="disabled">{this.props.profile.lastName}</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
                {
                    this.state.mode == 'edit' ?
                        (<div className="panel-footer clearfix">
                            <div class="pull-right btn-toolbar">
                                <button type="button" onClick={this.handleSave} className="btn btn-sm btn-primary">Save</button>
                                <button type="button" onClick={this.handleModeChange} className="btn btn-sm btn-default">Cancel</button>
                            </div>
                        </div>)
                    : ('')
                }
        </div>);
    }
});

module.exports = ProfileInfo;


