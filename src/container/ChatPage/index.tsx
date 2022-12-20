import BottomNavigationBar from '@components/BottomNavigation'
import HeaderNavigation from './HeaderNavigation'
import styled from 'styled-components'
import ChatRoomListCard from '@components/ChatRoomListCard'
import WithNoGuttersTopAndBottomLayout from '@components/Layout/WithNoGuttersTopAndBottomLayout'
import DefaultPageTransition from '@components/animation/DefaultPageTransition';
import useChatRoom from '@store/chatRoom'

const ChatPage = () => {
    const { chatRoomList } = useChatRoom();

    return (
        chatRoomList ? (
            <WithNoGuttersTopAndBottomLayout>
                <DefaultPageTransition>
                    <HeaderNavigation />
                    <ChatRoomListCard rooms={chatRoomList} />
                </DefaultPageTransition>
                <Footer>
                    <BottomNavigationBar />
                </Footer>
            </WithNoGuttersTopAndBottomLayout>
        ) : <></>
    )
}

const Footer = styled.div`
    z-index: 99;
    width: 100%;
`

export default ChatPage