import Typography from "@components/Typograpy"
import MedicationEntity from "@dto/medication.entity";
import MedicationMiddleware from "@middleware/medication.middleware";
import { theme } from "@styles/theme"
import { isSuccess } from "@utils/options";
import { useQuery } from "react-query";
import styled from "styled-components"

type Props = {
    keyword: string;
    onSeleted: (medication: MedicationEntity) => void;
}

// Props 전달받은 keyword를 API 인자 값으로 검색 후 
// 화면에 뿌려준다.
// 검색 결과 클릭시 onSelected 함수를 통해 부모 컨포넌트에게 전달한다.

const MedicationSearchCard: React.FC<Props> = ({ keyword, onSeleted }) => {
    const medicationMiddleware = new MedicationMiddleware();

    const getMedication = async () => {
        const res = await medicationMiddleware.getList(keyword);
        if (isSuccess(res)) return res.data;
    }

    const { isLoading, data } = useQuery(["medication", keyword], getMedication)


    return (
        <Wrapper>
            {
                !isLoading && data && data.map((item, key) => (
                    <Item key={key} onClick={() => onSeleted(item)}>
                        <Typography.P200>{item.prodName}</Typography.P200>
                        <Typography.P100 color={theme.color.N90}>{item.prodCode}</Typography.P100>
                    </Item>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled.ul`
    transition: height 2s;
    max-height: 200px;
    overflow: scroll;
    padding: 0 1.6rem;
`

const Item = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.4rem 0;
    cursor: pointer;

    :not(:first-child){
        border-top: 1px solid ${theme.color.N30};
    }
    .color{
        color: ${theme.color.N900};
    }
`
export default MedicationSearchCard