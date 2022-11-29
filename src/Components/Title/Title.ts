import CreateElement from "@/common/CreateElement";
import JoinClassNames from "@/common/JoinClassNames";
import style from './style.less'

interface config {
    text: string,
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function Title(config: config): HTMLElement {
    const title = CreateElement(config.tag)
    title.textContent = config.text
    title.classList.add(`${JoinClassNames(style)}`)

    return title
}

export default Title;
