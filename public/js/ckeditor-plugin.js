CKEDITOR.plugins.add( 'savecancel', {
    init: function(editor) {

        editor.ui.addToolbarGroup('save');
        editor.ui.addToolbarGroup('cancel');

        var save = editor.ui.addButton( 'Save', {
            label: 'Save',
            command: 'save',
            toolbar: 'save,0'
        });

        var cancel = editor.ui.addButton( 'Cancel', {
            label: 'Cancel',
            command: 'cancel',
            toolbar: 'cancel,0'
        });

        editor.addCommand( 'save', {
            exec: function(editor) {
                editor.fire('save');
            }
        });

        editor.addCommand( 'cancel', {
            exec: function(editor) {
                editor.fire('cancel');
            }
        });
    }
});