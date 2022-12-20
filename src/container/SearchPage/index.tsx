import Hide from "@components/Hide";
import { useRef, useState } from "react";
import { defaultSearch } from "@utils/search";
import InputElements from "@dto/input.elements";
import { useNavigate } from "react-router-dom";
import WithNoGuttersTopAndBottomLayout from "@components/Layout/WithNoGuttersTopAndBottomLayout";
import useSearchPagination from "@hooks/useSearchPagination";
import GoodsThumbnailCard from "@components/GoodsThumbnailCard";
import Loading from "@components/Loading";
import Typography from "@components/Typograpy";
import { HeaderNavigationWrapper, Container, GotoBackButton, InputWarp, SearchButton, CancelButton, Wrapper, Form, Input, ResultBox } from "./style";
import GoodsThumbnailDTO from "@dto/goods-thumbnail.dto";
const SearchPage = () => {
    const [search, setSearch] = useState<string>("");
    const [searchInput, serSearchInput] = useState<InputElements>(defaultSearch);
    const navigate = useNavigate();
    const INITIAL_FETCH_COUNT = 5;
    const target = useRef(null);

    const { data, loading, loadingMore } = useSearchPagination(search, INITIAL_FETCH_COUNT, target)

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target
        serSearchInput({ ...searchInput, value: value })
    }

    const goToBack = () => {
        navigate('/')
    }

    const handlerOnSubmit = (e: any) => {
        e.preventDefault();
        setSearch(searchInput.value)
    }

    return (
        <WithNoGuttersTopAndBottomLayout>
            <HeaderNavigationWrapper>
                <Wrapper>
                    <Container>
                        <GotoBackButton onClick={goToBack}><Hide>뒤로가기</Hide></GotoBackButton>
                        <InputWarp>
                            <SearchButton onClick={handlerOnSubmit}><Hide>검색 버튼</Hide></SearchButton>
                            <Form onSubmit={handlerOnSubmit}>
                                <Input
                                    name={searchInput.name}
                                    type={searchInput.type}
                                    placeholder={searchInput.placeholder}
                                    required={searchInput.require}
                                    autoComplete="off"
                                    value={searchInput.value}
                                    defaultValue={searchInput.defaultValue}
                                    onChange={handlerOnChange} />
                            </Form>
                            <CancelButton onClick={() => serSearchInput({ ...searchInput, value: "" })}><Hide>검색어 모두 삭제</Hide></CancelButton>
                        </InputWarp>
                    </Container>
                </Wrapper>
            </HeaderNavigationWrapper>
            <ResultBox>
                {loading && <Loading width="2rem" height="2rem" />}
                {
                    !loading && data && (
                        <>
                            {data.map((item: GoodsThumbnailDTO, key: number) => (
                                <div key={key} ref={target}>
                                    <GoodsThumbnailCard goods={item} />
                                </div>
                            ))}
                        </>
                    )
                }
                {loadingMore && <Loading width="2rem" height="2rem" />}
                {
                    data && (
                        data.length === 0 && (
                            <Typography.P200
                                style={{ marginTop: "1rem" }}>검색 결과가 없습니다</Typography.P200>
                        )
                    )
                }
            </ResultBox>
        </WithNoGuttersTopAndBottomLayout>
    )
}

export default SearchPage