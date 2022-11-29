import CreateElement from "@/common/CreateElement";
import JoinClassNames from "@/common/JoinClassNames";
import style from './style.less'

function Input(): HTMLElement {
    const input = CreateElement('input')

    input.classList.add(`${JoinClassNames(style)}`)

   return input
}

export default Input;
