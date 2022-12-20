import BottomSheet from "@components/Modal/BottomSheet"
import BottomSheetBody from "@components/Modal/BottomSheetBody"
import { useErrorHandlerForm } from "@context/ErrorHandleContext"
// import { useSocket } from "@context/SocketContext"
import ChatMiddleware from "@middleware/chat.middleware"
import { useNavigate } from "react-router-dom"

type Props = {
    id: string,
    isMoreClick: boolean
    setIsMoreClick: React.Dispatch<React.SetStateAction<boolean>>
}

const MoreMenu: React.FC<Props> = ({ id, isMoreClick, setIsMoreClick }) => {
    const { setModalMessage } = useErrorHandlerForm();
    // const { getRoomSocketList } = useSocket();
    const chatMiddleware = new ChatMiddleware();
    const navigate = useNavigate();


    const handleDelete = async (id: string) => {
        setIsMoreClick(false)
        setModalMessage("채팅방이 삭제되었습니다");
        const result = await chatMiddleware.delete(id)
        // getRoomSocketList();
        setModalMessage("")
    }

    return (
        <BottomSheet isOpen={isMoreClick} isClose={setIsMoreClick} y={103}>
            {/* <BottomSheetBody
                label="삭제"
                id={id}
                changeFC={handleDelete} /> */}
            <BottomSheetBody
                label="닫기"
                id={id}
                changeFC={() => setIsMoreClick(false)} />
        </BottomSheet>
    )
}

export default MoreMenu