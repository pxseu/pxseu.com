import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const Yiff = () => (
    <DefaultLayout>
        <Head>
            <title>Yiff</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Yiff" />
        </Head>
    
        <h1 className="center noselect"><a>You are disgusting</a></h1>
        <hr />
        <div className="center noselect">
            <p>Bro please get some help.</p>
            <p>fr fr fr</p>
            <p>This is not okay.</p>
        </div>
    </DefaultLayout>    
)

export default Yiff