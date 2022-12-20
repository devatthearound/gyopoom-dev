import TextArea from "@components/TextArea"
import InputElements from "@dto/input.elements"

type Props = {
    elements: InputElements
    onChange: React.Dispatch<React.SetStateAction<InputElements>>
}

const TextAreaNoLabel = ({ elements, onChange }: Props) => {

    const handlerOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        onChange({ ...elements, invalid: !elements.regex.test(value), value: value })
    }

    return (
        <>
            <TextArea
                name={elements.name}
                placeholder={elements.placeholder}
                required={elements.require}
                autoComplete="off"
                invalid={elements.invalid}
                disabled={elements.disabled}
                value={elements.value}
                defaultValue={elements.defaultValue}
                onChange={handlerOnChange} />
        </>
    )
}

export default TextAreaNoLabel;