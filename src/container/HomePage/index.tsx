import styled from "styled-components";
import BottomNavigationBar from "@components/BottomNavigation";
import HeaderNavigation from "./HeaderNavigation";
import GoodsThumbnailCardList from "@components/GoodsThumbnailCardList";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import { Link, useLocation } from "react-router-dom";
import RegisterPharmacyInformationOnFirstUserRegister from "@components/BottomSheet/RegisterPharmacyInformationOnFirstUserRegister";
import { useEffect, useState } from "react";
import NoticeListCard from "@components/NoticeListCard";
import { theme } from "@styles/theme";
import { UnderLine, Li, Container, Footer } from "./style"
const HomePage = () => {
  const headMenu = [{
    label: "약사전용 마켓",
    hash: "goods",
  }, {
    label: "공지사항",
    hash: "notice"
  }];

  const { state } = useLocation();
  const gap = 100 / headMenu.length;
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash.includes("notice")) {
      setCurrentMenuIndex(1);
    } else {
      setCurrentMenuIndex(0)
    }
  }, [hash])

  return (
    <WithNoGuttersTopAndBottomLayout>
      <HeaderNavigation />
      <div style={{
        backgroundColor: theme.color.N0,
        borderBottom: `1px solid ${theme.color.N30}`
      }}>
        <ul style={{
          display: "flex",
          width: "100%",
          padding: "0 2rem",
          position: "relative"
        }}>
          {
            headMenu.map((menu, key) => (
              <Li key={key} width={gap + "%"} isClick={key == currentMenuIndex}>
                <Link to={`#${menu.hash}`} style={{ display: "block", width: "100%", padding: " 1.1rem 0.8rem" }}>
                  {menu.label}
                </Link>
              </Li>
            ))
          }
          <UnderLine
            tabWidth={gap}
            transition={{ type: "spring" }}
            animate={{ x: 100 * currentMenuIndex + "%" }} />
        </ul>
      </div>
      <Container>
        {currentMenuIndex == 0 ? <GoodsThumbnailCardList /> : <NoticeListCard />}
      </Container>
      <Footer>
        <BottomNavigationBar />
      </Footer>
      <RegisterPharmacyInformationOnFirstUserRegister defaultValue={state == "true" ? true : false} />
    </WithNoGuttersTopAndBottomLayout>
  )
}

export default HomePage