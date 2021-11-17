module.exports = {
    mode: 'production',
    entry: {
        css: './public/js/css-version.js',
        gsap: './public/js/gsap.js',
        worker_dom: './public/js/worker-dom.js',
    },
    output: {
        filename: '[name].bundle.js',
    }
};