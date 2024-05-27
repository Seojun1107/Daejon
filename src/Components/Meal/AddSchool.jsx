import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
`;

const H1 = styled.h1`
    font-size: 25px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    outline: none;
    border: 0;
    font-size: 16px;
    padding-left: 5px;
    border-bottom: 1px solid black;
    transition: border-bottom-color 0.3s ease-in-out;
    margin-bottom: 30px;
    &:focus {
        border-bottom-color: blue;
    }
`;

/* const P = styled.p`
    font-size: 14px;
`;
 */
const Ul = styled.ul`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Li = styled.li`
    position: relative;
    width: 100%;
    height: 55px;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 5px 15px;
    transition: transform 0.3s ease-in-out;
    &:hover {
        background-color: #e9e9e9;
        transform: scale(0.99);
    }
`;

const SchoolName = styled.h3`
    position: relative;
    text-justify: end;
    font-size: 16px;
`;

const SchoolAdress = styled.p`
    position: absolute;
    bottom: 2px;
    font-size: 11px;
`;
function AddSchool(props) {
    const [schoolName, setSchoolName] = useState("");
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [SD_SCHUL_CODE, setSD_SCHUL_CODE] = useState();
    const [ATPT_OFCDC_SC_CODE, setATPT_OFCDC_SC_CODE] = useState();

    useEffect(() => {
        if (!schoolName) return; // 학교 이름이 비어있으면 API 요청을 보내지 않음

        const delayDebounceFn = setTimeout(() => {
            setLoading(true); // 로딩 상태 설정

            axios.get("https://open.neis.go.kr/hub/schoolInfo", {
                params: {
                    SCHUL_NM: schoolName,
                    Type: "json",
                    pIndex: 1,
                    pSize: 10,
                    KEY: "7a246e93b3dd4623bff42f88296e2a0f"
                }
            })
            .then(response => {
                const schoolData = response.data.schoolInfo[1].row;
                console.log(schoolData);
                setSchoolInfo(schoolData);
                setLoading(false); // 로딩 상태 해제
            })
            .catch(error => {
                console.log(error);
                setError(error.message); // 오류 메시지 설정
                setLoading(false); // 로딩 상태 해제
            });
        }, 500); // 0.5초 기다림

        return () => clearTimeout(delayDebounceFn);
    }, [schoolName]);


    
    return (
        <Wrap>
            <H1>현재 재학중인<br />학교를 입력해주세요!</H1>
            <Input 
                type="text" 
                value={schoolName} 
                onChange={(e) => setSchoolName(e.target.value)}
            />
            {loading && <p>로딩중...</p>}
            {schoolInfo && (
                <Ul>
                    {schoolInfo.map((school, index) => (
                        <Li key={index} onClick={() => {
                            setSD_SCHUL_CODE(school.SD_SCHUL_CODE);
                            setATPT_OFCDC_SC_CODE(school.ATPT_OFCDC_SC_CODE);
                        }}>
                            <SchoolName>{school.SCHUL_NM}</SchoolName>
                            <SchoolAdress>{school.ORG_RDNMA + school.ORG_RDNDA}</SchoolAdress>
                        </Li>
                    ))}
                </Ul>
            )}
        </Wrap>
    );
}

export default AddSchool;
