const PROXY_CONFIG = [
    {
        context: [
            '/api',
            '/heroes'
        ],
        target: "https://overfast-api.tekrop.fr/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG