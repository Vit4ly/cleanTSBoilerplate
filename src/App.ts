import CreateElement from "@/common/CreateElement";
import JoinClassNames from "@/common/JoinClassNames";
import Title from "@/Components/Title";
import Input from "@/Components/Input";
import style from './style.less'


function App(): HTMLElement{
    const listElement: HTMLElement[] = []
    const app = CreateElement('div')
    app.classList.add(...[JoinClassNames(style)])

    const title = Title({text: 'ToDo TS Webpack', tag: 'h1'})
    const input = Input()

    listElement.push(title)
    listElement.push(input)
    listElement.forEach(el => app.appendChild(el))

    return app
}

export default App;
