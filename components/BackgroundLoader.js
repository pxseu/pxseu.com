import Head from 'next/head'
import Particles from 'react-particles-js';

const BackgroundLoader = (props) => (
    <div>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="description" content="Pxseu's website!" />
            <meta name="keywords" content="pxseu, poseuxck" />
            <meta name="author" content="pxseu" />
            <link rel="shortcut" href="/favicon.ico" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="favicon" href="/favicon.ico" />
            <meta data-n-head="ssr" data-hid="theme-color" name="theme-color" content="#6ab04c" />
            <meta data-n-head="ssr" data-hid="og:site_name" property="og:site_name" content="pxseu.com" />
            <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="pxseu.com" />
            <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://www.pxseu.com/essential/media/icon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, minimal-ui" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            <script src="/essential/js/script.js" defer></script>

            <meta name="viewport" content="width=device-width, initial-scale=0.8" />
        </Head>
        { props.children }
        <style jsx global>{`
            body {
                background-color: black;
            }
        `}</style>
        <Particles className="particles-js" params={{
            "particles": {
                "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
                },
                "color": {
                "value": "#ffffff"
                },
                "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
                },
                "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
                },
                "size": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4.795204795204795,
                    "size_min": 0,
                    "sync": false
                }
                },
                "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
                },
                "move": {
                "enable": true,
                "speed": 4.734885849793636,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 600
                }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
                },
                "modes": {
                "grab": {
                    "distance": 100,
                    "line_linked": {
                    "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
                }
            },
            "retina_detect": true
        }}/>
    </div>
)

export default BackgroundLoader