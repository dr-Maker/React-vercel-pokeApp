import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document{
    static async getInitialProps(ctx){
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
    
    try{
        ctx.renderPage = () => 
        originalRenderPage({
            enhaceApp: App => props =>
            sheet.collectStyles(<App {...props}/>),
        })

        const inicialProps = await Document.getInitialProps(ctx)

        return{
            ...inicialProps,
            styles:(
                <>
                {inicialProps.styles}
                {sheet.getStyleElement()}
                </>
                )
            }
        }
        finally {
            sheet.seal()
        }
    }     
}
