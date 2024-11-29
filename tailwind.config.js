module.exports = {
    content: [
        "./views/**/*.ejs",
        "./public/js/**/*.js", // Si vous avez du JavaScript qui utilise Tailwind
    ],
    theme: {
        extend: {
            colors: {
                'custom-red': '#d8a2a2', 
            },
        },
    },
    plugins: [],
};
