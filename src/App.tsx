import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import CompleteModal from "@components/Modal/Complete";
import personPin from "@images/icons/person_pin.svg"
import { useErrorHandlerForm } from '@context/ErrorHandleContext';

import AuthPage from '@container/AuthPage';
import WelComePage from '@container/WelcomePage';
import NewGoodsPage from '@container/NewGoodsPage';
import DetailsGoodsPage from '@container/DetailsGoodsPage';
import HomePage from '@container/HomePage';
import LadingPage from '@container/LadingPage';
import SalesHistoryPage from '@container/SalesHistoryPage';
import PurchaseHistoryPage from '@container/PurchaseHistoryPage';
import AccountPage from '@container/AccountPage';
import NotFoundPage from '@container/NotFoundPage';
import ChangeGoodsPage from '@container/ChangeGoodsPage';
import SearchPage from '@container/SearchPage';
import ChangeAccountPage from '@container/ChangeAccountPage';
import DetailsGoodsReceiptPage from '@container/DetailsGoodsReceiptPage';
import ChatPage from '@container/ChatPage';
import ChatRoomPage from '@container/ChatRoomPage';
import DetailsImagesPage from '@container/DetailsImagesPage';

import TermsConditionsPage from '@container/DetailsTermsConditionsPage';
import UserTermsPage from '@container/DetailsTermsConditionsPage/User';
import ServiceTermsPage from '@container/DetailsTermsConditionsPage/Service';
import MarketingTermsPage from '@container/DetailsTermsConditionsPage/Marketing';

import DeleteAccountPage from '@container/DeleteAccountPage';
import EnrollPharmacyPage from '@container/EnrollPharmacyPage';
import NewPharmacyPage from '@container/NewPharmacyPage';

import AccountPharmacyPage from '@container/DetailsPharmacyPage';
import ChangePharmacyPage from '@container/ChagePharmacyPage';
import EnrollPharmacistPage from '@container/EnrollPharmacistPage';

import PharmacistRegistrationComplete from '@container/RegistrationCompletePage/Pharmacist';
import PharmacyRegistrationComplete from '@container/RegistrationCompletePage/Pharmacy';

import SelectBuyerPage from '@container/SelectBuyerPage';
import NewReceiptForBuyerPage from '@container/NewReceiptForBuyerPage';
import DetailsNoticePage from '@container/DetailsNoticePage';
import ReceiptListPage from '@container/ReceiptListPage';
import BasicConfirmModal from '@components/BasicConfirmModal';
import useModalStore from '@components/BasicConfirmModal/modal.store';
import SignPage from '@container/NewReceiptForSellerPage/SignPage';
import MedicinePage from '@container/NewReceiptForSellerPage/MedicinePage';
import { getCookie } from '@hooks/useCookie';
import axios from 'axios';
import '@service/firebase';

const App = () => {
  const location = useLocation();
  const { modalMessage, setModalMessage } = useErrorHandlerForm();
  const { isConfirmModalOpen } = useModalStore();

  /** react native 환경에서만 가능 */
  const listener = (event: any) => {
    const { data, type } = JSON.parse(event.data);

    if (type === "token") {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'token', data: "프론트에서 token 잘 받았습니다." })
      );
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.password}`;
    }
  };


  if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener("message", listener);
    /** ios */
    window.addEventListener("message", listener);
  } else {
    // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('accessToken')}`;
    axios.defaults.headers.common['RefreshToken'] = getCookie('refreshToken');

  }
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/healer-auth" element={<AuthPage />} />
          <Route path="/landing" element={<LadingPage />} />
          <Route path="/welcome" element={<WelComePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/history/my-goods" element={<SalesHistoryPage />} />
          <Route path="/history/buy-goods" element={<PurchaseHistoryPage />} />
          <Route path="/history/receipt" element={<ReceiptListPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/pharmacy" element={<AccountPharmacyPage />} />
          <Route path="/account/pharmacy/enroll" element={<EnrollPharmacyPage />} />
          <Route path="/account/new-pharmacy" element={<NewPharmacyPage />} />
          <Route path="/account/change-pharmacy/:pharmacyId" element={<ChangePharmacyPage />} />
          <Route path="/pharmacy/enroll/end" element={<PharmacyRegistrationComplete />} />
          <Route path="/account/pharmacist/enroll" element={<EnrollPharmacistPage />} />
          <Route path="/account/pharmacist/enroll/end" element={<PharmacistRegistrationComplete />} />
          <Route path="/account/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/account/terms-conditions/service" element={<ServiceTermsPage />} />
          <Route path="/account/terms-conditions/users" element={<UserTermsPage />} />
          <Route path="/account/terms-conditions/marketing" element={<MarketingTermsPage />} />
          <Route path="/change-account" element={<ChangeAccountPage />} />
          <Route path="/:id" element={<DetailsGoodsPage />} />
          <Route path="/new-goods" element={<NewGoodsPage />} />
          <Route path="/change-goods/:id" element={<ChangeGoodsPage />} />
          <Route path="/change-account/delete" element={<DeleteAccountPage />} />
          <Route path="/receipt/:userGoodsReceiptId" element={<DetailsGoodsReceiptPage />} />
          <Route path="/goods/:goodsPurchaseDetailsId/new-receipt" element={<NewReceiptForBuyerPage />} />
          {/* <Route path="/goods/:goodsPurchaseDetailsId/new-receipt/end" element={<NewReceiptForBuyerSignPage />} /> */}
          <Route path="/goods/:goodsId/image" element={<DetailsImagesPage />} />
          <Route path="/goods/:goodsId/connect-buyer" element={<SelectBuyerPage />} />
          <Route path="/new-purchase-details" element={<SignPage />} />
          <Route path="/new-purchase-details/prod" element={<MedicinePage />} />
          {/* <Route path="/new-purchase-details/end" element={<SignPage />} /> */}
          <Route path="/notice/:id" element={<DetailsNoticePage />} />
          <Route path="/my-chat" element={<ChatPage />} />
          <Route path="/my-chat/room/:roomId" element={<ChatRoomPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/*"
            element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <BasicConfirmModal
        isOpen={isConfirmModalOpen.isOpen}
        confirmButton={isConfirmModalOpen.confirmButton}
        cancelButton={isConfirmModalOpen.cancelButton}
        title={isConfirmModalOpen.title}
        label={isConfirmModalOpen.label}
        icon={isConfirmModalOpen.icon} />
      <CompleteModal
        isOpen={modalMessage.length > 0}
        isClose={setModalMessage}
        label={modalMessage}
        icon={personPin} />
    </>
  )
}

export default App