import Head from 'next/head'
import { useState } from 'react'
import DefaultLayout from '../../components/DefaultLayout'

const LovesIndex = () => {
    const [waifuClick, setWaifuClick] = useState(true);

    return (
        <>
            <DefaultLayout>
                <Head>
                    <title>Grab a waifu!</title>
                    <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Grab a waifu!" />
                </Head>
                <h1 className="center noselect">
                    <a onClick={ ()=> {
                        setWaifuClick(false);
                        setTimeout( ()=> setWaifuClick(true), 1);
                    } }>Get me a diffrent waifu!</a>
                </h1>
                <hr />
                <div className={ waifuClick ? "center noselect imageDiv" : "hidden" }>
                    <img className="waifuImage" src={
                        `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`
                    } alt="Unable to fetch image." />
                    <p><a href="https://www.thiswaifudoesnotexist.net/">Provided by www.thiswaifudoesnotexist.net</a></p>
                </div>
            </DefaultLayout>
            <style jsx>{`
                .imageDiv {
                    overflow: hidden;
                }
                .waifuImage {
                    width: 40%;
                    height: 40%;
                    border-style: double;
                    border-width: 1px;
                    border-color: white;
                    background-color: black;
                }
            `}</style>
        </>
    )
}

export default LovesIndex