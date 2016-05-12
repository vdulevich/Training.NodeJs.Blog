var React = require("react");

var DialogComponent = React.createClass({
    componentDidMount:function() {
        var dialog = $(this.refs._modal);
        dialog.on('show.bs.modal', this.handelDialogShow);
        dialog.on('shown.bs.modal', this.handelDialogShown);
        dialog.on('hidden.bs.modal', this.handelDialogHidden);
    },
    handelDialogResult: function(){
        if(this.props.onDialogResult) {
            this.props.onDialogResult('success');
        }
    },
    handelDialogShow:function(e){
        if(this.props.onDialogShow) {
            this.props.onDialogShow();
        }
    },
    handelDialogShown:function(e){
        if(this.props.onDialogShown) {
            this.props.onDialogShown();
        }
    },
    handelDialogHidden: function(e){
        if(this.props.onDialogHidden) {
            this.props.onDialogHidden(e);
        }
    },
    mask:function(){
        return $(this.refs._modalcontent).mask();
    },
    unmask:function(){
        return $(this.refs._modalcontent).unmask();
    },
    modal: function(){
        $(this.refs._modal).modal();
    },
    hide: function(){
        $(this.refs._modal).modal('hide');
    },
    render: function() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="loginLabel" ref="_modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" ref="_modalcontent">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="loginLabel">Login</h4>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <input onClick={this.handelDialogResult} className="btn btn-lg btn-success btn-block" value="Login" type="button"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DialogComponent;

