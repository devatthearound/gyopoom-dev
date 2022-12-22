import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import Typography from "@components/Typograpy";
import contentfulClient from "@service/contentfulClient";
import { theme } from "@styles/theme";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsEntity from "@dto/termsAndConditions.entity";
import styled from "styled-components";
import BackIcon from "@images/icons/keyboard_arrow_left.svg"
import LabelOnTheCenterAndBothActionButtons from "@components/HeaderNavigation/LabelOnTheCenterAndBothActionButtons";

const Terms006Page = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<TermsAndConditionsEntity>();

    const LeftActions = [{
        event: () => navigate(-1),
        iconType: BackIcon
    }]

    useEffect(() => {
        contentfulClient.getEntry("5U3BEOeAzUSwnPFtgZdbnI").then((response) => {
            const items = response.fields as TermsAndConditionsEntity
            setData(items)
        })
    }, []);

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigationWrapper>
                <LabelOnTheCenterAndBothActionButtons
                    leftActions={LeftActions}
                    label={data.title} />
            </HeaderNavigationWrapper>
            <Container>
                <Typography.P100B color={theme.color.N600}>{data.title}</Typography.P100B>
                <Content>
                    <h1>힐러 개인정보처리방침</h1>
                    <p>디어라운드 주식회사(이하 “회사”라 함)는 다음과 같이 의약품 교품 플랫폼 서비스 “힐러”에 적용되는 개인정보 처리방침을 정하여 이용자의 개인정보를 처리하고 있습니다.</p>
                    <br />
                    <h3>01 개인정보 수집 및 이용 현황</h3>
                    <br />
                    <p>회사는 다음과 같이 이용자의 개인정보를 처리합니다.</p>
                    <br />
                    <table>
                        <colgroup>
                            <col width="100px" />
                            <col width="150px" />
                            <col width="70px" />
                            <col width="200px" />
                            <col width="150px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>서비스</th>
                                <th>수집 및 이용목적</th>
                                <th>구분</th>
                                <th>수집 및 이용 항목</th>
                                <th>보유 및 이용기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowSpan={2}>회원 가입</td>
                                <td rowSpan={2}>서비스 이용을 위한 이용자 식별<br />이용자 개별적 통지 및 고지</td>
                                <td>필수</td>
                                <td>이름, 휴대폰 번호</td>
                                <td rowSpan={5}>상거래관계 종료시로부터 5년간.
                                    단, 서비스와 관련된 회사와의 분쟁 또는 회원간 분쟁이 계속 중이거나 민원 처리 중인 경우, 수사, 조사가 진행중인 경우에는 해당 분쟁, 민원, 수사, 조사 등이 종료되는 때까지 보유
                                </td>
                            </tr>
                            <tr>
                                <td>선택</td>
                                <td>프로필사진</td>
                            </tr>
                            <tr>
                                <td>의약품거래</td>
                                <td>서비스 이용을 위한 이용자 식별</td>
                                <td>필수</td>
                                <td>소속약국정보,약사면허번호</td>
                            </tr>
                            <tr>
                                <td>게시글 및 댓글 작성, 채팅</td>
                                <td>이용자간 채팅 서비스 제공, 분쟁 조정, 부정한 이용행위 방지 및 제재</td>
                                <td>필수</td>
                                <td>작성 게시글 및 댓글의 작성일시 및 내용,
                                    서비스 내 채팅 기록</td>
                            </tr>
                            <tr>
                                <td>의약품거래내역서</td>
                                <td>약사법 및 관련법규에 따른 증빙자료 작성, 교품 거래 서비스 제공</td>
                                <td>전문의약품 거래:필수<br />그 외 거래: 선택</td>
                                <td>공급자정보(거래처명, 요양기관기호(사업자번호), 거래자명, 연락처), 공급받는 자 정보(약국명, 약사명, 요양기관기호, 연락처), 거래내역(거래일자, 약품코드, 약품명, 제조사, 규격, 수량, 단가, 금액)</td>
                            </tr>
                            <tr>
                                <td>서비스 이용 시 생성되어 수집되는 정보(민원 포함)</td>
                                <td>본인식별 및 민원처리</td>
                                <td>필수</td>
                                <td>푸쉬알림, 휴대전화번호 SMS, 카카오톡 알림</td>
                                <td>회원탈퇴시 혹은 동의 철회시 까지</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p>회사에서 수집 및 이용되는 개인정보는 다음과 같은 경로로 수집 되고 있습니다.</p>
                    <br />
                    <ul>
                        <li>
                            회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의하고 직접 정보를 입력하는 경우
                        </li>
                        <li>
                            고객센터를 통한 상담과정에서 앱, 메일, 전화 등을 통해 개인정보를 수집하는 경우
                        </li>
                        <li>
                            서비스 이용과정에서 이용자로부터 수집하는 경우
                        </li>
                    </ul>
                    <br />
                    <p>회사가 관련법규에 따라 개인정보를 보유 및 이용하는 내역은 아래와 같습니다. </p>
                    <br />
                    <table>
                        <colgroup>
                            <col width="150px" />
                            <col width="150px" />
                            <col width="70px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>개인정보 항목</th>
                                <th>보유 근거법령</th>
                                <th>보유기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>계약 또는 청약철회 등에 관한 기록</td>
                                <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                                <td>5년</td>
                            </tr>
                            <tr>
                                <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                                <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                                <td>5년</td>
                            </tr>
                            <tr>
                                <td>소비자의 불만 또는 분쟁처리 기록</td>
                                <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                                <td>3년</td>
                            </tr>
                            <tr>
                                <td>표시/광고에 관한 기록</td>
                                <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                                <td>6개월</td>
                            </tr>
                            <tr>
                                <td>세법이 규정하는 모든 거래에 관한 장부 및 증빙서류</td>
                                <td>국세기본법</td>
                                <td>5년</td>
                            </tr>
                            <tr>
                                <td>전자금융 거래에 관한 기록</td>
                                <td>전자금융거래법</td>
                                <td>5년</td>
                            </tr>
                            <tr>
                                <td>서비스 방문기록</td>
                                <td>통신비밀보호법</td>
                                <td>3개월</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <h3>02 만 14세 미만 아동의 개인정보 처리</h3>
                    <br />
                    <p>법정대리인의 동의가 필요한 만 14세 미만의 아동은 서비스를 이용하실 수 없습니다</p>
                    <br />
                    <h3>03 개인정보 처리업무의 위탁에 관한 사항</h3>
                    <br />
                    <p>회사는 서비스의 원활한 제공을 위해 개인정보 처리의 일부를 위탁하고 있으며, 개인정보 처리 업무 수탁업체가 관련 법령을 준수하도록 관리감독하고 있습니다</p>
                    <br />
                    <p>수탁 현황은 아래와 같습니다. </p>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>수탁업체</th>
                                <th>위탁 업무</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>채널톡</td>
                                <td>고객 상담을 위한 상담 채팅내용의 보관, 처리</td>
                            </tr>
                            <tr>
                                <td>Amazon Web Services, Inc.</td>
                                <td>정보 보관</td>
                            </tr>
                            <tr>
                                <td>네이버클라우드 주식회사</td>
                                <td>정보 보관, 문자 등 알림 전송</td>
                            </tr>
                            <tr>
                                <td>Google Cloud Platform</td>
                                <td>정보 보관 및 분석, 알람</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <h3>04 개인정보의 국외 이전에 관한 사항</h3>
                    <br />
                    <p>회사는 데이터 분석과 데이터 분산 저장을 위해서 이용자의 개인정보를 해외 서비스에 위탁하고 있습니다</p>
                    <br />
                    <table>
                        <colgroup>
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>회사명</th>
                                <th>이전목적</th>
                                <th>연락처</th>
                                <th>개인정보 이전국가</th>
                                <th>이전되는 항목</th>
                                <th>이전 일시 및 방법</th>
                                <th>보유 및 이용 기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Google Cloud Platform</td>
                                <td>Google Cloud Storage에 데이터 저장 및 Google BigQuery를 통한 데이터 분석</td>
                                <td>080-822-1422</td>
                                <td>미국</td>
                                <td>수집하는 모든 개인정보</td>
                                <td>데이터 수집 후 수분 이내 Google 클라우드 컴퓨팅 환경에 개인정보 보관</td>
                                <td>회원탈퇴 또는 위탁계약 종료시</td>
                            </tr>
                            <tr>
                                <td>Amazon Web Services, Inc</td>
                                <td>Simple Storage Service를 이용한 데이터 저장</td>
                                <td>82)02-1544-8667</td>
                                <td>미국(Amazon Oregon Region)</td>
                                <td>수집하는 모든 개인정보</td>
                                <td>데이터 수집 후 수분 이내 Amazon 클라우드 컴퓨팅 환경에 개인정보 보관</td>
                                <td>회원탈퇴 또는 위탁계약 종료시</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <h3>05 개인정보 제3자 제공에 관한 사항</h3>
                    <br />
                    <p>회사는 이용자들의 개인정보를 제3자에게 제공하는 때에는 이용자의 동의를 받습니다.  개인정보를 제공받는 제3자 및 그 목적, 제공항목, 제3자의 보유 및 이용기간은 아래와 같습니다. </p>
                    <br />
                    <table>
                        <colgroup>
                            <col width="150px" />
                            <col width="100px" />
                            <col width="150px" />
                            <col width="100px" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>제공받는자</th>
                                <th>제공 목적</th>
                                <th>제공 항목</th>
                                <th>보유 및 이용기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이용자가 힐러 플랫폼에 등록한 소속약국
                                    (등록이력이 있는 전 소속약국 포함)</td>
                                <td>약국대상 소속약사의 의약품거래내역 확인서비스 제공</td>
                                <td>성명, 휴대전화번호, 소속약국정보(명칭, 주소, 사업자번호), 거래기록, 의약품거래내역서[공급자정보-거래처명, 요양기관기호(사업자번호), 거래자명, 연락처, 공급받는 자 정보-약국명, 약사명, 요양기관기호, 연락처, 거래내역-거래일자, 약품코드, 약품명, 제조사, 규격, 수량, 단가, 금액], 게시글 및 댓글 작성기록, 채팅기록, 민원내역</td>
                                <td>약국계정의 힐러서비스계약 해지시 또는 동의 철회시까지</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p>또한, 회사는 개인정보보호법 등 관계 법령이 정하는 경우, 그 밖에 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우, 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.</p>
                    <br />
                    <h3>06 개인정보 파기 절차 및 방법</h3>
                    <br />
                    <p>이용자의 개인정보는 이용자와 회사 간 상거래관계 종료시로부터 5년간 보유한 후 파기하며, 만약 그 전에 수집 및 이용목적이 달성된 때에는 해당 시점에 지체 없이 파기합니다. 다만, 관계 법령에서 정한 의무보관기간이 위 기간 후에 도래하는 경우 의무보관기간이 종료된 시점까지는 보관한 후 파기합니다.
                        종이에 기재된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기하고, 전자적 파일 형태로 저장된 기록은 복원이 불가능하도록 기술적 방법을 사용하여 삭제합니다.</p>
                    <br />
                    <h3>07 장기 미이용 회원에 대한 조치</h3>
                    <br />
                    <p>회사는 회사의 서비스를 1년간 이용하지 않은 장기 미이용 회원의 개인정보를 별도로 분리 보관 또는 삭제하고 있으며, 분리 보관된 개인정보는 5년간 보관 후 지체없이 파기하고 있습니다.</p>
                    <br />
                    <h3>08 정보주체와 법정대리인의 권리 의무 및 행사 방법</h3>
                    <br />
                    <p>이용자는 아래 문의처로 연락하여 회사에 대하여 자신의 개인정보를 조회, 수정하거나 수집/이용에 대한 동의 철회, 개인정보 삭제를 요청할 수 있습니다. </p><br />
                    <p>개인정보 관련 문의처</p><br />
                    <ul>
                        <li>고객센터 이메일 : hello@the-around.com</li>
                    </ul>
                    <br />
                    <p>이용자는 법정대리인이나 위임을 받은 자 등 대리인을 통해서도 권리행사를 할 수 있으며, 이 경우 『개인정보 처리 방법에 관한 고시』 별지 제11호 서식에 따른 위임장을 제출하여야 합니다.</p><br />
                    <p>개인정보 열람 및 처리정지 요구는 개인정보보호법 제 35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있으며, 개인정보의 정정 및 삭제 요구 시에는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 삭제가 불가능합니다. </p><br />
                    <p>회사는 개인정보 열람 및 처리정지 요구 또는 정정 및 삭제 요구를 한 신청인에 대하여 이용자 본인 또는 대리인 여부 확인을 위하여 자료 제출을 요청할 수 있습니다.</p>
                    <br />
                    <h3>09 개인정보의 안전성 확보조치에 관한 사항</h3>
                    <br />
                    <p>회사는 「개인정보보호법」 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다</p>
                    <br />
                    <ul>
                        <li>개인정보 취급자의 최소화 및 교육</li>
                        <ul>
                            <li>개인정보를 처리하는 직원을 최소화 하며, 개인정보를 처리하는 모든 임직원들을 대상으로 개인정보보호 의무와 보안에 대한 정기적인 교육과 캠페인을 실시하고 있습니다</li>
                        </ul>
                        <li>개인정보에 대한 접근 제한</li>
                        <ul>
                            <li>개인정보를 처리하는 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입탐지시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다</li>
                        </ul>
                        <li>접속기록의 보관 및 위변조 방지</li>
                        <ul>
                            <li>개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소 2년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다</li>
                        </ul>

                        <li>개인정보의 암호화</li>
                        <ul>
                            <li>약사면허번호 등 중요한 데이터는 저장 및 전송 시 암호화하여 사용하고 있습니다.</li>
                        </ul>

                        <li>해킹 등에 대비한 기술적 대책</li>
                        <ul>
                            <li>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
                        </ul>
                    </ul>
                    <br />
                    <h3>10 개인정보를 자동으로 수집하는 장치의 설치 운영 및 거부</h3>
                    <br />
                    <p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</p>
                    <br />
                    <p>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 브라우저에게 보내는 소량의 정보이며 이용자들의 PC컴퓨터 내의 하드디스크에 저장되기도 해요</p>
                    <br />
                    <p>쿠키는 이용자들이 방문한 회사의 각 서비스와 웹 사이트 들의 대한 방문 및 이용형태, 인기검색어, 보안접속 여부, 이용자 규모 등을 파악하여 이용자에게 광고를 포함한 최적화된 맞춤형 정보를 제공하기 위해 사용합니다.</p><br />
                    <p>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용이 어려움이 있을 수 있습니다.</p>
                    <br />
                    <p>쿠키 설치 허용 여부를 지정하는 방법</p>
                    <br />
                    <ul>
                        <li>Internet Explorer</li>
                        <ul>
                            <li>웹 브라우저 상단의 톱니바퀴 아이콘 선택 &gt; [인터넷 옵션] 선택 &gt; [개인정보 탭] 선택 &gt; [설정] 에서 [고급] 선택 &gt; [쿠키] 섹션에서 설정</li>
                        </ul>
                        <li>Microsoft Edge</li>
                        <ul>
                            <li>웹 브라우저 상단의 점 아이콘 선택 &gt; [설정] 선택 &gt; [쿠키 및 사이트 권한] 선택 &gt; [쿠키 및 사이트 데이트 관리 및 삭제] 선택하여 설정</li>
                        </ul>
                        <li>Chrome</li>
                        <ul>
                            <li>웹 브라우저 우측 상단의 점 아이콘 선택 &gt; [설정] 선택 &gt; [보안 및 개인정보 보호] 선택 &gt; [쿠키 및 기타 사이트 데이터 &gt; [일반설정] 섹션에서 설정</li>
                        </ul>
                        <li>Whale</li>
                        <ul>
                            <li>웹 브라우저 상단의 점 아이콘 선택  &gt;[설정] 선택 &gt; [개인정보 보호] 선택 &gt; [쿠키 및 기타 사이트 데이터] 선택 &gt; [일반설정] 섹션에서 설정</li>
                        </ul>
                    </ul>
                    <br />
                    <h3>11 개인정보 보호책임자에 관한 사항</h3>
                    <br />
                    <p>사용자가 서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만, 의견, 요청은 아래 개인정보 보호책임자에게 문의하여 주시기 바랍니다.</p>
                    <br />
                    <ul>
                        <li>이름 : 조현주</li>
                        <li>직위 : 대표</li>
                        <li>연락처 : hello@the-around.com</li>
                    </ul>
                    <br />
                    <h3>12 추가적인 판단기준</h3>
                    <br />
                    <p>회사는 개인정보보호법 제15조 제3항 및 제17조 제4항에 따라 개인정보보호법 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용, 제공할 수 있습니다.</p>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>이용, 제공 목적</th>
                                <th>보유 및 이용기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이름, 휴대전화번호, 약국정보</td>
                                <td>서비스 관련 추가안내 제공</td>
                                <td>목적달성 즉시 파기</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p>이에 따라 회사는 정보주체의 동의 없이 추가적인 이용, 제공을 하기 위해서 다음 사항을 고려하였습니다.</p>
                    <br />
                    <ul>
                        <li>개인정보를 추가적으로 이용, 제공하려는 목적이 원래의 수집 목적과 관련성이 있는지 여부</li>
                        <li>개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용, 제공에 대한 예측가능성이 있는지 여부</li>
                        <li>개인정보의 추가적인 이용, 제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
                        <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
                    </ul>
                    <br />
                    <h3>13 정보주체의 권익침해에 대한 구제방법</h3>
                    <br />
                    <p>이용자는 아래의 기관에 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.</p>
                    <br />
                    <ul>
                        <li>
                            개인정보 침해신고센터 (한국인터넷진흥원 운영)
                        </li>
                        <li>
                            소관업무 : 개인정보 침해사실 신고, 상담 신청
                        </li>
                        <li>
                            홈페이지 : privacy.kisa.or.kr
                        </li>
                        <li>
                            전화 : (국번없이) 118
                        </li>
                        <li>
                            주소 : 전라남도 나주시 진흥길 9 한국인터넷진흥원
                        </li>
                        <li>
                            개소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
                        </li>
                        <li>
                            홈페이지 : www.kopico.go.kr
                        </li>
                        <li>
                            주소 : 서울특별시 종로구 세종대로 209 정부서울청사 12층
                        </li>
                        <li>
                            대검찰청 사이버수사과: (국번없이) 1301, privacy@spo.go.kr (www.spo.go.kr)
                        </li>
                        <li>
                            경찰청 사이버수사국: (국번없이) 182 (ecrm.cyber.go.kr)
                        </li>
                    </ul>
                    <br />
                    <p>
                        회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해구제를 위해 노력하고 있습니다.
                    </p>
                    <br />
                    <p>『개인정보보호법』 제25조(개인정보의 열람), 제26조(개인정보의 정정 삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에따라 행정심판을 청구할 수 있습니다.</p>
                    <br />
                    <h3>14 개인정보처리방침의 시행 및 변경</h3>
                    <br />
                    <p>이 개인정보 처리방침은 2022년 12월 26일부터 시행됩니다.</p>
                </Content>
            </Container>
        </WithNoGuttersTopAndBottomLayout>
    );
}


const HeaderNavigationWrapper = styled.div`
    z-index: 99;
    width:100%;
    background-color: ${theme.color.N0};
`
const Container = styled.div`
    height: 100%;
    padding: 2rem;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`
const Content = styled.div`
    margin-top: 1.2rem;
    .line-break{
        white-space: pre-wrap;
    }

    img{
        max-width: 100%;
        height: auto;
        margin: auto;
        display: block;
    }

    ul{
        list-style: disc;
        padding-left: 3em;
    }
    ol {
        list-style: decimal;
        padding-left: 3em;
    }

    li{
        font-size: ${theme.fontSize.P200};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        color: ${theme.color.N400};
        line-height: 1.3;
    }

    h1{
        font-size: ${theme.fontSize.H100};
        line-height: 2;
    }
    h2{
        font-size: ${theme.fontSize.H200};
        line-height: 2;
    }
    h3{
        font-size: ${theme.fontSize.H50};
        font-weight: ${theme.fontWeight.Bold};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        line-height:  2;
        margin-top: 1.6rem;
    }
    p{
        display: block;
        font-size: ${theme.fontSize.P200};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        color: ${theme.color.N400};
        line-height: 1.5;
    }
    th, td{
        font-size: ${theme.fontSize.P100};
        letter-spacing:  ${theme.letterSpacing.normal}px;
        color: ${theme.color.N400};
        line-height: 1.5;
        border-top: 1px solid ${theme.color.N100};
        border-right: 1px solid ${theme.color.N100};
        width: fit-content;
        padding: 0.5rem;
    }

    thead{
        border-top: 1px solid ${theme.color.N100};
        border-left: 1px solid ${theme.color.N100};
        border-right: 1px solid ${theme.color.N100};
    }
    tbody {
        border: 1px solid ${theme.color.N100};
    }
    table{
        width: max-content;
    }
`

export default Terms006Page;