module.exports = () => {
    const path = 'assets/';
    return {
        'document_root': 'http://my_portfolio',
        'js': {
            'app': `${path}app/js/**/*.js`,
            'ignore': `${path}app/js/vendor/**/*.js`,
            'dist': `${path}dist/js/`,
            'bundled': 'bundle.js'
        },
        'css': {
            'app': `${path}app/css/**/*.scss`,
            'dist': `${path}dist/css/`
        },
        'img': {
            'app': `${path}app/img/**/*.+(png|jpg|gif|svg)`,
            'dist': `${path}dist/img/`
        },
        'html': {
            'app': `${path}app/template.php`,
            'dist': ''
        },
        'fonts': {
            'app': `${path}app/fonts/**/*`,
            'dist': `${path}dist/fonts/`
        } 
    };
};