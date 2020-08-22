import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const HallOfFame = () => (
    <DefaultLayout>
        <Head>
            <title>Hall of fame</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Hall of fame" />
        </Head>
        <h1 className="center noselect"><a>These people helped with the reaion of the website</a></h1>
        <hr />
        <div className="center noselect">
            <p>Peitho | spell checking and corrections</p>
            <p>Vek | told me about security.txt</p>
        </div>  
    </DefaultLayout>    
)

export default HallOfFame