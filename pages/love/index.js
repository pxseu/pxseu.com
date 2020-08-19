import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const LovesIndex = () => (
    <DefaultLayout>
        <Head>
            <title>I love you &lt;333</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="I love you cutie <333" />
        </Head>
        <h1 className="center noselect"><a href="//cdn.pxseu.com/meAndHer.jpg">I love you cutie &lt;333</a></h1>
    </DefaultLayout>
)

export default LovesIndex