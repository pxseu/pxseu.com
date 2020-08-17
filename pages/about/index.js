import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const About = () => (
    <div>
        <Head>
            <title>About Me</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="About me." />
        </Head>
        <DefaultLayout>
            <h1 className="center noselect"><a>About Me</a></h1>
            <hr />
            <div className="center noselect">
                <p>Full Stack and Back End developer.</p>
                <p>Javascript lover.</p>
                <p>Always up for a new challange.</p>
                <p>16 years old.</p>
                <p>Loves anime</p>
                <p>and his girlfriend.</p>
            </div>
            <div className="center">
                <p><a className="noselect" href="https://github.com/pxseu">Github</a></p>
                <p><a className="noselect" href="https://twitter.com/pxseu">Twitter</a></p>            
                <p><a className="noselect" href="mailto:me@pxseu.com">Email</a></p>            
            </div>   
        </DefaultLayout>   
    </div> 
)

export default About