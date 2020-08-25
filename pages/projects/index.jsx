import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const Projects = () => (
    <div>
        <Head>
            <title>My Projects</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Projects I work on." />
        </Head>
        <DefaultLayout>
            <h1 className="center noselect"><a>My Projects</a></h1>
            <hr />
            <div className="center noselect">
                <p><a href="https://premid.app/">Working in PreMiD as an Engineer.</a></p>
                <p><a href="https://short.pxseu.com/">Simple Url shrinker</a></p>            
                <p><a href="https://cdn.pxseu.com/">Simple File uploader</a></p>   
                <p><a href="https://dash.pxseu.com/">Dasboard for my apps</a></p>  
                <p><a href="https://github.com/pxseu/pxseu.com">This website</a></p>         
                <p><a href="https://github.com/pxseu/ZeroTwoBot">Discord Bot</a></p>            
            </div>
        </DefaultLayout>
    </div>       
)

export default Projects