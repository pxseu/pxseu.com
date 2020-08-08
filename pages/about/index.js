import Head from 'next/head'

export default function About() {
    return (
        <div className="app">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=0.8" />
                <title>About Me</title>
                <meta data-n-head="ssr" data-hid="theme-color" name="theme-color" content="#6ab04c" />
                <meta data-n-head="ssr" data-hid="og:site_name" property="og:site_name" content="pxseu.com" />
                <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="pxseu.com" />
                <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="About me." />
                <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://pxseu.com/essential/media/icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="favicon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/essential/css/common.css" />
                <script src="/essential/js/script.js" defer></script>
            </Head>
            <h1 className="center"><a>About Me</a></h1>
            <hr />
            <div className="center">
                <p>Full Stack and Back End developer.</p>
                <p>Javascript lover.</p>
                <p>Always up for a new challange.</p>
                <p>16 years old.</p>
                <p>Loves anime</p>
                <p>and his girlfriend.</p>
            </div>
            <div className="center">
                <p><a href="https://github.com/pxseu">Github</a></p>
                <p><a href="https://twitter.com/pxseu">Twitter</a></p>            
                <p><a href="mailto:me@pxseu.com">Email</a></p>            
            </div>
            <div className="center back">
                <p><a href="/">Go Back</a></p>
            </div>
        </div>
    )
}