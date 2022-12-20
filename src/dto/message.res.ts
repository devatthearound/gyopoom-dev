import MessageDTO from "./message.dto"

type MessageResDTO = {
	items: MessageDTO[],
	nextCursor: number
}

export default MessageResDTO