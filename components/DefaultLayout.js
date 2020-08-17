import Link from 'next/link'
import Head from 'next/head'
import BackgroundLoader from './BackgroundLoader'

const DefaultLayout = (props) => (
    <BackgroundLoader>
        <Head>
            <link rel="stylesheet" href="/essential/css/common.css" />
        </Head>
        <div className="app">
            { props.children }
            <div className="center back">
                <p><Link href="/"><a className="noselect">Go Back</a></Link></p>
            </div>
        </div>
    </BackgroundLoader> 
)

export default DefaultLayout