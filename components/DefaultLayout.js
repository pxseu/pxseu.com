import Link from 'next/link'
import BackgroundLoader from './BackgroundLoader'

const DefaultLayout = (props) => (
    <BackgroundLoader>
        <div className="app">
            { props.children }
            <div className="center back">
                <p><Link href="/"><a className="noselect">Go Back</a></Link></p>
            </div>
        </div>
        <style jsx>{`.app{top: 100px;}`}</style>
    </BackgroundLoader> 
)

export default DefaultLayout