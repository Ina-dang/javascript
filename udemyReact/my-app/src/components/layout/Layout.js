import classes from './Layout.module.css'
import { MainNavigation } from './MainNavigation'

function Layout(props) {
    return (
        <div >
            <MainNavigation />
            <main classes={classes.main}>
                {props.children}
            </main>
        </div>
    )

}

export { Layout }